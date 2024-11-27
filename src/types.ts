export interface Cupcake {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
}

export interface CartItem {
  cupcake: Cupcake;
  quantidade: number;
}

export interface Feedback {
  id: number;
  nome: string;
  comentario: string;
  avaliacao: number;
  data: string;
}

export type DeliveryMethod = 'delivery' | 'pickup';
export type PaymentMethod = 'pix' | 'credit' | 'cash';

export interface DeliveryInfo {
  method: DeliveryMethod;
  address?: Address;
}

export interface PaymentInfo {
  method: PaymentMethod;
  change?: number;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  addresses: Address[];
}

export interface Order {
  id: number;
  date: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'preparing' | 'delivering' | 'completed' | 'cancelled';
  deliveryInfo: DeliveryInfo;
  paymentInfo: PaymentInfo;
}