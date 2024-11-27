import React, { useState } from 'react';
import { CreditCard, Wallet, QrCode } from 'lucide-react';
import { PaymentMethod, PaymentInfo } from '../types';

interface PaymentStepProps {
  total: number;
  paymentInfo: PaymentInfo;
  onUpdatePaymentInfo: (info: PaymentInfo) => void;
  onNext: () => void;
}

export function PaymentStep({ total, paymentInfo, onUpdatePaymentInfo, onNext }: PaymentStepProps) {
  const [changeAmount, setChangeAmount] = useState<string>('');

  const handleMethodChange = (method: PaymentMethod) => {
    onUpdatePaymentInfo({ method, change: undefined });
    setChangeAmount('');
  };

  const handleChangeAmount = (value: string) => {
    setChangeAmount(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > total) {
      onUpdatePaymentInfo({ ...paymentInfo, change: numValue });
    }
  };

  const isValid = () => {
    if (paymentInfo.method === 'cash') {
      return paymentInfo.change ? paymentInfo.change > total : false;
    }
    return true;
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Forma de Pagamento</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => handleMethodChange('pix')}
            className={`p-4 rounded-lg border-2 ${
              paymentInfo.method === 'pix' 
                ? 'border-pink-600 bg-pink-50' 
                : 'border-gray-200'
            }`}
          >
            <QrCode className="w-6 h-6 mx-auto mb-2" />
            <h3 className="font-semibold text-center">PIX</h3>
          </button>
          
          <button
            onClick={() => handleMethodChange('credit')}
            className={`p-4 rounded-lg border-2 ${
              paymentInfo.method === 'credit' 
                ? 'border-pink-600 bg-pink-50' 
                : 'border-gray-200'
            }`}
          >
            <CreditCard className="w-6 h-6 mx-auto mb-2" />
            <h3 className="font-semibold text-center">Cartão de Crédito</h3>
          </button>
          
          <button
            onClick={() => handleMethodChange('cash')}
            className={`p-4 rounded-lg border-2 ${
              paymentInfo.method === 'cash' 
                ? 'border-pink-600 bg-pink-50' 
                : 'border-gray-200'
            }`}
          >
            <Wallet className="w-6 h-6 mx-auto mb-2" />
            <h3 className="font-semibold text-center">Dinheiro</h3>
          </button>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-semibold">Total do Pedido:</p>
          <p className="text-2xl font-bold text-pink-600">R$ {total.toFixed(2)}</p>
        </div>

        {paymentInfo.method === 'pix' && (
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <QrCode className="w-32 h-32 mx-auto mb-4" />
            <p className="text-gray-600">Escaneie o QR Code para pagar</p>
          </div>
        )}

        {paymentInfo.method === 'credit' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Número do Cartão</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Validade</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  placeholder="MM/AA"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">CVV</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  placeholder="123"
                />
              </div>
            </div>
          </div>
        )}

        {paymentInfo.method === 'cash' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Troco para quanto?</label>
            <input
              type="number"
              value={changeAmount}
              onChange={(e) => handleChangeAmount(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              placeholder="0,00"
            />
            {paymentInfo.change && (
              <p className="mt-2 text-gray-600">
                Troco: R$ {(paymentInfo.change - total).toFixed(2)}
              </p>
            )}
          </div>
        )}

        <button
          onClick={onNext}
          disabled={!isValid()}
          className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
}