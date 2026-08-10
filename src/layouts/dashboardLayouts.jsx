export default function DashboardLayout({ children, activeView, setActiveView, onLogout }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Barra de Navegación Superior */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Wallet Engine
          </h1>
          <nav className="hidden md:flex space-x-2">
            <button
              onClick={() => setActiveView('dashboard')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'dashboard' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveView('transactions')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'transactions' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Movimientos
            </button>
          </nav>
        </div>

        <button
          onClick={onLogout}
          className="rounded-lg bg-red-600/20 border border-red-500/30 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-600 hover:text-white transition-colors"
        >
          Cerrar Sesión
        </button>
      </header>

      {/* Contenido Dinámico de la Vista Activa */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        {children}
      </main>
    </div>
  );
}