import React from 'react'

const StreakAnalytics = ({ streaks, timetable }) => {
  // Calculate various streak statistics
  const allStreaks = Object.values(streaks)
  const activeStreaks = allStreaks.filter(s => s.count > 0)
  const completedToday = allStreaks.filter(s => s.completed).length
  const totalStreakPoints = allStreaks.reduce((sum, s) => sum + s.count, 0)
  
  // Find longest streak
  const longestStreak = Math.max(...allStreaks.map(s => s.count), 0)
  
  // Calculate streak distribution
  const streakRanges = {
    beginner: allStreaks.filter(s => s.count >= 1 && s.count < 3).length,
    intermediate: allStreaks.filter(s => s.count >= 3 && s.count < 7).length,
    advanced: allStreaks.filter(s => s.count >= 7 && s.count < 14).length,
    expert: allStreaks.filter(s => s.count >= 14 && s.count < 30).length,
    legendary: allStreaks.filter(s => s.count >= 30).length
  }

  // Calculate completion rate
  const totalSlots = Object.keys(timetable).filter(key => timetable[key]?.trim()).length
  const completionRate = totalSlots > 0 ? Math.round((completedToday / totalSlots) * 100) : 0

  // Get streak level based on total points
  const getOverallLevel = (points) => {
    if (points < 10) return { level: 'Beginner', emoji: '🌱', color: '#28a745' }
    if (points < 50) return { level: 'Intermediate', emoji: '🔥', color: '#ffc107' }
    if (points < 150) return { level: 'Advanced', emoji: '⚡', color: '#fd7e14' }
    if (points < 300) return { level: 'Expert', emoji: '💎', color: '#6f42c1' }
    return { level: 'Legendary', emoji: '👑', color: '#dc3545' }
  }

  const overallLevel = getOverallLevel(totalStreakPoints)

  return (
    <div className="streak-analytics">
      <h3>🏆 Streak Analytics</h3>
      
      <div className="level-badge" style={{
        background: `linear-gradient(135deg, ${overallLevel.color} 0%, #764ba2 100%)`,
        color: 'white',
        padding: '15px',
        borderRadius: '10px',
        textAlign: 'center',
        marginBottom: '20px',
        boxShadow: `0 5px 15px ${overallLevel.color}40`
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '5px' }}>{overallLevel.emoji}</div>
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{overallLevel.level}</div>
        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>{totalStreakPoints} Total Points</div>
      </div>

      <div className="analytics-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '15px',
        marginBottom: '20px'
      }}>
        <div className="analytics-item">
          <div className="analytics-value" style={{ color: '#28a745' }}>{activeStreaks.length}</div>
          <div className="analytics-label">Active Streaks</div>
        </div>
        
        <div className="analytics-item">
          <div className="analytics-value" style={{ color: '#dc3545' }}>{longestStreak}</div>
          <div className="analytics-label">Longest Streak</div>
        </div>
        
        <div className="analytics-item">
          <div className="analytics-value" style={{ color: '#667eea' }}>{completedToday}</div>
          <div className="analytics-label">Completed Today</div>
        </div>
        
        <div className="analytics-item">
          <div className="analytics-value" style={{ color: '#fd7e14' }}>{completionRate}%</div>
          <div className="analytics-label">Completion Rate</div>
        </div>
      </div>

      <div className="streak-distribution">
        <h4 style={{ marginBottom: '15px', color: '#333' }}>Streak Distribution</h4>
        <div className="distribution-bars">
          {Object.entries(streakRanges).map(([level, count]) => {
            const colors = {
              beginner: '#28a745',
              intermediate: '#ffc107',
              advanced: '#fd7e14',
              expert: '#6f42c1',
              legendary: '#dc3545'
            }
            
            const maxCount = Math.max(...Object.values(streakRanges), 1)
            const percentage = (count / maxCount) * 100
            
            return (
              <div key={level} className="distribution-bar" style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px',
                fontSize: '0.85rem'
              }}>
                <div style={{ 
                  width: '80px', 
                  textTransform: 'capitalize',
                  color: '#666'
                }}>
                  {level}:
                </div>
                <div style={{
                  flex: 1,
                  height: '20px',
                  background: '#f0f0f0',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  marginRight: '10px'
                }}>
                  <div style={{
                    width: `${percentage}%`,
                    height: '100%',
                    background: colors[level],
                    borderRadius: '10px',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
                <div style={{ 
                  width: '30px', 
                  textAlign: 'right',
                  fontWeight: 'bold',
                  color: colors[level]
                }}>
                  {count}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {longestStreak >= 7 && (
        <div className="achievement-badge" style={{
          background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
          color: '#333',
          padding: '10px',
          borderRadius: '8px',
          textAlign: 'center',
          marginTop: '15px',
          border: '2px solid #ffc107'
        }}>
          🎉 Achievement Unlocked: Week Warrior! 🎉
        </div>
      )}

      {totalStreakPoints >= 100 && (
        <div className="achievement-badge" style={{
          background: 'linear-gradient(135deg, #e83e8c 0%, #fd7e14 100%)',
          color: 'white',
          padding: '10px',
          borderRadius: '8px',
          textAlign: 'center',
          marginTop: '10px',
          border: '2px solid #e83e8c'
        }}>
          💯 Century Club Member! 💯
        </div>
      )}
    </div>
  )
}

export default StreakAnalytics
