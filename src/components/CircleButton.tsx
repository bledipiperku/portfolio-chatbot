"use client";

import React, { useState } from "react";
import { ChevronDown, MessageSquare, X } from "lucide-react";
import { Message } from "ai/react";

import { ChatWrapper } from "./ChatWrapper";

interface CircleButtonProps {
  sessionId: string;
  initialMessages: Message[];
}

export const CircleButton: React.FC<CircleButtonProps> = ({
  sessionId,
  initialMessages,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleButton = () => {
    setIsExpanded((prev) => {
      const newState = !prev;
      // Send message to parent (portfolio) when state changes
      window.parent.postMessage(
        { type: "chatToggle", isExpanded: newState },
        "*"
      );
      return newState;
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        onClick={toggleButton}
        className="bg-white w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all z-50"
      >
        {isExpanded ? (
          <ChevronDown />
        ) : (
          <MessageSquare size={20} strokeWidth={"1.5"} />
        )}
      </button>

      {isExpanded && (
        <>
          <X
            className="top-2 right-3 z-[51] fixed block md:hidden"
            color="white"
            onClick={toggleButton}
          />
          <ChatWrapper
            sessionId={sessionId}
            initialMessages={initialMessages}
          />
        </>
      )}
    </div>
  );
};
