"use client";

import { Session } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Chat } from "./chat";

export function PageContent({ id }: { id: string }) {
  const { user } = useUser();
  const session = { user: { id: user?.id as string } } as Session;

  if (!session?.user) {
    redirect(`/sign-in`);
  }

  const chat = {
    id,
    messages: [],
  };

  return (
    <Chat id={chat.id} session={session} initialMessages={chat.messages} />
  );
}
