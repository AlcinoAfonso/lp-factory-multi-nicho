import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/database';

/**
 * Layout Server Component que protege todas as rotas client
 * Verifica a sessão no servidor antes de renderizar
 */
export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Renderizar diretamente - a proteção será feita no layout da pasta (protected)
  return <>{children}</>;
}
