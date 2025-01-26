'use client'
import './Header.scss';
import UploadForm from "./UploadForm";
import { FC, useState } from "react";


const Header: FC = () => {
  const [showUploadModal, setShowUploadModal] = useState(false)

  return <div className="header">
    <h1>GrocerEase</h1>

    <UploadForm open={showUploadModal} setOpen={setShowUploadModal} />
    <button onClick={() => setShowUploadModal(!showUploadModal)}>Upload</button>

    {/* insert auth */}
    <button>Log in</button>
  </div>
}

export default Header
