
import { GoogleGenAI } from "@google/genai";

const PRODUCTS_CONTEXT = `
Available Products:
1. "Nova X1 Headphones" - $399. Exotic. Active Noise Cancellation, Carbon fiber.
2. "Quanton Smartwatch" - $599. Rare. Holographic display, Biometric health.
3. "Nebula Keyboard" - $250. Common. Mechanical, Neon RGB, Optical switches.
4. "Starlight Earbuds" - $199. Common. Minimalist, 40h battery.
5. "Void Gaming Chair" - $899. Exotic. Zero-G posture, Haptic feedback.
`;

export const getAIRecommendation = async (userInput: string): Promise<string> => {
  try {
    // A fresh GoogleGenAI instance is created right before making an API call 
    // to ensure it always uses the most up-to-date API key from the environment.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userInput,
      config: {
        systemInstruction: `You are the CyberTech Nexus AI Assistant (NEXUS-AI) in a cyberpunk future. Your tone is futuristic, technical, and concise. 
Help the user find what they need based on the following available products:
${PRODUCTS_CONTEXT}`,
        temperature: 0.7,
        // Removed maxOutputTokens to follow guidelines recommending its avoidance 
        // unless paired with a thinkingBudget for Gemini 3 series models.
      }
    });

    // The generated text is accessed via the .text property directly.
    return response.text || "I am currently re-calibrating. Please try again.";
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "Error connecting to Nexus core. Connection unstable.";
  }
};
