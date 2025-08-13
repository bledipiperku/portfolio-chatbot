import { RAGChat, groq } from "@upstash/rag-chat";
import { redis } from "./redis";

export const ragChat = new RAGChat({
  model: groq("llama3-8b-8192", {
    apiKey: process.env.GROQ_API_KEY,
  }),
  redis: redis,
});
