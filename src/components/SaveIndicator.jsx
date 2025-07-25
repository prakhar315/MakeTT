import React, { useState, useEffect } from 'react'

const SaveIndicator = ({ lastSaved, isAutoSaving }) => {
  const [timeAgo, setTimeAgo] = useState('')

  useEffect(() => {
    const updateTimeAgo = () => {
      if (!lastSaved) {
        setTimeAgo('')
        return
      }

      const now = Date.now()
      const diff = now - lastSaved
      const seconds = Math.floor(diff / 1000)
      const minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)

      if (seconds < 60) {
        setTimeAgo('just now')
      } else if (minutes < 60) {
        setTimeAgo(`${minutes}m ago`)
      } else if (hours < 24) {
        setTimeAgo(`${hours}h ago`)
      } else {
        setTimeAgo('over a day ago')
      }
    }

    updateTimeAgo()
    const interval = setInterval(updateTimeAgo, 1000)

    return () => clearInterval(interval)
  }, [lastSaved])

  if (!lastSaved && !isAutoSaving) return null

  return (
    <div className="save-indicator" style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: isAutoSaving ? '#ffc107' : '#28a745',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '0.85rem',
      fontWeight: '500',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.3s ease',
      opacity: isAutoSaving ? 1 : 0.8
    }}>
      {isAutoSaving ? (
        <>
          <div className="spinner" style={{
            width: '12px',
            height: '12px',
            border: '2px solid rgba(255,255,255,0.3)',
            borderTop: '2px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          Saving...
        </>
      ) : (
        <>
          <span>✓</span>
          Saved {timeAgo}
        </>
      )}
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default SaveIndicator
