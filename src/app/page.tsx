'use client'
import UploadForm from "@/components/UploadForm";
import "./App.scss";
import "./page.scss";
import { useState } from "react";
import Timeline from "@/components/Timeline";
import ReceiptList from "@/components/ReceiptList";
import Header from "@/components/Header";

export default function Home() {
  const [showUploadModal, setShowUploadModal] = useState(false)

  return (
    <div className="wrapper">
      <Header/>
      
      <UploadForm open={showUploadModal} setOpen={setShowUploadModal} />
      <button onClick={() => setShowUploadModal(!showUploadModal)}>Open</button>

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
