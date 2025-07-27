export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      plans: {
        Row: {
          id: string;
          name: string;
          max_conversions: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          max_conversions: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          max_conversions?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      clients: {
        Row: {
          id: string;
          name: string;
          plan_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          plan_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          plan_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          client_id: string;
          email: string;
          role: 'super_admin' | 'admin' | 'client';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          email: string;
          role: 'super_admin' | 'admin' | 'client';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          client_id?: string;
          email?: string;
          role?: 'super_admin' | 'admin' | 'client';
          created_at?: string;
          updated_at?: string;
        };
      };
      lps: {
        Row: {
          id: string;
          client_id: string;
          slug: string;
          title: string;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          slug: string;
          title: string;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          client_id?: string;
          slug?: string;
          title?: string;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      lp_sections: {
        Row: {
          id: string;
          lp_id: string;
          type: string;
          content_json: Json;
          order: number;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          lp_id: string;
          type: string;
          content_json: Json;
          order: number;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          lp_id?: string;
          type?: string;
          content_json?: Json;
          order?: number;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      tracking_configs: {
        Row: {
          id: string;
          client_id: string;
          ga4_id: string | null;
          meta_pixel_id: string | null;
          google_ads_global_tag: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          ga4_id?: string | null;
          meta_pixel_id?: string | null;
          google_ads_global_tag?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          client_id?: string;
          ga4_id?: string | null;
          meta_pixel_id?: string | null;
          google_ads_global_tag?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      lp_conversion_tags: {
        Row: {
          id: string;
          client_id: string;
          lp_id: string;
          tag_type: string;
          tag_id: string;
          event_label: string | null;
          event_value: number | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          lp_id: string;
          tag_type: string;
          tag_id: string;
          event_label?: string | null;
          event_value?: number | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          client_id?: string;
          lp_id?: string;
          tag_type?: string;
          tag_id?: string;
          event_label?: string | null;
          event_value?: number | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      conversion_events: {
        Row: {
          id: string;
          client_id: string;
          lp_id: string;
          event_type: string;
          value: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          lp_id: string;
          event_type: string;
          value?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          client_id?: string;
          lp_id?: string;
          event_type?: string;
          value?: number | null;
          created_at?: string;
        };
      };
    };
  };
}
