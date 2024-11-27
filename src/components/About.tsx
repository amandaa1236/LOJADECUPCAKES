import React from 'react';
import { Clock, MapPin } from 'lucide-react';

export function About() {
  return (
    <section id="sobre" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Nossa História</h2>
          <p className="text-gray-600 mb-8">
            A Doce Delícia Cupcakes nasceu em 2015 do sonho de transformar momentos comuns em experiências doces e memoráveis. 
            Nossa jornada começou em uma pequena cozinha familiar e, graças ao carinho dos nossos clientes, hoje somos 
            referência em cupcakes artesanais na cidade.
          </p>
          <p className="text-gray-600 mb-12">
            Cada cupcake é preparado artesanalmente com ingredientes selecionados e muito amor, 
            seguindo receitas exclusivas desenvolvidas ao longo dos anos por nossa equipe de confeiteiros.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-pink-50 p-6 rounded-lg">
              <Clock className="w-8 h-8 text-pink-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Horário de Funcionamento</h3>
              <p className="text-gray-600">Segunda a Sábado</p>
              <p className="text-gray-600">09:00 às 19:00</p>
            </div>
            <div className="bg-pink-50 p-6 rounded-lg">
              <MapPin className="w-8 h-8 text-pink-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Localização</h3>
              <p className="text-gray-600">Rua dos Doces, 123</p>
              <p className="text-gray-600">Centro - São Paulo/SP</p>
              <p className="text-gray-600">CEP: 01234-567</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}