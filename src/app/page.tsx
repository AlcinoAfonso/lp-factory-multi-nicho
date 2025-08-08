export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          LP Factory
        </h1>
        <p className="text-gray-600 mb-8">
          Sistema de Acesso v2 - Em desenvolvimento
        </p>
        <div className="space-y-4">
          <a
            href="/auth/login"
            className="block w-full px-6 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
          >
            Acessar Sistema
          </a>
        </div>
      </div>
    </div>
  )
}

