const SUPER_ADMIN_ID = 'ce899cd2-5360-478e-817e-ee36900abecd'

export function isSuperAdmin(userId: string) {
  return userId === SUPER_ADMIN_ID
}
