// src/app/[slug]/page.tsx

import { notFound } from 'next/navigation'
import { DatabaseService } from '@/services/database.service'
import { RenderSection } from '@/components/RenderSection'
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

  return (
    <div className="min-h-screen">
      {lp.sections
        .filter((section: any) => section.active)
        .sort((a: any, b: any) => a.order - b.order)
        .map((section: any) => (
          <RenderSection
            key={section.id}
            section={section}
            accountData={lp.account}
          />
        ))}
    </div>
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
