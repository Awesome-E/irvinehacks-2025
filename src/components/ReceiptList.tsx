import './ReceiptList.scss';
import UploadForm from './UploadForm'
import { faReceipt, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useState } from "react";
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
  const [receipts, setReceipts] = useState<ReceiptProps[]>();

  const fetchReceipts = async (): Promise<ReceiptProps[]> => {
    try {
      const response = await fetch('/api/receipts');
      if (response.ok) {
        const data = await response.json();
        return data.map((receipt: ReceiptProps) => ({
          ...receipt,
          date: new Date(receipt.date),
        }));
      } else {
        console.log('Fetch failed :(');
        return [];
      }
    } catch (error) {
      console.error('Error fetching receipts:', error);
      return [];
    }
  };


  useEffect(() => {
    const loadReceipts = async () => {
      const data = await fetchReceipts();
      if (!data.length) {
        const tempReceipts: ReceiptProps[] = [
          { name: "Walmart", date: new Date("2025-01-01") },
          { name: "Target", date: new Date("2025-01-15") },
          { name: "Costco", date: new Date("2025-01-20") },
        ];
        setReceipts(tempReceipts);
      } else {
        setReceipts(data);
      }
    };

    loadReceipts();
  }, []);

  return <div className="receipt-list">
    {/* {[1,2,3,4,5].map(r => <Receipt name={'Receipt ' + r} date={new Date()} key={r}/>)} */}
    {receipts && receipts.map((r, index) => (
  <Receipt name={`Receipt ${r.name}`} date={r.date} key={index} />
))}

    {/* handle receipt displays */}
    <div className="receipt new-receipt">
        <UploadForm open={showUploadModal} setOpen={setShowUploadModal} />
        <button className="new-box" onClick={() => setShowUploadModal(!showUploadModal)}> + New</button>
      </div>
  </div>
}

export default ReceiptList
