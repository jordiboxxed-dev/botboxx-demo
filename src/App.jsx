import React, { useState, useEffect, useRef } from 'react';

// --- Base de datos de Demos Pre-configuradas ---
const demoPresets = {
  // Demo de ejemplo 1: Coca-Cola
  'cocacola': {
    knowledge: `Coca-Cola es una bebida azucarada gaseosa vendida a nivel mundial. La compañía produce un concentrado que luego vende a varias embotelladoras licenciadas, las cuales mezclan el concentrado con agua filtrada y edulcorantes para, posteriormente, vender y distribuir la bebida en latas y botellas en los comercios minoristas. Nuestros principales productos son Coca-Cola Original, Coca-Cola Light y Coca-Cola Zero. El precio por pack de 6 latas es de $10 USD.`,
    agentProfile: { name: 'Asistente Coca-Cola', company: 'Coca-Cola' },
    themeColors: { primary: '#F40009', secondary: '#FFFFFF' },
    leadQualQuestions: [
        '¿Cuántos empleados tiene tu empresa?',
        '¿Cuál es tu presupuesto mensual para bebidas?',
        '¿Estás interesado en una suscripción mensual?'
    ],
  },
    'magnauy': {
    knowledge: `\n\nIr al contenido Main Menu USD 0,00 0 Cart Calidad y calidez\nque cuidan CALIDAD Y CALIDEZ QUE CUIDAN En Estufas Magna, nos enorgullece ser una empresa uruguaya con más de 25 años de trayectoria en la fabricación de estufas de alto rendimiento. Desde nuestros inicios, hemos mantenido un firme compromiso con la calidad, la innovación y la sostenibilidad, desarrollando una gama de productos que incluyen estufas a leña y de pellets. INDUSTRIA URUGUAYA 25 AÑOS DE\nCONFIANZA Más de dos décadas de experiencia avalan nuestro compromiso y calidad. 6 AÑOS DE\nGARANTÍA Respaldo y compromiso contigo a largo plazo. DISEÑO\nCAUTIVADOR Aportamos funcionalidad y estética en espacios diversos. REDUCE EL CONSUMO Máximo rendimiento y calor, con menor costo y contaminación. LÍNEA LEÑA LÍNEA PELLETS LÍNEA PARRILLAS LÍNEA ACCESORIOS SUSCRIBITE A NUESTRO NEWSLETTER ¡Suscribite y recibí todas nuestras novedades! BLOG Estufas Magna: Calidez Nacional y Compromiso Ambiental Conocé más Eficiencia Excepcional en Estufas a Leña: Un Avance según la Norma EN 16510 Conocé más ¿Estufas con Triple Combustión? Conocé más CONTACTO MONTEVIDEO | AVENIDA ITALIA 6779 PUNTA DEL ESTE | AV. RIO BRANCO ESQ. AV. ROOSEVELT LUN A VIER 9.00 A 18.00 | SÁB 10.00 A 14.00 (+598) 2605 7753 Sobre nosotros contacto compra Preguntas frecuentes Envíos y devoluciones CUENTA Mi cuenta Mis compras Mis direcciones Gestionar consentimiento Al hacer clic en \"Aceptar\", acepta el almacenamiento de cookies en su dispositivo para mejorar la navegación del sitio, analizar el uso del mismo y contribuir a nuestras estrategias de marketing. Consulte nuestra Política de Privacidad para obtener más información. Funcional Funcional Siempre activo El almacenamiento o acceso técnico es estrictamente necesario para el propósito legítimo de permitir el uso de un servicio específico explícitamente solicitado por el abonado o usuario, o con el único propósito de llevar a cabo la transmisión de una comunicación a través de una red de comunicaciones electrónicas. Preferencias Preferencias El almacenamiento o acceso técnico es necesario para la finalidad legítima de almacenar preferencias no solicitadas por el abonado o usuario. Estadísticas Estadísticas El almacenamiento o acceso técnico que es utilizado exclusivamente con fines estadísticos. El almacenamiento o acceso técnico que se utiliza exclusivamente con fines estadísticos anónimos. Sin un requerimiento, el cumplimiento voluntario por parte de tu proveedor de servicios de Internet, o los registros adicionales de un tercero, la información almacenada o recuperada sólo para este propósito no se puede utilizar para identificarte. Marketing Marketing El almacenamiento o acceso técnico es necesario para crear perfiles de usuario para enviar publicidad, o para rastrear al usuario en una web o en varias web con fines de marketing similares. Administrar opciones Gestionar los servicios Gestionar {vendor_count} proveedores Leer más sobre estos propósitos Aceptar Denegar Ver preferencias Guardar preferencias Ver preferencias {title} {title} {title} Gestionar consentimiento Scroll al inicio Social Chat is free, download and try it now here!`,
    agentProfile: {
        name: "Estufito",
        company: "Magna"
    },
    themeColors: {
        primary: "#ff2600",
        secondary: "#ebebeb"
    },
    leadQualQuestions: []
},
  
  // Demo de ejemplo 2: Una empresa de tecnología
  'techsolutions': {
    knowledge: `TechSolutions ofrece servicios de ciberseguridad de vanguardia para proteger a las empresas de amenazas digitales. Nuestros servicios incluyen análisis de vulnerabilidades, monitoreo 24/7 y respuesta a incidentes. El plan básico comienza en $500 USD mensuales.`,
    agentProfile: { name: 'CyberBot', company: 'TechSolutions' },
    themeColors: { primary: '#00BFFF', secondary: '#1E90FF' },
    leadQualQuestions: ['¿Cuál es tu principal preocupación en ciberseguridad?', '¿Ya cuentas con alguna solución de seguridad?', ''],
  },
    // Demo de ejemplo 3: Clima Soluciones - Aire Acondicionado
    'climasoluciones': {
    knowledge: `\n\nCatálogo de Aires Acondicionados Vivion\n\n\nModelo: STRATOS 9000 BTU DC INVERTER\nPrecio (IVA incluido): USD 512.40\nClase energética: A\nRendimiento en frío (EER): 3,22\nRendimiento en calor (COP): 3,60\n\n\nModelo: STRATOS 12000 BTU DC INVERTER\nPrecio (IVA incluido): USD 542.90\nClase energética: A\nRendimiento en frío (EER): 3,22\nRendimiento en calor (COP): 3,60\n\n\nModelo: STRATOS 18000 BTU DC INVERTER\nPrecio (IVA incluido): USD 774.70\nClase energética: A\nRendimiento en frío (EER): 3,22\nRendimiento en calor (COP): 3,60\n\n\nModelo: STRATOS 24000 BTU DC INVERTER\nPrecio (IVA incluido): USD 1050.42\nClase energética: A\nRendimiento en frío (EER): 3,22\nRendimiento en calor (COP): 3,60\n\n\nModelo: VIVION ON/OFF 9000 BTU\nPrecio (IVA incluido): USD 353.80\nPotencia nominal (frío): 622W\nPotencia nominal (calor): 857W\n\n\nModelo: VIVION ON/OFF 12000 BTU\nPrecio (IVA incluido): USD 392.84\nPotencia nominal (frío): 1234W\nPotencia nominal (calor): 1127W\n\n\nModelo: VIVION ON/OFF 18000 BTU\nPrecio (IVA incluido): USD 622.20\nPotencia nominal (frío): 1851W\nPotencia nominal (calor): 1663W\n\n\nModelo: VIVION ON/OFF 24000 BTU\nPrecio (IVA incluido): USD 805.20\nPotencia nominal (frío): 2164W\nPotencia nominal (calor): 1927W`,
    agentProfile: {
        name: "Fin",
        company: "Clima Soluciones"
    },
    themeColors: {
        primary: "#f26479",
        secondary: "#e67205"
    },
    leadQualQuestions: []
},
    // Demo de ejemplo 4: Setter IA
  'setteria': {
    knowledge: `🚀 Te Armamos GRATIS tu Agente IA en 2 semanas
Te armamos GRATIS un Agente IA completamente personalizado para tu constructora y listo para responder consultas de WhatsApp al instante 24/7, califica leads y le llena la agenda a tus asesores comerciales con clientes listos para comprar.
Nosotros invertimos en el software y capital humano para desarrollarlo en 2 semanas, completamente sin compromiso y sin ningún riesgo de tu parte.
¿Qué es el Agente IA Setter?

El Agente IA Setter es una solución revolucionaria diseñada específicamente para constructoras modulares que buscan optimizar su proceso de ventas. Este asistente inteligente libera a tus asesores comerciales de las tareas operativas repetitivas, permitiéndoles enfocarse exclusivamente en lo que mejor saben hacer: cerrar ventas.
Nuestro agente funciona como el primer punto de contacto con tus leads, proporcionando atención inmediata, educación sobre tus productos y calificación inteligente de prospectos. Una vez que identifica que un lead está genuinamente interesado y calificado, procede a agendar automáticamente llamadas con tus asesores comerciales o visitas a tu showroom, todo mientras mantiene la calidez y naturalidad de una conversación humana.
Funciones Principales

Respuesta Instantánea 24/7: Recibe y responde consultas de WhatsApp con velocidad y precisión, utilizando inteligencia artificial entrenada específicamente para el sector de construcción modular.
Análisis Integral de Información: Procesa instantáneamente toda la base de datos de tu constructora para brindar respuestas precisas y detalladas que sorprenden por su calidad.
Gestión Inteligente del Pipeline: Identifica automáticamente en qué etapa del proceso de venta se encuentra cada lead y adapta su comunicación en consecuencia.
Consultas Técnicas Avanzadas: Responde preguntas complejas sobre precios, condiciones especiales, distancias de entrega, opciones de financiamiento y especificaciones técnicas.
Calificación y Agendamiento: Realiza preguntas calificadoras estratégicas y agenda citas cuando detecta que el lead está listo para el siguiente paso.
La Gran Oportunidad: Sistema Completo de Escalamiento

🚀 El Embudo de Ventas Perfecto

La verdadera oportunidad para captar mercado y escalar ventas tanto como quieras está en tener un embudo de ventas que funciona así:

📱
Meta Ads
Miles de consultas WhatsApp baratas
→
🤖
Agente IA
Educa, califica y agenda
→
💼
Asesores
Solo cierran ventas
Con el tiempo, este sistema te permite calcular exactamente cuál es el monto de inversión publicitaria que completa el calendario de tu equipo comercial, cuál es tu tasa de cierre y, por tanto, cuál es tu ROI (que seguramente sea altísimo).

🎁 Bonus Exclusivo

Si decidís implementar nuestros agentes IA, ponemos nuestro equipo publicitario (que generó +$10M USD en ventas) a correr anuncios para vos TOTALMENTE GRATIS.

Te acompañamos en todo el proceso de ventas para maximizar tu retorno.
Beneficios Transformadores

📈 Beneficios Comerciales

Aumento significativo en tasa de conversión
Mayor cantidad de citas calificadas
Reducción drástica de leads perdidos
Optimización del ROI publicitario
Escalabilidad ilimitada
Reducción del ciclo de ventas
👥 Beneficios para Asesores

Liberación total de soporte operativo
100% enfoque en cerrar ventas
Leads pre-calificados y educados
Eliminación de consultas repetitivas
Mayor satisfacción laboral
Productividad maximizada
⚡ Beneficios Operativos

Atención 24/7/365 automatizada
Respuesta instantánea garantizada
Múltiples conversaciones simultáneas
Sin costos de personal adicional
Capacidad ilimitada de manejo
💰 Beneficios Económicos

Eliminación de costos operativos fijos
Reducción del costo por lead calificado
Sin gastos de capacitación ni rotación
Retorno de inversión rápido y medible
Conversión de gasto fijo a variable
Mayor productividad por asesor
Proceso de Implementación

🏗️ Fase 1: Recopilación de Información (5 días hábiles)

Tu constructora comparte planillas de precios, variantes, detalles de modelos, documento de onboarding completo y exportación de chats históricos de WhatsApp entre asesores y leads para garantizar robustez estadística.
🤝 Fase 2: Desarrollo Colaborativo (Trabajo en equipo)

Analizamos categorías de preguntas y respuestas de tus asesores, validamos conjuntamente el FAQ base y complementamos con información web relevante para crear una base de conocimiento completa.
🎯 Fase 3: Entrenamiento y Optimización (Responsabilidad nuestra)

Realizamos pruebas de calidad exhaustivas, entrenamiento en mejores prácticas de ventas inmobiliarias adaptadas a tu marca y garantizamos robustez tecnológica.
✅ Fase 4: Entrega y Prueba Gratuita

Recibes tu Agente IA Setter completamente funcional para probar durante el período acordado. Podrás interactuar libremente por WhatsApp y evaluar su rendimiento sin compromiso.
Compromiso de Calidad

Nuestra propuesta de desarrollo gratuito demuestra nuestra confianza en la calidad del producto. Asumimos completamente la inversión inicial porque sabemos que el resultado será tan impresionante que querrás implementarlo permanentemente en tu constructora.
La única condición: que nos proporciones toda la información necesaria en los primeros 5 días hábiles. Esto nos permite completar el desarrollo en 2 semanas desde el momento en que tenemos total acceso a la información y mantener nuestros costos controlados mientras te ofrecemos esta oportunidad única.
Requisito de Inversión para Implementación

Una vez que pruebes el agente durante el período gratuito y experimentes de primera mano su funcionamiento, podrás evaluar el verdadero impacto que puede tener en tu constructora.
Cuando compruebes personalmente:

✓
Todo el tiempo que libera para tu equipo: Tus asesores dejan de perder horas respondiendo consultas básicas y se enfocan 100% en cerrar ventas con leads pre-calificados.
✓
La rentabilidad del tiempo optimizado: Cada hora que tu equipo comercial invierte ahora es en conversaciones con personas que realmente pueden y quieren comprar, no en educar curiosos.
✓
El potencial de escalamiento: Puedes lanzar campañas de Meta Ads sabiendo que miles de consultas serán manejadas automáticamente, filtrando solo los leads genuinos para tu equipo.
✓
El control sobre tu crecimiento: Este sistema automatizado te permite decidir exactamente qué tan rápido quieres hacer crecer tu negocio, sin limitaciones de personal.
Si después de experimentar todos estos beneficios y entender cómo puede transformar tu operación comercial decides implementarlo permanentemente, necesitarás hacer una inversión para la instalación y puesta en marcha del sistema.

Inversión requerida para implementación: USD $1,000

Instalación, configuración y puesta en marcha completa
Esta propuesta está dirigida exclusivamente a constructoras que ven el valor en invertir en tecnología que puede generar uno de los mayores retornos en ventas y productividad. Si no puedes realizar esta inversión inicial, esta oportunidad no está alineada con tu situación actual.

¿Listo para Transformar tu Negocio?
Los cupos son limitados para mantener la calidad del servicio

📱 Escribime para verificar disponibilidad y coordinar una llamada
Sobre Nuestro Equipo

+9
Años de experiencia en publicidad digital
$10M
USD en ventas generadas para clientes
100%
Especialización en constructoras modulares
Contamos con un sistema avanzado de prompt engineering, inversión en tecnología de punta con agentes IA y CRM profesional, además de un equipo con experiencia listo para ayudarte a vender más.
Transforma tu proceso de ventas hoy. El futuro de la construcción modular comienza con la automatización inteligente.`,
    agentProfile: { 
      name: 'Grok', 
      company: 'Agente IA Setter' 
    },
    themeColors: { 
      primary: '#000000',   // Color principal en HEX
      secondary: '#FFFFFF'  // Color secundario en HEX
    },
    leadQualQuestions: [],
  },

  // ¡AQUÍ PUEDES AGREGAR TUS NUEVAS DEMOS!
  // Simplemente copia uno de los bloques de arriba y modifica los datos.
};


// --- Iconos SVG ---
const LogoIcon = ({ themeColors }) => ( <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4Z" stroke="url(#paint0_linear_logo)" strokeWidth="2"/><circle cx="16" cy="24" r="2" fill="url(#paint1_linear_logo)"/><circle cx="24" cy="24" r="2" fill="url(#paint2_linear_logo)"/><circle cx="32" cy="24" r="2" fill="url(#paint3_linear_logo)"/><defs><linearGradient id="paint0_linear_logo" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse"><stop stopColor={themeColors.secondary}/><stop offset="1" stopColor={themeColors.primary}/></linearGradient><linearGradient id="paint1_linear_logo" x1="14" y1="24" x2="18" y2="24" gradientUnits="userSpaceOnUse"><stop stopColor={themeColors.secondary}/><stop offset="1" stopColor={themeColors.primary}/></linearGradient><linearGradient id="paint2_linear_logo" x1="22" y1="24" x2="26" y2="24" gradientUnits="userSpaceOnUse"><stop stopColor={themeColors.primary}/><stop offset="1" stopColor={themeColors.secondary}/></linearGradient><linearGradient id="paint3_linear_logo" x1="30" y1="24" x2="34" y2="24" gradientUnits="userSpaceOnUse"><stop stopColor={themeColors.primary}/><stop offset="1" stopColor="#4F46E5"/></linearGradient></defs></svg> );
const SendIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send"><path d="m22 2-7 20-4-9-9-4Z" /><path d="m22 2-11 11" /></svg> );
const UploadIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload-cloud"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M12 12v9" /><path d="m16 16-4-4-4 4" /></svg> );
const ResetIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-cw"><path d="M21 2v6h-6" /><path d="M21 13a9 9 0 1 1-3-7.7L21 8" /></svg> );
const ShareIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-share-2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" /></svg> );
const SparkleIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg> );
const BackIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg> );
const LinkIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"/></svg> );
const PaperclipIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-paperclip"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.59a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg> );
const VolumeOnIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg> );
const VolumeOffIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-x"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg> );
const MicIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mic"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg> );
const CrmIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users-round"><path d="M18 21a8 8 0 0 0-12 0"/><circle cx="12" cy="11" r="4"/><rect width="16" height="16" x="4" y="3" rx="2"/></svg> );
const ColorPaletteIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-palette"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.668 0-.92-.722-1.667-1.648-1.667-.926 0-1.648-.746-1.648-1.668 0-.92-.722-1.667-1.648-1.667-.926 0-1.648-.746-1.648-1.668 0-.92-.722-1.667-1.648-1.667A6.5 6.5 0 0 1 12 2Z"/></svg>);


// --- Funciones de API de Gemini ---
const callGeminiAPI = async (payload, useGrounding = false, retries = 3, delay = 1000) => {
    // eslint-disable-next-line no-undef
    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("API key for Gemini is missing. Please set REACT_APP_GEMINI_API_KEY environment variable.");
    }
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
    
    if (useGrounding) {
        payload.tools = [{ "google_search": {} }];
    }

    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) {
                const errorBody = await response.json(); console.error("API Error:", errorBody);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Attempt ${i + 1} failed:`, error);
            if (i < retries - 1) { await new Promise(res => setTimeout(res, delay * Math.pow(2, i))); } else { throw error; }
        }
    }
};

const callTtsAPI = async (textToSpeak) => {
    // eslint-disable-next-line no-undef
    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    if (!apiKey) {
        console.error("API key for Gemini is missing for TTS.");
        return null;
    }
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;
    const payload = {
        contents: [{ parts: [{ text: textToSpeak }] }],
        generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Charon" } } }
        },
        model: "gemini-2.5-flash-preview-tts"
    };

    try {
        const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        const part = result?.candidates?.[0]?.content?.parts?.[0];
        const audioData = part?.inlineData?.data;
        if (!audioData) throw new Error("No audio data received from TTS API.");
        return audioData;
    } catch (error) {
        console.error("Error calling TTS API:", error);
        return null;
    }
};

// --- Funciones de Utilidad de Audio ---
const base64ToArrayBuffer = (base64) => {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
};

const pcmToWav = (pcmData, sampleRate) => {
    const numChannels = 1;
    const bytesPerSample = 2; // 16-bit PCM
    const blockAlign = numChannels * bytesPerSample;
    const byteRate = sampleRate * blockAlign;
    const dataSize = pcmData.length * bytesPerSample;
    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);
    view.setUint32(0, 0x52494646, false); view.setUint32(4, 36 + dataSize, true); view.setUint32(8, 0x57415645, false);
    view.setUint32(12, 0x666d7420, false); view.setUint32(16, 16, true); view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true); view.setUint32(24, sampleRate, true); view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true); view.setUint16(34, 16, true); view.setUint32(36, 0x64617461, false);
    view.setUint32(40, dataSize, true);
    const pcm16 = new Int16Array(pcmData.buffer);
    for (let i = 0; i < pcm16.length; i++) {
        view.setInt16(44 + i * 2, pcm16[i], true);
    }
    return new Blob([view], { type: 'audio/wav' });
};


// --- Componentes ---

const WelcomeScreen = ({ onStart, themeColors }) => (
    <div className="text-center p-8 max-w-lg mx-auto">
        <div className="flex justify-center items-center gap-3 mb-6"> <LogoIcon themeColors={themeColors} />
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-white">BotBoxx</h1>
        </div>
        <p className="text-lg md:text-xl text-gray-300 mb-10"> Cargá tu info y charlá con tu agente de IA personalizado en segundos. </p>
        <button onClick={onStart} className="bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/60 transition-all duration-300 transform hover:scale-105"> Crear Demo </button>
    </div>
);

const KnowledgeUploader = ({ onBotStart, initialKnowledge = '', initialImage = null, initialLeadQuestions, onLeadQuestionsChange, initialAgentProfile, onAgentProfileChange, themeColors, onThemeColorsChange }) => {
    const [knowledge, setKnowledge] = useState(initialKnowledge);
    const [uploadedImage, setUploadedImage] = useState(initialImage);
    const [urlInput, setUrlInput] = useState('');
    const [importedUrl, setImportedUrl] = useState('');
    const [error, setError] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [insights, setInsights] = useState(null);
    const [isLoadingFile, setIsLoadingFile] = useState(false);
    const [isLoadingUrl, setIsLoadingUrl] = useState(false);
    const fileInputRef = useRef(null);

    const handleStart = () => {
        if (knowledge.trim().length < 20 && !uploadedImage) {
            setError('Por favor, cargá información válida (texto, PDF, imagen o URL).'); return;
        }
        setError(''); onBotStart(knowledge, uploadedImage, importedUrl, initialLeadQuestions.filter(q => q.trim() !== ''), initialAgentProfile, themeColors);
    };

    const handleUrlImport = async () => {
        if (!urlInput.startsWith('http')) { setError('Por favor, ingresá una URL válida.'); return; }
        setIsLoadingUrl(true); setError('');
        try {
            const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(urlInput)}`;
            const response = await fetch(proxyUrl);
            if (!response.ok) throw new Error('La respuesta de la red no fue correcta.');
            const htmlText = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, 'text/html');
            doc.querySelectorAll('script, style, nav, footer, header, aside').forEach(el => el.remove());
            const bodyText = doc.body.textContent || "";
            const cleanText = bodyText.replace(/\s\s+/g, ' ').trim();
            if (cleanText.length < 50) throw new Error("No se encontró suficiente contenido de texto en la página.");
            setKnowledge(prev => (prev + '\n\n' + cleanText).trim().slice(0, 50000));
            setImportedUrl(urlInput); setUrlInput('');
        } catch (err) {
            console.error("Error importando desde URL:", err);
            setError("No se pudo importar el contenido. La web puede estar protegida.");
        } finally { setIsLoadingUrl(false); }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0]; if (!file) return;
        setIsLoadingFile(true); setError('');
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => { setUploadedImage({ name: file.name, data: e.target.result, type: file.type }); setIsLoadingFile(false); };
            reader.readAsDataURL(file);
        } else if (file.type === 'application/pdf') {
            // eslint-disable-next-line no-undef
            if (!pdfjsLib) { setError("La librería para leer PDF no está cargada. Intenta de nuevo."); setIsLoadingFile(false); return; }
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    // eslint-disable-next-line no-undef
                    const pdf = await pdfjsLib.getDocument({ data: e.target.result }).promise; let textContent = '';
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i); const text = await page.getTextContent();
                        textContent += text.items.map(s => s.str).join(' ');
                    }
                    setKnowledge(prev => (prev + '\n\n' + textContent).trim().slice(0, 50000));
                } catch (pdfError) { console.error("Error procesando PDF:", pdfError); setError("No se pudo leer el archivo PDF."); } 
                finally { setIsLoadingFile(false); }
            };
            reader.readAsArrayBuffer(file);
        } else if (file.type === 'text/plain') {
            const reader = new FileReader();
            reader.onload = (e) => { const text = e.target.result; setKnowledge(prev => (prev + '\n\n' + text).trim().slice(0, 50000)); setIsLoadingFile(false); };
            reader.readAsText(file);
        } else { setError("Formato de archivo no soportado. Por favor, sube .txt, .pdf o una imagen."); setIsLoadingFile(false); }
        event.target.value = null;
    };

    const handleGenerateInsights = async () => {
        if (knowledge.trim().length < 50) { setError('Necesitas al menos 50 caracteres para analizar el contenido.'); return; }
        setIsGenerating(true); setError(''); setInsights(null);
        const systemInstruction = { parts: [{ text: "Eres un experto analista. resume el siguiente texto en una o dos frases. Luego, basándote en el texto, genera 3 preguntas de ejemplo que un usuario podría hacer. Responde en español y devuelve un objeto JSON con las claves 'summary' (string) y 'questions' (array de strings)." }] };
        const payload = { 
            contents: [{ parts: [{ text: knowledge }] }], 
            systemInstruction, 
            generationConfig: { 
                responseMimeType: "application/json", 
                responseSchema: { type: "OBJECT", properties: { summary: { type: "STRING" }, questions: { type: "ARRAY", items: { type: "STRING" }}}, required: ["summary", "questions"]},
            }
        };
        try {
            const result = await callGeminiAPI(payload, true);
            const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) setInsights(JSON.parse(text)); else throw new Error("Respuesta inesperada de la API.");
        } catch (error) { console.error("Error al generar insights:", error); setError("No se pudo analizar el contenido. Inténtalo de nuevo."); } 
        finally { setIsGenerating(false); }
    };
    
    return (
        <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-gray-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Configurá tu Agente</h2>
            <p className="text-gray-300 mb-6 text-center">Pegá texto, importá desde una URL o subí archivos para darle vida a tu bot.</p>
            
            <div className="my-6 p-4 border border-[var(--primary-color-faded)] rounded-lg bg-[var(--primary-color-dark)]" style={{ '--primary-color-faded': `${themeColors.primary}33`, '--primary-color-dark': `${themeColors.primary}1A`, '--primary-color-light': themeColors.primary }}>
                 <h3 className="text-lg font-bold text-[var(--primary-color-light)] text-center mb-3">Identidad del Agente</h3>
                 <div className="grid md:grid-cols-2 gap-3">
                    <input type="text" value={initialAgentProfile.name} onChange={(e) => onAgentProfileChange('name', e.target.value)} placeholder="Nombre del bot (ej: Boti)" className="w-full bg-gray-800/60 border-2 border-white/10 text-gray-200 rounded-lg p-2 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition-all"/>
                    <input type="text" value={initialAgentProfile.company} onChange={(e) => onAgentProfileChange('company', e.target.value)} placeholder="Nombre de tu empresa" className="w-full bg-gray-800/60 border-2 border-white/10 text-gray-200 rounded-lg p-2 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition-all"/>
                 </div>
            </div>

            <div className="relative group mb-4">
                <textarea value={knowledge} onChange={(e) => { setKnowledge(e.target.value.slice(0, 50000)); if (error) setError(''); }} placeholder="Pegá acá el contenido que quieras enseñar al bot..." className="w-full h-40 p-4 bg-gray-800/60 border-2 border-white/10 text-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition-all resize-none" maxLength="50000"></textarea>
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">{knowledge.length} / 50000</div>
            </div>
            <div className="relative flex items-center gap-2 mb-2">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><LinkIcon /></div>
                <input type="url" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleUrlImport()} placeholder="O pegá una URL para importar su contenido" className="w-full bg-gray-800/60 border-2 border-white/10 text-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition-all pl-12 pr-32 py-3"/>
                <button onClick={handleUrlImport} disabled={isLoadingUrl} className="absolute right-2 top-1/2 -translate-y-1/2 bg-[var(--primary-color)] text-white font-semibold py-2 px-4 rounded-md hover:bg-[var(--secondary-color)] transition-all disabled:opacity-50 disabled:cursor-wait">{isLoadingUrl ? 'Importando...' : 'Importar'}</button>
            </div>
            <p className="text-xs text-center text-gray-500 mb-6">Nota: La importación puede no funcionar en todas las webs debido a restricciones de seguridad (CORS).</p>

            <div className="my-6 p-4 border border-[var(--primary-color-faded)] rounded-lg bg-[var(--primary-color-dark)]" style={{ '--primary-color-faded': `${themeColors.primary}33`, '--primary-color-dark': `${themeColors.primary}1A`, '--primary-color-light': themeColors.primary }}>
                 <h3 className="text-lg font-bold text-[var(--primary-color-light)] text-center mb-3">✨ Módulo de Venta (Opcional)</h3>
                 <p className="text-sm text-center text-gray-400 mb-4">Definí preguntas para que el bot cualifique leads automáticamente.</p>
                 <div className="space-y-3">
                    {[0, 1, 2].map(index => (
                        <input key={index} type="text" value={initialLeadQuestions[index] || ''} onChange={(e) => onLeadQuestionsChange(index, e.target.value)} placeholder={`Pregunta de cualificación ${index + 1}`} className="w-full bg-gray-800/60 border-2 border-white/10 text-gray-200 rounded-lg p-2 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition-all"/>
                    ))}
                 </div>
            </div>
             <div className="my-6 p-4 border border-[var(--primary-color-faded)] rounded-lg bg-[var(--primary-color-dark)]" style={{ '--primary-color-faded': `${themeColors.primary}33`, '--primary-color-dark': `${themeColors.primary}1A`, '--primary-color-light': themeColors.primary }}>
                <h3 className="text-lg font-bold text-[var(--primary-color-light)] text-center mb-3 flex items-center justify-center gap-2"><ColorPaletteIcon /> Personalización Visual</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center">
                        <label className="text-sm text-gray-300 mb-2">Color Primario</label>
                        <input type="color" value={themeColors.primary} onChange={(e) => onThemeColorsChange('primary', e.target.value)} className="w-16 h-10 bg-transparent border-none cursor-pointer" />
                    </div>
                    <div className="flex flex-col items-center">
                        <label className="text-sm text-gray-300 mb-2">Color Secundario</label>
                        <input type="color" value={themeColors.secondary} onChange={(e) => onThemeColorsChange('secondary', e.target.value)} className="w-16 h-10 bg-transparent border-none cursor-pointer" />
                    </div>
                </div>
            </div>

            {uploadedImage && (
                <div className="mt-4 p-2 border border-white/10 rounded-lg flex items-center justify-between bg-gray-800/70">
                    <div className="flex items-center gap-3"><img src={uploadedImage.data} alt="Vista previa" className="w-12 h-12 rounded object-cover" /><span className="text-sm text-gray-300 truncate">{uploadedImage.name}</span></div>
                    <button onClick={() => setUploadedImage(null)} className="text-red-400 hover:text-red-500 font-bold text-2xl px-2">&times;</button>
                </div>
            )}
            {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <button onClick={() => fileInputRef.current.click()} disabled={isLoadingFile} className="w-full flex items-center justify-center gap-2 bg-white/10 text-gray-200 font-semibold py-3 px-4 rounded-lg hover:bg-white/20 transition-all disabled:opacity-50 border border-white/10">{isLoadingFile ? 'Procesando...' : <><UploadIcon /> Subir Archivo</>}</button>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".txt,.pdf,image/*" />
                <button onClick={handleGenerateInsights} disabled={isGenerating || knowledge.trim().length < 50} className="w-full flex items-center justify-center gap-2 bg-amber-400/80 text-white font-bold py-3 px-6 rounded-lg shadow-md shadow-amber-500/30 hover:bg-amber-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-amber-400/50"><SparkleIcon /> {isGenerating ? 'Analizando...' : 'Analizar Texto'}</button>
            </div>
            {insights && (
                <div className="mt-6 p-4 bg-[var(--primary-color-dark)] border border-[var(--primary-color-faded)] rounded-lg animate-fade-in" style={{ '--primary-color-faded': `${themeColors.primary}33`, '--primary-color-dark': `${themeColors.primary}1A`, '--primary-color-light': themeColors.primary }}>
                    <h3 className="font-bold text-[var(--primary-color-light)]">Análisis del Contenido:</h3>
                    <p className="text-gray-300 mt-2 text-sm">"{insights.summary}"</p>
                    <h4 className="font-bold text-[var(--primary-color-light)] mt-4">Preguntas Sugeridas:</h4>
                    <ul className="list-disc list-inside mt-2 text-sm text-gray-300 space-y-1">
                        {insights.questions.map((q, i) => <li key={i}>{q}</li>)}
                    </ul>
                </div>
            )}
            <button onClick={handleStart} className="w-full mt-6 bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/60 transition-all duration-300 transform hover:scale-105">{initialKnowledge || initialImage ? 'Continuar Chat' : 'Iniciar Bot'}</button>
        </div>
    );
};

const ChatWindow = ({ knowledge, uploadedImage, leadQualQuestions, agentProfile, onReset, onShare, onBackToConfig, isTtsEnabled, onTtsToggle, themeColors }) => {
    const [messages, setMessages] = useState([
        { type: 'text', text: `¡Hola! Soy ${agentProfile.name || 'tu asistente virtual'}${agentProfile.company ? ` de ${agentProfile.company}`: ''}. Ya procesé la información. Preguntame lo que quieras 😉`, sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [imageToSend, setImageToSend] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [currentAudio, setCurrentAudio] = useState(null);
    const [conversationFlow, setConversationFlow] = useState({ type: 'normal', step: 0, data: {} });
    
    const messagesEndRef = useRef(null);
    const chatFileInputRef = useRef(null);
    const recognitionRef = useRef(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition && !recognitionRef.current) {
            const recognition = new SpeechRecognition();
            recognition.continuous = true; recognition.interimResults = true; recognition.lang = 'es-ES';
            recognition.onresult = (event) => {
                let fullFinalTranscript = ''; let currentInterimTranscript = '';
                for (let i = 0; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) { fullFinalTranscript += transcript; } else { currentInterimTranscript = transcript; }
                }
                setInput(fullFinalTranscript + currentInterimTranscript);
            };
            recognition.onend = () => setIsRecording(false);
            recognition.onerror = (event) => { console.error('Speech recognition error:', event.error); setIsRecording(false); };
            recognitionRef.current = recognition;
        }
        return () => { if(currentAudio) currentAudio.pause(); if (recognitionRef.current) recognitionRef.current.stop(); }
    }, [currentAudio]);

    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

    const playAudio = async (text) => {
        if (currentAudio) { currentAudio.pause(); }
        const audioData = await callTtsAPI(text);
        if (audioData) {
            const buffer = base64ToArrayBuffer(audioData);
            const pcm16 = new Int16Array(buffer);
            const wavBlob = pcmToWav(pcm16, 24000);
            const audioUrl = URL.createObjectURL(wavBlob);
            const audio = new Audio(audioUrl);
            setCurrentAudio(audio);
            audio.play();
        }
    };

    const addMessage = (message) => {
        setMessages(prev => [...prev, message]);
        if (isTtsEnabled && message.sender === 'bot' && message.type === 'text' && message.text) { playAudio(message.text); }
    };
    
    const getGeminiChatResponse = async (chatHistory, question, context, initialImage, currentImage) => {
        let systemText = `Actúa como un asistente amigable y profesional llamado ${agentProfile.name || 'Asistente'}. Eres el asistente virtual de ${agentProfile.company || 'la empresa'}. Tu base de conocimiento es ESTRICTAMENTE la siguiente información. No inventes información. Si no encuentras la respuesta en la base de conocimiento, tienes permitido usar conocimiento general para responder, pero siempre prioriza la información provista.`;
        if (context) { systemText += `\n\n---CONTEXTO DE TEXTO---\n${context}\n---FIN DE CONTEXTO---`; }
        if (initialImage) { systemText += `\n\nAdicionalmente, tienes una imagen de contexto general.`; }
        systemText += `\n\nResponde las preguntas del usuario basándote primero en la información proporcionada. Si la pregunta no se puede responder con eso, usa tu conocimiento general. Responde siempre en español. Formatea las listas con asteriscos (*).`;
        
        const historyContents = chatHistory.filter(msg => msg.type === 'text').map(msg => ({ role: msg.sender === 'user' ? 'user' : 'model', parts: [{ text: msg.text }] }));
        const userParts = [{ text: question }];
        const imageForPrompt = currentImage || initialImage;
        if (imageForPrompt) { userParts.push({ inlineData: { mimeType: imageForPrompt.type, data: imageForPrompt.data.split(',')[1] } }); }
        
        const payload = { 
            contents: [ ...historyContents, { role: 'user', parts: userParts }],
            systemInstruction: {
                parts: [{ text: systemText }]
            }
        };
        
        try {
            const result = await callGeminiAPI(payload, true);
            const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
            return text || "Lo siento, no pude procesar tu pregunta en este momento.";
        } catch (error) { console.error("Error en la respuesta del chat de Gemini:", error); return "Hubo un problema al contactar a la IA."; }
    };
    
    const handleImageFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageToSend({ name: file.name, data: e.target.result, type: file.type });
            };
            reader.readAsDataURL(file);
        }
        event.target.value = null;
    };
    
    const handleFlows = {
        leadQual: (step, data, userInput) => {
            const nextStep = step + 1;
            const validQuestions = leadQualQuestions.filter(q => q && q.trim() !== '');
            const newData = { ...data, [`q${step}`]: userInput };

            if (step < validQuestions.length) {
                addMessage({ type: 'text', text: validQuestions[step], sender: 'bot' });
                setConversationFlow({ type: 'leadQual', step: nextStep, data });
            } else if (step === validQuestions.length) {
                addMessage({ type: 'text', text: 'Excelente. Para continuar, ¿cuál es tu nombre?', sender: 'bot' });
                setConversationFlow({ type: 'leadQual', step: nextStep, data: newData });
            } else if (step === validQuestions.length + 1) {
                addMessage({ type: 'text', text: `Gracias, ${userInput}. Y por último, ¿tu correo electrónico?`, sender: 'bot' });
                setConversationFlow({ type: 'leadQual', step: nextStep, data: { ...newData, name: userInput } });
            } else {
                const finalData = { ...newData, email: userInput };
                addMessage({ type: 'text', text: '¡Perfecto! He enviado tus datos a nuestro equipo. Te contactarán a la brevedad.', sender: 'bot' });
                addMessage({ type: 'crm-notification', data: finalData, sender: 'system' });
                setConversationFlow({ type: 'normal', step: 0, data: {} });
            }
        },
        scheduling: (step, data, userInput) => {
            if (step === 1) {
                addMessage({ type: 'text', text: `¡Genial! Agendando para el ${data.day} a las ${data.time}. ¿Cuál es tu nombre?`, sender: 'bot' });
                setConversationFlow({ type: 'scheduling', step: 2, data });
            } else if (step === 2) {
                addMessage({ type: 'text', text: `Gracias, ${userInput}. ¿Y tu correo electrónico para enviarte la confirmación?`, sender: 'bot' });
                setConversationFlow({ type: 'scheduling', step: 3, data: { ...data, name: userInput } });
            } else if (step === 3) {
                const finalData = { ...data, email: userInput };
                addMessage({ type: 'text', text: `¡Confirmado, ${finalData.name}! Tu cita para el ${finalData.day} a las ${finalData.time} ha sido agendada. Te envié un mail a ${finalData.email}.`, sender: 'bot' });
                setConversationFlow({ type: 'normal', step: 0, data: {} });
            }
        }
    };

    const handleSend = async () => {
        if (isRecording) { recognitionRef.current.stop(); setIsRecording(false); }
        const currentInput = input.trim();
        if (currentInput === '' && !imageToSend) return;
        
        const userMessage = { type: 'text', text: currentInput, sender: 'user', image: imageToSend };
        addMessage(userMessage);
        const currentImage = imageToSend;
        setInput(''); setImageToSend(null);
        
        if (conversationFlow.type !== 'normal') {
            handleFlows[conversationFlow.type](conversationFlow.step, conversationFlow.data, currentInput);
            return;
        }

        const lowerInput = currentInput.toLowerCase();
        if (leadQualQuestions.some(q => q && q.trim() !== '') && ['precio', 'información', 'contratar', 'comprar', 'servicio'].some(kw => lowerInput.includes(kw))) {
            addMessage({ type: 'text', text: '¡Claro! Para darte la mejor información, ¿puedo hacerte un par de preguntas?', sender: 'bot' });
            handleFlows.leadQual(0, {}, null);
            return;
        }
        if (['cita', 'reunión', 'agendar', 'horario'].some(kw => lowerInput.includes(kw))) {
            addMessage({ type: 'calendar', sender: 'bot' });
            setConversationFlow({ type: 'scheduling', step: 1, data: {} });
            return;
        }

        setIsTyping(true);
        const botResponseText = await getGeminiChatResponse(messages, currentInput, knowledge, uploadedImage, currentImage);
        setIsTyping(false);
        addMessage({ type: 'text', text: botResponseText, sender: 'bot' });
    };

    const handleCalendarSelect = (day, time) => {
        const formattedDate = day.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric' });
        const message = { type: 'text', text: `Seleccioné el ${formattedDate} a las ${time}.`, sender: 'user' };
        addMessage(message);
        handleFlows.scheduling(1, { day: formattedDate, time }, null);
    };

    const toggleRecording = () => {
        if (!recognitionRef.current) { alert("El reconocimiento de voz no es compatible en este navegador."); return; }
        if (isRecording) { recognitionRef.current.stop(); } else { setInput(''); recognitionRef.current.start(); }
        setIsRecording(!isRecording);
    };

    return (
      <div className="fixed bottom-0 right-0 sm:bottom-8 sm:right-8 w-full h-full sm:w-96 sm:h-[600px] bg-gray-900/50 backdrop-blur-xl rounded-none sm:rounded-2xl shadow-2xl flex flex-col transition-all duration-300 border border-white/10 z-20">
            <div className="p-4 bg-transparent text-white flex justify-between items-center rounded-t-none sm:rounded-t-2xl border-b border-white/10">
                <div className="flex items-center gap-3"><button onClick={onBackToConfig} title="Volver a Configuración" className="p-2 hover:bg-white/10 rounded-full transition-colors"><BackIcon /></button> <h3 className="font-bold text-lg">{agentProfile.name || "Tu Agente IA"}</h3></div>
                <div className="flex items-center gap-1">
                    <button onClick={onTtsToggle} title={isTtsEnabled ? "Desactivar Voz" : "Activar Voz"} className={`p-2 hover:bg-white/10 rounded-full transition-colors ${isTtsEnabled ? 'text-[var(--primary-color)]' : 'text-white'}`}>{isTtsEnabled ? <VolumeOnIcon /> : <VolumeOffIcon />}</button>
                    <button onClick={onShare} title="Compartir Demo" className="p-2 hover:bg-white/10 rounded-full transition-colors"><ShareIcon /></button>
                    <button onClick={onReset} title="Resetear Demo" className="p-2 hover:bg-white/10 rounded-full transition-colors"><ResetIcon /></button>
                </div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((msg, index) => {
                    if (msg.type === 'calendar') {
                        return <div key={index} className="flex justify-start mb-3"><div className="max-w-[80%] py-2 px-4 rounded-2xl bg-gray-800/80 text-gray-200 rounded-bl-none"><CalendarWidget onSelect={handleCalendarSelect} themeColors={themeColors} /></div></div>
                    }
                    if (msg.type === 'crm-notification') {
                        return <div key={index} className="flex justify-start mb-3"><CrmNotification leadData={msg.data} /></div>
                    }
                    return (
                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-3`}>
                            <div className={`max-w-[80%] py-2 px-4 rounded-2xl ${msg.sender === 'user' ? 'bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] text-white rounded-br-none' : 'bg-gray-800/80 text-gray-200 rounded-bl-none'}`}>
                               {msg.image && <img src={msg.image.data} alt="Adjunto" className="rounded-lg mb-2 max-w-full h-auto" />}
                               {msg.text && (msg.sender === 'bot' ? <MarkdownRenderer text={msg.text} /> : msg.text)}
                            </div>
                        </div>
                    );
                })}
                {isTyping && (
                    <div className="flex justify-start mb-3">
                         <div className="bg-gray-800/80 py-2 px-4 rounded-2xl rounded-bl-none">
                            <div className="flex items-center justify-center gap-1.5">
                                <span className="animate-bounce w-2 h-2 bg-gray-400 rounded-full"></span>
                                <span className="animate-bounce w-2 h-2 bg-gray-400 rounded-full" style={{animationDelay: '0.1s'}}></span>
                                <span className="animate-bounce w-2 h-2 bg-gray-400 rounded-full" style={{animationDelay: '0.2s'}}></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-white/10 bg-transparent">
                 {imageToSend && (
                    <div className="relative p-2 mb-2 border border-white/10 rounded-lg flex items-center justify-between bg-gray-800/70">
                        <div className="flex items-center gap-3"><img src={imageToSend.data} alt="Vista previa" className="w-10 h-10 rounded object-cover" /><span className="text-sm text-gray-300 truncate">{imageToSend.name}</span></div>
                        <button onClick={() => setImageToSend(null)} className="text-red-400 hover:text-red-500 font-bold text-2xl px-2">&times;</button>
                    </div>
                )}
                <div className="relative flex items-center">
                    <input type="file" ref={chatFileInputRef} onChange={handleImageFileChange} className="hidden" accept="image/*" />
                    <button onClick={() => chatFileInputRef.current.click()} title="Adjuntar Imagen" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"><PaperclipIcon /></button>
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Escribí o grabá un mensaje..." className="w-full py-3 pl-12 pr-28 text-white bg-gray-800/70 border-2 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <button onClick={toggleRecording} title={isRecording ? "Detener Grabación" : "Grabar Voz"} className={`p-2 transition-colors rounded-full ${isRecording ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-white'}`}><MicIcon /></button>
                        <button onClick={handleSend} className="bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] text-white p-2.5 rounded-full hover:scale-110 transition-transform"><SendIcon /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const MarkdownRenderer = ({ text }) => {
    const formatText = (inputText) => {
        let formattedText = inputText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
        formattedText = formattedText.split('\n').map(line => {
            if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) { return `<li>${line.trim().substring(2)}</li>`; }
            return line;
        }).join('');
        if (formattedText.includes('<li>')) { formattedText = '<ul>' + formattedText.replace(/<\/li><li>/g, '</li><li>') + '</ul>'; }
        return formattedText.replace(/\n/g, '<br />').replace(/<ul><br \/>/g, '<ul>').replace(/<br \/><\/ul>/g, '</ul>');
    };
    return <div className="prose-chat" dangerouslySetInnerHTML={{ __html: formatText(text || '') }} />;
};

const CalendarWidget = ({ onSelect, themeColors }) => {
    const today = new Date();
    const days = Array.from({ length: 4 }, (_, i) => new Date(new Date().setDate(today.getDate() + i + 1)));
    const timeSlots = ["10:00", "11:30", "14:00", "15:30", "17:00"];
    
    return (
        <div className="p-2">
            <p className="font-bold mb-2 text-white">Seleccioná un día y horario:</p>
            <div className="flex justify-around mb-3">
                {days.map((day, i) => (
                    <div key={i} className="text-center">
                        <div className="text-xs text-gray-400">{day.toLocaleDateString('es-ES', { weekday: 'short' })}</div>
                        <div className="font-bold text-lg">{day.getDate()}</div>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-3 gap-2">
                {timeSlots.map(time => (
                    <button key={time} onClick={() => onSelect(days[1], time)} className="bg-[var(--primary-color-faded)] text-white text-sm py-1 rounded hover:bg-[var(--primary-color)] transition-colors" style={{'--primary-color-faded': `${themeColors.primary}80`}}>
                        {time}
                    </button>
                ))}
            </div>
        </div>
    );
};

const CrmNotification = ({ leadData }) => (
    <div className="bg-gray-700/80 p-3 rounded-lg border border-white/10 animate-fade-in">
        <div className="flex items-center gap-3">
            <div className="bg-green-500/20 text-green-400 p-2 rounded-full"><CrmIcon /></div>
            <div>
                <p className="font-bold text-sm text-green-400">Nuevo Lead Cualificado</p>
                <p className="text-xs text-gray-300">
                    {leadData.name} ({leadData.email}) ha sido agregado al CRM.
                </p>
            </div>
        </div>
    </div>
);

const BrandedBackground = ({ url }) => {
    if (!url) return null;
    let domain = '';
    try { domain = new URL(url).hostname.replace('www.', ''); } catch (e) { return null; }
    return (
        <>
            <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>
            <div className="pointer-events-none absolute inset-0 bg-spotlight z-0"></div>
            <div className="absolute inset-0 flex items-center justify-center z-0">
                <div className="text-center transform -rotate-12 select-none">
                    <h1 className="text-[12vw] font-black text-white/5 leading-none">{domain}</h1>
                    <h1 className="text-[12vw] font-black text-white/5 leading-none -mt-[3vw]">{domain}</h1>
                </div>
            </div>
        </>
    );
};


// --- Componente Principal App ---
export default function App() {
    const [appState, setAppState] = React.useState('welcome');
    const [knowledge, setKnowledge] = React.useState('');
    const [uploadedImage, setUploadedImage] = React.useState(null);
    const [importedUrl, setImportedUrl] = React.useState('');
    const [isTtsEnabled, setIsTtsEnabled] = React.useState(false);
    const [showCopied, setShowCopied] = React.useState(false);
    const [leadQualQuestions, setLeadQualQuestions] = React.useState(['', '', '']);
    const [agentProfile, setAgentProfile] = React.useState({ name: '', company: '' });
    const [themeColors, setThemeColors] = React.useState({ primary: '#6366F1', secondary: '#A78BFA' });
    const mainRef = React.useRef(null);

    React.useEffect(() => {
        const handleMouseMove = (event) => { if (mainRef.current) { mainRef.current.style.setProperty('--mouse-x', `${event.clientX}px`); mainRef.current.style.setProperty('--mouse-y', `${event.clientY}px`); } };
        window.addEventListener('mousemove', handleMouseMove);
        
        const script = document.createElement('script'); 
        script.src = "https://mozilla.github.io/pdf.js/build/pdf.mjs"; 
        script.type = "module";
        script.onload = () => { 
             // eslint-disable-next-line no-undef
            if(typeof pdfjsLib !== 'undefined') {
                 // eslint-disable-next-line no-undef
                window.pdfjsLib = pdfjsLib; 
                window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://mozilla.github.io/pdf.js/build/pdf.worker.mjs"; 
            }
        };
        document.body.appendChild(script);
        
        const urlParams = new URLSearchParams(window.location.search); 
        const demoSlug = urlParams.get('demo');

        if (demoSlug && demoPresets[demoSlug]) {
            const preset = demoPresets[demoSlug];
            setKnowledge(preset.knowledge || '');
            setAgentProfile(preset.agentProfile || { name: '', company: '' });
            setThemeColors(preset.themeColors || { primary: '#6366F1', secondary: '#A78BFA' });
            setLeadQualQuestions(preset.leadQualQuestions || ['', '', '']);
            setAppState('chat');
        } else {
            const demoData = urlParams.get('data');
            if (demoData) {
                try { 
                    const decodedKnowledge = atob(demoData); 
                    setKnowledge(decodedKnowledge); 
                    setAppState('chat'); 
                } 
                catch (e) { 
                    console.error("Error al decodificar la demo desde la URL:", e); 
                    window.history.replaceState({}, document.title, window.location.pathname); 
                }
            }
        }
        
        return () => { window.removeEventListener('mousemove', handleMouseMove); };
    }, []);
    
    const handleStartDemo = () => setAppState('config');
    const handleStartBot = (knowledgeData, imageData, url, leadQuestions, profile, colors) => {
        setKnowledge(knowledgeData); setUploadedImage(imageData); setImportedUrl(url); setLeadQualQuestions(leadQuestions); setAgentProfile(profile); setThemeColors(colors);
        setAppState('chat');
    };
    const handleReset = () => {
        setKnowledge(''); setUploadedImage(null); setImportedUrl(''); setIsTtsEnabled(false); 
        setLeadQualQuestions(['', '', '']); setAgentProfile({ name: '', company: '' });
        setThemeColors({ primary: '#6366F1', secondary: '#A78BFA' });
        setAppState('welcome');
        window.history.replaceState({}, document.title, window.location.pathname);
    };
    const handleBackToConfig = () => setAppState('config');

    const handleShare = () => {
        if (uploadedImage || importedUrl || leadQualQuestions.some(q => q.trim() !== '') || agentProfile.name || agentProfile.company) { 
            alert("La función de compartir no está disponible para demos con configuraciones avanzadas. Comparte demos solo basadas en texto simple."); return; 
        }
        try {
            const encodedKnowledge = btoa(knowledge); const shareUrl = `${window.location.origin}${window.location.pathname}?data=${encodedKnowledge}`;
            const textArea = document.createElement("textarea"); textArea.value = `¡Probá la demo de este agente IA que configuré con BotBoxx! 👉 ${shareUrl}`;
            document.body.appendChild(textArea); textArea.focus(); textArea.select(); document.execCommand('copy');
            document.body.removeChild(textArea); setShowCopied(true); setTimeout(() => setShowCopied(false), 2000);
        } catch (e) { console.error("Error al compartir:", e); alert("No se pudo copiar el enlace."); }
    };
    
    const handleLeadQuestionsChange = (index, value) => {
        const newQuestions = [...leadQualQuestions]; newQuestions[index] = value;
        setLeadQualQuestions(newQuestions);
    };

    const handleAgentProfileChange = (field, value) => {
        setAgentProfile(prev => ({ ...prev, [field]: value }));
    };

    const handleThemeColorsChange = (key, value) => {
        setThemeColors(prev => ({...prev, [key]: value}));
    };

    const renderContent = () => {
        switch (appState) {
            case 'welcome': return <WelcomeScreen onStart={handleStartDemo} themeColors={themeColors} />;
            case 'config': return <KnowledgeUploader onBotStart={handleStartBot} initialKnowledge={knowledge} initialImage={uploadedImage} initialLeadQuestions={leadQualQuestions} onLeadQuestionsChange={handleLeadQuestionsChange} initialAgentProfile={agentProfile} onAgentProfileChange={handleAgentProfileChange} themeColors={themeColors} onThemeColorsChange={handleThemeColorsChange} />;
            case 'chat': return <ChatWindow knowledge={knowledge} uploadedImage={uploadedImage} leadQualQuestions={leadQualQuestions} agentProfile={agentProfile} onReset={handleReset} onShare={handleShare} onBackToConfig={handleBackToConfig} isTtsEnabled={isTtsEnabled} onTtsToggle={() => setIsTtsEnabled(!isTtsEnabled)} themeColors={themeColors} />;
            default: return <WelcomeScreen onStart={handleStartDemo} themeColors={themeColors} />;
        }
    };

    return (
        <main ref={mainRef} className="bg-gray-900 min-h-screen w-full flex items-center justify-center font-sans relative overflow-hidden" style={{'--primary-color': themeColors.primary, '--secondary-color': themeColors.secondary}}>
            {appState === 'chat' && importedUrl ? <BrandedBackground url={importedUrl} /> : (<> <div className="absolute inset-0 bg-grid-pattern opacity-10"></div> <div className="pointer-events-none absolute inset-0 bg-spotlight"></div> </>)}
            <div className="w-full h-full z-20 flex items-center justify-center p-4"> {renderContent()} </div>
            {showCopied && (
                <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-gray-800 text-white py-2 px-4 rounded-lg shadow-lg animate-fade-in-out z-40 border border-white/10">
                    ¡Enlace de la demo copiado al portapapeles!
                </div>
            )}
            <style>{`
                :root {
                    --primary-color: ${themeColors.primary};
                    --secondary-color: ${themeColors.secondary};
                }
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;900&display=swap');
                .font-sans { font-family: 'Inter', sans-serif; }
                .bg-grid-pattern { background-image: linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px); background-size: 40px 40px; }
                .bg-spotlight { background: radial-gradient(150px circle at var(--mouse-x) var(--mouse-y), rgba(47, 41, 122, 0.20), transparent 80%); }
                @keyframes fade-in-out { 0%, 100% { opacity: 0; transform: translateY(-20px) translateX(-50%); } 10%, 90% { opacity: 1; transform: translateY(0) translateX(-50%); } }
                .animate-fade-in-out { animation: fade-in-out 2s ease-in-out forwards; }
                @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.5s ease-in-out forwards; }
                .prose-chat strong { font-weight: 700; color: #fff; }
                .prose-chat em { font-style: italic; color: #ddd; }
                .prose-chat ul { list-style-type: disc; padding-left: 20px; margin-top: 8px; margin-bottom: 8px; }
                .prose-chat li { margin-bottom: 4px; }
            `}</style>
        </main>
    );
}

