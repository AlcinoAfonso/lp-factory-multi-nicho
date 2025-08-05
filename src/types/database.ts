export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      accounts: {
        Row: {
          id: string
          name: string
          email: string
          domain: string | null
          subdomain: string | null
          plan_id: string | null
          owner_user_id: string | null
          data_region: string | null
          branding_config: Json | null
          settings: Json | null
          status: string | null
          trial_ends_at: string | null
          last_active_at: string | null
          monthly_leads_count: number | null
          monthly_pageviews_count: number | null
          storage_used_mb: number | null
          last_quota_reset: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          domain?: string | null
          subdomain?: string | null
          plan_id?: string | null
          owner_user_id?: string | null
          data_region?: string | null
          branding_config?: Json | null
          settings?: Json | null
          status?: string | null
          trial_ends_at?: string | null
          last_active_at?: string | null
          monthly_leads_count?: number | null
          monthly_pageviews_count?: number | null
          storage_used_mb?: number | null
          last_quota_reset?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          domain?: string | null
          subdomain?: string | null
          plan_id?: string | null
          owner_user_id?: string | null
          data_region?: string | null
          branding_config?: Json | null
          settings?: Json | null
          status?: string | null
          trial_ends_at?: string | null
          last_active_at?: string | null
          monthly_leads_count?: number | null
          monthly_pageviews_count?: number | null
          storage_used_mb?: number | null
          last_quota_reset?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "accounts_owner_user_id_fkey"
            columns: ["owner_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accounts_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          }
        ]
      }
      leads: {
        Row: {
          id: string
          lp_id: string
          account_id: string
          form_data: Json
          source_info: Json | null
          status: string | null
          email: string | null
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          lp_id: string
          account_id: string
          form_data?: Json
          source_info?: Json | null
          status?: string | null
          email?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          lp_id?: string
          account_id?: string
          form_data?: Json
          source_info?: Json | null
          status?: string | null
          email?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_lp_id_fkey"
            columns: ["lp_id"]
            isOneToOne: false
            referencedRelation: "lps"
            referencedColumns: ["id"]
          }
        ]
      }
      lp_sections: {
        Row: {
          id: string
          lp_id: string
          section_type: string
          order_index: number
          content_json: Json
          active: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          lp_id: string
          section_type: string
          order_index: number
          content_json?: Json
          active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          lp_id?: string
          section_type?: string
          order_index?: number
          content_json?: Json
          active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lp_sections_lp_id_fkey"
            columns: ["lp_id"]
            isOneToOne: false
            referencedRelation: "lps"
            referencedColumns: ["id"]
          }
        ]
      }
      lps: {
        Row: {
          id: string
          account_id: string
          title: string
          slug: string
          template_id: string | null
          nicho: string | null
          objetivo: string | null
          status: string | null
          is_homepage: boolean | null
          variant: string | null
          conversion_rate: number | null
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          account_id: string
          title: string
          slug: string
          template_id?: string | null
          nicho?: string | null
          objetivo?: string | null
          status?: string | null
          is_homepage?: boolean | null
          variant?: string | null
          conversion_rate?: number | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          account_id?: string
          title?: string
          slug?: string
          template_id?: string | null
          nicho?: string | null
          objetivo?: string | null
          status?: string | null
          is_homepage?: boolean | null
          variant?: string | null
          conversion_rate?: number | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lps_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lps_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          }
        ]
      }
      plans: {
        Row: {
          id: string
          name: string
          max_lps: number | null
          max_conversions: number | null
          price_monthly: number | null
          features: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          max_lps?: number | null
          max_conversions?: number | null
          price_monthly?: number | null
          features?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          max_lps?: number | null
          max_conversions?: number | null
          price_monthly?: number | null
          features?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      templates: {
        Row: {
          id: string
          name: string
          description: string | null
          category: string
          is_premium: boolean | null
          preview_url: string | null
          sections_config: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          category: string
          is_premium?: boolean | null
          preview_url?: string | null
          sections_config?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          category?: string
          is_premium?: boolean | null
          preview_url?: string | null
          sections_config?: Json | null
          created_at?: string
        }
        Relationships: []
      }
      user_accounts: {
        Row: {
          id: string
          user_id: string
          account_id: string
          role: string
          permissions: Json | null
          status: string
          invited_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          account_id: string
          role: string
          permissions?: Json | null
          status?: string
          invited_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          account_id?: string
          role?: string
          permissions?: Json | null
          status?: string
          invited_by?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_accounts_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_accounts_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          id: string
          name: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string // UUID deve ser fornecido (vem do Supabase Auth)
          name: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      v_active_accounts: {
        Row: {
          id: string
          name: string
          email: string
          domain: string | null
          subdomain: string | null
          plan_id: string | null
          owner_user_id: string | null
          data_region: string | null
          branding_config: Json | null
          settings: Json | null
          status: string | null
          trial_ends_at: string | null
          last_active_at: string | null
          monthly_leads_count: number | null
          monthly_pageviews_count: number | null
          storage_used_mb: number | null
          last_quota_reset: string | null
          created_at: string
          updated_at: string
          plan_name: string | null
          owner_name: string | null
          owner_email: string | null
          total_lps: number | null
          published_lps: number | null
          total_leads: number | null
          leads_last_30_days: number | null
        }
        Relationships: []
      }
      v_leads_dashboard: {
        Row: {
          account_id: string
          lp_title: string
          lp_slug: string
          total_leads: number | null
          new_leads: number | null
          contacted_leads: number | null
          qualified_leads: number | null
          converted_leads: number | null
          lead_date: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      set_lp_as_homepage: {
        Args: {
          p_account_id: string
          p_lp_id: string
        }
        Returns: undefined
      }
    }
    Enums: {}
    CompositeTypes: {}
  }
}

// Tipos auxiliares para facilitar o uso
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
export type Views<T extends keyof Database['public']['Views']> = Database['public']['Views'][T]['Row']

// Tipos específicos mais usados
export type User = Tables<'users'>
export type Account = Tables<'accounts'>
export type Plan = Tables<'plans'>
export type UserAccount = Tables<'user_accounts'>
export type LP = Tables<'lps'>
export type LPSection = Tables<'lp_sections'>
export type Lead = Tables<'leads'>
export type Template = Tables<'templates'>

// Tipos para as views
export type ActiveAccountView = Views<'v_active_accounts'>
export type LeadsDashboardView = Views<'v_leads_dashboard'>

// Tipos para relacionamentos complexos
export type LPWithSections = LP & {
  sections: LPSection[]
}

export type LPWithAccount = LP & {
  account: Account
}

export type LPWithDetails = LP & {
  account: Account
  sections: LPSection[]
  template?: Template
}

export type AccountWithPlan = Account & {
  plan: Plan | null
}

export type UserWithAccounts = User & {
  user_accounts: (UserAccount & {
    account: Account
  })[]
}

// Enums para valores específicos
export type UserRole = 'super_admin' | 'account_admin' | 'editor' | 'viewer'
export type AccountStatus = 'active' | 'suspended' | 'canceled' | 'trial'
export type LPStatus = 'draft' | 'published' | 'archived'
export type LPObjective = 'tofu' | 'mofu' | 'bofu' | 'generica'
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted'
