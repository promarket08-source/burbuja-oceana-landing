import { IncomingMessage, ServerResponse } from 'http';

interface ChatRequest {
  message: string;
  sessionId?: string;
}

interface ChatResponse {
  response: string;
  timestamp: string;
  mcp_version: string;
  context?: string;
}

const knowledgeBase = {
  'hola': {
    response: '¡Hola! Soy Burbuja, el asistente virtual de Oceana. Este proyecto representa la evolución hacia una hospitalidad con sentido de pertenencia. ¿En qué puedo ayudarte hoy?',
    context: 'greeting'
  },
  'proyecto': {
    response: 'El Proyecto Oceana transforma la experiencia de hospedaje mediante tres pilares: identidad regional, sostenibilidad y altos estándares de calidad. Con una fase piloto en La Serena, integramos productos emblemáticos como la papaya, amenidades eco-amigables y equipamiento premium.',
    context: 'project_overview'
  },
  'estrategia': {
    response: 'Nuestra estrategia se centra en: 1) Identidad y Economía Local mediante productores regionales, 2) Calidad Superior en baños y cocinas, 3) Sostenibilidad con materiales ecológicos, 4) Fidelización del huésped, y 5) Escalabilidad desde La Serena hacia todo Chile.',
    context: 'strategy'
  },
  'implementacion': {
    response: 'La implementación sigue un cronograma de 6 meses: Mes 1 (Productores y diseño), Mes 2 (Adquisición), Mes 3-4 (Implementación física), Mes 5 (Evaluación), Mes 6+ (Expansión). Incluye integración de productos locales, amenidades premium y equipamiento completo.',
    context: 'implementation'
  },
  'papaya': {
    response: 'La papaya es el eje central del modelo La Serena. Ofrecemos mermeladas, dulces, confituras, jugos naturales y deshidratados. También incluimos pisco local, artesanía en piedra combarbalita y textiles diaguitas.',
    context: 'local_products'
  },
  'amenidades': {
    response: 'Nuestras amenidades incluyen: en baños (sets premium en madera reciclada, velas aromáticas, secadores personalizados), en cocinas (aceite, sal y condimentos en vidrio etiquetado), y equipamiento completo en todas las áreas.',
    context: 'amenities'
  },
  'inversion': {
    response: 'Oceana ofrece un modelo de inversión desde $150,000 USD con ROI proyectado en 5 años. El proyecto genera ingresos adicionales mediante venta de productos locales dentro de las unidades. Es un modelo escalable y replicable.',
    context: 'investment'
  },
  'contacto': {
    response: 'Puedes contactarnos por WhatsApp al +52 123 456 7890, o escribirnos a hola@oceana.mx. También puedes agendar una reunión directa para discutir oportunidades de inversión o alianzas estratégicas.',
    context: 'contact'
  },
  'ubicacion': {
    response: 'Comenzamos en La Serena (Región de Coquimbo). La proyección incluye: Norte Chico (aceitunas), Valle del Maipo (vitivinicultura), y Sur de Chile (miel y productos forestales). Cada zona adapta su identidad local.',
    context: 'location'
  },
  'sustentable': {
    response: 'Nuestro enfoque sustentable incluye: materiales reciclados y ecológicos, apoyo a comunidades locales, reducción de impacto ambiental, y una red de alianzas con productores certificados y cooperativas regionales.',
    context: 'sustainability'
  }
};

export default function handler(
  req: IncomingMessage,
  res: ServerResponse
): void {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const data: ChatRequest = JSON.parse(body);
      const { message } = data;
      
      const lowerMsg = message.toLowerCase();
      let result = {
        response: 'Gracias por tu pregunta. Como asistente de Oceana, puedo ayudarte con: proyecto, estrategia, implementación, productos locales (papaya), amenidades, inversión, ubicación, sustentabilidad o contacto.',
        context: 'general'
      };

      for (const [key, value] of Object.entries(knowledgeBase)) {
        if (lowerMsg.includes(key)) {
          result = value;
          break;
        }
      }

      const response: ChatResponse = {
        response: result.response,
        timestamp: new Date().toISOString(),
        mcp_version: '2.0',
        context: result.context
      };

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(response));
    } catch (error) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Internal server error' }));
    }
  });
}
