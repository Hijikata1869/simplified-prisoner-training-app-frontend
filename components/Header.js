import Link from "next/link";

import Cookie from "universal-cookie";

const cookie = new Cookie();

export default function Header() {
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
