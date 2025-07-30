import { GoogleGenAI } from '@google/genai';

async function runChat(prompt) {
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY, // Public for testing only
  });

  const tools = [
    {
      googleSearch: {},
    },
  ];

  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    tools,
  };

  const model = 'gemini-2.5-pro';

  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  try {
    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let result = '';
    for await (const chunk of response) {
      if (chunk.text) {
        result += chunk.text;
        console.log(chunk.text); 
      }
    }

    return result;
  } catch (error) {
    console.error('Error:', error);
  }
}

export default runChat;
