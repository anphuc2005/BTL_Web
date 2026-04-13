import '../../styles/adminStyles/ChartCard.css'

export default function ChartCard({
  variant = 'pink', 
  title,
  subtitle,
  footer,
  children,
}) {
  return (
    <section className={`chartCard chartCard--${variant}`}>
      <div className="chartCard__chart">{children}</div>

      <div className="chartCard__body">
        <div className="chartCard__title">{title}</div>
        <div className="chartCard__subtitle">{subtitle}</div>
      </div>

      <div className="chartCard__footer">{footer}</div>
    </section>
  )
}