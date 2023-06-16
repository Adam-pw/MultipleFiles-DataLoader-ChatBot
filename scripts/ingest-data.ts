import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { pinecone } from "@/utils/pinecone-client";
import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from "@/config/pinecone";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
// import { GithubRepoLoader } from "langchain/document_loaders/web/github";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";

/* Name of directory to retrieve your files from */
const filePath = `${process.env.DATA_FILE_PATH}`;

export const run = async () => {
  try {
    /*load raw docs from the all files in the directory */
    // const directoryLoader = new DirectoryLoader(filePath, {
    //   '.pdf': (path) => new CustomPDFLoader(path),
    // });

    // const directoryLoader = new PDFLoader(filePath);
    // const directoryLoader = new CSVLoader(filePath);
    // const directoryLoader = new GithubRepoLoader(
    //   "https://github.com/Adam-pw/Share-A-Meal",
    //   { branch: "main", recursive: false, unknown: "warn" }
    // );
    const directoryLoader = new DirectoryLoader("public/upload", {
      // ".json": (path) => new JSONLoader(path, "/texts"),
      // ".jsonl": (path) => new JSONLinesLoader(path, "/html"),
      // ".txt": (path) => new TextLoader(path),
      ".pdf": (path: string) => new PDFLoader(path),
      ".csv": (path: string) => new CSVLoader(path),
    });

    const test = await directoryLoader.load();
    console.log({ test });

    const rawDocs = await directoryLoader.load();

    /* Split text into chunks */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);
    console.log("split docs", docs);

    console.log("creating vector store...");
    /*create and store the embeddings in the vectorStore*/
    const embeddings = new OpenAIEmbeddings();
    const index = pinecone.Index(PINECONE_INDEX_NAME); //change to your own index name

    //embed the PDF documents
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      namespace: PINECONE_NAME_SPACE,
      textKey: "text",
    });
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to ingest your data");
  }
};

(async () => {
  await run();
  console.log("ingestion complete");
})();
