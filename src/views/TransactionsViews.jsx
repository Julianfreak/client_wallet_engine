import { useState, useEffect } from 'react';
import { createTransaction, getTransactions } from '../services/api';

export default function TransactionsView() {
  const [formData, setFormData] = useState({
    fromAccountId: 'A1',
    toAccountId: 'A2',
    amount: ''
  });
  
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  // Función para consultar el historial de transacciones al backend
  const fetchTransactionsHistory = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data || []);
    } catch (err) {
      console.error("Error al cargar historial:", err.message);
    }
  };

  // Cargar el historial al montar el componente en el navegador
  useEffect(() => {
    fetchTransactionsHistory();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: '', message: '' });
    setLoading(true);

    try {
      await createTransaction({
        fromAccountId: formData.fromAccountId,
        toAccountId: formData.toAccountId,
        amount: parseFloat(formData.amount)
      });

      setFeedback({ type: 'success', message: '¡Transferencia procesada con éxito!' });
      setFormData(prev => ({ ...prev, amount: '' }));
      
      // Refrescamos la tabla del historial automáticamente
      await fetchTransactionsHistory();
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      {/* Formulario de Transferencia */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Nueva Transferencia</h2>

        {feedback.message && (
          <div className={`p-3 rounded-lg text-sm mb-4 ${
            feedback.type === 'error' ? 'bg-red-500/10 border border-red-500 text-red-400' : 'bg-green-500/10 border border-green-500 text-green-400'
          }`}>
            {feedback.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Cuenta Origen</label>
              <select 
                name="fromAccountId"
                value={formData.fromAccountId} 
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white text-sm"
              >
                <option value="A1">Cuenta Principal (A1)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Cuenta Destino</label>
              <select 
                name="toAccountId"
                value={formData.toAccountId} 
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white text-sm"
              >
                <option value="A2">Mercado Libre (A2)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Monto (COP)</label>
            <input
              type="number"
              step="0.01"
              name="amount"
              placeholder="0.00"
              value={formData.amount}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Procesando...' : 'Confirmar Transferencia'}
          </button>
        </form>
      </div>

      {/* Tabla del Historial de Movimientos */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Historial de Movimientos</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-gray-900 text-gray-400 uppercase text-xs">
              <tr>
                <th className="p-3">ID Origen</th>
                <th className="p-3">ID Destino</th>
                <th className="p-3">Monto</th>
                <th className="p-3">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {transactions.length > 0 ? (
                transactions.map((tx, index) => (
                  <tr key={index} className="hover:bg-gray-750">
                    <td className="p-3 font-mono text-white">{tx.from_account_id || tx.FromAccountID}</td>
                    <td className="p-3 font-mono text-white">{tx.to_account_id || tx.ToAccountID}</td>
                    <td className="p-3 text-green-400 font-semibold">${tx.amount || tx.Amount}</td>
                    <td className="p-3 text-gray-400">{tx.created_at || tx.CreatedAt || 'Reciente'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">No hay transacciones registradas aún.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}