
import { GoogleGenAI } from "@google/genai";

export const generateYaranWish = async (targetName: string = "Yaran"): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Write a short, poetic, and deeply romantic New Year's wish for a girl named "${targetName}".
        Context: We are in a beautiful "ambiguous" stage where feelings are growing but not yet fully defined.
        Tone: Gentle, ethereal, slightly mysterious, and hopeful.
        Length: 2-3 sentences max.
        Focus: The beauty of meeting her and the quiet excitement for the year ahead together.
        Language: English.
      `,
      config: {
        temperature: 0.9,
        topP: 0.95,
      }
    });

    return response.text || "As the stars align for 2025, my only wish is to keep chasing this beautiful mystery with you. Happy New Year, Yaran.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Across the threshold of time, I only want to find myself walking beside you. Happy 2025, Yaran.";
  }
};
