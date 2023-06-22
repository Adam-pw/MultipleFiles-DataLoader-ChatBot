import Layout from "@/components/layout";
import React, { Fragment } from "react";
import { FaPlus, FaRobot } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { auth, db } from "@/config/firebase";
import {
  query,
  addDoc,
  collection,
  onSnapshot,
  where,
} from "firebase/firestore";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from "uuid";
import { dynamodb } from "@/config/AWS";

const Projects = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  const [details, setDetails] = useState({
    projectName: "",
    visibility: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const currentTimestamp = new Date().getTime();

    // Store user data in DynamoDB
    try {
      if (user) {
        const params = {
          TableName: "projects",
          Item: {
            id: uuidv4(),
            projectName: details.projectName,
            visibility: details.visibility,
            nameSpace: user?.uid + currentTimestamp,
            userId: user?.uid,
          },
        };

        await dynamodb.put(params).promise();

        // Reset form
        setDetails({
          projectName: "",
          visibility: "",
        });
      }

      // Handle success or navigate to a different page
      console.log("Data stored successfully!");

      if (!loading) {
        const params = {
          TableName: "projects",
          FilterExpression: "userId = :userId",
          ExpressionAttributeValues: {
            ":userId": user?.uid,
          },
        };

        dynamodb.scan(params, (err: any, data: any) => {
          if (err) {
            console.error("Error retrieving data:", err);
          } else {
            setProject(data.Items);
          }
        });
      }
    } catch (error) {
      console.error("Error storing data:", error);
    }

    setIsOpen(false);
  };

  const [project, setProject] = useState<any>([]);

  useEffect(() => {
    if (!loading) {
      const params = {
        TableName: "projects",
        FilterExpression: "userId = :userId",
        ExpressionAttributeValues: {
          ":userId": user?.uid,
        },
      };

      dynamodb.scan(params, (err: any, data: any) => {
        if (err) {
          console.error("Error retrieving data:", err);
        } else {
          setProject(data.Items);
        }
      });
    }
  }, [user, loading]);

  return (
    <>
      <Layout>
        <div className="flex max-w-screen-xl w-full mx-auto flex-wrap justify-center gap-8 p-4">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="hover:shadow-lg border border-neutral-400 p-4 rounded-xl w-56 text-white bg-[#3a0035] hover:border-black cursor-pointer m-4"
          >
            <div className="text-lg font-semibold flex items-center gap-2">
              <FaPlus /> Create Project
            </div>
            <div className="text-md font-medium mt-4">Enter namespace</div>
          </div>
          {project.map((value: any, index: any) => {
            return (
              <>
                <Link href={`/projects/${value.projectName}`} key={index}>
                  <div className="border-2 border-neutral-400 p-4 rounded-xl w-56 hover:border-black cursor-pointer hover:shadow-lg m-4">
                    <div className="text-lg font-semibold flex items-center gap-2">
                      <FaRobot /> {value.projectName}
                    </div>
                    <div className="text-md font-medium mt-4">
                      Visibility : {value.visibility}
                    </div>
                  </div>
                </Link>
              </>
            );
          })}
        </div>
      </Layout>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(!isOpen)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-200 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto ">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <form className="p-4">
                    <div className="font-semibold">Enter details</div>
                    <div className="relative mt-6 w-full">
                      <input
                        type="text"
                        id="floating_outlined"
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#440034] focus:outline-none focus:ring-0 focus:border-[#440034] peer"
                        placeholder=""
                        onChange={(event) =>
                          setDetails((prev) => ({
                            ...prev,
                            projectName: event.target.value,
                          }))
                        }
                      />
                      <label
                        htmlFor="floating_outlined"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#440034] peer-focus:dark:text-[#440034] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        Project Name
                      </label>
                    </div>
                    <div className="relative mt-6 w-full flex items-center gap-6">
                      <label className="font-medium">Visibility : </label>
                      <select
                        onChange={(event) =>
                          setDetails((prev) => ({
                            ...prev,
                            visibility: event.target.value,
                          }))
                        }
                        className="px-4 py-2 rounded-lg focus:border-[#440034] border-gray-300 peer-focus:dark:text-[#440034] focus:ring-[#440034] flex-1"
                      >
                        <option value="Select">Select</option>
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                      </select>
                    </div>
                    <div className="mt-6 flex justify-end gap-4">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setIsOpen(!isOpen);
                        }}
                        className="text-md font-semibold border-[1.5px] border-[#3a0035] text-[#3a0035] px-4 py-2 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        className="text-md font-semibold text-white bg-[#3a0035] px-4 py-2 rounded-lg"
                        onClick={handleSubmit}
                      >
                        Create Project
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Projects;
