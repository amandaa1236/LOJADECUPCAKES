import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Address, Order } from '../types';

// Mock data for orders
const mockOrders: Order[] = [
  {
    id: 1,
    date: '2024-03-15',
    items: [
      {
        cupcake: {
          id: 1,
          nome: "Chocolate Belga",
          descricao: "Cupcake de chocolate belga",
          preco: 12.90,
          imagem: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd"
        },
        quantidade: 2
      }
    ],
    total: 25.80,
    status: 'completed',
    deliveryInfo: {
      method: 'delivery',
      address: {
        street: 'Rua Exemplo',
        number: '123',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567'
      }
    },
    paymentInfo: {
      method: 'credit'
    }
  }
];

export function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [newAddress, setNewAddress] = useState<Partial<Address>>({});
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [avatar, setAvatar] = useState<string | undefined>(user?.avatar);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setAvatar(base64);
        updateProfile({ avatar: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddAddress = () => {
    if (user && newAddress.street && newAddress.number && newAddress.neighborhood && 
        newAddress.city && newAddress.state && newAddress.zipCode) {
      const updatedAddresses = [...user.addresses, newAddress as Address];
      updateProfile({ addresses: updatedAddresses });
      setNewAddress({});
      setShowAddAddress(false);
    }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-6 mb-6">
            <div className="relative">
              <img
                src={avatar || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
              <label className="absolute bottom-0 right-0 bg-pink-600 text-white p-2 rounded-full cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                📷
              </label>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Endereços</h3>
              <button
                onClick={() => setShowAddAddress(!showAddAddress)}
                className="text-pink-600 hover:text-pink-700"
              >
                + Adicionar endereço
              </button>
            </div>

            {showAddAddress && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Rua"
                    value={newAddress.street || ''}
                    onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                    className="rounded-md border-gray-300"
                  />
                  <input
                    type="text"
                    placeholder="Número"
                    value={newAddress.number || ''}
                    onChange={(e) => setNewAddress({ ...newAddress, number: e.target.value })}
                    className="rounded-md border-gray-300"
                  />
                  <input
                    type="text"
                    placeholder="Bairro"
                    value={newAddress.neighborhood || ''}
                    onChange={(e) => setNewAddress({ ...newAddress, neighborhood: e.target.value })}
                    className="rounded-md border-gray-300"
                  />
                  <input
                    type="text"
                    placeholder="Cidade"
                    value={newAddress.city || ''}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    className="rounded-md border-gray-300"
                  />
                  <input
                    type="text"
                    placeholder="Estado"
                    value={newAddress.state || ''}
                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                    className="rounded-md border-gray-300"
                  />
                  <input
                    type="text"
                    placeholder="CEP"
                    value={newAddress.zipCode || ''}
                    onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                    className="rounded-md border-gray-300"
                  />
                </div>
                <button
                  onClick={handleAddAddress}
                  className="mt-4 bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700"
                >
                  Salvar Endereço
                </button>
              </div>
            )}

            <div className="space-y-4">
              {user.addresses.map((address, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <p>{address.street}, {address.number}</p>
                  <p>{address.neighborhood}</p>
                  <p>{address.city} - {address.state}</p>
                  <p>CEP: {address.zipCode}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Histórico de Pedidos</h3>
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Pedido #{order.id}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.cupcake.id} className="flex justify-between">
                        <span>{item.quantidade}x {item.cupcake.nome}</span>
                        <span>R$ {(item.cupcake.preco * item.quantidade).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>R$ {order.total.toFixed(2)}</span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      Status: {order.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}