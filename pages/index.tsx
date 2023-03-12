import React from "react";
import Head from "next/head";
import { Tabs, Members, Groups } from "@components/index";

export default function Home() {
  const tabs = [
    { id: "members", title: "Members", panelComponent: <Members /> },
    { id: "groups", title: "Groups", panelComponent: <Groups /> },
  ];

  return (
    <div className="container">
      <Head>
        <title>Members and groups</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="tabsContainer">
        <Tabs tabs={tabs} />
      </main>
    </div>
  );
}
