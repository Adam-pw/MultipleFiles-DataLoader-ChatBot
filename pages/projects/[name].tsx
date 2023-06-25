import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import Layout from "@/components/layout";
import TrainSection from "@/components/TrainSection";
import ChatSection from "@/components/ChatSection";

const Projectpage = () => {
  const router = useRouter();
  const pid = router.query.name;
  const appName = `${pid}`;
  const [loadinghe, setLoadinghe] = useState<any>();

  const [tabs, setTabs] = useState(false);
  return (
    <>
      <Layout>
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 w-96 mx-auto flex justify-center">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2">
              <a
                href="#"
                onClick={() => setTabs(false)}
                className={
                  tabs === false
                    ? "inline-block p-4 text-[#440034] border-b-2 border-[#440034] rounded-t-lg active dark:text-[#440034] dark:border-[#440034]"
                    : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }
              >
                Train the Boat
              </a>
            </li>
            <li className="mr-2">
              <a
                href="#"
                onClick={() => setTabs(true)}
                className={
                  tabs === true
                    ? "inline-block p-4 text-[#440034] border-b-2 border-[#440034] rounded-t-lg active dark:text-[#440034] dark:border-[#440034]"
                    : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }
                aria-current="page"
              >
                Chat with the Boat
              </a>
            </li>
          </ul>
        </div>
        {loadinghe && (
          <>
            <div className="flex justify-center items-center mt-8">
              <div>
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
        {tabs === false ? (
          <>
            <TrainSection appName={appName} setLoadinghe={setLoadinghe} />
          </>
        ) : (
          <>
            <ChatSection appName={appName} />
          </>
        )}
      </Layout>
    </>
  );
};

export default Projectpage;
