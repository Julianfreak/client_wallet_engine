export default function DashboardView() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Resumen de Cuenta</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
          <p className="text-sm text-gray-400">Saldo Disponible</p>
          <p className="text-3xl font-extrabold text-white mt-2">$0.00 COP</p>
        </div>
      </div>
    </div>
  );
}