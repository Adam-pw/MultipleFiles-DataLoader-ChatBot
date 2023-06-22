import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "@/config/firebase";
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
                {user ? (
                  <>
                    <div className=" text-xl font-semibold">
                      {user.displayName}
                    </div>
                    <Link href="/projects">
                      <button className="text-xl font-semibold border-[1.5px] border-[#3a0035] text-[#3a0035] px-4 py-2 rounded-lg hover:text-white hover:bg-[#3a0035] transition-all duration-300">
                        Projects
                      </button>
                    </Link>
                    <button
                      className="text-xl font-semibold border-[1.5px] border-[#3a0035] text-[#3a0035] px-4 py-2 rounded-lg hover:text-white hover:bg-[#3a0035] transition-all duration-300"
                      onClick={() => {
                        signOut(auth);
                        router.push("/");
                      }}
                    >
                      Logout
                    </button>
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
