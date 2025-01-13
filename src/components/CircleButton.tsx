"use client";
import React, { useState } from "react";
import { ChevronDown, MessageSquare } from "lucide-react";
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
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleButton = () => setIsExpanded((prev) => !prev);

  return (
    <div className="fixed bottom-5 right-6 z-50">
      <button
        onClick={toggleButton}
        className="flex bg-primary-500 text-white h-12 w-12 items-center justify-center rounded-full border-none"
      >
        {isExpanded ? <ChevronDown /> : <MessageSquare />}
      </button>

      {isExpanded && (
        <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />
      )}
    </div>
  );
};
