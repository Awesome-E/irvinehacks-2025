import AppContext from '@/context/AppContext';
import './Timeline.scss'
import { CSSProperties, FC, useContext } from "react"
import { ReceiptEntry } from '../../types';

// LONGEST COLUMN will have the variant that is NOT absolutely positioned
// Everything else will be absolute-positioned

function darkenColor (color: string) {
  const regex = color.length === 4 ? /[0-9a-f]/gi : /[0-9a-f]{2}/gi
  let [r, g, b] = color.match(regex)!.map(x => parseInt(x, 16))
  const total = r + g + b
  const THRESHOLD = 350
  if (total > THRESHOLD) {
    r = Math.round(r * THRESHOLD / total)
    g = Math.round(g * THRESHOLD / total)
    b = Math.round(b * THRESHOLD / total)
  }
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')
}

interface BarProps {
  variant: 'regular' | 'tallest';
  startTick: number;
  days?: number;
  item: ReceiptEntry;
  axisScale: number;
}

const Bar: FC<BarProps> = ({ variant, startTick, item, axisScale }) => {

  const days = item.processed.length % 10 + 3 /** @todo calculate this */
  
  const color = darkenColor(item.color ?? '#2877e2')
  const xPosition = (100/14 * startTick / axisScale) + '%'
  const width = (100/14 * days / axisScale) + '%'
  
  const computedStyle: CSSProperties = {
    marginLeft: xPosition,
    width: width,
    backgroundColor: color
  }

  const fullName = `${item.processed} (${item.original})${item.tip ? '\n💡 ' + item.tip: ''}`
  return <div className={`bar ${variant}`} style={computedStyle} title={fullName}>
    {item.processed}
  </div>
}

const Timeline: FC<{ dayScale?: number }> = ({ dayScale = 1 }) => {
  const { currentReceipt } = useContext(AppContext)

  return <div className="timeline">
    <div className="back-layer box-shadow">
      {new Array(15).fill('').map((_, i) => <hr key={i} />)}
    </div>
    <div className="date-ticks">
      {new Array(15).fill('').map((_, i) => <span key={i}>{new Date(Date.now() + 86400 * 1000 * i * dayScale).toLocaleDateString().replace(/\/\d+$/, '')}</span>)}
    </div>
    <div className="front-layer">
      {currentReceipt?.entries.map(r => {
        return <Bar key={r.original} variant="regular" startTick={0} item={r} axisScale={dayScale} />
      })}
    </div>
  </div>
}

export default Timeline
