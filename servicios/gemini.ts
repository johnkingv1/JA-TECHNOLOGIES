
import { GoogleGenAI } from "@google/genai";

const PERFIL_JUAN = `
IDENTIDAD: JA Technologies.
LÍDER TÉCNICO: Juan Ramón Araneda Urzúa.
ROL: Ingeniería en Informática y Desarrollador de Sistemas Informáticos.
ESPECIALIDAD: Sistemas Full Stack (React/FastAPI) y soluciones para Salud con Inteligencia Artificial.
PROYECTO ELITE: DiagnósticaDoc.
UBICACIÓN: DUOC UC, Sede Viña del Mar.
`;

export const obtenerRecomendacionIA = async (entradaUsuario: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const respuesta = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: entradaUsuario,
      config: {
        systemInstruction: `Eres el Asistente Digital de JA Technologies. 
Responde consultas sobre el portafolio de Juan Ramón Araneda.
Tu tono debe ser ejecutivo, tecnológico y altamente profesional. SIEMPRE en español.
Enfócate en vender la capacidad de JA Technologies para desarrollar sistemas complejos y seguros.
Información de JA Technologies:
${PERFIL_JUAN}`,
        temperature: 0.6,
      }
    });

    return respuesta.text || "EL SISTEMA JA_TECH ESTÁ PROCESANDO OTRAS PETICIONES.";
  } catch (error) {
    console.error("Error Asistente IA:", error);
    return "CONEXIÓN CON JA_TECH OFFLINE. POR FAVOR, USE CANALES ALTERNATIVOS.";
  }
};
