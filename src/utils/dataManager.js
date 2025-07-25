// Data management utilities for the time table app

export const STORAGE_KEYS = {
  TIMETABLE: 'timetable',
  STREAKS: 'streaks',
  SETTINGS: 'settings',
  BACKUP: 'backup',
  TIME_SLOTS: 'timeSlots',
  THEME: 'theme',
  LAST_SAVE: 'lastSave'
}

// Save data to localStorage with error handling
export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    // Update last save timestamp
    localStorage.setItem(STORAGE_KEYS.LAST_SAVE, Date.now().toString())
    return true
  } catch (error) {
    console.error('Error saving to localStorage:', error)
    return false
  }
}

// Load data from localStorage with error handling
export const loadFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error('Error loading from localStorage:', error)
    return defaultValue
  }
}

// Create a backup of all data
export const createBackup = () => {
  const backup = {
    timetable: loadFromStorage(STORAGE_KEYS.TIMETABLE, {}),
    streaks: loadFromStorage(STORAGE_KEYS.STREAKS, {}),
    settings: loadFromStorage(STORAGE_KEYS.SETTINGS, {}),
    timestamp: new Date().toISOString(),
    version: '1.0'
  }
  
  saveToStorage(STORAGE_KEYS.BACKUP, backup)
  return backup
}

// Restore from backup
export const restoreFromBackup = () => {
  const backup = loadFromStorage(STORAGE_KEYS.BACKUP)
  if (!backup) return false
  
  try {
    saveToStorage(STORAGE_KEYS.TIMETABLE, backup.timetable || {})
    saveToStorage(STORAGE_KEYS.STREAKS, backup.streaks || {})
    saveToStorage(STORAGE_KEYS.SETTINGS, backup.settings || {})
    return true
  } catch (error) {
    console.error('Error restoring from backup:', error)
    return false
  }
}

// Export data as downloadable file
export const exportToFile = (data, filename = 'timetable-export') => {
  const exportData = {
    ...data,
    exportDate: new Date().toISOString(),
    version: '1.0'
  }
  
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
    type: 'application/json' 
  })
  
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${filename}-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Import data from file
export const importFromFile = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'))
      return
    }

    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        
        // Validate data structure
        if (typeof data !== 'object') {
          throw new Error('Invalid data format')
        }
        
        resolve(data)
      } catch (error) {
        reject(new Error('Error parsing file: ' + error.message))
      }
    }
    
    reader.onerror = () => {
      reject(new Error('Error reading file'))
    }
    
    reader.readAsText(file)
  })
}

// Clear all data
export const clearAllData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key)
    })
    return true
  } catch (error) {
    console.error('Error clearing data:', error)
    return false
  }
}

// Get storage usage information
export const getStorageInfo = () => {
  try {
    const used = new Blob(Object.values(localStorage)).size
    const quota = 5 * 1024 * 1024 // 5MB typical localStorage limit
    
    return {
      used,
      quota,
      percentage: Math.round((used / quota) * 100),
      available: quota - used
    }
  } catch (error) {
    console.error('Error getting storage info:', error)
    return null
  }
}

// Save all app data at once
export const saveAllData = (data) => {
  try {
    const { timetable, streaks, timeSlots, theme } = data

    saveToStorage(STORAGE_KEYS.TIMETABLE, timetable || {})
    saveToStorage(STORAGE_KEYS.STREAKS, streaks || {})
    saveToStorage(STORAGE_KEYS.TIME_SLOTS, timeSlots || ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'])
    saveToStorage(STORAGE_KEYS.THEME, theme || false)

    // Create automatic backup
    createBackup()

    return true
  } catch (error) {
    console.error('Error saving all data:', error)
    return false
  }
}

// Load all app data at once
export const loadAllData = () => {
  try {
    return {
      timetable: loadFromStorage(STORAGE_KEYS.TIMETABLE, {}),
      streaks: loadFromStorage(STORAGE_KEYS.STREAKS, {}),
      timeSlots: loadFromStorage(STORAGE_KEYS.TIME_SLOTS, ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM']),
      theme: loadFromStorage(STORAGE_KEYS.THEME, false),
      lastSave: loadFromStorage(STORAGE_KEYS.LAST_SAVE, null)
    }
  } catch (error) {
    console.error('Error loading all data:', error)
    return {
      timetable: {},
      streaks: {},
      timeSlots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'],
      theme: false,
      lastSave: null
    }
  }
}

// Auto-save functionality
export class AutoSave {
  constructor(saveCallback, interval = 10000) { // 10 seconds default (faster)
    this.saveCallback = saveCallback
    this.interval = interval
    this.timeoutId = null
    this.lastSave = Date.now()
  }
  
  schedule() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
    
    this.timeoutId = setTimeout(() => {
      this.saveCallback()
      this.lastSave = Date.now()
    }, this.interval)
  }
  
  saveNow() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
    
    this.saveCallback()
    this.lastSave = Date.now()
  }
  
  destroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
  }
  
  getTimeSinceLastSave() {
    return Date.now() - this.lastSave
  }
}
