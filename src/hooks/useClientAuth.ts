'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from './useUser'

interface UseClientAuthOptions {
  redirectTo?: string
  accountId?: string
}

export function useClientAuth(options: UseClientAuthOptions = {}) {
  const { redirectTo = '/client/login', accountId } = options
  const router = useRouter()
  const { userData, loading, hasRole, accounts } = useUser()

  useEffect(() => {
    if (loading) return

    // Se não estiver autenticado, redirecionar
    if (!userData) {
      router.push(redirectTo)
      return
    }

    // Se foi especificado um accountId, verificar se tem acesso
    if (accountId) {
      const hasAccess = accounts.some(acc => acc.account.id === accountId)
      if (!hasAccess) {
        router.push('/unauthorized')
      }
    }
  }, [userData, loading, accounts, router, redirectTo, accountId])

  // Retornar conta atual se especificada
  const currentAccount = accountId 
    ? accounts.find(acc => acc.account.id === accountId)?.account
    : accounts[0]?.account

  return {
    account: currentAccount,
    accounts,
    loading,
    hasRole: (role: string) => hasRole(role, accountId),
  }
}
