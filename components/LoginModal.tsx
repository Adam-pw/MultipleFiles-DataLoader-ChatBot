import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/config/firebase";
import router from "next/router";
import { vendor } from "sharp";

interface Props {
  isOpen: boolean;
  setIsOpen(value: boolean): void;
}

const LoginModal = ({ isOpen, setIsOpen }: Props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      // Successful login
      console.log(result.user);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, user.email, user.password).then((user) =>
      console.log(user)
    );
    setIsOpen(false);
  };

  return (
    <>
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
                    <div className="font-semibold">{"Let's Login"}</div>
                    <div className="relative mt-6 w-full">
                      <input
                        type="emaiil"
                        id="floating_outlined"
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#440034] focus:outline-none focus:ring-0 focus:border-[#440034] peer"
                        placeholder=""
                        onChange={(event) =>
                          setUser((prev) => ({
                            ...prev,
                            email: event.target.value,
                          }))
                        }
                      />
                      <label
                        htmlFor="floating_outlined"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#440034] peer-focus:dark:text-[#440034] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        Email
                      </label>
                    </div>
                    <div className="relative mt-6 w-full">
                      <input
                        type="password"
                        id="floating_outlined"
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#440034] focus:outline-none focus:ring-0 focus:border-[#440034] peer"
                        placeholder=""
                        onChange={(event) =>
                          setUser((prev) => ({
                            ...prev,
                            password: event.target.value,
                          }))
                        }
                      />
                      <label
                        htmlFor="floating_outlined"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#440034] peer-focus:dark:text-[#440034] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        Password
                      </label>
                    </div>
                    <div className="mt-6 flex justify-center gap-4">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setIsOpen(!isOpen);
                        }}
                        className="text-md w-1/2 font-semibold border-[1.5px] border-[#3a0035] text-[#3a0035] px-4 py-2 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        className="text-md w-1/2 font-semibold text-white bg-[#3a0035] px-4 py-2 rounded-lg"
                        onClick={handleClick}
                      >
                        Login
                      </button>
                    </div>
                    <div className="text-center mt-6">OR</div>
                    <div className="mt-6">
                      <button
                        onClick={handleSignIn}
                        className="text-md w-full font-semibold text-white bg-[#3a0035] px-4 py-2 rounded-lg flex gap-3 items-center justify-center"
                      >
                        <FaGoogle /> Login with Google
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

export default LoginModal;
