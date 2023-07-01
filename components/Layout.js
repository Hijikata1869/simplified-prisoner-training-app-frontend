import Head from "next/head";

import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, title = "Default title" }) {
  return (
    <div className="flex flex-col justify-center items-center bg-white">
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <main className="flex flex-1">{children}</main>
      <Footer />
    </div>
  );
}
