import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { useCookies } from "react-cookie";

import { loggedIn } from "../lib/sessions";

export default function Header() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["_pta_session"]);

  useEffect(() => {
    loggedIn()
      .then((res) => {
        setIsLogin(res.loggedIn);
        console.log(res.loggedIn);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const hundleLogout = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.NEXT_PUBLIC_RAILSAPI_URL}login`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => {
          if (res.status === 200) {
            removeCookie("_pta_session", { path: "/" });
          }
        })
        .then(() => {
          router.push("/");
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="w-full">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/">
            <a className="-m-1.5 p-1.5 font-bold font-mono">
              Prisoner Training App
            </a>
          </Link>
        </div>
        {isLogin ? (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end md:flex md:flex-1 md:justify-end">
            <Link href="/sign-in">
              <a
                suppressHydrationWarning
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={(e) => hundleLogout(e)}
              >
                ログアウトする<span aria-hidden="true">&rarr;</span>
              </a>
            </Link>
          </div>
        ) : (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end md:flex md:flex-1 md:justify-end">
            <Link href="/sign-in">
              <a
                suppressHydrationWarning
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                ログインはこちら<span aria-hidden="true">&rarr;</span>
              </a>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
