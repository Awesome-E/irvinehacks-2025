import AppContext from '@/context/AppContext';
import './Timeline.scss'
import { CSSProperties, FC, useContext } from "react"
import { ReceiptEntry } from '../../types';

// LONGEST COLUMN will have the variant that is NOT absolutely positioned
// Everything else will be absolute-positioned

interface BarProps {
  variant: 'regular' | 'tallest';
  startTick: number;
  bgColor: string;
  days?: number;
  item: ReceiptEntry;
}

const Bar: FC<BarProps> = ({ variant, startTick, bgColor, item }) => {

  const days = item.processed.length % 12 + 1 /** @todo calculate this */

  const xPosition = (100/14 * startTick) + '%'
  const width = (100/14 * days) + '%'

  const computedStyle: CSSProperties = {
    marginLeft: xPosition,
    width: width,
    backgroundColor: bgColor
  }

  const fullName = `${item.processed} (${item.original})`
  return <div className={`bar ${variant}`} style={computedStyle} title={fullName}>
    {item.processed}
  </div>
}

const Timeline: FC = () => {
  const { currentReceipt } = useContext(AppContext)

  return <div className="timeline">
    <div className="back-layer box-shadow">
      {new Array(15).fill('').map((_, i) => <hr key={i} />)}
    </div>
    <div className="date-ticks">
      {new Array(15).fill('').map((_, i) => <span key={i}>{new Date(Date.now() + 86400 * 1000 * i).toLocaleDateString().replace(/\/\d+$/, '')}</span>)}
    </div>
    <div className="front-layer">
      {currentReceipt?.entries.map(r => {
        return <Bar key={r.original} variant="regular" bgColor='#2877e2' startTick={0} item={r} />
      })}
    </div>
  </div>
}

export default Timeline
