import React from 'react';
import { ContactData } from '@/types/lp-config';

interface ContactProps {
  data: ContactData;
}

const Contact: React.FC<ContactProps> = ({ data }) => {
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
        
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Formulário */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form action={data.formAction} method="POST" className="space-y-6">
              {data.fields.map((field, index) => (
                <div key={index}>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {field.label}
                  </label>
                  
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      placeholder={field.placeholder}
                      required={field.required}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  )}
                </div>
              ))}
              
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                {data.submitButton.text}
              </button>
            </form>
          </div>
          
          {/* Informações de contato */}
          {data.info && data.info.length > 0 && (
            <div className="space-y-8">
              {data.info.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="text-3xl mr-4 text-orange-500">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      {item.label}
                    </h3>
                    <p className="opacity-90">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
