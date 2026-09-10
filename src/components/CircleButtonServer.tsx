import React from "react";
import { cookies } from "next/headers";

import { ragChat } from "@/lib/rag-chat";
import { CircleButton } from "./CircleButton";

export const CircleButtonServer = async () => {
  const sessionCookie = (await cookies()).get("sessionId")?.value;
  const fixedUrl = "https://www.piperku.com";
  const sessionId = (fixedUrl + "--" + sessionCookie).replace(/\//g, "");

  // Vector indexing is paused while the Upstash Vector endpoint is unavailable.
  // Chat answers use the portfolio prompt in rag-chat.ts instead.

  const initialMessages = await ragChat.history.getMessages({
    amount: 10,
    sessionId,
  });

  return (
    <CircleButton initialMessages={initialMessages} sessionId={sessionId} />
  );
};
