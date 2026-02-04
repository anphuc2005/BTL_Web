import React from 'react'
import '../styles/componentStyles/AboutCard.css'

const AboutCard = ({ 
  iconSrc, 
  title, 
  description, 
  content, 
  iconColor = '#64748b',
  backgroundColor = 'white',
  textColor = '#1a1a1a'
}) => {
  return (
    <div 
      className="about-card"
      style={{ 
        backgroundColor,
        color: textColor
      }}
    >
      {iconSrc && (
        <div className="card-icon">
          <img src={iconSrc} alt={title} style={{ color: iconColor }} />
        </div>
      )}
      <h3 className="card-title" style={{ color: textColor }}>
        {title}
      </h3>
      {description && (
        <p className="card-description" style={{ color: textColor }}>
          {description}
        </p>
      )}
      {content && (
        <div className="card-content">
          {content.map((text, index) => (
            <p key={index} style={{ color: textColor }}>
              {text}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export default AboutCard