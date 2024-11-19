// import { type Metadata } from "next";
"use client";
import { redirect } from "next/navigation";
import { Chat } from "@/components/chat";
import { Session } from "@/lib/types";
import { useUser } from "@clerk/nextjs";

export interface ChatPageProps {
  params: {
    id: string;
  };
}

export default function ChatPage({ params }: ChatPageProps) {
  const { user } = useUser();
  const session = { user: { id: user?.id as string } } as Session;

  if (!session?.user) {
    redirect(`/sign-in`);
  }

  const chat = {
    id: params.id,
    messages: [],
  };

  return (
    <Chat id={chat.id} session={session} initialMessages={chat.messages} />
  );
}
