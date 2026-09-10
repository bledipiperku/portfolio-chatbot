import { RAGChat, groq } from "@upstash/rag-chat";
import { redis } from "./redis";

export const portfolioPromptFn = ({
  question,
  chatHistory,
  context,
}: {
  question: string;
  chatHistory?: string;
  context: string;
}) => `You are Bledi Piperku's portfolio assistant. Be concise and accurate.
Only use these facts and the chat history. If unknown, say you do not know.

Facts:
- Software engineer in North Macedonia, 5+ years experience
- React ecosystem: React, Next.js, TypeScript, React Native; also Node.js
- Builds web/mobile apps, admin tools, billing, real-time features, SEO/performance
- Recent: payments, licences, commitments on large-scale platforms
- Past: Niche (Founding Software Engineer), Digital Counsel, Create Ape/Beauty Books, GoConf, Cover Labs, Rottera
- Site: https://www.piperku.com

Chat history:
${chatHistory || ""}
Context:
${context || "none"}
Question: ${question}
Answer:`;

export const ragChat = new RAGChat({
  // llama-3.1-8b-instant was decommissioned on Groq (Aug 2026)
  // gpt-oss-20b is Groq's recommended fast replacement
  model: groq("openai/gpt-oss-20b", {
    apiKey: process.env.GROQ_API_KEY,
    temperature: 0.4,
  }),
  redis: redis,
  promptFn: portfolioPromptFn,
});
