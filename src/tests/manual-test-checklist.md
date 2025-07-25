# Manual Test Checklist for Time Table Maker

## Core Functionality Tests

### ✅ Time Table Creation
- [ ] Can add subjects to time slots by clicking and typing
- [ ] Input fields are editable and save automatically
- [ ] Placeholder text appears when cells are empty
- [ ] Can edit existing subjects

### ✅ Streak Tracking System
- [ ] Checkbox appears in each time slot
- [ ] Clicking checkbox toggles completion status
- [ ] Streak counter increases when checked
- [ ] Streak counter decreases when unchecked
- [ ] Visual feedback changes based on streak level:
  - [ ] 0 streaks: Gray circle with ⭕
  - [ ] 1-2 streaks: Yellow with 🔥
  - [ ] 3-6 streaks: Orange with 🚀
  - [ ] 7-13 streaks: Red with ⚡
  - [ ] 14-29 streaks: Purple with 💎
  - [ ] 30+ streaks: Green with 👑
- [ ] Milestone messages appear for 7+ streaks
- [ ] Hover effects work on checkboxes

### ✅ Data Persistence
- [ ] Data saves automatically every 10 seconds
- [ ] Save indicator appears in bottom right
- [ ] Data persists after page refresh
- [ ] Auto-backup creates backup on each save

### ✅ Import/Export Functionality
- [ ] Export button downloads JSON file
- [ ] Import button accepts JSON files
- [ ] Imported data replaces current data
- [ ] Error handling for invalid files
- [ ] Restore backup functionality works

### ✅ Statistics and Analytics
- [ ] Basic statistics show correct counts:
  - [ ] Filled slots count
  - [ ] Schedule completion percentage
  - [ ] Completed today count
  - [ ] Total streak points
- [ ] Streak analytics display:
  - [ ] Overall level badge with correct emoji
  - [ ] Active streaks count
  - [ ] Longest streak
  - [ ] Completion rate
  - [ ] Streak distribution bars
- [ ] Achievement badges appear:
  - [ ] Week Warrior (7+ streak)
  - [ ] Century Club (100+ points)

### ✅ Theme Toggle
- [ ] Theme toggle button appears in top right
- [ ] Clicking toggles between light and dark mode
- [ ] Theme preference persists after refresh
- [ ] All components adapt to theme changes
- [ ] Smooth transitions between themes

### ✅ Responsive Design
- [ ] Layout works on desktop
- [ ] Layout adapts to tablet size
- [ ] Layout works on mobile devices
- [ ] Controls stack properly on small screens
- [ ] Text remains readable at all sizes

### ✅ User Experience
- [ ] Smooth animations and transitions
- [ ] Hover effects provide feedback
- [ ] Loading states are clear
- [ ] Error messages are helpful
- [ ] Interface is intuitive
- [ ] Performance is smooth

## Edge Cases

### ✅ Data Handling
- [ ] Large amounts of data don't slow down app
- [ ] Special characters in subjects work
- [ ] Empty data states handled gracefully
- [ ] Storage quota warnings (if applicable)

### ✅ Error Scenarios
- [ ] Invalid import files show error
- [ ] Network issues don't break app
- [ ] Browser storage disabled handled
- [ ] Corrupted data recovery

## Browser Compatibility
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## Performance
- [ ] Initial load time < 3 seconds
- [ ] Interactions feel responsive
- [ ] No memory leaks during extended use
- [ ] Smooth animations at 60fps

## Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Color contrast meets standards
- [ ] Focus indicators visible
