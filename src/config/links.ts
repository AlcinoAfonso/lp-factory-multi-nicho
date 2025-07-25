export const defaultLinks = {
  whatsapp: 'https://wa.me/5521979658483?text=Gostaria%20de%20saber%20mais%20sobre%20a%20terapia',
  instagram: 'https://www.instagram.com/unicodigital_',
  legal: 'https://unicodigital.com.br/unico-digital-2-3-2-2/',
};

// Função helper para gerar link do WhatsApp
export function getWhatsAppLink(phone: string, message: string) {
  const cleanPhone = phone.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}
