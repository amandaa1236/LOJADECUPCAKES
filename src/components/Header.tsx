import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Cake, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export function Header({ cartItemCount, onCartClick }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-pink-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Cake size={32} />
            <h1 className="text-2xl font-bold">Doce Delícia Cupcakes</h1>
          </Link>
          <nav className="flex items-center space-x-6">
            <a href="#menu" className="hover:text-pink-200">Menu</a>
            <a href="#sobre" className="hover:text-pink-200">Sobre</a>
            <a href="#avaliacoes" className="hover:text-pink-200">Avaliações</a>
            <a href="#contato" className="hover:text-pink-200">Contato</a>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 hover:text-pink-200"
                >
                  <User size={20} />
                  <span>{user.name}</span>
                </Link>
                <button 
                  onClick={logout}
                  className="hover:text-pink-200"
                >
                  Sair
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="hover:text-pink-200">Login</Link>
                <Link 
                  to="/register" 
                  className="bg-white text-pink-600 px-4 py-2 rounded-full hover:bg-pink-100 transition-colors"
                >
                  Cadastrar
                </Link>
              </div>
            )}
            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-pink-700 rounded-full transition-colors"
            >
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-pink-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}