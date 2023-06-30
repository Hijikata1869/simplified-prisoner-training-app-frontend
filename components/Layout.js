import Head from "next/head";

import Header from "./Header";

export default function Layout({ children, title = "Default title" }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <main>{children}</main>
      <footer>Prisoner Training App</footer>
    </div>
  );
}
