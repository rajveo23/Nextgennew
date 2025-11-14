import { NextRequest, NextResponse } from 'next/server'

// List of bot user agents that should receive pre-rendered content
const BOT_USER_AGENTS = [
  'googlebot',
  'bingbot',
  'slurp',
  'duckduckbot',
  'baiduspider',
  'yandexbot',
  'facebookexternalhit',
  'twitterbot',
  'rogerbot',
  'linkedinbot',
  'embedly',
  'quora link preview',
  'showyoubot',
  'outbrain',
  'pinterest/0.',
  'developers.google.com/+/web/snippet',
  'whatsapp',
  'telegram',
  'discord',
  'chatgpt',
  'gptbot',
  'claude',
  'anthropic',
  'openai'
]

function isBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase()
  return BOT_USER_AGENTS.some(bot => ua.includes(bot))
}

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || ''
  const pathname = request.nextUrl.pathname
  
  // Only apply to blog routes
  if (pathname.startsWith('/blog')) {
    // Add headers to indicate this is a blog page
    const response = NextResponse.next()
    
    if (isBot(userAgent)) {
      // For bots, ensure they get the static content
      response.headers.set('x-is-bot', 'true')
      response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
    } else {
      // For regular users, normal caching
      response.headers.set('x-is-bot', 'false')
    }
    
    return response
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/blog/:path*'
  ]
}
