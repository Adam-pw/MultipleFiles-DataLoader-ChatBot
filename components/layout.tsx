import Link from "next/link";
import { useState, Fragment } from "react";
import { useRouter } from "next/router";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/firebase/config";
import SignInModal from "./SignInModal";
import LoginModal from "./LoginModal";
import { useAuthState } from "react-firebase-hooks/auth";
interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [user, loading, error] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLog, setIsOpenLog] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      // Successful login
      console.log(result.user);
      router.push("/"); // Redirect to the dashboard page
      setIsOpen(false);
      setIsOpenLog(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full gap-4">
        <header className="container top-0 z-40 w-full mx-auto">
          <div className="border-b border-b-slate-200 py-4 w-full">
            <nav className="mx-4 px-6 flex items-center justify-between">
              <Link href="/">
                <div className="text-xl font-semibold">Home</div>
              </Link>
              <div className="flex gap-3 items-center">
                <Link href="/projects">
                  <button className="text-xl font-semibold border-[1.5px] border-[#3a0035] text-[#3a0035] px-4 py-2 rounded-lg hover:text-white hover:bg-[#3a0035] transition-all duration-300">
                    Create Project
                  </button>
                </Link>
                {user ? (
                  <>
                    <button
                      data-popover-target="popover-user-profile"
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      User profile
                    </button>
                    <div
                      data-popover
                      id="popover-user-profile"
                      role="tooltip"
                      className="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600"
                    >
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <a href="#">
                            <img
                              className="w-10 h-10 rounded-full"
                              src="/docs/images/people/profile-picture-1.jpg"
                              alt="Jese Leos"
                            />
                          </a>
                          <div>
                            <button
                              type="button"
                              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                              Follow
                            </button>
                          </div>
                        </div>
                        <p className="text-base font-semibold leading-none text-gray-900 dark:text-white">
                          <a href="#">Jese Leos</a>
                        </p>
                        <p className="mb-3 text-sm font-normal">
                          <a href="#" className="hover:underline">
                            @jeseleos
                          </a>
                        </p>
                        <p className="mb-4 text-sm">
                          Open-source contributor. Building{" "}
                          <a
                            href="#"
                            className="text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            flowbite.com
                          </a>
                          .
                        </p>
                        <ul className="flex text-sm">
                          <li className="mr-2">
                            <a href="#" className="hover:underline">
                              <span className="font-semibold text-gray-900 dark:text-white">
                                799
                              </span>
                              <span>Following</span>
                            </a>
                          </li>
                          <li>
                            <a href="#" className="hover:underline">
                              <span className="font-semibold text-gray-900 dark:text-white">
                                3,758
                              </span>
                              <span>Followers</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div data-popper-arrow></div>
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      className="text-xl font-semibold border-[1.5px] border-[#3a0035] text-[#3a0035] px-4 py-2 rounded-lg hover:text-white hover:bg-[#3a0035] transition-all duration-300"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      Sign In
                    </button>
                    <button
                      className="text-xl font-semibold border-[1.5px] border-[#3a0035] text-[#3a0035] px-4 py-2 rounded-lg hover:text-white hover:bg-[#3a0035] transition-all duration-300"
                      onClick={() => setIsOpenLog(!isOpen)}
                    >
                      Login
                    </button>
                  </>
                )}
              </div>
            </nav>
          </div>
        </header>
        <div>
          <main className="flex w-full flex-1 flex-col overflow-hidden">
            {children}
          </main>
        </div>
      </div>
      <SignInModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <LoginModal isOpen={isOpenLog} setIsOpen={setIsOpenLog} />
    </>
  );
}
