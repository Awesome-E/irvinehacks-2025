'use client'
import { FC, SetStateAction, useEffect, useRef } from "react"

const UploadForm: FC<{ open: boolean, setOpen: React.Dispatch<boolean>, setFile: React.Dispatch<SetStateAction<File | null>> }> = ({ open, setOpen, setFile }) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const fileInput = formData.get('receipt') as File
    if (fileInput) {
      setFile(fileInput)
    }

    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData
    })
    const data = await response.json()
    console.log(JSON.parse(data.items))
  }

  useEffect(() => {
    if (open) dialogRef.current?.showModal()
    else dialogRef.current?.close()
  }, [open])

  useEffect(() => {
    dialogRef.current?.addEventListener('close', () => setOpen(false))
  }, [setOpen])

  return <dialog ref={dialogRef}>
    <form method="dialog" onSubmit={handleSubmit}>
      <h2>Upload Receipt</h2>
      <input type="file" name="receipt" accept="image/*" />

      {/* For each grocery item, get the approx expiration date */}
      {/* Store current this stuff in a database */}
      <input type="submit" value="Upload" />
    </form>
  </dialog>
}

export default UploadForm
