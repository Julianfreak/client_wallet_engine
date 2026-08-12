import { useState, useEffect } from 'react';
import { getDashboardData, getTransactions } from '../services/api';

export default function DashboardView() {
  const [balance, setBalance] = useState(0.00);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        // Simulamos o cargamos los datos reales desde la API
        const dashboardData = await getDashboardData().catch(() => ({ balance: 0.00 }));
        const historyData = await getTransactions().catch(() => []);

        setBalance(dashboardData.balance || 0.00);
        setTransactions(Array.isArray(historyData) ? historyData : []);
      } catch (err) {
        setError('Error al sincronizar los datos de la cuenta.');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return <div className="text-gray-400 text-center py-10">Cargando información financiera...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Resumen de Cuenta</h2>

      {error && (
        <div className="bg-red-500/10 border border-red-500 p-3 rounded-lg text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Tarjeta de Saldo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
          <p className="text-sm text-gray-400">Saldo Disponible</p>
          <p className="text-3xl font-extrabold text-white mt-2">
            ${Number(balance).toLocaleString('es-CO', { minimumFractionDigits: 2 })} COP
          </p>
        </div>
      </div>

      {/* Historial de Movimientos Recientes */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-4">Últimos Movimientos</h3>
        
        {transactions.length === 0 ? (
          <p className="text-gray-400 text-sm">Aún no registras movimientos en tu billetera.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="border-b border-gray-700 text-xs uppercase text-gray-400">
                <tr>
                  <th className="py-3 px-4">Tipo</th>
                  <th className="py-3 px-4">Descripción</th>
                  <th className="py-3 px-4">Monto</th>
                  <th className="py-3 px-4">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, index) => (
                  <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/20">
                    <td className="py-3 px-4 font-medium text-white capitalize">{tx.type}</td>
                    <td className="py-3 px-4">{tx.description || 'Sin descripción'}</td>
                    <td className={`py-3 px-4 font-semibold ${tx.type === 'deposit' ? 'text-green-400' : 'text-red-400'}`}>
                      {tx.type === 'deposit' ? '+' : '-'}${Number(tx.amount).toLocaleString('es-CO', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4 text-gray-400">{new Date(tx.created_at || Date.now()).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}