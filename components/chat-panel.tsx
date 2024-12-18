import * as React from "react";

// import { shareChat } from "@/app/actions";
// import { Button } from "@/components/ui/button";
import { PromptForm } from "@/components/prompt-form";
import { ButtonScrollToBottom } from "@/components/button-scroll-to-bottom";
// import { IconShare } from "@/components/ui/icons";
import { FooterText } from "@/components/footer";
// import { ChatShareDialog } from "@/components/chat-share-dialog";
// import { nanoid } from "nanoid";
import { USERS } from "@/lib/types";
import { useChatContext } from "@/context/Chat.context";

export interface ChatPanelProps {
  id?: string;
  title?: string;
  input: string;
  setInput: (value: string) => void;
  isAtBottom: boolean;
  scrollToBottom: () => void;
}

export function ChatPanel({
  id,
  title,
  input,
  setInput,
  isAtBottom,
  scrollToBottom,
}: ChatPanelProps) {
  // const [shareDialogOpen, setShareDialogOpen] = React.useState(false);

  const exampleMessages = [
    {
      heading: "Certificate of Being Single",
      subheading:
        "How can someone apply for a Certificate of Being Single through IremboGov?",
      message: `How can someone apply for a Certificate of Being Single through IremboGov?`,
    },
    {
      heading: "Motor Vehicle Inspection Process",
      subheading:
        "What are the steps to apply for a motor vehicle inspection appointment through IremboGov?",
      message: `What are the steps to apply for a motor vehicle inspection appointment through IremboGov?`,
    },
    {
      heading: "Foreign Document Authentication",
      subheading:
        "How can someone authenticate or legalize a foreign document through IremboGov?",
      message: `How can someone authenticate or legalize a foreign document through IremboGov?`,
    },
    {
      heading: "Service Costs",
      subheading:
        "What are the costs of applying for these services through IremboGov?",
      message: `What are the costs of applying for these services through IremboGov?`,
    },
  ];

  const { addMessage, messages, tasksToComplete } = useChatContext();

  return (
    <div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />

      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="mb-4 grid grid-cols-2 gap-2 px-4 sm:px-0">
          {messages.length === 0 &&
            tasksToComplete.length === 0 &&
            exampleMessages.map((example, index) => (
              <div
                key={example.heading}
                className={`cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${
                  index > 1 && "hidden md:block"
                }`}
                onClick={() => {
                  addMessage(USERS.USER, example.message);
                }}
              >
                <div className="text-sm font-semibold">{example.heading}</div>
                <div className="text-sm text-zinc-600">
                  {example.subheading}
                </div>
              </div>
            ))}
        </div>

        {messages?.length >= 1 || tasksToComplete.length >= 1 ? (
          <div className="flex h-12 items-center justify-center">
            <div className="flex space-x-2">
              {id && title ? (
                <>
                  {/* <Button
                    variant="outline"
                    onClick={() => setShareDialogOpen(true)}
                  >
                    <IconShare className="mr-2" />
                    Share
                  </Button> */}
                  {/* <ChatShareDialog
                    open={shareDialogOpen}
                    onOpenChange={setShareDialogOpen}
                    onCopy={() => setShareDialogOpen(false)}
                    shareChat={() => {}}
                    chat={{
                      id,
                      title,
                      messages: messages,
                    }}
                  /> */}
                </>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm input={input} setInput={setInput} />
          <FooterText className="hidden sm:block" />
        </div>
      </div>
    </div>
  );
}
