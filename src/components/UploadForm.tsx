'use client'
import { FC, useEffect, useRef } from "react"

const UploadForm: FC<{ open: boolean, setOpen: React.Dispatch<boolean> }> = ({ open, setOpen }) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (open) dialogRef.current?.showModal()
    else dialogRef.current?.close()
  }, [open])

  useEffect(() => {
    dialogRef.current?.addEventListener('close', () => setOpen(false))
  }, [setOpen])

  return <dialog ref={dialogRef}>
    <form method="dialog">
      <h2>Upload Receipt</h2>
      <input type="file" name="receipt" accept="image/*" />

      {/* For each grocery item, get the approx expiration date */}
      {/* Store current this stuff in a database */}
      <input type="submit" value="Upload" />
    </form>
  </dialog>
}

export default UploadForm
