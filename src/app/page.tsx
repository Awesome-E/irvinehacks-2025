'use client'
import "./App.scss";
import "./page.scss";
import Timeline from "@/components/Timeline";
import ReceiptList from "@/components/ReceiptList";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="wrapper">
      <Header/>

      <h2>Timeline</h2>
      {/* Homepage could have timeline (for foods) and list of receipts */}
      {/* (same thing as 3 comments down) */}
      {/* Have a page to show how much longer you have until things expire */}
      {/* "Also on that page you might have tips to prolong the life of the food" */}
      <Timeline/>

      <h2>Recent Transactions</h2>
      <ReceiptList />

      {/* new button should have dialog for name of receipt plus file upload????????????????? */}

    </div>
  );
}
