import React from 'react'

const ThemeToggle = ({ isDark, onToggle }) => {
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        border: 'none',
        background: isDark 
          ? 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)'
          : 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
        color: isDark ? '#333' : 'white',
        fontSize: '1.5rem',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        transition: 'all 0.3s ease',
        zIndex: 1001,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'scale(1.1) rotate(10deg)'
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1) rotate(0deg)'
      }}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}

export default ThemeToggle
