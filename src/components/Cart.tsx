import React from 'react';
import { X } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantidade: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}

export function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.cupcake.preco * item.quantidade, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Carrinho</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-gray-500 text-center">Seu carrinho está vazio</p>
        ) : (
          <>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.cupcake.id} className="flex items-center space-x-4 border-b pb-4">
                  <img
                    src={item.cupcake.imagem}
                    alt={item.cupcake.nome}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.cupcake.nome}</h3>
                    <p className="text-gray-600">R$ {item.cupcake.preco.toFixed(2)}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.cupcake.id, Math.max(0, item.quantidade - 1))}
                        className="px-2 py-1 bg-gray-100 rounded"
                      >
                        -
                      </button>
                      <span>{item.quantidade}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.cupcake.id, item.quantidade + 1)}
                        className="px-2 py-1 bg-gray-100 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.cupcake.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-xl">R$ {total.toFixed(2)}</span>
              </div>
              <button 
                onClick={onCheckout}
                className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors"
              >
                Finalizar Pedido
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}