'use client'
import "./App.scss";
import "./page.scss";
import Timeline from "@/components/Timeline";
import ReceiptList from "@/components/ReceiptList";
import Header from "@/components/Header";
import AppContext from "@/context/AppContext";
import { StoredReceipt } from "../../types";
import { useState } from "react";

export default function Home() {
  const [currentReceipt, setCurrentReceipt] = useState<StoredReceipt | null>(null)
  const [lastUpdated, setLastUpdated] = useState(0)
  const contextValue = { currentReceipt, setCurrentReceipt, lastUpdated, setLastUpdated }

  return <AppContext.Provider value={contextValue}>
    <div className="wrapper">
      <Header/>

      <h2>Timeline</h2>
      {/* Homepage could have timeline (for foods) and list of receipts */}
      {/* (same thing as 3 comments down) */}
      {/* Have a page to show how much longer you have until things expire */}
      {/* "Also on that page you might have tips to prolong the life of the food" */}
      <Timeline dayScale={1} />

      <h2>Recent Transactions</h2>
      <ReceiptList />

    </div>
  </AppContext.Provider>;
}
