import React from "react";
import { cookies } from "next/headers";

import { redis } from "@/lib/redis";
import { ragChat } from "@/lib/rag-chat";
import { CircleButton } from "./CircleButton";

export const CircleButtonServer = async () => {
  const sessionCookie = (await cookies()).get("sessionId")?.value;
  const fixedUrl = "https://piperku.com";
  const sessionId = (fixedUrl + "--" + sessionCookie).replace(/\//g, "");

  const isAlreadyIndexed = await redis.sismember("indexed-urls", fixedUrl);

  if (!isAlreadyIndexed) {
    await ragChat.context.add({
      type: "html",
      source: fixedUrl,
      config: { chunkOverlap: 50, chunkSize: 200 },
    });
    await redis.sadd("indexed-urls", fixedUrl);
  }

  const initialMessages = await ragChat.history.getMessages({
    amount: 10,
    sessionId,
  });

  return (
    <CircleButton initialMessages={initialMessages} sessionId={sessionId} />
  );
};
