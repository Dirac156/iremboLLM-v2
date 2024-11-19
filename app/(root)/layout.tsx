import React from "react";
// import Sidebar from "@/components/Sidebar"; // Assuming Sidebar is in the same folder

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      {/* <Sidebar tasksToComplete={tasksToComplete.tasks} /> */}

      <div className="chat-content">{children}</div>
    </div>
  );
}
