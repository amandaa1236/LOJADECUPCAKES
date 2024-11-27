import React, { useState } from 'react';
import { Menu } from '../components/Menu';
import { About } from '../components/About';
import { Testimonials } from '../components/Testimonials';
import { Contact } from '../components/Contact';
import { Cart } from '../components/Cart';
import { Checkout } from '../components/Checkout';
import { cupcakes } from '../data/cupcakes';
import { feedbacks } from '../data/feedbacks';
import { CartItem, DeliveryInfo, PaymentInfo } from '../types';

export function HomePage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'delivery' | 'payment' | 'success'>('delivery');
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({ method: 'delivery' });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({ method: 'pix' });

  const handleAddToCart = (cupcake: Cupcake) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.cupcake.id === cupcake.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.cupcake.id === cupcake.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...prevItems, { cupcake, quantidade: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: number, quantidade: number) => {
    setCartItems(prevItems =>
      quantidade === 0
        ? prevItems.filter(item => item.cupcake.id !== id)
        : prevItems.map(item =>
            item.cupcake.id === id ? { ...item, quantidade } : item
          )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.cupcake.id !== id));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
    setCheckoutStep('delivery');
  };

  const handleNextStep = () => {
    if (checkoutStep === 'delivery') {
      setCheckoutStep('payment');
    } else if (checkoutStep === 'payment') {
      setCheckoutStep('success');
    }
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
    setCartItems([]);
    setCheckoutStep('delivery');
  };

  return (
    <main>
      <Menu cupcakes={cupcakes} onAddToCart={handleAddToCart} />
      <About />
      <Testimonials feedbacks={feedbacks} />
      <Contact />
      
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
      
      <Checkout
        isOpen={isCheckoutOpen}
        step={checkoutStep}
        items={cartItems}
        deliveryInfo={deliveryInfo}
        paymentInfo={paymentInfo}
        onClose={handleCloseCheckout}
        onUpdateDeliveryInfo={setDeliveryInfo}
        onUpdatePaymentInfo={setPaymentInfo}
        onNextStep={handleNextStep}
      />
    </main>
  );
}