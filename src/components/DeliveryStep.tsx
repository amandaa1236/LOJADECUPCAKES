import React from 'react';
import { MapPin } from 'lucide-react';
import { DeliveryMethod, DeliveryInfo } from '../types';

interface DeliveryStepProps {
  deliveryInfo: DeliveryInfo;
  onUpdateDeliveryInfo: (info: DeliveryInfo) => void;
  onNext: () => void;
}

export function DeliveryStep({ deliveryInfo, onUpdateDeliveryInfo, onNext }: DeliveryStepProps) {
  const handleMethodChange = (method: DeliveryMethod) => {
    onUpdateDeliveryInfo({ ...deliveryInfo, method });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdateDeliveryInfo({
      ...deliveryInfo,
      address: {
        ...deliveryInfo.address,
        [name]: value,
      },
    });
  };

  const isValid = () => {
    if (deliveryInfo.method === 'pickup') return true;
    if (deliveryInfo.method === 'delivery') {
      const address = deliveryInfo.address;
      return address?.street && address?.number && address?.neighborhood && 
             address?.city && address?.state && address?.zipCode;
    }
    return false;
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Forma de Entrega</h2>
      
      <div className="space-y-6">
        <div className="flex space-x-4">
          <button
            onClick={() => handleMethodChange('delivery')}
            className={`flex-1 p-4 rounded-lg border-2 ${
              deliveryInfo.method === 'delivery' 
                ? 'border-pink-600 bg-pink-50' 
                : 'border-gray-200'
            }`}
          >
            <h3 className="font-semibold mb-2">Receber em Casa</h3>
            <p className="text-sm text-gray-600">Entrega em até 60 minutos</p>
          </button>
          
          <button
            onClick={() => handleMethodChange('pickup')}
            className={`flex-1 p-4 rounded-lg border-2 ${
              deliveryInfo.method === 'pickup' 
                ? 'border-pink-600 bg-pink-50' 
                : 'border-gray-200'
            }`}
          >
            <h3 className="font-semibold mb-2">Retirar na Loja</h3>
            <p className="text-sm text-gray-600">Pronto em 30 minutos</p>
          </button>
        </div>

        {deliveryInfo.method === 'pickup' && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-pink-600 mt-1" />
              <div>
                <h4 className="font-semibold">Endereço da Loja</h4>
                <p className="text-gray-600">Rua dos Doces, 123</p>
                <p className="text-gray-600">Centro - São Paulo/SP</p>
                <p className="text-gray-600">CEP: 01234-567</p>
              </div>
            </div>
          </div>
        )}

        {deliveryInfo.method === 'delivery' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Rua</label>
                <input
                  type="text"
                  name="street"
                  value={deliveryInfo.address?.street || ''}
                  onChange={handleAddressChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Número</label>
                <input
                  type="text"
                  name="number"
                  value={deliveryInfo.address?.number || ''}
                  onChange={handleAddressChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Complemento (opcional)</label>
              <input
                type="text"
                name="complement"
                value={deliveryInfo.address?.complement || ''}
                onChange={handleAddressChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Bairro</label>
                <input
                  type="text"
                  name="neighborhood"
                  value={deliveryInfo.address?.neighborhood || ''}
                  onChange={handleAddressChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">CEP</label>
                <input
                  type="text"
                  name="zipCode"
                  value={deliveryInfo.address?.zipCode || ''}
                  onChange={handleAddressChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Cidade</label>
                <input
                  type="text"
                  name="city"
                  value={deliveryInfo.address?.city || ''}
                  onChange={handleAddressChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Estado</label>
                <input
                  type="text"
                  name="state"
                  value={deliveryInfo.address?.state || ''}
                  onChange={handleAddressChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                />
              </div>
            </div>
          </div>
        )}

        <button
          onClick={onNext}
          disabled={!isValid()}
          className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Continuar para Pagamento
        </button>
      </div>
    </div>
  );
}