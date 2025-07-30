'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from './useUser'

interface UseAdminAuthOptions {
  redirectTo?: string
  allowedRoles?: string[]
}

export function useAdminAuth(options: UseAdminAuthOptions = {}) {
  const { 
    redirectTo = '/admin/login',
    allowedRoles = ['admin', 'super_admin']
  } = options
  
  const router = useRouter()
  const { userData, loading, hasRole } = useUser()

  useEffect(() => {
    if (loading) return

    // Se não estiver autenticado, redirecionar
    if (!userData) {
      router.push(redirectTo)
      return
    }

    // Verificar se tem algum dos roles permitidos
    const hasAllowedRole = allowedRoles.some(role => hasRole(role))
    
    if (!hasAllowedRole) {
      // Usuário autenticado mas sem permissão
      router.push('/unauthorized')
    }
  }, [userData, loading, hasRole, router, redirectTo, allowedRoles])

  return {
    isAdmin: hasRole('admin') || hasRole('super_admin'),
    isSuperAdmin: hasRole('super_admin'),
    loading,
  }
}
