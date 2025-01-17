import { Message, useChat } from "ai/react";
import { Messages } from "./Messages";
import { ChatInput } from "./ChatInput";

export const ChatWrapper = ({
  sessionId,
  initialMessages,
  isEmbedded = false,
}: {
  sessionId: string;
  initialMessages: Message[];
  isEmbedded?: boolean;
}) => {
  const { messages, handleInputChange, handleSubmit, input, setInput } =
    useChat({
      api: "/api/chat-stream",
      body: { sessionId },
      initialMessages,
    });

  const baseStyles =
    "fixed bottom-0 right-0 z-50 bg-zinc-800 shadow-2xl flex flex-col justify-between";

  const containerStyles = isEmbedded
    ? baseStyles
    : `${baseStyles} h-full w-full overflow-hidden divide-y divide-zinc-700 gap-2
       md:bottom-20 md:right-5 md:h-[650px] md:w-[450px] md:rounded-2xl`;

  return (
    <div className={containerStyles}>
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
