'use client'

import { useEffect, useState } from 'react'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { DatabaseService } from '@/services/database.service'
import type { Database } from '@/types/database'

type AccountWithPlan = Database['public']['Tables']['accounts']['Row'] & {
  plan: Database['public']['Tables']['plans']['Row']
}

export default function AdminDashboard() {
  const { isAdmin, isSuperAdmin } = useAdminAuth()
  const [accounts, setAccounts] = useState<AccountWithPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    fetchAccounts()
  }, [])

  const fetchAccounts = async () => {
    try {
      setLoading(true)
      const data = await DatabaseService.getAccounts()
      setAccounts(data as AccountWithPlan[])
    } catch (error) {
      console.error('Erro ao buscar contas:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleLP = async (accountId: string, lpId: string, currentStatus: boolean) => {
    if (!isSuperAdmin) {
      alert('Apenas super administradores podem alterar o status das LPs')
      return
    }

    try {
      await DatabaseService.updateLP(lpId, { active: !currentStatus })
      // Recarregar dados
      fetchAccounts()
    } catch (error) {
      console.error('Erro ao atualizar LP:', error)
      alert('Erro ao atualizar status da LP')
    }
  }

  const filteredAccounts = accounts.filter(
    account => 
      account.name.toLowerCase().includes(filter.toLowerCase()) ||
      account.email.toLowerCase().includes(filter.toLowerCase())
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
          placeholder="Filtrar por nome ou email..."
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="text-center py-4">
                        Carregando...
                      </td>
                    </tr>
                  ) : filteredAccounts.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-4 text-gray-500">
                        Nenhum cliente encontrado
                      </td>
                    </tr>
                  ) : (
                    filteredAccounts.map((account) => (
                      <tr key={account.id}>
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
                          <div className="text-xs text-gray-400 mb-2">
                            {/* Aqui viria a lista de LPs quando implementarmos a relação */}
                            Em breve: lista de LPs
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

