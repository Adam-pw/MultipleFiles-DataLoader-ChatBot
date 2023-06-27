import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import LoadingDots from "@/components/ui/LoadingDots";
import { Message } from "@/types/chat";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";
import { Timestamp } from "firebase/firestore";

interface Props {
  appName: string;
}

const ChatSection = (props: Props) => {
  const { appName } = props;
  const [querylo, setQueryLo] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [useracc, loadingacc, erroracc] = useAuthState(auth);
  const [messageState, setMessageState] = useState<{
    messages: Message[];
    pending?: string;
    history: [string, string][];
    pendingSourceDocs?: Document[];
  }>({
    messages: [
      {
        message: `Ask me anything about ${appName}`,
        type: "apiMessage",
      },
    ],
    history: [],
  });
  const { messages, history } = messageState;
  const [hist, setHist] = useState({
    userUid: useracc?.uid,
    message: "",
    respond: "",
  });

  const messageListRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // useEffect(() => {
  //   textAreaRef.current?.focus();
  // }, []);

  //handle form submission
  async function handleSubmit(e: any) {
    e.preventDefault();

    setError(null);

    if (!querylo) {
      alert("Please input a question");
      return;
    }

    const question = querylo.trim();

    setMessageState((state) => ({
      ...state,
      messages: [
        ...state.messages,
        {
          type: "userMessage",
          message: question,
        },
      ],
    }));

    setHist((prev) => ({
      ...prev,
      message: querylo,
    }));

    setLoading(true);
    setQueryLo("");

    try {
      const response = await fetch("/api/askMeRealTimeData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          history,
        }),
      });
      const data = await response.json();
      console.log("data", data);

      setHist((prev) => ({
        ...prev,
        respond: data.text,
      }));

      if (data.error) {
        setError(data.error);
      } else {
        setMessageState((state) => ({
          ...state,
          messages: [
            ...state.messages,
            {
              type: "apiMessage",
              message: data.text,
              sourceDocs: data.sourceDocuments,
            },
          ],
          history: [...state.history, [question, data.text]],
        }));
      }
      console.log("messageState", messageState);

      setLoading(false);

      //scroll to bottom
      messageListRef.current?.scrollTo(0, messageListRef.current.scrollHeight);
    } catch (error) {
      setLoading(false);
      setError("An error occurred while fetching the data. Please try again.");
      console.log("error", error);
    }
  }

  const saveChat = async () => {
    const response = await fetch("/api/chatHistory", {
      method: "POST",
      body: JSON.stringify({
        chatid: (hist.userUid ?? "") + "_" + appName,
        userMessage: hist.message,
        response: hist.respond,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    if (hist.message !== "" && hist.respond !== "") {
      saveChat();
    }
  }, [hist.message, hist.respond]);

  //prevent empty submissions
  const handleEnter = (e: any) => {
    if (e.key === "Enter" && querylo) {
      handleSubmit(e);
    } else if (e.key == "Enter") {
      e.preventDefault();
    }
  };
  return (
    <>
      <div className="mx-auto flex flex-col gap-4 mt-6">
        <h1 className="text-2xl font-bold leading-[1.1] text-center tracking-wide">
          <span className="text-[#280036]">Chat With </span>
          <span className="text-[#ff0041]">{`${appName}`}</span>
        </h1>
        <main className={styles.main}>
          <div className={styles.cloud}>
            <div ref={messageListRef} className={styles.messagelist}>
              {messages.map((message, index) => {
                let icon;
                let className;
                if (message.type === "apiMessage") {
                  icon = (
                    <Image
                      key={index}
                      src="/bot-image.png"
                      alt="AI"
                      width="40"
                      height="40"
                      className={styles.boticon}
                      priority
                    />
                  );
                  className = styles.apimessage;
                } else {
                  icon = (
                    <Image
                      key={index}
                      src="/usericon.png"
                      alt="Me"
                      width="30"
                      height="30"
                      className={styles.usericon}
                      priority
                    />
                  );
                  // The latest message sent by the user will be animated while waiting for a response
                  className =
                    loading && index === messages.length - 1
                      ? styles.usermessagewaiting
                      : styles.usermessage;
                }
                return (
                  <div key={`chatMessage-${index}`}>
                    <div key={`chatMessage-${index}`} className={className}>
                      {icon}
                      <div className={styles.markdownanswer}>
                        <ReactMarkdown linkTarget="_blank">
                          {message.message}
                        </ReactMarkdown>
                      </div>
                    </div>
                    {/* enable source */}
                    {message.sourceDocs && (
                      <div className="p-5" key={`sourceDocsAccordion-${index}`}>
                        <Accordion
                          type="single"
                          collapsible
                          className="flex-col"
                        >
                          {message.sourceDocs.map((doc, index) => (
                            <div key={`messageSourceDocs-${index}`}>
                              <AccordionItem value={`item-${index}`}>
                                <AccordionTrigger>
                                  <h3>Source {index + 1}</h3>
                                </AccordionTrigger>
                                <AccordionContent>
                                  <ReactMarkdown linkTarget="_blank">
                                    {doc.pageContent}
                                  </ReactMarkdown>
                                  <p className="mt-2">
                                    <b>Source:</b> {doc.metadata.source}
                                  </p>
                                </AccordionContent>
                              </AccordionItem>
                            </div>
                          ))}
                        </Accordion>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.center}>
            <div className={styles.cloudform}>
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
                className="flex"
              >
                <textarea
                  disabled={loading}
                  onKeyDown={handleEnter}
                  ref={textAreaRef}
                  autoFocus={false}
                  rows={1}
                  maxLength={512}
                  id="userInput"
                  name="userInput"
                  placeholder={
                    loading ? "Waiting for response..." : "Ask us anything?"
                  }
                  value={querylo}
                  onChange={(e) => setQueryLo(e.target.value)}
                  className={styles.textarea}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className={styles.generatebutton}
                >
                  {loading ? (
                    <div className={styles.loadingwheel}>
                      <LoadingDots color="#000" />
                    </div>
                  ) : (
                    // Send icon SVG in input field
                    <svg
                      viewBox="0 0 20 20"
                      className={styles.svgicon}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                    </svg>
                  )}
                </button>
              </form>
            </div>
          </div>
          {error && (
            <div className="border border-red-400 rounded-md p-4">
              <p className="text-red-500">{error}</p>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default ChatSection;
