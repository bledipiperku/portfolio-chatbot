import { NextRequest, NextResponse } from "next/server";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";

import { ragChat } from "@/lib/rag-chat";

export const POST = async (req: NextRequest) => {
  try {
    const { messages, sessionId } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "messages array is required" },
        { status: 400 },
      );
    }

    const lastMessage = messages[messages.length - 1]?.content;
    if (!lastMessage || typeof lastMessage !== "string") {
      return NextResponse.json(
        { error: "last message content is required" },
        { status: 400 },
      );
    }

    const response = await ragChat.chat(lastMessage, {
      streaming: true,
      sessionId,
      // Upstash Vector index currently 404s; chat still works via prompt + history
      disableRAG: true,
    });

    return aiUseChatAdapter(response);
  } catch (error) {
    console.error("chat-stream error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate chat response",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
};
