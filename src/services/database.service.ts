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

  // Clients
  async getClients() {
    const { data, error } = await supabase
      .from('clients')
      .select(`
        *,
        plan:plans(*)
      `);

    if (error) throw error;
    return data;
  },

  async getClientById(id: string) {
    const { data, error } = await supabase
      .from('clients')
      .select(`
        *,
        plan:plans(*),
        lps(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // LPs
  async getLPsByClient(clientId: string) {
    const { data, error } = await supabase
      .from('lps')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getLPBySlug(slug: string) {
    const { data, error } = await supabase
      .from('lps')
      .select(`
        *,
        sections:lp_sections(*)
      `)
      .eq('slug', slug)
      .eq('active', true)
      .single();

    if (error) throw error;
    return data;
  },

  async updateLPStatus(lpId: string, active: boolean) {
    const { data, error } = await supabase
      .from('lps')
      .update({ active })
      .eq('id', lpId);

    if (error) throw error;
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

  async updateLPSection(sectionId: string, contentJson: any) {
    const { data, error } = await supabase
      .from('lp_sections')
      .update({ content_json: contentJson })
      .eq('id', sectionId);

    if (error) throw error;
    return data;
  },

  // Tracking
  async getTrackingConfig(clientId: string) {
    const { data, error } = await supabase
      .from('tracking_configs')
      .select('*')
      .eq('client_id', clientId)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // Ignora erro se não existir
    return data;
  },

  async saveTrackingConfig(clientId: string, config: any) {
    const { data, error } = await supabase
      .from('tracking_configs')
      .upsert({
        client_id: clientId,
        ...config,
      });

    if (error) throw error;
    return data;
  },

  // Conversions
  async trackConversion(
    clientId: string,
    lpId: string,
    eventType: string,
    value?: number,
  ) {
    const { data, error } = await supabase
      .from('conversion_events')
      .insert({
        client_id: clientId,
        lp_id: lpId,
        event_type: eventType,
        value,
      });

    if (error) throw error;
    return data;
  },

  async getConversionStats(
    clientId: string,
    startDate?: Date,
    endDate?: Date,
  ) {
    let query = supabase
      .from('conversion_events')
      .select('*')
      .eq('client_id', clientId);

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
};
