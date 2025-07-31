'use client'

import React, { useEffect, useState } from 'react'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { DatabaseService } from '@/services/database.service'
import type { Database } from '@/types/database'

type AccountWithDetails = Database['public']['Tables']['accounts']['Row'] & {
  plan: Database['public']['Tables']['plans']['Row']
  lps?: Database['public']['Tables']['lps']['Row'][]
}

export default function AdminDashboard() {
  const { isAdmin, isSuperAdmin } = useAdminAuth()
  const [accounts, setAccounts] = useState<AccountWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [expandedAccounts, setExpandedAccounts] = useState<Set<string>>(new Set())
  const [togglingLP, setTogglingLP] = useState<string | null>(null)

  useEffect(() => {
    fetchAccounts()
  }, [])

  const fetchAccounts = async () => {
    try {
      setLoading(true)
      const data = await DatabaseService.getAccountsWithLPs()
      setAccounts(data as AccountWithDetails[])
    } catch (error) {
      console.error('Erro ao buscar contas:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleLP = async (lpId: string, currentStatus: boolean) => {
    if (!isSuperAdmin) {
      alert('Apenas super administradores podem alterar o status das LPs')
      return
    }

    setTogglingLP(lpId)
    try {
      await DatabaseService.updateLP(lpId, { active: !currentStatus })
      // Recarregar dados
      await fetchAccounts()
    } catch (error) {
      console.error('Erro ao atualizar LP:', error)
      alert('Erro ao atualizar status da LP')
    } finally {
      setTogglingLP(null)
    }
  }

  const toggleAccountExpanded = (accountId: string) => {
    const newExpanded = new Set(expandedAccounts)
    if (newExpanded.has(accountId)) {
      newExpanded.delete(accountId)
    } else {
      newExpanded.add(accountId)
    }
    setExpandedAccounts(newExpanded)
  }

  const filteredAccounts = accounts.filter(
    account =>
      account.name.toLowerCase().includes(filter.toLowerCase()) ||
      account.email.toLowerCase().includes(filter.toLowerCase()) ||
      account.lps?.some(lp =>
        lp.title.toLowerCase().includes(filter.toLowerCase()) ||
        lp.slug.toLowerCase().includes(filter.toLowerCase())
      )
  )

  return (
    <div className="px-4 sm:px-0">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            Dashboard Administrativo
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Gerencie clientes e suas Landing Pages
          </p>
        </div>
      </div>

      {/* Filtro */}
      <div className="mt-6">
        <input
          type="text"
          placeholder="Filtrar por nome, email, título ou slug da LP..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
        />
      </div>

      {/* Lista de Clientes */}
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Cliente
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Plano
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Landing Pages
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="text-center py-4">
                        <div className="flex justify-center">
                          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-orange-600"></div>
                        </div>
                        <p className="mt-2 text-gray-600">Carregando...</p>
                      </td>
                    </tr>
                  ) : filteredAccounts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-4 text-center text-gray-500">
                        Nenhum cliente encontrado
                      </td>
                    </tr>
                  ) : (
                    filteredAccounts.map((account) => (
                      <React.Fragment key={account.id}>
                        <tr className={expandedAccounts.has(account.id) ? 'bg-gray-50' : ''}>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                            {account.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {account.email}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {account.plan?.name || 'N/A'}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500">
                            <span className="font-medium">
                              {account.lps?.length || 0} LP{account.lps?.length !== 1 ? 's' : ''}
                            </span>
                            {account.lps && account.lps.length > 0 && (
                              <span className="ml-2 text-xs text-gray-400">
                                ({account.lps.filter(lp => lp.active).length} ativa{account.lps.filter(lp => lp.active).length !== 1 ? 's' : ''})
                              </span>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            {account.lps && account.lps.length > 0 && (
                              <button
                                onClick={() => toggleAccountExpanded(account.id)}
                                className="font-medium text-orange-600 hover:text-orange-900"
                              >
                                {expandedAccounts.has(account.id) ? 'Ocultar' : 'Ver'} LPs
                              </button>
                            )}
                          </td>
                        </tr>

                        {/* Lista expandida de LPs */}
                        {expandedAccounts.has(account.id) && account.lps && account.lps.length > 0 && (
                          <tr>
                            <td colSpan={5} className="px-3 py-0">
                              <div className="my-2 rounded-lg bg-gray-50 p-4">
                                <h4 className="mb-3 text-sm font-medium text-gray-900">
                                  Landing Pages de {account.name}
                                </h4>
                                <div className="space-y-2">
                                  {account.lps.map((lp) => (
                                    <div
                                      key={lp.id}
                                      className="flex items-center justify-between rounded-md border border-gray-200 bg-white p-3"
                                    >
                                      <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                          <span className="text-sm font-medium text-gray-900">
                                            {lp.title}
                                          </span>
                                          <span className="text-xs text-gray-500">/{lp.slug}</span>
                                          {lp.is_homepage && (
                                            <span className="inline-flex items-center rounded bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800">
                                              Homepage
                                            </span>
                                          )}
                                        </div>
                                        {lp.nicho && (
                                          <p className="mt-1 text-xs text-gray-500">
                                            Nicho: {lp.nicho}
                                          </p>
                                        )}
                                      </div>

                                      <div className="flex items-center gap-3">
                                        <a
                                          href={`/${lp.slug}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-xs text-blue-600 hover:text-blue-700"
                                        >
                                          Ver página ↗
                                        </a>

                                        {isSuperAdmin && (
                                          <button
                                            onClick={() => handleToggleLP(lp.id, lp.active)}
                                            disabled={togglingLP === lp.id}
                                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                                              lp.active
                                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                            } ${togglingLP === lp.id ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                                          >
                                            {togglingLP === lp.id ? (
                                              <span className="flex items-center">
                                                <svg className="-ml-1 mr-2 h-3 w-3 animate-spin" fill="none" viewBox="0 0 24 24">
                                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Alterando...
                                              </span>
                                            ) : (
                                              <span>{lp.active ? 'Ativa' : 'Inativa'}</span>
                                            )}
                                          </button>
                                        )}

                                        {!isSuperAdmin && (
                                          <span
                                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                                              lp.active
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                            }`}
                                          >
                                            {lp.active ? 'Ativa' : 'Inativa'}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Legenda de permissões */}
      {!isSuperAdmin && (
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Você tem permissão apenas para visualizar. Entre como super_admin para ativar/inativar LPs.</p>
        </div>
      )}
    </div>
  )
}
