// src/context/ChatContext.tsx
"use client";

import { useLanguageModelApi } from "@/hooks/use-language-model-api";
import { Message, USERS } from "@/lib/types";
import { nanoid } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { TasksToComplete, TaskStatus } from "@/lib/types"; // Import types

// Sample data
const DefaultTasksToComplete: TasksToComplete = {
  intent: "Buy groceries",
  goal: "Complete the grocery list",
  tasks: [
    {
      task_id: "1",
      description: "Buy milk",
      status: TaskStatus.PENDING,
    },
    {
      task_id: "2",
      description: "Buy eggs",
      status: TaskStatus.IN_PROGRESS,
    },
  ],
};

interface ChatContextType {
  messages: Message[];
  addMessage: (user: USERS, text: string) => void;
  clearMessages: () => void;
  isLoading: boolean;
  tasksToComplete: TasksToComplete[];
}

// Create the context with a default value (it can be undefined initially)
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Create the ChatContextProvider to manage chat state
export const ChatContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [tasksToComplete, setTasksToComplete] = useState<TasksToComplete[]>([]);

  const { mutate, isLoading, isSuccess, data } = useLanguageModelApi();

  // Add a new message to the chat
  const addMessage = useCallback((user: USERS, text: string) => {
    const newMessage: Message = {
      id: nanoid(),
      content: text,
      role: user,
      created_at: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      const message = messages[messages.length - 1];
      if (message.role === USERS.USER) {
        mutate({
          query: message.content,
          agent_mode: "assistant",
          thread_id: user?.id as string,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    if (isSuccess && data) {
      if (data.tasks_to_complete && data.tasks_to_complete.goal.length > 0) {
        setTasksToComplete([
          ...tasksToComplete,
          { ...data.tasks_to_complete, created_at: new Date() },
        ]);
      } else {
        addMessage(USERS.AI, data.response);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data, addMessage]);

  // Clear all messages from the chat
  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        clearMessages,
        isLoading,
        tasksToComplete,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to use the chat context
export const useChatContext = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatContextProvider");
  }
  return context;
};