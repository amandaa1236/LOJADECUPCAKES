import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Cupcake } from '../types';

interface MenuProps {
  cupcakes: Cupcake[];
  onAddToCart: (cupcake: Cupcake) => void;
}

export function Menu({ cupcakes, onAddToCart }: MenuProps) {
  return (
    <section id="menu" className="py-16 bg-pink-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Nossos Cupcakes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cupcakes.map((cupcake) => (
            <div key={cupcake.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={cupcake.imagem}
                alt={cupcake.nome}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{cupcake.nome}</h3>
                <p className="text-gray-600 mb-4">{cupcake.descricao}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-pink-600">
                    R$ {cupcake.preco.toFixed(2)}
                  </span>
                  <button
                    onClick={() => onAddToCart(cupcake)}
                    className="flex items-center space-x-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
                  >
                    <ShoppingBag size={20} />
                    <span>Adicionar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}