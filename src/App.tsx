import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProfilePage } from './pages/ProfilePage';
import { useAuth } from './contexts/AuthContext';
import { CartItem } from './types';

function App() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemCount={cartItems.length} onCartClick={() => {}} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/register"
          element={!user ? <RegisterPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/profile"
          element={user ? <ProfilePage /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </div>
  );
}

export default App;