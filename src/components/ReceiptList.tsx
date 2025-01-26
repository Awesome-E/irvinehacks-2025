import './ReceiptList.scss';
import UploadForm from './UploadForm'
import { faReceipt, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { DateTime } from "luxon";

interface ReceiptProps {
  name: string;
  date: Date;
}

const Receipt: FC<ReceiptProps> = ({ name, date }) => {
  const receiptDate = DateTime.fromJSDate(date)
  const dateStr = receiptDate.toFormat('LLL dd, yyyy')

  return <div className="receipt">
    <Icon icon={faReceipt} className="receipt-icon" />
    <div className="receipt-details">
      <h3 className="receipt-name">{name}</h3>
      <span className="receipt-date">{dateStr}</span>
    </div>
    <button className="delete-btn">
      <Icon icon={faXmark} />
    </button>
  </div>
}

const ReceiptList: FC = () => {
  const [showUploadModal, setShowUploadModal] = useState(false)
  return <div className="receipt-list">
    {[1,2,3,4,5].map(r => <Receipt name={'Receipt ' + r} date={new Date()} key={r}/>)}
    <div className="receipt new-receipt">
        <UploadForm open={showUploadModal} setOpen={setShowUploadModal} />
        <button className="new-box" onClick={() => setShowUploadModal(!showUploadModal)}> + New</button>
      </div>
  </div>
}

export default ReceiptList
