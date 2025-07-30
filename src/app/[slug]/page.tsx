import { notFound } from 'next/navigation'
import { DatabaseService } from '@/services/database.service'
import { RenderSection } from '@/components/RenderSection'
import { TrackingHead } from '@/components/TrackingHead'
import type { Database } from '@/types/database'

type LPWithDetails = Database['public']['Tables']['lps']['Row'] & {
  account: Database['public']['Tables']['accounts']['Row']
  sections: Database['public']['Tables']['lp_sections']['Row'][]
}

interface PageProps {
  params: {
    slug: string
  }
}

export default async function LandingPage({ params }: PageProps) {
  const lp = await getLPBySlug(params.slug)

  if (!lp) {
    notFound()
  }

  // Buscar configurações de tracking
  const trackingConfig = await DatabaseService.getTrackingConfig(lp.account_id)
  const conversionTags = await DatabaseService.getConversionTags(lp.id)

  return (
    <>
      <TrackingHead
        trackingConfig={trackingConfig}
        conversionTags={conversionTags}
        lpData={lp}
      />
      
      <div className="min-h-screen">
        {lp.sections
          .filter(section => section.active)
          .sort((a, b) => a.order - b.order)
          .map((section) => (
            <RenderSection
              key={section.id}
              section={section}
              accountData={lp.account}
            />
          ))}
      </div>
    </>
  )
}

// Função para buscar LP por slug
async function getLPBySlug(slug: string): Promise<LPWithDetails | null> {
  try {
    const { data, error } = await DatabaseService.supabase
      .from('lps')
      .select(`
        *,
        account:accounts(*),
        sections:lp_sections(*)
      `)
      .eq('slug', slug)
      .eq('active', true)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Erro ao buscar LP:', error)
    return null
  }
}

// Gerar metadados dinâmicos
export async function generateMetadata({ params }: PageProps) {
  const lp = await getLPBySlug(params.slug)

  if (!lp) {
    return {
      title: 'Página não encontrada',
    }
  }

  return {
    title: lp.title,
    description: `${lp.title} - ${lp.account.name}`,
  }
}
