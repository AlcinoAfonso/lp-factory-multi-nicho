import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Database } from '@/types/database'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Rotas protegidas do admin
  if (req.nextUrl.pathname.startsWith('/admin')) {
    // Permitir acesso à página de login
    if (req.nextUrl.pathname === '/admin/login') {
      // Se já estiver logado, redirecionar para dashboard
      if (session) {
        return NextResponse.redirect(new URL('/admin/dashboard', req.url))
      }
      return res
    }

    // Para outras rotas admin, verificar autenticação
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }

    // Verificar se é admin ou super_admin
    const { data: userRole } = await supabase
      .from('users')
      .select('id')
      .eq('id', session.user.id)
      .eq('role', 'super_admin')
      .single()

    // Por enquanto, vamos verificar apenas se está autenticado
    // A verificação completa de roles será feita nos hooks
  }

  // Rotas protegidas do cliente
  if (req.nextUrl.pathname.startsWith('/client')) {
    // Permitir acesso à página de login
    if (req.nextUrl.pathname === '/client/login') {
      if (session) {
        return NextResponse.redirect(new URL('/client/dashboard', req.url))
      }
      return res
    }

    // Para outras rotas client, verificar autenticação
    if (!session) {
      return NextResponse.redirect(new URL('/client/login', req.url))
    }
  }

  return res
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/client/:path*',
  ]
}
