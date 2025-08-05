// src/app/[slug]/page.tsx

import { notFound } from 'next/navigation'
import { DatabaseService } from '@/services/database.service'
import { RenderSection } from '@/components/RenderSection'
import type { LPWithDetails } from '@/types/database'

interface PageProps {
  params: {
    slug: string
  }
}

export default async function LandingPage({ params }: PageProps) {
  // Usar o método do DatabaseService
  const lp = await DatabaseService.getLPBySlug(params.slug)

  if (!lp) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {lp.sections
        ?.filter((section) => section.active)
        .sort((a, b) => a.order_index - b.order_index)
        .map((section) => (
          <RenderSection
            key={section.id}
            section={section}
            accountData={lp.account}
          />
        ))}
    </div>
  )
}

// Gerar metadados dinâmicos
export async function generateMetadata({ params }: PageProps) {
  const lp = await DatabaseService.getLPBySlug(params.slug)

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
