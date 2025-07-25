import React from 'react';
import { PricingData } from '@/types/lp-config';

interface PricingProps {
  data: PricingData;
}

const Pricing: React.FC<PricingProps> = ({ data }) => {
  return (
    <section
      id={data.id}
      className="py-16 lg:py-24"
      style={{
        backgroundColor: data.backgroundColor,
        color: data.textColor,
      }}
    >
      <div className="container mx-auto px-4">
        {data.title && (
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
            {data.title}
          </h2>
        )}
        
        {data.subtitle && (
          <p className="text-xl text-center mb-12 opacity-90">
            {data.subtitle}
          </p>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {data.plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg border-2 ${
                plan.featured
                  ? 'border-orange-500 shadow-xl scale-105'
                  : 'border-gray-200'
              } p-8 bg-white transition-all hover:shadow-lg`}
            >
              {plan.featured && (
                <div className="bg-orange-500 text-white text-center py-2 px-4 rounded-full text-sm font-semibold mb-4">
                  Mais Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-center mb-4 text-gray-900">
                {plan.name}
              </h3>
              
              <div className="text-center mb-8">
                <span className="text-lg text-gray-600">{plan.currency}</span>
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600">/{plan.period}</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a
                href={plan.button.href}
                className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all ${
                  plan.button.variant === 'primary' || plan.featured
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                }`}
              >
                {plan.button.text}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
