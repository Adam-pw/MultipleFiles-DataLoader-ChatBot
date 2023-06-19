import { useRef, useState, useEffect, Fragment } from "react";
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
import { Transition, Dialog } from "@headlessui/react";

export default function Home() {

  return (
    <>
      <Layout>
        <div className="text-4xl font-bold leading-[1.1] text-center mt-64 tracking-wide">
          <span className="text-[#280036]">Welcome to </span>
          <span className="text-[#ff0041]">Multiple Files boat</span>
        </div>
        <div className="text-lg font-semibold text-center mt-4">
          Create a project and get Started
        </div>
      </Layout>
    </>
  );
}
