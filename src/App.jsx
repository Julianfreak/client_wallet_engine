import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import DashboardLayout from './layouts/DashboardLayouts';
import DashboardView from './views/DashboardViews';
import TransactionsView from './views/TransactionsViews';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('login');
  const [activeView, setActiveView] = useState('dashboard');

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setIsAuthenticated(false);
    setActiveView('dashboard'); // Opcional: reinicia la vista activa
  };

  if (!isAuthenticated) {
    return (
      <div>
        {currentView === 'login' ? (
          <Login 
            onLoginSuccess={() => setIsAuthenticated(true)}
            onSwitchToRegister={() => setCurrentView('register')} />
        ) : (
          <Register onSwitchToLogin={() => setCurrentView('login')} />
        )}
      </div>
    );
  }

  return (
    <DashboardLayout 
      activeView={activeView} 
      setActiveView={setActiveView} 
      onLogout={handleLogout}
    >
      {activeView === 'dashboard' && <DashboardView />}
      {activeView === 'transactions' && <TransactionsView />}
    </DashboardLayout>
  );
}