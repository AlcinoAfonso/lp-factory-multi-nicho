import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/database';

/**
 * Server Layout que protege todas as rotas dentro de
 * src/app/client/(protected)/
 */
export default async function ProtectedClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Lê o cookie JWT gravado pelo middleware
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Sem sessão → redireciona para /client/login
  if (!session) redirect('/client/login');

  // Com sessão → renderiza o dashboard normalmente
  return <>{children}</>;
}
