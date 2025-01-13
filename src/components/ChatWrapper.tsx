"use client";

import { Message, useChat } from "ai/react";
import { Messages } from "./Messages";
import { ChatInput } from "./ChatInput";

export const ChatWrapper = ({
  sessionId,
  initialMessages,
}: {
  sessionId: string;
  initialMessages: Message[];
}) => {
  const { messages, handleInputChange, handleSubmit, input, setInput } =
    useChat({
      api: "/api/chat-stream",
      body: { sessionId },
      initialMessages,
    });

  return (
    <div className="fixed bottom-20 right-5 h-[650px] w-[400px] overflow-hidden bg-zinc-800 rounded-2xl flex divide-y divide-zinc-700 flex-col justify-between gap-2">
      <header>
        <h2 className="text-lg font-semibold pt-2 text-center text-white">
          Portfolio AI Chatbot
        </h2>
      </header>

      <div className="flex-1 justify-between flex flex-col overflow-y-auto pb-[128px]">
        <Messages messages={messages} />
      </div>

      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        setInput={setInput}
      />
    </div>
  );
};
