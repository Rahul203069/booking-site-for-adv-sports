import { GoogleGenAI } from "@google/genai";

// Initialize the API client
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateTripAdvice = async (location: string, activityType: string): Promise<string> => {
  if (!apiKey) return "AI services are currently unavailable. Please check your API configuration.";
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide 3 short, practical, and exciting tips for someone going ${activityType} in ${location}. Keep it under 100 words total. Format as a bulleted list.`,
    });
    return response.text || "Could not generate advice.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Could not retrieve travel tips at this time.";
  }
};

export const chatWithAssistant = async (message: string, context?: string): Promise<string> => {
   if (!apiKey) return "I can't chat right now. Please check API configuration.";
   
   try {
     const response = await ai.models.generateContent({
       model: 'gemini-3-flash-preview',
       contents: `You are a helpful travel assistant for an adventure booking app called Wanderlust. 
       Context: ${context || 'General inquiry'}
       User: ${message}
       Answer briefly and enthusiastically.`,
     });
     return response.text || "I didn't catch that.";
   } catch (error) {
     console.error("Gemini Chat Error:", error);
     return "Sorry, I'm having trouble connecting to the network.";
   }
}
