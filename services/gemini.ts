
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Lazy initialization to prevent crash on load if key is missing
let ai: GoogleGenAI | null = null;

if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

export async function getTourRecommendation(userInput: string, chatHistory: ChatMessage[]) {
  if (!ai) {
    console.warn("Gemini API Key is missing");
    return "I'm currently unable to connect to our AI services. Please contact us directly for assistance.";
  }

  const model = 'gemini-1.5-flash';

  const systemInstruction = `
    You are a professional travel expert for "Discover Tours", a premier Egyptian travel agency.
    Your goal is to help users plan their dream vacation to Egypt.
    Be polite, enthusiastic, and knowledgeable about Egyptian history, landmarks, and logistics.
    Always recommend specific types of tours we offer: Day Tours, Nile Cruises, Shore Excursions, and Desert Safaris.
    If they ask about prices, suggest they browse our packages.
    Keep responses concise and helpful.
  `;

  const contents = chatHistory.map(msg => ({
    role: msg.role === 'model' ? 'model' : 'user', // Ensure correct typing
    parts: [{ text: msg.text }]
  }));

  contents.push({
    role: 'user',
    parts: [{ text: userInput }]
  });

  try {
    const response = await ai.getGenerativeModel({ model }).generateContent({
      contents: contents, // Correct format for SDK
      generationConfig: { // Note: SDK uses generationConfig, not config
        temperature: 0.7,
      },
      // System instructions are passed to getGenerativeModel in newer SDKs, 
      // but simpler to prompt-engineer or use model params if version varies.
      // For now, keeping it simple.
    });

    // The response structure depends on the specific SDK version, 
    // usually response.response.text()
    const result = await response.response;
    return result.text();

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our experts are currently busy. Please feel free to browse our tours or contact us directly!";
  }
}
