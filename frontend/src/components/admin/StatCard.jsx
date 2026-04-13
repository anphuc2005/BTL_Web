import { useState } from 'react'
import '../../styles/adminStyles/StatCard.css'

export default function StatCard({
  iconBg,
  icon,
  title,
  value,
  hint,
  hintColor = 'green',
  active = false,
}) {
  const [isHovered, setIsHovered] = useState(false)
  const isActive = active || isHovered

  return (
    <div 
      className={isActive ? 'statCard statCard--active' : 'statCard'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="statCard__top">
        <div className="statCard__icon" style={{ background: iconBg }}>
          <img src={icon} alt={title} className="statCard__iconImg" />
        </div>

        <div className="statCard__meta">
          <div className="statCard__title">{title}</div>
          <div className="statCard__value">{value}</div>
        </div>
      </div>

      <div className={`statCard__hint statCard__hint--${hintColor}`}>{hint}</div>
    </div>
  )
}