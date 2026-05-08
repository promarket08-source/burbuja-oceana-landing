export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  
  // MCP-inspired response handler
  const responses = {
    'hola': '¡Hola! Soy Burbuja, el asistente virtual de Oceana. ¿En qué puedo ayudarte hoy?',
    'proyecto': 'El Proyecto Oceana es una modernización sustentable de apart-hoteles con identidad local. Integramos diseño premium, tecnología avanzada y respeto por el entorno.',
    'precio': 'Los precios varían según el modelo de inversión. Tenemos opciones desde $150,000 USD. ¿Te gustaría agendar una reunión para discutir detalles?',
    'video': 'Puedes ver nuestro video principal "Proyecto Estratégico Oceana" en la sección de Medios. También tenemos videos sobre la propuesta de valor y el concepto "Adiós a los Hoteles Búnker".',
    'contacto': 'Puedes contactarnos por WhatsApp al +52 123 456 7890, o escribirnos a hola@oceana.mx. También puedes agendar una reunión directa.',
    'ubicacion': 'Oceana tiene presencia en las principales zonas turísticas de México: Cancún, Tulum, Los Cabos y Puerto Vallarta.',
    'sustentable': 'Nuestro enfoque sustentable incluye: energía solar, gestión de residuos, arquitectura bioclimática y apoyo a comunidades locales.',
    'amenidades': 'Nuestros apart-hoteles incluyen: piscinas infinity, spas, gimnasios, restaurantes orgánicos, y acceso directo a playa.',
    'inversion': 'Oceana ofrece ROI atractivo con modelos de inversión flexibles. Nuestro análisis proyecta rentabilidad optimizada en 5 años.'
  };

  const lowerMsg = message.toLowerCase();
  let response = 'Gracias por tu pregunta. Como asistente de Oceana, puedo ayudarte con información sobre: proyecto, precios, videos, contacto, ubicación, sustentabilidad, amenidades e inversiones.';

  for (const [key, value] of Object.entries(responses)) {
    if (lowerMsg.includes(key)) {
      response = value;
      break;
    }
  }

  return res.status(200).json({ 
    response,
    timestamp: new Date().toISOString(),
    mcp_version: '1.0'
  });
}
