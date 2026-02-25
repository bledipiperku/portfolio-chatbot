import { RAGChat, groq } from "@upstash/rag-chat";
import { redis } from "./redis";

export const ragChat = new RAGChat({
  model: groq("llama-3.1-8b-instant", {
    apiKey: process.env.GROQ_API_KEY,
  }),
  redis: redis,
});
