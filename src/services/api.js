// Configuración base para la comunicación con la API de Go (wallet-engine)
const API_URL = 'http://localhost:8082';

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al iniciar sesión');
  }

  return response.json();
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al registrar el usuario');
  }

  return response.json();
};

// Función para registrar una nueva transacción
export async function createTransaction(transactionData) {
  const response = await fetch('http://localhost:8082/transactions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from_account_id: transactionData.fromAccountId || "A1",
      to_account_id: transactionData.toAccountId || "A2",
      amount: Number(transactionData.amount)
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    // Nota: Tu backend responde con la propiedad "error", no "message"
    throw new Error(errorData.error || 'Error al procesar la transacción');
  }

  return await response.json();
}
// Obtener el saldo y datos generales del dashboard
export async function getDashboardData() {
  const response = await fetch('http://localhost:8082/dashboard', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('No se pudo cargar la información del dashboard');
  }

  return await response.json();
}

// Obtener el historial de movimientos
export async function getTransactions() {
  const response = await fetch('http://localhost:8082/transactions', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('No se pudo cargar el historial de movimientos');
  }

  return await response.json();
}