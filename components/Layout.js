import Head from "next/head";

import { CookiesProvider } from "react-cookie";

import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, title = "Default title" }) {
  return (
    <CookiesProvider>
      <div className="flex flex-col justify-center items-center bg-white min-h-screen">
        <Head>
          <title>{title}</title>
        </Head>
        <Header />
        <main className="flex flex-1 flex-col pb-10 pt-12">{children}</main>
        <Footer />
      </div>
    </CookiesProvider>
  );
}
