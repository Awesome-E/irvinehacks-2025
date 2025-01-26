'use client'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import './UploadForm.scss'
import { FC, useEffect, useRef } from "react"
import { faClose } from '@fortawesome/free-solid-svg-icons'

const UploadForm: FC<{ open: boolean, setOpen: React.Dispatch<boolean> }> = ({ open, setOpen }) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  function handleFormSubmit() {

  }

  useEffect(() => {
    if (open) dialogRef.current?.showModal()
    else dialogRef.current?.close()
  }, [open])

  useEffect(() => {
    dialogRef.current?.addEventListener('close', () => setOpen(false))
  }, [setOpen])

  return <dialog ref={dialogRef}>
    <form method="dialog" onSubmit={handleFormSubmit}>
      <button className="close-btn">
        <Icon icon={faClose} />
      </button>
      <h2>Add New Receipt</h2>

      <p className="label">Give your receipt a name...</p>
      <input type="text" name="name" placeholder="Walmart" />

      <p className="label">Attach a photo...</p>
      <input type="file" name="receipt" accept="image/*" />

      <input type="submit" value="Send it!" />
      {/* For each grocery item, get the approx expiration date */}

      {/* Store current this stuff in a database */}

    </form>
  </dialog>
}

export default UploadForm


