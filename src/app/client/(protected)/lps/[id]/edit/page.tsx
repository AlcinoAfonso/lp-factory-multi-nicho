'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useClientAuth } from '@/hooks/useClientAuth'
import { DatabaseService } from '@/services/database.service'
import type { Database } from '@/types/database'

type LP = Database['public']['Tables']['lps']['Row']

export default function EditLPPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { account } = useClientAuth()
  const [loading, setLoading] = useState(false)
  const [lp, setLp] = useState<LP | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    nicho: '',
    objetivo: 'generica' as 'tofu' | 'mofu' | 'bofu' | 'generica',
    active: true,
  })

  useEffect(() => {
    fetchLP()
  }, [params.id])

  const fetchLP = async () => {
    try {
      const data = await DatabaseService.getLPById(params.id)
      if (data) {
        setLp(data)
        setFormData({
          title: data.title,
          slug: data.slug,
          nicho: data.nicho || '',
          objetivo: data.objetivo || 'generica',
          active: data.active,
        })
      }
    } catch (error) {
      console.error('Erro ao buscar LP:', error)
      router.push('/client/lps')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!account || !lp) return

    setLoading(true)
    try {
      await DatabaseService.updateLP(params.id, formData)
      router.push('/client/lps')
    } catch (error: any) {
      console.error('Erro ao atualizar LP:', error)
      if (error.message?.includes('duplicate key')) {
        alert('Já existe uma LP com esse slug. Por favor, escolha outro.')
      } else {
        alert('Erro ao atualizar Landing Page')
      }
    } finally {
      setLoading(false)
    }
  }

  if (!lp) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Carregando...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-0">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Editar Landing Page
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Título *
          </label>
          <input
            type="text"
            id="title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
            URL (slug) *
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
              /
            </span>
            <input
              type="text"
              id="slug"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="nicho" className="block text-sm font-medium text-gray-700">
            Nicho
          </label>
          <input
            type="text"
            id="nicho"
            value={formData.nicho}
            onChange={(e) => setFormData({ ...formData, nicho: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="objetivo" className="block text-sm font-medium text-gray-700">
            Objetivo do Funil
          </label>
          <select
            id="objetivo"
            value={formData.objetivo}
            onChange={(e) => setFormData({ ...formData, objetivo: e.target.value as any })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
          >
            <option value="generica">Genérica</option>
            <option value="tofu">TOFU - Topo do Funil</option>
            <option value="mofu">MOFU - Meio do Funil</option>
            <option value="bofu">BOFU - Fundo do Funil</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="active"
            checked={formData.active}
            onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
          />
          <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
            Landing Page ativa
          </label>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push('/client/lps')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md shadow-sm hover:bg-orange-700 disabled:opacity-50"
          >
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </div>
  )
}

