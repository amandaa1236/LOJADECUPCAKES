import React from 'react';
import { DeliveryStep } from './DeliveryStep';
import { PaymentStep } from './PaymentStep';
import { SuccessStep } from './SuccessStep';
import { DeliveryInfo, PaymentInfo, CartItem } from '../types';

interface CheckoutProps {
  isOpen: boolean;
  step: 'delivery' | 'payment' | 'success';
  items: CartItem[];
  deliveryInfo: DeliveryInfo;
  paymentInfo: PaymentInfo;
  onClose: () => void;
  onUpdateDeliveryInfo: (info: DeliveryInfo) => void;
  onUpdatePaymentInfo: (info: PaymentInfo) => void;
  onNextStep: () => void;
}

export function Checkout({
  isOpen,
  step,
  items,
  deliveryInfo,
  paymentInfo,
  onClose,
  onUpdateDeliveryInfo,
  onUpdatePaymentInfo,
  onNextStep,
}: CheckoutProps) {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.cupcake.preco * item.quantidade, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-4xl h-full md:h-auto md:max-h-[90vh] overflow-y-auto rounded-lg">
        {step === 'delivery' && (
          <DeliveryStep
            deliveryInfo={deliveryInfo}
            onUpdateDeliveryInfo={onUpdateDeliveryInfo}
            onNext={onNextStep}
          />
        )}
        
        {step === 'payment' && (
          <PaymentStep
            total={total}
            paymentInfo={paymentInfo}
            onUpdatePaymentInfo={onUpdatePaymentInfo}
            onNext={onNextStep}
          />
        )}
        
        {step === 'success' && (
          <SuccessStep onClose={onClose} />
        )}
      </div>
    </div>
  );
}