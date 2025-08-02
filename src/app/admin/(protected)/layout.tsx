import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/database';

/**
 * Server Layout que protege todas as rotas dentro de
 * src/app/admin/(protected)/
 */
export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Lê o cookie JWT gravado pelo middleware
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Sem sessão → redireciona para /admin/login
  if (!session) redirect('/admin/login');

  // Com sessão → renderiza o dashboard normalmente
  return <>{children}</>;
}
