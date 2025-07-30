export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">403</h1>
        <p className="text-xl text-gray-600 mb-8">
          Você não tem permissão para acessar esta página
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700"
        >
          Voltar ao início
        </a>
      </div>
    </div>
  )
}
