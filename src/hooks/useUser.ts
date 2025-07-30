'use client'

import { useEffect, useState } from 'react'
import { useAuth } from './useAuth'
import { DatabaseService } from '@/services/database.service'
import type { Database } from '@/types/database'

type UserWithAccounts = Database['public']['Tables']['users']['Row'] & {
  accounts: Array<{
    account: Database['public']['Tables']['accounts']['Row']
    role: string
  }>
}

interface UserState {
  userData: UserWithAccounts | null
  loading: boolean
  error: Error | null
}

export function useUser() {
  const { user, isAuthenticated } = useAuth()
  const [userState, setUserState] = useState<UserState>({
    userData: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setUserState({
        userData: null,
        loading: false,
        error: null,
      })
      return
    }

    const fetchUserData = async () => {
      try {
        const userData = await DatabaseService.getCurrentUser()
        
        if (!userData) {
          throw new Error('Usuário não encontrado')
        }

        setUserState({
          userData: userData as UserWithAccounts,
          loading: false,
          error: null,
        })
      } catch (error) {
        setUserState({
          userData: null,
          loading: false,
          error: error as Error,
        })
      }
    }

    fetchUserData()
  }, [user, isAuthenticated])

  return {
    ...userState,
    accounts: userState.userData?.accounts || [],
    hasRole: (role: string, accountId?: string) => {
      if (!userState.userData) return false
      
      if (accountId) {
        const account = userState.userData.accounts.find(
          acc => acc.account.id === accountId
        )
        return account?.role === role
      }
      
      return userState.userData.accounts.some(acc => acc.role === role)
    },
  }
}
