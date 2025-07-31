'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useClientAuth } from '@/hooks/useClientAuth'
import { DatabaseService } from '@/services/database.service'
import { DeleteLPModal } from '@/components/client/DeleteLPModal'
import type { Database } from '@/types/database'

type LP = Database['public']['Tables']['lps']['Row']

export default function ClientLPsPage() {
  const { account, loading: authLoading } = useClientAuth()
  const [lps, setLps] = useState<LP[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; lp: LP | null }>({
    isOpen: false,
    lp: null,
  })

  useEffect(() => {
    if (account) {
      fetchLPs()
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

  const handleDelete = async (lpId: string) => {
    try {
      await DatabaseService.deleteLP(lpId)
      await fetchLPs()
      setDeleteModal({ isOpen: false, lp: null })
    } catch (error) {
      console.error('Erro ao deletar LP:', error)
      alert('Erro ao deletar Landing Page')
    }
  }

  const handleDuplicate = async (lp: LP) => {
    if (!account) return

    try {
      const newSlug = `${lp.slug}-copia-${Date.now()}`
      const newTitle = `${lp.title} (Cópia)`
      
      await DatabaseService.duplicateLP(lp.id, {
        slug: newSlug,
        title: newTitle,
      })
      
      await fetchLPs()
    } catch (error) {
      console.error('Erro ao duplicar LP:', error)
      alert('Erro ao duplicar Landing Page')
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
            Minhas Landing Pages
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Gerencie todas as suas landing pages em um só lugar
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href="/client/lps/new"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700"
          >
            Nova Landing Page
          </Link>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Título
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      URL
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Homepage
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Criada em
                    </th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Ações</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {lps.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-gray-500">
                        Nenhuma landing page criada ainda.
                      </td>
                    </tr>
                  ) : (
                    lps.map((lp) => (
                      <tr key={lp.id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          {lp.title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <a
                            href={`/${lp.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-600 hover:text-orange-700"
                          >
                            /{lp.slug}
                          </a>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span
                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                              lp.active
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {lp.active ? 'Ativa' : 'Inativa'}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          {lp.is_homepage && (
                            <span className="inline-flex rounded-full bg-orange-100 px-2 text-xs font-semibold leading-5 text-orange-800">
                              Homepage
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(lp.created_at).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link
                            href={`/client/lps/${lp.id}/edit`}
                            className="text-orange-600 hover:text-orange-900 mr-4"
                          >
                            Editar
                          </Link>
                          <button
                            onClick={() => handleDuplicate(lp)}
                            className="text-gray-600 hover:text-gray-900 mr-4"
                          >
                            Duplicar
                          </button>
                          <button
                            onClick={() => setDeleteModal({ isOpen: true, lp })}
                            className="text-red-600 hover:text-red-900"
                          >
                            Excluir
                          </button>
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

      <DeleteLPModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, lp: null })}
        onConfirm={() => deleteModal.lp && handleDelete(deleteModal.lp.id)}
        lpTitle={deleteModal.lp?.title || ''}
      />
    </div>
  )
}

