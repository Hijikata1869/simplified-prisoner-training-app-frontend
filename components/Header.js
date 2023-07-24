import Link from "next/link";
import { useRouter } from "next/router";

import Cookie from "universal-cookie";

const cookie = new Cookie();

export default function Header() {
  const router = useRouter();

  const hundleLogout = async (e) => {
    e.preventDefault();
    const params = { session_id: cookie.get("session_id") };
    const query = new URLSearchParams(params);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_RAILSAPI_URL}login?${query}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 200) {
            cookie.remove("session_id");
          }
        })
        .then(() => {
          router.push("/");
        });
    } catch (err) {
      console.err(err);
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
            <a className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
          </Link>
        </div>
        {cookie.get("session_id") == null ? (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link href="/sign-in">
              <a
                suppressHydrationWarning
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                ログインはこちら<span aria-hidden="true">&rarr;</span>
              </a>
            </Link>
          </div>
        ) : (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link href="/sign-in">
              <a
                suppressHydrationWarning
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={() => hundleLogout(e)}
              >
                ログアウトする<span aria-hidden="true">&rarr;</span>
              </a>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
