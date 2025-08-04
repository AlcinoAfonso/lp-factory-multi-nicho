import { DatabaseService } from '@/services/database.service'
import Link from 'next/link'
import type { Database } from '@/types/database'

type LPWithAccount = Database['public']['Tables']['lps']['Row'] & {
  account: Database['public']['Tables']['accounts']['Row']
}

export default async function HomePage() {
  // Buscar todas as LPs ativas
  const lps = await getAllActiveLPs()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">LP Factory</h1>
              <p className="mt-1 text-sm text-gray-600">
                Landing Pages de alta conversão
              </p>
            </div>
            <div className="flex gap-4">
              <span className="text-sm text-gray-500">
                Plataforma em desenvolvimento
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Landing Pages Disponíveis
          </h2>
          <p className="text-gray-600">
            Explore nossas landing pages otimizadas para conversão
          </p>
        </div>

        {lps.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Nenhuma landing page disponível no momento.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lps.map((lp) => (
              <Link
                key={lp.id}
                href={`/${lp.slug}`}
                className="block bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {lp.title}
                  </h3>
                  {lp.nicho && (
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Nicho:</span> {lp.nicho}
                    </p>
                  )}
                  {lp.objetivo && (
                    <p className="text-sm text-gray-600 mb-4">
                      <span className="font-medium">Objetivo:</span> {lp.objetivo}
                    </p>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {lp.account.name}
                    </span>
                    <span className="text-orange-600 text-sm font-medium">
                      Ver página →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

// Função para buscar LPs ativas
async function getAllActiveLPs(): Promise<LPWithAccount[]> {
  try {
    const { data, error } = await DatabaseService.supabase
      .from('lps')
      .select(`
        *,
        account:accounts(*)
      `)
      .eq('active', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Erro ao buscar LPs:', error)
    return []
  }
}
