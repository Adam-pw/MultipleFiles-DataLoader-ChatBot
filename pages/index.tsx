import { useRef, useState, useEffect } from "react";
import Layout from "@/components/layout";
import styles from "@/styles/Home.module.css";
import { Message } from "@/types/chat";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import LoadingDots from "@/components/ui/LoadingDots";
import { Document } from "langchain/document";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const appName = `Multiple Files uploaded`;

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
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

  const messageListRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  //handle form submission
  async function handleSubmit(e: any) {
    e.preventDefault();

    setError(null);

    if (!query) {
      alert("Please input a question");
      return;
    }

    const question = query.trim();

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

    setLoading(true);
    setQuery("");

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

  //prevent empty submissions
  const handleEnter = (e: any) => {
    if (e.key === "Enter" && query) {
      handleSubmit(e);
    } else if (e.key == "Enter") {
      e.preventDefault();
    }
  };

  const [files, setFiles] = useState<any>([]);
  const handleFileUpload = () => {
    if (files.length > 0) {
      console.log("Locally stored files:", files);
    }
  };

  const handleFileChangeUpload = (event: any) => {
    const fileList = Array.from(event.target.files);
    setFiles(fileList);
  };

  const handleSubmitUpload = async (event: any) => {
    event.preventDefault();

    const formData = new FormData();

    files.forEach((file: any) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Files uploaded successfully");
      } else {
        console.error("Failed to upload files");
      }
    } catch (error) {
      console.error("Error occurred while uploading files", error);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center w-full">
        <form
          onSubmit={handleSubmitUpload}
          className="w-[60vw] py-8 flex flex-col"
        >
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                The files you want to train the boat on
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChangeUpload}
              multiple
            />
          </label>
          <div className="flex justify-center pt-8 pb-4">
            {files.length > 0 && (
              <div className="flex gap-4 text-[#ff001b] font-medium">
                <p>Locally stored files:</p>
                <ul>
                  {files.map((file: any, index: any) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="flex justify-center pt-8 pb-4">
            <button
              className="px-4 py-2 bg-[#310036] text-white rounded-lg"
              onClick={handleFileUpload}
              type="submit"
            >
              Train the boat
            </button>
          </div>
        </form>
      </div>
      <div className="mx-auto flex flex-col gap-4">
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
              <form onSubmit={handleSubmit} className="flex">
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
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
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
    </Layout>
  );
}
