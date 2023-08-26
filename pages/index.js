import { useState, useEffect } from "react";

import Link from "next/link";

import { loggedIn } from "../lib/sessions";
import { fetchCurrentUser } from "../lib/users";

import Layout from "../components/Layout";

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    loggedIn()
      .then((res) => {
        setIsLogin(res.loggedIn);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    fetchCurrentUser()
      .then((res) => {
        return res.currentUser.currentUser;
      })
      .then((currentUser) => {
        setCurrentUser(currentUser);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Layout title="Prisoner Training App">
      <div className="mx-auto max-w-2xl pt-20 sm:pt-36 lg:pt-32">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Prisoner Training App
          </h1>
          <p className="px-2 mt-6 text-lg leading-8 text-gray-600">
            プリズナートレーニングAppは、自分が行ったプリズナートレーニングを手軽に記録しておけるWebアプリです。
          </p>
          {isLogin ? (
            <div className="mt-10 flex flex-col items-center justify-center gap-x-6">
              <div>
                <Link href={`/users/${currentUser.id}`}>
                  <a className="border rounded-full font-light bg-white border-gray-400 px-3.5 py-2.5 text-sm text-black shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    記録ページはこちら
                  </a>
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-10 flex flex-col items-center justify-center gap-x-6">
              <div className="mb-10">
                <Link href="/sign-in">
                  <a className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    ログインはこちら
                  </a>
                </Link>
              </div>
              <div>
                <Link href="/sign-up">
                  <a className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    新規登録はこちら
                  </a>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
