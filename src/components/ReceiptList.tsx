'use client'
import './ReceiptList.scss';
import UploadForm from './UploadForm'
import { faPlus, faReceipt, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { FC, useContext, useEffect, useState } from "react";
import { DateTime } from "luxon";
import { deleteReceipt, fetchReceipts } from '@/helpers/receipts';
import AppContext from '@/context/AppContext';
import { StoredReceipt } from '../../types';

interface ReceiptProps {
  data: StoredReceipt
}

const Receipt: FC<ReceiptProps> = ({ data }) => {
  const { name, date } = data
  const { setCurrentReceipt, setLastUpdated } = useContext(AppContext)

  const receiptDate = DateTime.fromJSDate(date)
  const dateStr = receiptDate.toFormat('LLL dd, yyyy')

  const showReceipt = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).classList.contains('delete-btn')) return
    setCurrentReceipt(data)
  }

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete the receipt "${name}"?`)) return
    const success = await deleteReceipt(data._id)
    if (success) setLastUpdated(Date.now())
  }

  return <div className="receipt" onClick={showReceipt}>
    <Icon icon={faReceipt} className="receipt-icon" />
    <div className="receipt-details">
      <h3 className="receipt-name">{name}</h3>
      <span className="receipt-date">{dateStr}</span>
    </div>
    <button className="delete-btn" onClick={handleDelete}>
      <Icon icon={faXmark} />
    </button>
  </div>
}

const ReceiptList: FC = () => {
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [receipts, setReceipts] = useState<StoredReceipt[]>()
  const { lastUpdated } = useContext(AppContext)

  useEffect(() => {
    fetchReceipts().then(setReceipts)
  }, [lastUpdated]);

  return <div className="receipt-list">
    {receipts && receipts.map((r, index) => <Receipt data={r} key={index} />)}

    {/* handle receipt displays */}
    <div className="receipt new-receipt" onClick={() => setShowUploadModal(true)}>
      <button className="new-btn">
        <FontAwesomeIcon icon={faPlus} />
        <span>New</span>
      </button>
    </div>
    <UploadForm open={showUploadModal} setOpen={setShowUploadModal} />
  </div>
}

export default ReceiptList
