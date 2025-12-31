
import { GoogleGenAI } from "@google/genai";

export const generateNewYearWish = async (targetName: string = "Yue"): Promise<string> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === "") {
    return "Across the boundless velvet sky,\nWhere ancient stars and freedom fly,\nI found my home within your light,\nA cosmic dance, forever bright.\nHappy 2026, Yue.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Write a grand, romantic, and free-spirited New Year's poem for "${targetName}" to welcome 2026.
        The poem should evoke the vastness of the universe, the feeling of infinite freedom, and a deep soul connection.
        Length: 4-6 lines. 
        Vibe: Cinematic, epic, and ethereal.
        Theme: Stars, horizons, and the journey of two souls through time.
        Language: English.
      `,
      config: {
        temperature: 0.9,
        topP: 0.95,
      }
    });

    return response.text?.trim() || "Beyond the reach of time and space,\nI found the magic in your face.\nA new year dawns, wild and free,\nAn infinite road for you and me.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Through the nebulae of distant years,\nBeyond the weight of mortal fears,\nOur love is written in the sun,\nA journey that has just begun.";
  }
};
