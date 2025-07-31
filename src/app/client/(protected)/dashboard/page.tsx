'use client'

import { useEffect, useState } from 'react'
import { useClientAuth } from '@/hooks/useClientAuth'
import { DatabaseService } from '@/services/database.service'
import type { Database } from '@/types/database'
import Link from 'next/link'
import { HomepageCard } from '@/components/client/HomepageCard'
import { ChangeHomepageModal } from '@/components/client/ChangeHomepageModal'

type LP = Database['public']['Tables']['lps']['Row']

export default function ClientDashboard() {
  const { account, loading: authLoading } = useClientAuth()
  const [lps, setLps] = useState<LP[]>([])
  const [loading, setLoading] = useState(true)
  const [homepageLP, setHomepageLP] = useState<LP | null>(null)
  const [showHomepageModal, setShowHomepageModal] = useState(false)

  useEffect(() => {
    if (account) {
      fetchLPs()
      fetchHomepage()
    }
  }, [account])

  const fetchLPs = async () => {
    if (!account) return

    try {
      setLoading(true)
      const data = await DatabaseService.getLPsByAccount(account.id)
      setLps(data)
    } catch (error) {
      console.error('Erro ao buscar LPs:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchHomepage = async () => {
    if (!account) return
    try {
      const homepage = await DatabaseService.getHomepageLP(account.id)
      setHomepageLP(homepage)
    } catch (error) {
      console.error('Erro ao buscar homepage:', error)
    }
  }

  const handleSetHomepage = async (lpId: string) => {
    if (!account) return

    try {
      await DatabaseService.setLPAsHomepage(account.id, lpId)
      await fetchHomepage()
      await fetchLPs()
    } catch (error) {
      console.error('Erro ao definir homepage:', error)
      throw error
    }
  }

  if (authLoading || loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Carregando...</p>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-0">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Bem-vindo ao LP Factory! Gerencie suas Landing Pages aqui.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href="/client/lps/new"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:w-auto"
          >
            Nova Landing Page
          </Link>
        </div>
      </div>

      <div className="mt-8 mb-8">
        <HomepageCard
          currentHomepage={homepageLP}
          onChangeHomepage={() => setShowHomepageModal(true)}
        />
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Total de LPs
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {lps.length}
            </dd>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              LPs Ativas
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {lps.filter(lp => lp.active).length}
            </dd>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Plano Atual
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {account?.plan_id || 'N/A'}
            </dd>
          </div>
        </div>
      </div>

      {/* Recent LPs */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">
          Landing Pages Recentes
        </h2>
        <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {lps.slice(0, 5).map((lp) => (
              <li key={lp.id}>
                <a
                  href={`/client/lps/${lp.id}`}
                  className="block hover:bg-gray-50 px-4 py-4 sm:px-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            lp.active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {lp.active ? 'Ativa' : 'Inativa'}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {lp.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          /{lp.slug}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(lp.created_at).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ChangeHomepageModal
        isOpen={showHomepageModal}
        onClose={() => setShowHomepageModal(false)}
        lps={lps.filter(lp => lp.active)}
        currentHomepageId={homepageLP?.id || null}
        onSelectHomepage={handleSetHomepage}
      />
    </div>
  )
}
