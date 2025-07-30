import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Página não encontrada
        </h2>
        <p className="text-gray-600 mb-8">
          A landing page que você está procurando não existe ou foi desativada.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  )
}

