import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/database';

/**
 * Layout Server Component que protege todas as rotas admin
 * Verifica a sessão no servidor antes de renderizar
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Criar cliente Supabase no servidor com cookies
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({ 
    cookies: () => cookieStore 
  });

  // Verificar sessão atual
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Se não há sessão, redirecionar para login
  if (!session) {
    redirect('/admin/login');
  }

  // Se há sessão, renderizar o conteúdo
  return <>{children}</>;
}
