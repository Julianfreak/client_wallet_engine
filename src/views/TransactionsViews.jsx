import { useState } from 'react';
import { createTransaction } from '../services/api';

export default function TransactionsView() {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('deposit'); // 'deposit' o 'transfer'
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      await createTransaction({
        amount: parseFloat(amount),
        type,
        description,
      });

      setMessage({ text: '¡Transacción realizada con éxito!', type: 'success' });
      // Limpiar formulario
      setAmount('');
      setDescription('');
    } catch (err) {
      setMessage({ text: err.message || 'Hubo un error al realizar la transacción', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Realizar Movimiento</h2>
      
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg max-w-xl">
        {message.text && (
          <div className={`mb-6 p-3 rounded-lg text-sm border ${
            message.type === 'success' 
              ? 'bg-green-500/10 border-green-500 text-green-400' 
              : 'bg-red-500/10 border-red-500 text-red-400'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Tipo de Movimiento</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="deposit">Depósito / Recarga</option>
              <option value="transfer">Transferencia</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Monto ($ COP)</label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="0.01"
              className="w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Descripción o Concepto</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              placeholder="Ej. Pago de servicios, recarga inicial..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white hover:bg-blue-500 transition-colors disabled:opacity-50"
          >
            {loading ? 'Procesando transacción...' : 'Confirmar Movimiento'}
          </button>
        </form>
      </div>
    </div>
  );
}