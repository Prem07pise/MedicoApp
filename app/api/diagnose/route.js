
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  const { symptoms, age } = await req.json();

  if (!symptoms || symptoms.length === 0) {
    return new Response(JSON.stringify({ error: "Symptoms are required." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
    As an AI medical assistant, please analyze the following symptoms for a person of age ${age || 'not specified'}.

    Symptoms: ${symptoms.join(", ")}

    Based on these symptoms, provide:
    1.  A list of possible conditions, each with a confidence score (e.g., 85%).
    2.  A brief, easy-to-understand explanation for each potential condition.
    3.  A clear recommendation on the next steps (e.g., "Consult a general physician," "Seek immediate medical attention," "Rest and monitor symptoms").
    4.  A prominent disclaimer that this is not a medical diagnosis and a healthcare professional should be consulted.

    Structure your response as a JSON object with the following format:
    {
      "conditions": [
        {
          "name": "Condition Name",
          "confidence": "XX%",
          "explanation": "...",
          "recommendation": "..."
        }
      ],
      "disclaimer": "..."
    }
    `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    // Clean the response to extract only the JSON part
    const jsonResponse = text.match(/```json\n([\s\S]*?)\n```/);
    if (jsonResponse && jsonResponse[1]) {
      return new Response(jsonResponse[1], {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    else {
        // Fallback for when the model doesn't return the expected format
        return new Response(JSON.stringify({ error: "Failed to parse AI response.", rawResponse: text }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return new Response(JSON.stringify({ error: "Error calling Gemini API." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
