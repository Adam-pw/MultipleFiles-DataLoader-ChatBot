import multer from "multer";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { pinecone } from "@/utils/pinecone-client";
import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from "@/config/pinecone";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import {
  JSONLoader,
  JSONLinesLoader,
  TextLoader,
} from "langchain/document_loaders";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadApi = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const uploadFolder = "public/upload";
    const files = fs.readdirSync(uploadFolder);

    for (const file of files) {
      fs.unlinkSync(`${uploadFolder}/${file}`);
    }

    await upload.array("files")(req as any, res as any, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const run = async () => {
        try {
          const directoryLoader = new DirectoryLoader("public/upload", {
            ".json": (path) => new JSONLoader(path, "/texts"),
            ".jsonl": (path) => new JSONLinesLoader(path, "/html"),
            ".txt": (path) => new TextLoader(path),
            ".pdf": (path: string) => new PDFLoader(path),
            ".csv": (path: string) => new CSVLoader(path),
          });
          let allRawDocs: any = [];
          const fileDocs = await directoryLoader.load();
          const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
          });

          const docs = await textSplitter.splitDocuments(fileDocs);
          console.log("split docs", docs);
          allRawDocs = [...allRawDocs, ...docs];

          const loadUrls = async (urls: any) => {
            for (const url of urls) {
              try {
                new URL(url);
              } catch (error) {
                console.error(`Invalid URL: ${url}`);
                continue;
              }
              const loader = new PuppeteerWebBaseLoader(url);
              const rawDocs = await loader.load();
              allRawDocs = [...allRawDocs, ...rawDocs];
            }
          };

          await loadUrls(JSON.parse(req.body.links));

          const embeddings = new OpenAIEmbeddings();
          console.log("creating vector store...");
          const index = pinecone.Index(PINECONE_INDEX_NAME);

          await PineconeStore.fromDocuments(allRawDocs, embeddings, {
            pineconeIndex: index,
            namespace: req.body.namespace,
            textKey: "text",
          });
        } catch (error) {
          console.log("error", error);
          throw error;
        }
      };

      await run();
      console.log("ingestion complete");
      return res.status(200).json({ message: "Files uploaded successfully" });
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export default uploadApi;
