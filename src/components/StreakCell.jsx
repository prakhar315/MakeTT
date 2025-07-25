import React, { useState } from 'react'

const StreakCell = ({ 
  day, 
  time, 
  subject, 
  streak, 
  onSubjectChange, 
  onStreakToggle 
}) => {
  const [isEditing, setIsEditing] = useState(false)

  const getStreakColor = (count) => {
    if (count === 0) return '#ddd'
    if (count < 3) return '#ffc107'
    if (count < 7) return '#fd7e14'
    if (count < 14) return '#dc3545'
    if (count < 30) return '#6f42c1'
    return '#198754'
  }

  const getStreakEmoji = (count) => {
    if (count === 0) return '⭕'
    if (count < 3) return '🔥'
    if (count < 7) return '🚀'
    if (count < 14) return '⚡'
    if (count < 30) return '💎'
    return '👑'
  }

  const getStreakTitle = (count) => {
    if (count === 0) return 'Start your streak!'
    if (count < 3) return 'Getting started!'
    if (count < 7) return 'Building momentum!'
    if (count < 14) return 'On fire!'
    if (count < 30) return 'Unstoppable!'
    return 'Legendary!'
  }

  return (
    <td className="editable-cell">
      <div className="cell-content">
        <input
          type="text"
          className="subject-input"
          value={subject || ''}
          onChange={(e) => onSubjectChange(day, time, e.target.value)}
          onFocus={() => setIsEditing(true)}
          onBlur={() => setIsEditing(false)}
          placeholder="Click to add subject..."
        />

        <div className="streak-container">
          <div
            className={`streak-checkbox ${streak.completed ? 'checked' : ''}`}
            onClick={() => onStreakToggle(day, time)}
            title={`${getStreakTitle(streak.count)} Click to ${streak.completed ? 'uncheck' : 'check'} completion`}
          />

          <span
            className="streak-count"
            style={{
              color: getStreakColor(streak.count),
              fontWeight: streak.count > 0 ? 'bold' : 'normal'
            }}
            title={getStreakTitle(streak.count)}
          >
            {streak.count > 0 ? `${streak.count}${getStreakEmoji(streak.count)}` : '0'}
          </span>
        </div>

        {streak.count >= 7 && (
          <div className="streak-milestone" style={{
            fontSize: '0.7rem',
            color: getStreakColor(streak.count),
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: '2px'
          }}>
            {getStreakTitle(streak.count)}
          </div>
        )}
      </div>
    </td>
  )
}

export default StreakCell
