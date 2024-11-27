import React from 'react';
import { CheckCircle } from 'lucide-react';

interface SuccessStepProps {
  onClose: () => void;
}

export function SuccessStep({ onClose }: SuccessStepProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
      <h2 className="text-2xl font-bold mb-4">Pedido Realizado com Sucesso!</h2>
      <p className="text-gray-600 mb-8">
        Obrigado pela sua compra! Você receberá um e-mail com os detalhes do seu pedido.
      </p>
      <button
        onClick={onClose}
        className="bg-pink-600 text-white py-3 px-8 rounded-lg hover:bg-pink-700 transition-colors"
      >
        Voltar para a Loja
      </button>
    </div>
  );
}