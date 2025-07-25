# 📅 Modern Time Table Maker

A beautiful, modern time table maker with streak tracking functionality built with React and Vite.

## ✨ Features

### 🗓️ **Editable Time Table**
- Click any cell to add or edit subjects
- 7-day weekly view with hourly time slots (6 AM - 10 PM)
- Auto-save functionality every 10 seconds
- Clean, intuitive interface

### 🔥 **Streak Tracking System**
- Check off completed tasks with visual checkboxes
- Progressive streak levels with unique emojis:
  - 🔥 Beginner (1-2 streaks)
  - 🚀 Intermediate (3-6 streaks)
  - ⚡ Advanced (7-13 streaks)
  - 💎 Expert (14-29 streaks)
  - 👑 Legendary (30+ streaks)
- Achievement badges for milestones
- Visual feedback and animations

### 📊 **Analytics Dashboard**
- Real-time statistics and progress tracking
- Streak distribution visualization
- Completion rates and performance metrics
- Overall level system based on total points

### 💾 **Data Management**
- Automatic local storage persistence
- Export/Import functionality (JSON format)
- Automatic backup system
- Data recovery options

### 🎨 **Modern UI/UX**
- Light and dark theme toggle
- Responsive design for all devices
- Smooth animations and transitions
- Professional gradient backgrounds
- Intuitive controls and feedback

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   cd time_table
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📖 How to Use

### Creating Your Schedule
1. Click on any time slot cell
2. Type your subject or activity name
3. Press Enter or click outside to save
4. Repeat for all your scheduled activities

### Tracking Streaks
1. Complete a scheduled activity
2. Click the checkbox in that time slot
3. Watch your streak counter increase! 🔥
4. Maintain consistency to build longer streaks
5. Earn achievement badges for milestones

### Managing Data
- **Auto-save**: Your data saves automatically every 10 seconds
- **Export**: Click "📤 Export Data" to download your schedule
- **Import**: Click "📥 Import Data" to load a saved schedule
- **Backup**: Use "💾 Restore Backup" to recover from automatic backups
- **Reset**: Use "🔄 Reset Streaks" or "🗑️ Clear All" as needed

### Customization
- **Theme**: Click the 🌙/☀️ button to toggle dark/light mode
- **Analytics**: View your progress in the statistics section
- **Responsive**: Works perfectly on desktop, tablet, and mobile

## 🛠️ Technical Details

### Built With
- **React 19** - Modern UI library
- **Vite 5** - Fast build tool and dev server
- **Vanilla CSS** - Custom styling with CSS Grid and Flexbox
- **Local Storage API** - Data persistence
- **File API** - Import/export functionality

### Project Structure
```
src/
├── components/          # React components
│   ├── StreakCell.jsx      # Individual time slot with streak tracking
│   ├── StreakAnalytics.jsx # Analytics dashboard
│   ├── SaveIndicator.jsx   # Auto-save status indicator
│   └── ThemeToggle.jsx     # Dark/light mode toggle
├── utils/
│   └── dataManager.js   # Data persistence utilities
├── tests/
│   └── manual-test-checklist.md
├── App.jsx             # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles and themes
```

### Key Features Implementation
- **Streak System**: Progressive levels with visual feedback
- **Auto-save**: Debounced saving with visual indicators
- **Theme System**: CSS class-based dark/light mode
- **Data Export**: JSON-based backup and restore
- **Responsive Design**: Mobile-first CSS approach

## 🎯 Use Cases

- **Students**: Track study schedules and build study habits
- **Professionals**: Manage work schedules and productivity
- **Fitness**: Track workout routines and consistency
- **Personal Development**: Build and maintain daily habits
- **Time Management**: Visualize and optimize daily schedules

## 🔧 Customization

The app is highly customizable:
- Modify time slots in `TIME_SLOTS` array
- Adjust auto-save interval in `AutoSave` constructor
- Customize streak levels and emojis in `StreakCell.jsx`
- Update color schemes in `index.css`
- Add new statistics in `StreakAnalytics.jsx`

## 📱 Browser Support

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve the application!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy scheduling! 📅✨**
