import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';

export default function App() {
  const [currentView, setCurrentView] = useState('login');

  return (
    <div>
      {currentView === 'login' ? (
        <Login onSwitchToRegister={() => setCurrentView('register')} />
      ) : (
        <Register onSwitchToLogin={() => setCurrentView('login')} />
      )}
    </div>
  );
}