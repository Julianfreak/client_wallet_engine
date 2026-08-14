import { useState, useEffect } from 'react';
import { createTransaction } from '../services/api';

export default function TransactionsView() {
  // 1. Estado estructurado y controlado profesionalmente
  const [formData, setFormData] = useState({
    fromAccountId: 'A1', // Idealmente cargado dinámicamente de las cuentas del usuario
    toAccountId: 'A2',
    amount: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  // Manejador genérico para inputs (Evita repetir funciones de cambio)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: '', message: '' });
    setLoading(true);

    try {
      // 2. Inyección de datos limpios y tipados hacia la capa de servicios
      await createTransaction({
        fromAccountId: formData.fromAccountId,
        toAccountId: formData.toAccountId,
        amount: parseFloat(formData.amount)
      });

      setFeedback({ type: 'success', message: '¡Transferencia procesada con éxito!' });
      setFormData(prev => ({ ...prev, amount: '' })); // Limpiamos solo el monto
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-white mb-4">Nueva Transferencia</h2>

      {feedback.message && (
        <div className={`p-3 rounded-lg text-sm mb-4 ${
          feedback.type === 'error' ? 'bg-red-500/10 border border-red-500 text-red-400' : 'bg-green-500/10 border border-green-500 text-green-400'
        }`}>
          {feedback.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Selección dinámica de cuenta origen */}
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

        {/* Selección dinámica de cuenta destino */}
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

        {/* Monto de la transferencia */}
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
  );
}