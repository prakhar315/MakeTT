import React, { useState } from 'react'

const Tooltip = ({ children, text, position = 'top', delay = 500 }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [timeoutId, setTimeoutId] = useState(null)

  const showTooltip = () => {
    const id = setTimeout(() => {
      setIsVisible(true)
    }, delay)
    setTimeoutId(id)
  }

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    setIsVisible(false)
  }

  const getPositionStyles = () => {
    const baseStyles = {
      position: 'absolute',
      zIndex: 1000,
      background: '#1e293b',
      color: 'white',
      padding: '8px 12px',
      borderRadius: '6px',
      fontSize: '0.875rem',
      whiteSpace: 'nowrap',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      opacity: isVisible ? 1 : 0,
      visibility: isVisible ? 'visible' : 'hidden',
      transition: 'opacity 0.2s, visibility 0.2s',
      pointerEvents: 'none'
    }

    switch (position) {
      case 'top':
        return {
          ...baseStyles,
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '8px'
        }
      case 'bottom':
        return {
          ...baseStyles,
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '8px'
        }
      case 'left':
        return {
          ...baseStyles,
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginRight: '8px'
        }
      case 'right':
        return {
          ...baseStyles,
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginLeft: '8px'
        }
      default:
        return baseStyles
    }
  }

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      <div style={getPositionStyles()}>
        {text}
        {/* Arrow */}
        <div
          style={{
            position: 'absolute',
            width: 0,
            height: 0,
            border: '4px solid transparent',
            ...(position === 'top' && {
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              borderTopColor: '#1e293b'
            }),
            ...(position === 'bottom' && {
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              borderBottomColor: '#1e293b'
            }),
            ...(position === 'left' && {
              left: '100%',
              top: '50%',
              transform: 'translateY(-50%)',
              borderLeftColor: '#1e293b'
            }),
            ...(position === 'right' && {
              right: '100%',
              top: '50%',
              transform: 'translateY(-50%)',
              borderRightColor: '#1e293b'
            })
          }}
        />
      </div>
    </div>
  )
}

export default Tooltip
