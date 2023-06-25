import { uploadFilesAWS } from "@/config/AWS";
import { auth, db } from "@/config/firebase";
import { query, collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
  setLoadinghe: (value: boolean) => void;
  appName: string;
}
const TrainSection = (props: Props) => {
  const { setLoadinghe, appName } = props;
  const [files, setFiles] = useState<any>([]);
  const [useracc, loadingacc, erroracc] = useAuthState(auth);
  const [link, setLink] = useState("");
  const [links, setLinks] = useState<any>([]);
  const [project, setProject] = useState<any>([]);

  useEffect(() => {
    const q = query(collection(db, "projects"));
    onSnapshot(q, (querySnapshot) => {
      setProject(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const handleFileUpload = () => {
    setLoadinghe(true);
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

    const formData: any = new FormData();

    uploadFilesAWS(useracc?.uid, appName, files);

    files.forEach((file: any) => {
      formData.append("files", file);
    });

    let nameSpace: any;

    project.map((value: any) => {
      if (value.data.projectName === appName) {
        nameSpace = value.data.nameSpace;
      }
    });

    formData.append("nameSpace", nameSpace);
    formData.append("links", JSON.stringify(links));

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Files uploaded successfully");
        setLoadinghe(false);
      } else {
        console.error("Failed to upload files");
        setLoadinghe(false);
      }
    } catch (error) {
      setLoadinghe(false);
      console.error("Error occurred while uploading files", error);
    }
  };

  const handleLinkSubmit = (e: any) => {
    e.preventDefault();
    setLinks([...links, link]);
  };

  const handleLinkSubmitFetch = (e: any) => {
    e.preventDefault();
    setLoadinghe(true);
    fetch(`/api/crawl?url=${encodeURIComponent(`${link}`)}`)
      .then((response) => response.json())
      .then((urls) => {
        console.log(urls);
        setLinks(urls);
        setLoadinghe(false);
      });
  };
  return (
    <>
      <div className="flex items-center justify-center w-full">
        <form className="w-[60vw] py-8 flex flex-col">
          <div className="px-2 my-4 text-center font-semibold text-lg">
            Train the bot using any URL, File or both
          </div>
          <div className="px-2 text-md font-semibold">
            Automatic fetch links :
          </div>
          <div className="flex relative gap-4 my-4 w-full items-center">
            <input
              type="text"
              id="floating_outlined"
              className="block px-2.5 flex-1 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#440034] focus:outline-none focus:ring-0 focus:border-[#440034] peer"
              placeholder=""
              onChange={(event) => setLink(event.target.value)}
            />
            <label
              htmlFor="floating_outlined"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#440034] peer-focus:dark:text-[#440034] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Enter your URL
            </label>
            <button
              className="text-md font-semibold text-white bg-[#3a0035] px-4 py-2 rounded-lg"
              onClick={handleLinkSubmitFetch}
            >
              Fetch Links
            </button>
          </div>
          <div className="text-center py-2 font-semibold">OR</div>
          <div className="px-2 text-md font-semibold">Manually add links</div>
          <div className="flex relative gap-4 my-4 w-full items-center">
            <input
              type="text"
              id="floating_outlined"
              className="block px-2.5 flex-1 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#440034] focus:outline-none focus:ring-0 focus:border-[#440034] peer"
              placeholder=""
              onChange={(event) => setLink(event.target.value)}
            />
            <label
              htmlFor="floating_outlined"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#440034] peer-focus:dark:text-[#440034] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Enter your URL
            </label>
            <button
              className="text-md font-semibold text-white bg-[#3a0035] px-4 py-2 rounded-lg"
              onClick={handleLinkSubmit}
            >
              Add Link
            </button>
          </div>
          {links.length > 0 && (
            <>
              <div className="h-60 overflow-y-scroll my-8 shadow-lg border border-neutral-200 rounded-lg p-4">
                {links?.map((link: any, index: any) => {
                  return (
                    <>
                      <div className="my-1 rounded-lg py-2 px-2">{link}</div>
                    </>
                  );
                })}
              </div>
            </>
          )}
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
              onChange={(e) => {
                handleFileChangeUpload(e);
              }}
              multiple
            />
          </label>
          <div className="flex justify-center pt-8 pb-4">
            {files.length > 0 && (
              <div className="flex gap-4 text-[#ff001b] font-medium">
                <p>Selected files :</p>
                <ul>
                  {files.map((file: any, index: any) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="flex justify-center pb-4">
            <button
              className="px-4 py-2 bg-[#310036] text-white rounded-lg"
              onClick={(e) => {
                handleFileUpload(), handleSubmitUpload(e);
              }}
              type="submit"
            >
              Train the boat
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TrainSection;
