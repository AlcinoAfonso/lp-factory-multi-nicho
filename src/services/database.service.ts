import { supabase } from '@/lib/supabase';

export const DatabaseService = {
  // Plans
  async getPlans() {
    const { data, error } = await supabase
      .from('plans')
      .select('*')
      .order('max_conversions');
    
    if (error) throw error;
    return data;
  },

  // Accounts
  async getAccounts() {
    const { data, error } = await supabase
      .from('accounts')
      .select(`
        *,
        plan:plans(*),
        partner:partners(*)
      `);
    
    if (error) throw error;
    return data;
  },

  async getAccountById(id: string) {
    const { data, error } = await supabase
      .from('accounts')
      .select(`
        *,
        plan:plans(*),
        lps(*),
        users:user_accounts(
          user:users(*)
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Users & Auth
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        accounts:user_accounts(
          account:accounts(*),
          role
        )
      `)
      .eq('id', user.id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async createUser(userId: string, name: string, email: string) {
    const { data, error } = await supabase
      .from('users')
      .insert({
        id: userId,
        name,
        email
      });
    
    if (error) throw error;
    return data;
  },

  // LPs
  async getLPsByAccount(accountId: string) {
    const { data, error } = await supabase
      .from('lps')
      .select(`
        *,
        template:templates(*)
      `)
      .eq('account_id', accountId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getLPBySlug(slug: string) {
    const { data, error } = await supabase
      .from('lps')
      .select(`
        *,
        account:accounts(*),
        sections:lp_sections(*),
        template:templates(*)
      `)
      .eq('slug', slug)
      .eq('active', true)
      .single();
    
    if (error) throw error;
    return data;
  },

  async getLPById(id: string) {
    const { data, error } = await supabase
      .from('lps')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async deleteLP(id: string) {
    const { error } = await supabase
      .from('lps')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async duplicateLP(originalId: string, newData: { slug: string; title: string }) {
    const { data: originalLP, error: lpError } = await supabase
      .from('lps')
      .select(`
        *,
        sections:lp_sections(*)
      `)
      .eq('id', originalId)
      .single();

    if (lpError) throw lpError;

    const { data: newLP, error: createError } = await supabase
      .from('lps')
      .insert({
        account_id: originalLP.account_id,
        slug: newData.slug,
        title: newData.title,
        nicho: originalLP.nicho,
        objetivo: originalLP.objetivo,
        template_id: originalLP.template_id,
        active: false,
        is_homepage: false,
      })
      .select()
      .single();

    if (createError) throw createError;

    if (originalLP.sections && originalLP.sections.length > 0) {
      const newSections = originalLP.sections.map((section: any) => ({
        lp_id: newLP.id,
        section_type: section.section_type,
        order: section.order,
        content_json: section.content_json,
        active: section.active,
      }));

      const { error: sectionsError } = await supabase
        .from('lp_sections')
        .insert(newSections);

      if (sectionsError) throw sectionsError;
    }

    return newLP;
  },

  async createLP(lp: {
    account_id: string;
    slug: string;
    title: string;
    nicho?: string;
    objetivo?: string;
    template_id?: string;
  }) {
    const { data, error } = await supabase
      .from('lps')
      .insert(lp)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateLP(id: string, updates: Partial<{
    title: string;
    nicho: string;
    objetivo: string;
    active: boolean;
  }>) {
    const { data, error } = await supabase
      .from('lps')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async setLPAsHomepage(accountId: string, lpId: string) {
    const { error } = await supabase.rpc('set_lp_as_homepage', {
      p_account_id: accountId,
      p_lp_id: lpId,
    });

    if (error) throw error;
    return { success: true };
  },

  async getHomepageLP(accountId: string) {
    const { data, error } = await supabase
      .from('lps')
      .select('*')
      .eq('account_id', accountId)
      .eq('is_homepage', true)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  // LP Sections
  async getLPSections(lpId: string) {
    const { data, error } = await supabase
      .from('lp_sections')
      .select('*')
      .eq('lp_id', lpId)
      .eq('active', true)
      .order('order');
    
    if (error) throw error;
    return data;
  },

  async createLPSection(section: {
    lp_id: string;
    section_type: string;
    order: number;
    content_json: any;
  }) {
    const { data, error } = await supabase
      .from('lp_sections')
      .insert(section)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateLPSection(id: string, contentJson: any) {
    const { data, error } = await supabase
      .from('lp_sections')
      .update({ content_json: contentJson })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateSectionOrder(sectionId: string, newOrder: number) {
    const { error } = await supabase
      .from('lp_sections')
      .update({ order: newOrder })
      .eq('id', sectionId);

    if (error) throw error;
  },

  async toggleSectionActive(sectionId: string, active: boolean) {
    const { error } = await supabase
      .from('lp_sections')
      .update({ active })
      .eq('id', sectionId);

    if (error) throw error;
  },

  // Templates
  async getTemplates() {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data;
  },

  async getTemplatesByCategory(category: string) {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('category', category)
      .order('name');
    
    if (error) throw error;
    return data;
  },

  // Tracking
  async getTrackingConfig(accountId: string) {
    const { data, error } = await supabase
      .from('tracking_configs')
      .select('*')
      .eq('account_id', accountId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async upsertTrackingConfig(accountId: string, config: {
    ga4_id?: string;
    meta_pixel_id?: string;
    google_ads_global_tag?: string;
  }) {
    const { data, error } = await supabase
      .from('tracking_configs')
      .upsert({
        account_id: accountId,
        ...config
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Conversion Tags
  async getConversionTags(lpId: string) {
    const { data, error } = await supabase
      .from('lp_conversion_tags')
      .select('*')
      .eq('lp_id', lpId)
      .eq('active', true);
    
    if (error) throw error;
    return data;
  },

  async createConversionTag(tag: {
    account_id: string;
    lp_id: string;
    tag_type: string;
    tag_id: string;
    event_label?: string;
    event_value?: number;
  }) {
    const { data, error } = await supabase
      .from('lp_conversion_tags')
      .insert(tag)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Events & Analytics
  async trackConversion(event: {
    account_id: string;
    lp_id: string;
    event_type: string;
    value?: number;
  }) {
    const { data, error } = await supabase
      .from('conversion_events')
      .insert(event);
    
    if (error) throw error;
    return data;
  },

  async trackAnalytics(event: {
    account_id: string;
    lp_id: string;
    event_name: string;
    properties?: any;
  }) {
    const { data, error } = await supabase
      .from('analytics_events')
      .insert(event);
    
    if (error) throw error;
    return data;
  },

  async getConversionStats(accountId: string, startDate?: Date, endDate?: Date) {
    let query = supabase
      .from('conversion_events')
      .select('*')
      .eq('account_id', accountId);
    
    if (startDate) {
      query = query.gte('created_at', startDate.toISOString());
    }
    
    if (endDate) {
      query = query.lte('created_at', endDate.toISOString());
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data;
  },

  async getAnalytics(accountId: string, lpId?: string, startDate?: Date, endDate?: Date) {
    let query = supabase
      .from('analytics_events')
      .select('*')
      .eq('account_id', accountId);
    
    if (lpId) {
      query = query.eq('lp_id', lpId);
    }
    
    if (startDate) {
      query = query.gte('created_at', startDate.toISOString());
    }
    
    if (endDate) {
      query = query.lte('created_at', endDate.toISOString());
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data;
  },

  // Partners
  async getPartnerAccounts(partnerId: string) {
    const { data, error } = await supabase
      .from('partner_accounts')
      .select(`
        *,
        account:accounts(*)
      `)
      .eq('partner_id', partnerId);

    if (error) throw error;
    return data;
  },

  // Expor cliente Supabase
  supabase,
};
