import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export function Contact() {
  return (
    <section id="contato" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Entre em Contato</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Phone className="w-6 h-6 text-pink-600" />
              <div>
                <h3 className="font-semibold">Telefone</h3>
                <p className="text-gray-600">(11) 99999-9999</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-pink-600" />
              <div>
                <h3 className="font-semibold">E-mail</h3>
                <p className="text-gray-600">contato@docedelicia.com.br</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="w-6 h-6 text-pink-600" />
              <div>
                <h3 className="font-semibold">Endereço</h3>
                <p className="text-gray-600">Rua dos Doces, 123</p>
                <p className="text-gray-600">Centro - São Paulo/SP</p>
                <p className="text-gray-600">CEP: 01234-567</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Clock className="w-6 h-6 text-pink-600" />
              <div>
                <h3 className="font-semibold">Horário de Funcionamento</h3>
                <p className="text-gray-600">Segunda a Sábado</p>
                <p className="text-gray-600">09:00 às 19:00</p>
              </div>
            </div>
          </div>
          <form className="space-y-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                type="text"
                id="nome"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              />
            </div>
            <div>
              <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700">Mensagem</label>
              <textarea
                id="mensagem"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors"
            >
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}