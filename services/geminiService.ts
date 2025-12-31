
import { GoogleGenAI } from "@google/genai";

export const generateNewYearWish = async (targetName: string = "Yue"): Promise<string> => {
  const apiKey = process.env.API_KEY;
  const requestedPoem = `Beyond the burning horizons of 2026 we fly,
Two starlit echoes written across the infinite sky.
Yue, in this cosmic vastness, our souls roam unbound,
Where time is a shadow and only our heartbeat is found.
Through the pulse of galaxies and the wild unknown,
We claim the universe as the only home we’ve ever known.`;

  if (!apiKey || apiKey === "") {
    return requestedPoem;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        You are a poet writing for a special person named "${targetName}".
        The user wants this EXACT poem or something extremely close to it in spirit and grandeur for the year 2026:
        
        "${requestedPoem}"

        Please provide the poem above. You may add a very subtle, elegant concluding line if you feel it enhances the 2026 New Year theme, but keep the core text identical to what the user provided.
      `,
      config: {
        temperature: 0.3, // Lower temperature to stick closer to the provided text
        topP: 0.95,
      }
    });

    return response.text?.trim() || requestedPoem;
  } catch (error) {
    console.error("Gemini Error:", error);
    return requestedPoem;
  }
};
