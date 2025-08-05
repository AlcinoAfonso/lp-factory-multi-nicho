import { supabase } from '@/lib/supabase'
import type { 
  Database,
  User,
  Account,
  Plan,
  UserAccount,
  LP,
  LPSection,
  Lead,
  Template,
  Tables,
  TablesInsert,
  TablesUpdate,
  LPWithSections,
  LPWithAccount,
  LPWithDetails,
  AccountWithPlan,
  UserWithAccounts,
  ActiveAccountView,
  LeadsDashboardView,
  UserRole,
  AccountStatus,
  LPStatus,
  LeadStatus
} from '@/types/database'

/**
 * Database Service - Centraliza todas as operações do banco
 */
export class DatabaseService {
  // Instância do Supabase
  static supabase = supabase

  // =====================================================
  // USERS - Gestão de usuários
  // =====================================================

  /**
   * Buscar usuário por ID
   */
  static async getUserById(userId: string): Promise<User | null> {
    try {
      const { data, error } = await this.supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Erro ao buscar usuário:', error)
      return null
    }
  }

  /**
   * Buscar usuário por email
   */
  static async getUserByEmail(email: string): Promise<User | null> {
    try {
      const { data, error } = await this.supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Erro ao buscar usuário por email:', error)
      return null
    }
  }

  /**
   * Criar ou atualizar usuário (usado após login)
   */
  static async upsertUser(userData: TablesInsert<'users'>): Promise<User | null> {
    try {
      const { data, error } = await this.supabase
        .from('users')
        .upsert(userData)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Erro ao criar/atualizar usuário:', error)
      return null
    }
  }

  /**
   * Buscar usuário com todas as contas
   */
  static async getUserWithAccounts(userId: string): Promise<UserWithAccounts | null> {
    try {
      const { data, error } = await this.supabase
        .from('users')
        .select(`
          *,
          user_accounts (
            *,
            account:accounts (*)
          )
        `)
        .eq('id', userId)
        .single()

      if (error) throw error
      return data as UserWithAccounts
    } catch (error) {
      console.error('Erro ao buscar usuário com contas:', error)
      return null
    }
  }

  // =====================================================
  // ACCOUNTS - Gestão de contas
  // =====================================================

  /**
   * Buscar conta por ID
   */
  static async getAccountById(accountId: string): Promise<Account | null> {
    try {
      const { data, error } = await this.supabase
        .from('accounts')
        .select('*')
        .eq('id', accountId)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Erro ao buscar conta:', error)
      return null
    }
  }

  /**
   * Buscar conta com plano
   */
  static async getAccountWithPlan(accountId: string): Promise<AccountWithPlan | null> {
    try {
      const { data, error } = await this.supabase
        .from('accounts')
        .select(`
          *,
          plan:plans (*)
        `)
        .eq('id', accountId)
        .single()

      if (error) throw error
      return data as AccountWithPlan
    } catch (error) {
      console.error('Erro ao buscar conta com plano:', error)
      return null
    }
  }

  /**
   * Listar contas ativas (para Admin Dashboard)
   */
  static async getActiveAccounts(): Promise<ActiveAccountView[]> {
    try {
      const { data, error } = await this.supabase
        .from('v_active_accounts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Erro ao buscar contas ativas:', error)
      return []
    }
  }

  /**
   * Criar nova conta
   */
  static async createAccount(accountData: TablesInsert<'accounts'>): Promise<Account | null> {
    try {
      const { data, error } = await this.supabase
        .from('accounts')
        .insert(accountData)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Erro ao criar conta:', error)
      return null
    }
  }

  /**
   * Atualizar conta
   */
  static async updateAccount(accountId: string, updates: TablesUpdate<'accounts'>): Promise<Account | null> {
    try {
      const { data, error } = await this.supabase
        .from('accounts')
        .update(updates)
        .eq('id', accountId)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Erro ao atualizar conta:', error)
      return null
    }
  }

  // =====================================================
  // USER_ACCOUNTS - Relacionamentos usuário-conta
  // =====================================================

  /**
   * Buscar contas do usuário
   */
  static async getUserAccounts(userId: string): Promise<UserAccount[]> {
    try {
      const { data, error } = await this.supabase
        .from('user_accounts')
        .select(`
          *,
          account:accounts (*)
        `)
        .eq('user_id', userId)
        .eq('status', 'active')

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Erro ao buscar contas do usuário:', error)
      return []
    }
  }

  /**
   * Verificar se usuário tem acesso à conta
   */
  static async hasAccountAccess(userId: string, accountId: string): Promise<boolean> {
    try {
      const { data, error } = await this.supabase
        .from('user_accounts')
        .select('id')
        .eq('user_id', userId)
        .eq('account_id', accountId)
        .eq('status', 'active')
        .single()

      if (error) return false
      return !!data
    } catch (error) {
      return false
    }
  }

  /**
   * Buscar role do usuário na conta
   */
  static async getUserRole(userId: string, accountId: string): Promise<UserRole | null> {
    try {
      const { data, error } = await this.supabase
        .from('user_accounts')
        .select('role')
        .eq('user_id', userId)
        .eq('account_id', accountId)
        .eq('status', 'active')
        .single()

      if (error) return null
      return data.role as UserRole
    } catch (error) {
      return null
    }
  }

  // =====================================================
  // LPS - Landing Pages
  // =====================================================

  /**
   * Buscar LP por ID
   */
  static async getLPById(lpId: string): Promise<LP | null> {
    try {
      const { data, error } = await this.supabase
        .from('lps')
        .select('*')
        .eq('id', lpId)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Erro ao buscar LP:', error)
      return null
    }
  }

  /**
   * Buscar LP por slug
   */
  static async getLPBySlug(slug: string): Promise<LPWithDetails | null> {
    try {
      const { data, error } = await this.supabase
        .from('lps')
        .select(`
          *,
          account:accounts (*),
          sections:lp_sections (*),
          template:templates (*)
        `)
        .eq('slug', slug)
        .eq('status', 'published')
        .single()

      if (error) throw error
      
      // Ordenar seções por order_index
      if (data.sections) {
        data.sections.sort((a, b) => a.order_index - b.order_index)
      }

      return data as LPWithDetails
    } catch (error) {
      console.error('Erro ao buscar LP por slug:', error)
      return null
    }
  }

  /**
   * Listar LPs de uma conta
   */
  static async getAccountLPs(accountId: string): Promise<LP[]> {
    try {
      const { data, error } = await this.supabase
        .from('lps')
        .select('*')
        .eq('account_id', accountId)
        .order('updated_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Erro ao buscar LPs da conta:', error)
      return []
    }
  }

  /**
   * Buscar LPs ativas (para homepage)
   */
  static async getActiveLPs(): Promise<LPWithAccount[]> {
    try {
      const { data, error } = await this.supabase
        .from('lps')
        .select(`
          *,
          account:accounts (*)
        `)
        .eq('status', 'published')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data as LPWithAccount[] || []
    } catch (error) {
      console.error('Erro ao buscar LPs ativas:', error)
      return []
    }
  }

  /**
   * Criar nova LP
   */
  static async createLP(lpData: TablesInsert<'lps'>): Promise<LP | null> {
    try {
      const { data, error } = await this.supabase
        .from('lps')
        .insert(lpData)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Erro ao criar LP:', error)
      return null
    }
  }

  /**
   * Atualizar LP
   */
  static async updateLP(lpId: string, updates: TablesUpdate<'lps'>): Promise<LP | null> {
    try {
      const { data, error } = await this.supabase
        .from('lps')
        .update(updates)
        .eq('id', lpId)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Erro ao atualizar LP:', error)
      return null
    }
  }

  /**
   * Definir LP como homepage
   */
  static async setAsHomepage(accountId: string, lpId: string): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .rpc('set_lp_as_homepage', {
          p_account_id: accountId,
          p_lp_id: lpId
        })

      if (error) throw error
      return true
    } catch (error) {
      console.error('Erro ao definir homepage:', error)
      return false
    }
  }

  // =====================================================
  // LP_SECTIONS - Seções das Landing Pages
  // =====================================================

  /**
   * Buscar seções de uma LP
   */
  static async getLPSections(lpId: string): Promise<LPSection[]> {
    try {
      const { data, error } = await this.supabase
        .from('lp_sections')
        .select('*')
        .eq('lp_id', lpId)
        .eq('active', true)
        .order('order_index', { ascending: true })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Erro ao buscar seções da LP:', error)
      return []
    }
  }

  /**
   * Criar seção
   */
  static async createLPSection(sectionData: TablesInsert<'lp_sections'>): Promise<LPSection | null> {
    try {
      const { data, error } = await this.supabase
        .from('lp_sections')
        .insert(sectionData)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Erro ao criar seção:', error)
      return null
    }
  }

  /**
   * Atualizar seção
   */
  static async updateLPSection(sectionId: string, updates: TablesUpdate<'lp_sections'>): Promise<LPSection | null> {
    try {
      const { data, error } = await this.supabase
        .from('lp_sections')
        .update(updates)
        .eq('id', sectionId)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Erro ao atualizar seção:', error)
      return null
    }
  }

  // =====================================================
  // LEADS - Captação de leads
  // =====================================================

  /**
   * Buscar leads de uma conta
   */
  static async getAccountLeads(accountId: string, limit = 50): Promise<Lead[]> {
    try {
      const { data, error } = await this.supabase
        .from('leads')
        .select('*')
        .eq('account_id', accountId)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Erro ao buscar leads da conta:', error)
      return []
    }
  }

  /**
   * Buscar métricas de leads (dashboard)
   */
  static async getLeadsDashboard(accountId: string): Promise<LeadsDashboardView[]> {
    try {
      const { data, error } = await this.supabase
        .from('v_leads_dashboard')
        .select('*')
        .eq('account_id', accountId)
        .order('lead_date', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Erro ao buscar dashboard de leads:', error)
      return []
    }
  }

  /**
   * Criar lead
   */
  static async createLead(leadData: TablesInsert<'leads'>): Promise<Lead | null> {
    try {
      const { data, error } = await this.supabase
        .from('leads')
        .insert(leadData)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Erro ao criar lead:', error)
      return null
    }
  }

  /**
   * Atualizar status do lead
   */
  static async updateLeadStatus(leadId: string, status: LeadStatus): Promise<Lead | null> {
    try {
      const { data, error } = await this.supabase
        .from('leads')
        .update({ status })
        .eq('id', leadId)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Erro ao atualizar status do lead:', error)
      return null
    }
  }

  // =====================================================
  // TEMPLATES - Templates de LP
  // =====================================================

  /**
   * Listar todos os templates
   */
  static async getTemplates(): Promise<Template[]> {
    try {
      const { data, error } = await this.supabase
        .from('templates')
        .select('*')
        .order('name', { ascending: true })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Erro ao buscar templates:', error)
      return []
    }
  }

  /**
   * Listar templates por categoria
   */
  static async getTemplatesByCategory(category: string): Promise<Template[]> {
    try {
      const { data, error } = await this.supabase
        .from('templates')
        .select('*')
        .eq('category', category)
        .order('name', { ascending: true })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Erro ao buscar templates por categoria:', error)
      return []
    }
  }

  /**
   * Buscar template por ID
   */
  static async getTemplateById(templateId: string): Promise<Template | null> {
    try {
      const { data, error } = await this.supabase
        .from('templates')
        .select('*')
        .eq('id', templateId)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Erro ao buscar template:', error)
      return null
    }
  }

  // =====================================================
  // PLANS - Planos comerciais
  // =====================================================

  /**
   * Listar todos os planos
   */
  static async getPlans(): Promise<Plan[]> {
    try {
      const { data, error } = await this.supabase
        .from('plans')
        .select('*')
        .order('price_monthly', { ascending: true })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Erro ao buscar planos:', error)
      return []
    }
  }

  /**
   * Buscar plano por ID
   */
  static async getPlanById(planId: string): Promise<Plan | null> {
    try {
      const { data, error } = await this.supabase
        .from('plans')
        .select('*')
        .eq('id', planId)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Erro ao buscar plano:', error)
      return null
    }
  }

  // =====================================================
  // HELPERS - Funções auxiliares
  // =====================================================

  /**
   * Verificar se usuário é super admin
   */
  static async isSuperAdmin(userId: string): Promise<boolean> {
    try {
      const { data, error } = await this.supabase
        .from('user_accounts')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'super_admin')
        .eq('status', 'active')
        .single()

      if (error) return false
      return !!data
    } catch (error) {
      return false
    }
  }

  /**
   * Buscar usuário logado atual
   */
  static async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user } } = await this.supabase.auth.getUser()
      if (!user) return null

      return await this.getUserById(user.id)
    } catch (error) {
      console.error('Erro ao buscar usuário atual:', error)
      return null
    }
  }

  /**
   * Verificar se slug está disponível
   */
  static async isSlugAvailable(slug: string, accountId: string, excludeLpId?: string): Promise<boolean> {
    try {
      let query = this.supabase
        .from('lps')
        .select('id')
        .eq('slug', slug)
        .eq('account_id', accountId)

      if (excludeLpId) {
        query = query.neq('id', excludeLpId)
      }

      const { data, error } = await query.single()

      if (error && error.code === 'PGRST116') {
        // Nenhum registro encontrado - slug disponível
        return true
      }

      if (error) throw error
      
      // Encontrou registro - slug indisponível
      return false
    } catch (error) {
      console.error('Erro ao verificar slug:', error)
      return false
    }
  }
}
