import React, { useState, useEffect, useCallback } from 'react'
import StreakCell from './components/StreakCell'
import StreakAnalytics from './components/StreakAnalytics'
import SaveIndicator from './components/SaveIndicator'
import ThemeToggle from './components/ThemeToggle'
import EditableTimeSlot from './components/EditableTimeSlot'
import Tooltip from './components/Tooltip'
import PrintableTimetable from './components/PrintableTimetable'
import {
  saveToStorage,
  loadFromStorage,
  saveAllData,
  loadAllData,
  exportToFile,
  importFromFile,
  clearAllData,
  createBackup,
  restoreFromBackup,
  STORAGE_KEYS,
  AutoSave
} from './utils/dataManager'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const DEFAULT_TIME_SLOTS = [
  '9:00 AM - 11:00 AM',
  '11:00 AM - 1:00 PM',
  '1:00 PM - 3:00 PM',
  '3:00 PM - 5:00 PM',
  '5:00 PM - 7:00 PM'
]

function App() {
  const [timetable, setTimetable] = useState({})
  const [streaks, setStreaks] = useState({})
  const [timeSlots, setTimeSlots] = useState(DEFAULT_TIME_SLOTS)
  const [lastSaved, setLastSaved] = useState(null)
  const [isAutoSaving, setIsAutoSaving] = useState(false)
  const [autoSave, setAutoSave] = useState(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Auto-save callback
  const handleAutoSave = useCallback(() => {
    setIsAutoSaving(true)

    setTimeout(() => {
      const success = saveAllData({
        timetable,
        streaks,
        timeSlots,
        theme: isDarkMode
      })

      if (success) {
        setLastSaved(Date.now())
      }

      setIsAutoSaving(false)
    }, 300) // Faster save indicator
  }, [timetable, streaks, timeSlots, isDarkMode])

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = loadAllData()

    setTimetable(savedData.timetable)
    setStreaks(savedData.streaks)
    setTimeSlots(savedData.timeSlots)
    setIsDarkMode(savedData.theme)

    // Set last saved time if available
    if (savedData.lastSave) {
      setLastSaved(parseInt(savedData.lastSave))
    } else {
      setLastSaved(Date.now())
    }

    // Apply theme to body
    document.body.className = savedData.theme ? 'dark' : ''

    // Initialize auto-save with faster interval
    const autoSaveInstance = new AutoSave(handleAutoSave, 5000) // Save every 5 seconds
    setAutoSave(autoSaveInstance)

    return () => {
      if (autoSaveInstance) {
        autoSaveInstance.destroy()
      }
    }
  }, [])

  // Schedule auto-save when data changes
  useEffect(() => {
    if (autoSave && Object.keys(timetable).length > 0) {
      autoSave.schedule()
    }
  }, [timetable, autoSave])

  useEffect(() => {
    if (autoSave && Object.keys(streaks).length > 0) {
      autoSave.schedule()
    }
  }, [streaks, autoSave])

  const getCellKey = (day, time) => `${day}-${time}`

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    saveToStorage(STORAGE_KEYS.THEME, newTheme)
    document.body.className = newTheme ? 'dark' : ''
  }

  const handleTimeChange = (oldTime, newTime) => {
    const newTimeSlots = timeSlots.map(slot => slot === oldTime ? newTime : slot)
    setTimeSlots(newTimeSlots)
    saveToStorage(STORAGE_KEYS.TIME_SLOTS, newTimeSlots)

    // Update timetable and streaks with new time
    const newTimetable = { ...timetable }
    const newStreaks = { ...streaks }

    DAYS.forEach(day => {
      const oldKey = getCellKey(day, oldTime)
      const newKey = getCellKey(day, newTime)

      if (newTimetable[oldKey]) {
        newTimetable[newKey] = newTimetable[oldKey]
        delete newTimetable[oldKey]
      }

      if (newStreaks[oldKey]) {
        newStreaks[newKey] = newStreaks[oldKey]
        delete newStreaks[oldKey]
      }
    })

    setTimetable(newTimetable)
    setStreaks(newStreaks)
  }

  const handleTimeDelete = (timeToDelete) => {
    const newTimeSlots = timeSlots.filter(slot => slot !== timeToDelete)
    setTimeSlots(newTimeSlots)
    saveToStorage(STORAGE_KEYS.TIME_SLOTS, newTimeSlots)

    // Remove data for deleted time slot
    const newTimetable = { ...timetable }
    const newStreaks = { ...streaks }

    DAYS.forEach(day => {
      const key = getCellKey(day, timeToDelete)
      delete newTimetable[key]
      delete newStreaks[key]
    })

    setTimetable(newTimetable)
    setStreaks(newStreaks)
  }

  const addTimeSlot = () => {
    const newTime = prompt('Enter new time slot range (e.g., "7:00 PM - 9:00 PM"):')
    if (newTime && newTime.trim() && !timeSlots.includes(newTime.trim())) {
      const newTimeSlots = [...timeSlots, newTime.trim()]
      setTimeSlots(newTimeSlots)
      saveToStorage(STORAGE_KEYS.TIME_SLOTS, newTimeSlots)
    }
  }

  // Print functionality
  const printableTimetable = PrintableTimetable({ timetable, timeSlots, days: DAYS })

  const handlePrint = () => {
    printableTimetable.openPrintPreview()
  }

  const handleDownloadPrintable = () => {
    printableTimetable.downloadPrintable()
  }

  const updateSubject = (day, time, subject) => {
    const key = getCellKey(day, time)
    setTimetable(prev => {
      const newTimetable = {
        ...prev,
        [key]: subject
      }
      // Save immediately to prevent data loss
      saveToStorage(STORAGE_KEYS.TIMETABLE, newTimetable)
      return newTimetable
    })
  }

  const toggleStreak = (day, time) => {
    const key = getCellKey(day, time)
    setStreaks(prev => {
      const currentStreak = prev[key] || { count: 0, completed: false }
      const newCompleted = !currentStreak.completed

      const newStreaks = {
        ...prev,
        [key]: {
          count: newCompleted ? currentStreak.count + 1 : Math.max(0, currentStreak.count - 1),
          completed: newCompleted
        }
      }

      // Save immediately to prevent data loss
      saveToStorage(STORAGE_KEYS.STREAKS, newStreaks)
      return newStreaks
    })
  }

  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      setTimetable({})
      setStreaks({})
      clearAllData()
      setLastSaved(Date.now())
    }
  }

  const resetStreaks = () => {
    if (window.confirm('Are you sure you want to reset all streaks? This cannot be undone.')) {
      setStreaks({})
      saveToStorage(STORAGE_KEYS.STREAKS, {})
      setLastSaved(Date.now())
    }
  }

  const exportData = () => {
    const data = {
      timetable,
      streaks
    }
    exportToFile(data, 'timetable')
  }

  const handleImportData = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    try {
      const data = await importFromFile(file)

      if (data.timetable) setTimetable(data.timetable)
      if (data.streaks) setStreaks(data.streaks)

      // Save imported data
      if (autoSave) {
        autoSave.saveNow()
      }

      alert('Data imported successfully!')
    } catch (error) {
      alert('Error importing data: ' + error.message)
    }

    event.target.value = '' // Reset file input
  }

  const handleRestoreBackup = () => {
    if (window.confirm('Restore from the last backup? This will overwrite current data.')) {
      const success = restoreFromBackup()
      if (success) {
        // Reload data from storage
        setTimetable(loadFromStorage(STORAGE_KEYS.TIMETABLE, {}))
        setStreaks(loadFromStorage(STORAGE_KEYS.STREAKS, {}))
        setLastSaved(Date.now())
        alert('Backup restored successfully!')
      } else {
        alert('No backup found or error restoring backup.')
      }
    }
  }

  // Calculate statistics
  const totalSlots = DAYS.length * timeSlots.length
  const filledSlots = Object.keys(timetable).filter(key => timetable[key]?.trim()).length
  const completedToday = Object.keys(streaks).filter(key => streaks[key]?.completed).length
  const totalStreakCount = Object.values(streaks).reduce((sum, streak) => sum + (streak?.count || 0), 0)

  return (
    <div className="container">
      <div className="floating-elements">
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
      </div>

      <div className="header">
        <h1>✨ MakeTT - Time Table Maker</h1>
        <p>Create your perfect weekly schedule with streak tracking</p>
      </div>

      <div className="controls">
        <Tooltip text="Reset all streak counters to zero" position="bottom">
          <button className="btn btn-secondary" onClick={resetStreaks}>
            🔄 Reset Streaks
          </button>
        </Tooltip>
        <Tooltip text="Clear all data (cannot be undone)" position="bottom">
          <button className="btn btn-secondary" onClick={clearAll}>
            🗑️ Clear All
          </button>
        </Tooltip>
        <Tooltip text="Add a new custom time slot" position="bottom">
          <button className="btn btn-success" onClick={addTimeSlot}>
            ➕ Add Time Slot
          </button>
        </Tooltip>
      </div>

      {/* Auto-save indicator */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: isAutoSaving ? '#3b82f6' : '#10b981',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '20px',
        fontSize: '0.875rem',
        fontWeight: '500',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        zIndex: 1000
      }}>
        {isAutoSaving ? '💾 Saving...' : '✅ All changes saved'}
      </div>

      <div className="timetable-container">
        <table className="timetable">
          <thead>
            <tr>
              <th>Days</th>
              {timeSlots.map(time => (
                <th key={time}>
                  <EditableTimeSlot
                    time={time}
                    onTimeChange={handleTimeChange}
                    onTimeDelete={handleTimeDelete}
                    canDelete={timeSlots.length > 1}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DAYS.map(day => (
              <tr key={day}>
                <td className="day-slot">{day}</td>
                {timeSlots.map(time => {
                  const key = getCellKey(day, time)
                  const subject = timetable[key] || ''
                  const streak = streaks[key] || { count: 0, completed: false }

                  return (
                    <StreakCell
                      key={key}
                      day={day}
                      time={time}
                      subject={subject}
                      streak={streak}
                      onSubjectChange={updateSubject}
                      onStreakToggle={toggleStreak}
                    />
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="stats">
        <h3>📊 Statistics</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">{filledSlots}</div>
            <div className="stat-label">Filled Slots</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{Math.round((filledSlots / totalSlots) * 100)}%</div>
            <div className="stat-label">Schedule Complete</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{completedToday}</div>
            <div className="stat-label">Completed Today</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{totalStreakCount}</div>
            <div className="stat-label">Total Streak Points</div>
          </div>
        </div>
      </div>

      <div className="stats">
        <StreakAnalytics streaks={streaks} timetable={timetable} />
      </div>

      <SaveIndicator lastSaved={lastSaved} isAutoSaving={isAutoSaving} />
      <ThemeToggle isDark={isDarkMode} onToggle={toggleTheme} />
    </div>
  )
}

export default App
