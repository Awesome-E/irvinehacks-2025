import './Timeline.scss'
import { CSSProperties, FC } from "react"

// LONGEST COLUMN will have the variant that is NOT absolutely positioned
// Everything else will be absolute-positioned

interface BarProps {
  variant: 'regular' | 'tallest';
  startTick: number;
  bgColor: string;
  days?: number;
}

const Bar: FC<BarProps> = ({ variant, startTick, bgColor, days = 2 }) => {
  const xPosition = (100/14 * startTick) + '%'
  const width = (100/14 * days) + '%'

  const computedStyle: CSSProperties = {
    marginLeft: xPosition,
    width: width,
    backgroundColor: bgColor
  }

  return <div className={`bar ${variant}`} style={computedStyle}>
    YAY
  </div>
}

const Timeline: FC = () => {
  return <div className="timeline">
    <div className="back-layer box-shadow">
      {new Array(15).fill('').map((_, i) => <hr key={i} />)}
    </div>
    <div className="date-ticks">
      {new Array(15).fill('').map((_, i) => <span key={i}>{new Date(Date.now() + 86400 * 1000 * i).toLocaleDateString().replace(/\/\d+$/, '')}</span>)}
    </div>
    <div className="front-layer">
      <Bar variant="regular" bgColor='red' startTick={0} />
      <Bar variant="regular" bgColor='red' startTick={0} />
      <Bar variant="regular" bgColor='limegreen' startTick={2} />
      <Bar variant="regular" bgColor='limegreen' startTick={2} />
      <Bar variant="regular" bgColor='goldenrod' startTick={4} days={3} />
      <Bar variant="regular" bgColor='limegreen' startTick={2} />
      <Bar variant="regular" bgColor='limegreen' startTick={2} />
      <Bar variant="regular" bgColor='goldenrod' startTick={4} days={3} />
    </div>
  </div>
}

export default Timeline
