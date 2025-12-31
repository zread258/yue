
import { GoogleGenAI } from "@google/genai";

export const generateYaranWish = async (targetName: string = "Yaran"): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Generate a one-sentence, deeply poetic New Year's wish for "${targetName}" for the year 2026.
        Vibe: Soft, romantic, and elegant. 
        Focus: The magic of the new year and starting a fresh chapter together.
        Maximum 20 words.
      `,
      config: {
        temperature: 0.9,
        topP: 0.95,
      }
    });

    return response.text?.trim() || "May every star in 2026 lead me closer to the magic of you.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Let the year 2026 be as beautiful as the first moment our paths crossed.";
  }
};
