import React from 'react';
import { Star } from 'lucide-react';
import { Feedback } from '../types';

interface TestimonialsProps {
  feedbacks: Feedback[];
}

export function Testimonials({ feedbacks }: TestimonialsProps) {
  return (
    <section id="avaliacoes" className="py-16 bg-pink-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">O que nossos clientes dizem</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex mb-4">
                {[...Array(feedback.avaliacao)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">{feedback.comentario}</p>
              <div className="flex justify-between items-center">
                <span className="font-semibold">{feedback.nome}</span>
                <span className="text-sm text-gray-500">{new Date(feedback.data).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}