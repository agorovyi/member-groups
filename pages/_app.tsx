import React from "react";
import "@styles/globals.css";
import { UsersProvider } from "@context/index";
import { Karla } from "@next/font/google";

const karla = Karla({
  subsets: ["latin"],
  display: "swap",
});

function Application({ Component, pageProps }) {
  return (
    <UsersProvider>
      <main className={karla.className}>
        <Component {...pageProps} />
      </main>
    </UsersProvider>
  );
}

export default Application;
