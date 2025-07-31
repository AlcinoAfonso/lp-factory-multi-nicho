// src/types/database.ts
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
      plans: {
        Row: {
          id: string
          name: string
          max_conversions: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          max_conversions: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          max_conversions?: number
          created_at?: string
          updated_at?: string
        }
      }
      partners: {
        Row: {
          id: string
          name: string
          type: 'agency' | 'influencer' | 'franchise' | 'master'
          parent_id: string | null
          client_id: string | null
          email: string
          status: 'active' | 'inactive' | 'pending'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          type: 'agency' | 'influencer' | 'franchise' | 'master'
          parent_id?: string | null
          client_id?: string | null
          email: string
          status?: 'active' | 'inactive' | 'pending'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: 'agency' | 'influencer' | 'franchise' | 'master'
          parent_id?: string | null
          client_id?: string | null
          email?: string
          status?: 'active' | 'inactive' | 'pending'
          created_at?: string
        }
      }
      accounts: {
        Row: {
          id: string
          name: string
          email: string
          segment: string | null
          plan_id: string
          domain: string | null
          subdomain: string | null
          logo_url: string | null
          palette: Json
          partner_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          segment?: string | null
          plan_id: string
          domain?: string | null
          subdomain?: string | null
          logo_url?: string | null
          palette?: Json
          partner_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          segment?: string | null
          plan_id?: string
          domain?: string | null
          subdomain?: string | null
          logo_url?: string | null
          palette?: Json
          partner_id?: string | null
          created_at?: string
          updated_at?: string
        }
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
          id: string
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
      }
      user_accounts: {
        Row: {
          user_id: string
          account_id: string
          role: 'admin' | 'editor' | 'viewer'
          created_at: string
        }
        Insert: {
          user_id: string
          account_id: string
          role: 'admin' | 'editor' | 'viewer'
          created_at?: string
        }
        Update: {
          user_id?: string
          account_id?: string
          role?: 'admin' | 'editor' | 'viewer'
          created_at?: string
        }
      }
      partner_accounts: {
        Row: {
          partner_id: string
          account_id: string
          commission_percent: number | null
          role: string | null
        }
        Insert: {
          partner_id: string
          account_id: string
          commission_percent?: number | null
          role?: string | null
        }
        Update: {
          partner_id?: string
          account_id?: string
          commission_percent?: number | null
          role?: string | null
        }
      }
      templates: {
        Row: {
          id: string
          name: string
          description: string | null
          category: string | null
          is_premium: boolean
          preview_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          category?: string | null
          is_premium?: boolean
          preview_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          category?: string | null
          is_premium?: boolean
          preview_url?: string | null
          created_at?: string
        }
      }
      lps: {
        Row: {
          id: string
          account_id: string
          slug: string
          title: string
          nicho: string | null
          objetivo: 'tofu' | 'mofu' | 'bofu' | 'generica' | null
          template_id: string | null
          active: boolean
          is_homepage: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          account_id: string
          slug: string
          title: string
          nicho?: string | null
          objetivo?: 'tofu' | 'mofu' | 'bofu' | 'generica' | null
          template_id?: string | null
          active?: boolean
          is_homepage?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          account_id?: string
          slug?: string
          title?: string
          nicho?: string | null
          objetivo?: 'tofu' | 'mofu' | 'bofu' | 'generica' | null
          template_id?: string | null
          active?: boolean
          is_homepage?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      lp_sections: {
        Row: {
          id: string
          lp_id: string
          section_type: string
          order: number
          content_json: Json
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          lp_id: string
          section_type: string
          order: number
          content_json: Json
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          lp_id?: string
          section_type?: string
          order?: number
          content_json?: Json
          active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      tracking_configs: {
        Row: {
          id: string
          account_id: string
          ga4_id: string | null
          meta_pixel_id: string | null
          google_ads_global_tag: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          account_id: string
          ga4_id?: string | null
          meta_pixel_id?: string | null
          google_ads_global_tag?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          account_id?: string
          ga4_id?: string | null
          meta_pixel_id?: string | null
          google_ads_global_tag?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      lp_conversion_tags: {
        Row: {
          id: string
          account_id: string
          lp_id: string
          tag_type: string
          tag_id: string
          event_label: string | null
          event_value: number | null
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          account_id: string
          lp_id: string
          tag_type: string
          tag_id: string
          event_label?: string | null
          event_value?: number | null
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          account_id?: string
          lp_id?: string
          tag_type?: string
          tag_id?: string
          event_label?: string | null
          event_value?: number | null
          active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      conversion_events: {
        Row: {
          id: string
          account_id: string
          lp_id: string
          event_type: string
          value: number | null
          created_at: string
        }
        Insert: {
          id?: string
          account_id: string
          lp_id: string
          event_type: string
          value?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          account_id?: string
          lp_id?: string
          event_type?: string
          value?: number | null
          created_at?: string
        }
      }
      analytics_events: {
        Row: {
          id: string
          account_id: string
          lp_id: string
          event_name: string
          properties: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          account_id: string
          lp_id: string
          event_name: string
          properties?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          account_id?: string
          lp_id?: string
          event_name?: string
          properties?: Json | null
          created_at?: string
        }
      }
    }
  }
}
