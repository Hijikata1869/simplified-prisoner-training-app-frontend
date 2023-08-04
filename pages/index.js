import Link from "next/link";

import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout title="Prisoner Training App">
      <div className="mx-auto max-w-2xl pt-20 sm:pt-36 lg:pt-32">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Prisoner Training App
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            プリズナートレーニングAppは、自分が行ったプリズナートレーニングを手軽に記録しておけるWebアプリです。
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/sign-up">
              <a className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                新規登録はこちら
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
