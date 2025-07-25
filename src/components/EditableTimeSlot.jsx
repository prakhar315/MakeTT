import React, { useState } from 'react'

const EditableTimeSlot = ({ time, onTimeChange, onTimeDelete, canDelete = true }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(time)

  const handleEdit = () => {
    setIsEditing(true)
    setEditValue(time)
  }

  const handleSave = () => {
    if (editValue.trim() && editValue !== time) {
      onTimeChange(time, editValue.trim())
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
          style={{
            background: 'transparent',
            border: '1px solid #3b82f6',
            borderRadius: '4px',
            padding: '4px 8px',
            width: '100%',
            textAlign: 'center',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: 'white'
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
      {time}
      {canDelete && (
        <button
          className="delete-time"
          onClick={(e) => {
            e.stopPropagation()
            handleDelete()
          }}
          title="Delete time slot"
        >
          ×
        </button>
      )}
    </div>
  )
}

export default EditableTimeSlot
