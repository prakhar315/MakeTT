import React, { useState } from 'react'

const EditableTimeSlot = ({ time, onTimeChange, onTimeDelete, canDelete = true }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(time)

  const handleEdit = () => {
    setIsEditing(true)
    setEditValue(time)
  }

  const handleSave = () => {
    const trimmedValue = editValue.trim()
    if (trimmedValue && trimmedValue !== time) {
      // Validate time range format (basic validation)
      if (trimmedValue.includes(' - ') || trimmedValue.includes('-')) {
        onTimeChange(time, trimmedValue)
      } else {
        // If no range format, suggest adding one
        const confirmed = window.confirm(
          `"${trimmedValue}" doesn't look like a time range. Add it anyway?\n\nSuggested format: "10:00 AM - 12:00 PM"`
        )
        if (confirmed) {
          onTimeChange(time, trimmedValue)
        }
      }
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditValue(time)
    setIsEditing(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  const handleDelete = () => {
    if (window.confirm(`Delete time slot "${time}"?`)) {
      onTimeDelete(time)
    }
  }

  if (isEditing) {
    return (
      <div className="time-slot-header editing">
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyPress}
          autoFocus
          placeholder="e.g., 10:00 AM - 12:00 PM"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            border: '2px solid #3b82f6',
            borderRadius: '6px',
            padding: '6px 10px',
            width: 'calc(100% - 4px)',
            textAlign: 'center',
            fontSize: '0.8rem',
            fontWeight: '600',
            color: '#1e293b',
            boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
          }}
        />
      </div>
    )
  }

  return (
    <div
      className="time-slot-header"
      onClick={handleEdit}
      title="Click to edit time slot"
    >
      <span className="time-text">{time}</span>
      {canDelete && (
        <button
          className="delete-time"
          onClick={(e) => {
            e.stopPropagation()
            handleDelete()
          }}
          title="Delete time slot"
          style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            background: 'rgba(239, 68, 68, 0.9)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            fontSize: '12px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: '0.7',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.opacity = '1'
            e.target.style.transform = 'scale(1.1)'
          }}
          onMouseLeave={(e) => {
            e.target.style.opacity = '0.7'
            e.target.style.transform = 'scale(1)'
          }}
        >
          ×
        </button>
      )}
    </div>
  )
}

export default EditableTimeSlot
