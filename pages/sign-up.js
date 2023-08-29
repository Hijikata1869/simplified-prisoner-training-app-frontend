import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { useCookies } from "react-cookie";

import Layout from "../components/Layout";
import FailedAlert from "../components/FailedAlert";

export default function SignUp() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [cookies, setCookie] = useCookies(["_pta_session"]);

  const signUp = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.NEXT_PUBLIC_RAILSAPI_URL}users`, {
        method: "POST",
        body: JSON.stringify({
          name: nickname,
          email: email,
          password: password,
          password_confirmation: confirmationPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((data) => {
          setCookie("_pta_session", data.sessionId, { path: "/" });
          return data.user;
        })
        .then((user) => {
          router.push(`users/${user.id}`);
        })
        .catch(() => {
          setAlertOpen(true);
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout title="新規登録">
      {alertOpen && (
        <FailedAlert
          message="登録できませんでした"
          setAlertOpen={setAlertOpen}
        />
      )}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            新規登録
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={signUp}>
            <div>
              <label
                htmlFor="nickname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                ニックネーム
              </label>
              <div className="mt-2">
                <input
                  id="nickname"
                  name="nickname"
                  type="text"
                  autoComplete="nickname"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={nickname}
                  onChange={(e) => {
                    setNickname(e.target.value);
                  }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Eメール
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  パスワード
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmationPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  パスワード(確認用)
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmationPassword"
                  name="confirmationPassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={confirmationPassword}
                  onChange={(e) => {
                    setConfirmationPassword(e.target.value);
                  }}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                送信
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            登録済みの方は{" "}
            <Link href="/sign-in">
              <a className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                こちらからログイン
              </a>
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
