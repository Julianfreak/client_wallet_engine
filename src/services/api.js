// Configuración base para la comunicación con la API de Go (wallet-engine)
const API_URL = 'http://localhost:8082';

export async function loginUser() {
  const response = await fetch('http://localhost:8082/login', {
    method: 'POST',
  });
  const data = await response.json();
  if (data.token) {
    localStorage.setItem('jwt_token', data.token);
  }
}

// Función auxiliar para obtener el header con el token
function getAuthHeaders() {
  const token = localStorage.getItem('jwt_token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
}

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
    headers: getAuthHeaders(),
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
    headers: getAuthHeaders(),
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
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error('No se pudo cargar el historial de movimientos');
  }

  return await response.json();
}