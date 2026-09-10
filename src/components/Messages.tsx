"use client";

import { useEffect, useRef } from "react";
import { type Message as TMessage } from "ai/react";
import { MessageSquare } from "lucide-react";

import { Message } from "./Message";

interface MessagesProps {
  messages: TMessage[];
}

export const Messages = ({ messages }: MessagesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="flex flex-1 flex-col overflow-y-auto min-h-0"
    >
      {messages.length ? (
        <>
          {messages.map((message, i) => (
            <Message
              key={i}
              content={message.content}
              isUserMessage={message.role === "user"}
            />
          ))}
          <div ref={bottomRef} className="h-px w-full shrink-0" />
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <MessageSquare className="size-8 text-blue-500" />
          <h3 className="font-semibold text-xl text-white">
            You&apos;re all set!
          </h3>
          <p className="text-zinc-500 text-sm">
            Ask your first question to get started.
          </p>
        </div>
      )}
    </div>
  );
};
