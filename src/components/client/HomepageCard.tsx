'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Database } from '@/types/database'

type LP = Database['public']['Tables']['lps']['Row']

interface HomepageCardProps {
  currentHomepage: LP | null
  onChangeHomepage: () => void
}

export function HomepageCard({ currentHomepage, onChangeHomepage }: HomepageCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow-lg rounded-lg border-2 border-orange-500">
      <div className="px-6 py-4 bg-orange-50">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <span className="text-2xl">🏠</span>
          Sua Homepage Atual
        </h3>
      </div>
      
      <div className="p-6">
        {currentHomepage ? (
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-xl font-semibold text-gray-900">
                  {currentHomepage.title}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  /{currentHomepage.slug}
                </p>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Homepage Ativa
              </span>
            </div>
            
            <div className="flex gap-3">
              <Link
                href={`/${currentHomepage.slug}`}
                target="_blank"
                className="text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                Ver página →
              </Link>
              <button
                onClick={onChangeHomepage}
                className="text-sm text-gray-600 hover:text-gray-700 font-medium"
              >
                Alterar homepage
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">
              Nenhuma homepage definida
            </p>
            <button
              onClick={onChangeHomepage}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
            >
              Definir Homepage
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
