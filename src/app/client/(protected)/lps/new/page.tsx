'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useClientAuth } from '@/hooks/useClientAuth'
import { DatabaseService } from '@/services/database.service'

export default function NewLPPage() {
  const router = useRouter()
  const { account } = useClientAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    nicho: '',
    objetivo: 'generica' as 'tofu' | 'mofu' | 'bofu' | 'generica',
  })

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!account) return

    setLoading(true)
    try {
      await DatabaseService.createLP({
        account_id: account.id,
        ...formData,
      })
      router.push('/client/lps')
    } catch (error: any) {
      console.error('Erro ao criar LP:', error)
      if (error.message?.includes('duplicate key')) {
        alert('Já existe uma LP com esse slug. Por favor, escolha outro.')
      } else {
        alert('Erro ao criar Landing Page')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-0">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Nova Landing Page
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
            onChange={handleTitleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
            placeholder="Ex: Clínica Odontológica Sorriso"
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
              placeholder="clinica-sorriso"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            URL amigável para sua landing page
          </p>
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
            placeholder="Ex: Saúde, Beleza, Educação"
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
            {loading ? 'Criando...' : 'Criar Landing Page'}
          </button>
        </div>
      </form>
    </div>
  )
}

