const DEV_ORIGINS = ['http://localhost:3000', 'http://127.0.0.1:3000']

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || ''
    const path = new URL(request.url).pathname

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin, env) })
    }

    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed' }, 405, origin, env)
    }

    let body
    try {
      body = await request.json()
    } catch {
      return jsonResponse({ error: 'Invalid JSON' }, 400, origin, env)
    }

    if (path === '/trial/available') return handleTrialAvailable(body, origin, env)
    if (path === '/trial/consume') return handleTrialConsume(body, origin, env)

    // Default: newsletter signup
    return handleNewsletter(body, origin, env)
  },
}

// --- Trial / DeviceCheck ---
// Required Worker secrets (set with `wrangler secret put`):
//   DEVICECHECK_KEY      — contents of your .p8 private key file
//   DEVICECHECK_KEY_ID   — the Key ID from App Store Connect
//   APPLE_TEAM_ID        — your Apple Developer Team ID

async function handleTrialAvailable(body, origin, env) {
  const { deviceToken } = body
  if (!deviceToken) return jsonResponse({ error: 'Missing deviceToken' }, 400, origin, env)
  try {
    const jwt = await appleJWT(env)
    const result = await queryTwoBits(deviceToken, jwt)
    const available = result.notFound || result.bit0 === false
    return jsonResponse({ available }, 200, origin, env)
  } catch (err) {
    console.error('DeviceCheck query error:', err)
    // Fail open — never block a genuine first-timer on a backend error
    return jsonResponse({ available: true }, 200, origin, env)
  }
}

async function handleTrialConsume(body, origin, env) {
  const { deviceToken } = body
  if (!deviceToken) return jsonResponse({ error: 'Missing deviceToken' }, 400, origin, env)
  try {
    const jwt = await appleJWT(env)
    await updateTwoBits(deviceToken, jwt, true, false)
    return jsonResponse({ ok: true }, 200, origin, env)
  } catch (err) {
    console.error('DeviceCheck update error:', err)
    return jsonResponse({ ok: false }, 500, origin, env)
  }
}

async function appleJWT(env) {
  const encoder = new TextEncoder()
  const header = { alg: 'ES256', kid: env.DEVICECHECK_KEY_ID }
  const payload = { iss: env.APPLE_TEAM_ID, iat: Math.floor(Date.now() / 1000) }
  const headerB64 = base64url(JSON.stringify(header))
  const payloadB64 = base64url(JSON.stringify(payload))
  const message = `${headerB64}.${payloadB64}`

  const keyData = pemToBuffer(env.DEVICECHECK_KEY)
  const key = await crypto.subtle.importKey(
    'pkcs8',
    keyData,
    { name: 'ECDSA', namedCurve: 'P-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign(
    { name: 'ECDSA', hash: 'SHA-256' },
    key,
    encoder.encode(message)
  )
  return `${message}.${base64url(sig)}`
}

function pemToBuffer(pem) {
  const b64 = pem.replace(/-----[^-]+-----/g, '').replace(/\s/g, '')
  const binary = atob(b64)
  const buf = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) buf[i] = binary.charCodeAt(i)
  return buf.buffer
}

function base64url(input) {
  let b64
  if (typeof input === 'string') {
    b64 = btoa(input)
  } else {
    b64 = btoa(String.fromCharCode(...new Uint8Array(input)))
  }
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

async function queryTwoBits(deviceToken, jwt) {
  const body = {
    device_token: deviceToken,
    transaction_id: crypto.randomUUID(),
    timestamp: Date.now(),
  }
  const res = await fetch('https://api.devicecheck.apple.com/v1/query_two_bits', {
    method: 'POST',
    headers: { Authorization: `Bearer ${jwt}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (res.status === 200) {
    const text = await res.text()
    // Apple returns the plain string "Device Not Found" for devices with no bits set
    if (text === 'Device Not Found') return { notFound: true }
    try {
      const data = JSON.parse(text)
      return { bit0: data.bit0, bit1: data.bit1, notFound: false }
    } catch {
      return { notFound: true }
    }
  }
  const text = await res.text()
  throw new Error(`DeviceCheck query failed: ${res.status} ${text}`)
}

async function updateTwoBits(deviceToken, jwt, bit0, bit1) {
  const body = {
    device_token: deviceToken,
    transaction_id: crypto.randomUUID(),
    timestamp: Date.now(),
    bit0,
    bit1,
  }
  const res = await fetch('https://api.devicecheck.apple.com/v1/update_two_bits', {
    method: 'POST',
    headers: { Authorization: `Bearer ${jwt}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`DeviceCheck update failed: ${res.status} ${text}`)
  }
}

// --- Newsletter ---

async function handleNewsletter(body, origin, env) {
  const { email, source, campaign } = body
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ error: 'Invalid email address' }, 400, origin, env)
  }

  const contact = { email, source: source || 'website', userGroup: 'newsletter' }
  if (campaign) contact.campaign = campaign

  const loopsRes = await fetch('https://app.loops.so/api/v1/contacts/create', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.LOOPS_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(contact),
  })

  const data = await loopsRes.json()
  return jsonResponse(data, loopsRes.status, origin, env)
}

// --- CORS helpers ---

function allowedOrigin(origin, env) {
  const prod = env.ALLOWED_ORIGIN || 'https://omachrome.com'
  if (origin === prod || DEV_ORIGINS.includes(origin)) return origin
  return prod
}

function corsHeaders(origin, env) {
  return {
    'Access-Control-Allow-Origin': allowedOrigin(origin, env),
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

function jsonResponse(body, status, origin, env) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin, env) },
  })
}
