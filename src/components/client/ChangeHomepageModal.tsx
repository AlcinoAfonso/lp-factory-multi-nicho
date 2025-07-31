'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import type { Database } from '@/types/database'

type LP = Database['public']['Tables']['lps']['Row']

interface ChangeHomepageModalProps {
  isOpen: boolean
  onClose: () => void
  lps: LP[]
  currentHomepageId: string | null
  onSelectHomepage: (lpId: string) => Promise<void>
}

export function ChangeHomepageModal({
  isOpen,
  onClose,
  lps,
  currentHomepageId,
  onSelectHomepage
}: ChangeHomepageModalProps) {
  const [selectedId, setSelectedId] = useState<string | null>(currentHomepageId)
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    if (!selectedId) return
    
    setLoading(true)
    try {
      await onSelectHomepage(selectedId)
      onClose()
    } catch (error) {
      console.error('Erro ao definir homepage:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Escolher Homepage
                </Dialog.Title>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-4">
                    Selecione qual Landing Page será exibida como página inicial do seu site.
                  </p>
                  
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {lps.map((lp) => (
                      <label
                        key={lp.id}
                        className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedId === lp.id
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="homepage"
                          value={lp.id}
                          checked={selectedId === lp.id}
                          onChange={(e) => setSelectedId(e.target.value)}
                          className="text-orange-600 focus:ring-orange-500"
                        />
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {lp.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            /{lp.slug}
                          </p>
                        </div>
                        {lp.id === currentHomepageId && (
                          <span className="text-xs text-green-600 font-medium">
                            Atual
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex gap-3 justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    onClick={onClose}
                    disabled={loading}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 disabled:opacity-50"
                    onClick={handleConfirm}
                    disabled={!selectedId || loading || selectedId === currentHomepageId}
                  >
                    {loading ? 'Salvando...' : 'Confirmar'}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
