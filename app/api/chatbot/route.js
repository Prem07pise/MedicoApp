
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  const { message } = await req.json();

  if (!message) {
    return new Response(JSON.stringify({ error: "Message is required." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    const result = await model.generateContentStream([message]);

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          controller.enqueue(chunk.text());
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return new Response(JSON.stringify({ error: "Error calling Gemini API." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
