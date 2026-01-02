
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getTourRecommendation(userInput: string, chatHistory: ChatMessage[]) {
  const model = 'gemini-3-flash-preview';
  
  const systemInstruction = `
    You are a professional travel expert for "Discover Tours", a premier Egyptian travel agency.
    Your goal is to help users plan their dream vacation to Egypt.
    Be polite, enthusiastic, and knowledgeable about Egyptian history, landmarks, and logistics.
    Always recommend specific types of tours we offer: Day Tours, Nile Cruises, Shore Excursions, and Desert Safaris.
    If they ask about prices, suggest they browse our packages.
    Keep responses concise and helpful.
  `;

  const contents = chatHistory.map(msg => ({
    role: msg.role,
    parts: [{ text: msg.text }]
  }));

  contents.push({
    role: 'user',
    parts: [{ text: userInput }]
  });

  try {
    const response = await ai.models.generateContent({
      model,
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I'm sorry, I couldn't process that. How else can I help you plan your Egyptian adventure?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our experts are currently busy. Please feel free to browse our tours or contact us directly!";
  }
}
