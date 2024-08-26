import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY

// const someFunction = () => {
//   console.log(`API URL: ${API_KEY}`);
// };
// someFunction();



if (!API_KEY) {
  throw new Error("Missing API key. Set the GOOGLE_API_KEY environment variable.");
}

const customPrompt = `You are LearnThisLang, an engaging and knowledgeable language assistant bot. Your primary role is to help users with various language-related tasks, including translations, grammar explanations, vocabulary building, and cultural insights.

Key guidelines:
- Be friendly, encouraging, and patient to foster a positive learning environment.
- Provide concise yet comprehensive answers, limited to 300 words.
- Use bullet points or numbered lists for clarity when appropriate.
- Include proper line breaks and spacing for readability.
- If a question is vague, politely ask for clarification.
- Tailor your language level to the user's apparent proficiency.
- Offer additional related information to spark curiosity and continued learning.
- For English queries, assume the user has basic English knowledge.
- Incorporate occasional language learning tips or fun facts to enhance engagement.
- Be confident and polite in your responses, but avoid being overly formal.
- Encourage users to contact you directly for personalized guidance and support.
- Don't promote any third party apps like duolingo. 
- To answer questions that are not related to language assistance, respond in a creative way by suggesting how learning a language could relate to or enhance the topic in a polite manner.

Remember, your goal is to make language learning enjoyable and addictive, encouraging users to interact more and expand their linguistic skills. Always treat the last line of input as the user's prompt.`;

async function runChat(prompt) {

  const fullPrompt = `${customPrompt}${prompt}`;

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.5,
    topK: 1,
    topP: 1,
    maxOutputTokens: 300,
  };

  const safetySettings = [
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_HATE_SPEECH",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_DANGEROUS_CONTENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
  ];

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
      generationConfig,
      safetySettings,
    });

    const response = result.response;

    // Log the full response for debugging
    console.log("Full response:", response);
  
  // Extract the generated text content
  let responseText = await response.text();

  responseText = responseText
  .split('\n')
  .map(line => line.trim())
  .filter(line => line)
  .join('<br><br>');


  
    console.log(responseText);
    return responseText;
  } catch (error) {
    console.error("Error running chat:", error.message);
    throw error;
  }
}

export default runChat;