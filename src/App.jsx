import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import DashboardLayout from './layouts/dashboardLayout';
import DashboardView from './views/dashboardView';
import TransactionsView from './views/transactionsView';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('login');
  const [activeView, setActiveView] = useState('dashboard');

  if (isAuthenticated) {
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
      onLogout={() => setIsAuthenticated(false)}
    >
      {activeView === 'dashboard' && <DashboardView />}
      {activeView === 'transactions' && <TransactionsView />}
    </DashboardLayout>
  );
}