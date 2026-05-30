const DEV_ORIGINS = ['http://localhost:3000', 'http://127.0.0.1:3000']

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || ''

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
      return jsonResponse({ error: 'Invalid JSON' }, 400, env)
    }

    const { email, source, campaign } = body
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ error: 'Invalid email address' }, 400, env)
    }

    const contact = {
      email,
      source: source || 'website',
      userGroup: 'newsletter',
    }
    if (campaign) contact.campaign = campaign

    const loopsRes = await fetch('https://app.loops.so/api/v1/contacts/create', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.LOOPS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    })

    const data = await loopsRes.json()
    return jsonResponse(data, loopsRes.status, origin, env)
  },
}

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
