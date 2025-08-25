# 📚 Study Tools - Complete Learning Suite

A comprehensive web-based study application featuring a to-do list, flashcards system, and Pomodoro timer to help you stay organized and focused during your study sessions.

## 🚀 Live Demo
**[Try the app now!]([https://your-username.github.io/study-tools/](https://study-tools-two.vercel.app/))**

## 🌟 Features

### 📝 To-Do List
- ✅ Add, edit, and delete tasks
- 🎯 Priority levels (High, Medium, Low) with color coding
- 🔍 Filter tasks by status and priority
- 📊 Progress tracking with statistics
- ✔️ Mark tasks as complete
- 🧹 Clear completed or all tasks
- 💾 Data persistence with local storage

### 📇 Flashcards
- ✨ Create custom flashcards with front/back content
- 🔄 Interactive card flipping with click or button
- ➡️ Navigate through your deck of cards
- 📈 Progress tracking and study statistics
- 🔀 Shuffle cards for randomized study
- 🔄 Reset study sessions
- 💾 Data persistence with local storage

### ⏰ Timers
**🍅 Pomodoro Timer:**
- ⏱️ Customizable work and break durations
- 🔄 Automatic cycling between work and break sessions
- 📊 Session and cycle tracking
- 🤖 Auto-start breaks option
- 🎨 Visual progress circle with animations
- 🔊 Audio notifications

**⏲️ Custom Timer:**
- 🕐 Set custom hours, minutes, and seconds
- ▶️ Start, pause, and reset functionality
- 📊 Visual progress indication
- 🔊 Audio notifications when time is up

## 🎨 Design Features
- 🌈 Modern glass-morphism UI design
- 📱 Responsive layout for all devices
- ✨ Smooth animations and transitions
- 🔤 Professional typography (Inter font)
- 🎯 Intuitive icons (Font Awesome)
- 🎨 Color-coded priority system
- ♿ Accessible design with proper focus styles

## 💻 Usage
1. 🧭 Navigate between tools using the top navigation tabs
2. 💾 All your data is automatically saved in your browser's local storage
3. ⌨️ Use keyboard shortcuts for quick navigation:
   - `Ctrl/Cmd + 1`: Switch to To-Do List
   - `Ctrl/Cmd + 2`: Switch to Flashcards
   - `Ctrl/Cmd + 3`: Switch to Timers
   - `Space`: Flip flashcard (when in flashcard mode)

## 🛠️ Technologies Used
- **HTML5** - Semantic structure
- **CSS3** - Modern styling with animations
- **Vanilla JavaScript** - Interactive functionality
- **Local Storage API** - Data persistence
- **Font Awesome** - Icons
- **Google Fonts** - Typography (Inter)

## 📱 Browser Compatibility
- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🚀 Getting Started

### 📁 Local Development
1. **Clone or download this project**
2. **Open `index.html` in your web browser**
3. **No build process required** - it's pure HTML, CSS, and JavaScript!

### 📂 File Structure
```
study-tools/
├── index.html          # Main HTML file
├── styles.css          # Complete styling
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🌐 Deployment Options

### 🎯 Option 1: Netlify (Instant & Free)
1. Go to [netlify.com/drop](https://netlify.com/drop)
2. Drag and drop your `index.html`, `styles.css`, and `script.js` files
3. Get instant live URL!

### 🎯 Option 2: GitHub Pages
1. Create a GitHub repository
2. Upload your files
3. Enable GitHub Pages in repository settings
4. Your app will be live at `https://YOUR-USERNAME.github.io/REPO-NAME/`

### 🎯 Option 3: Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your project
3. Automatic deployments!

### 🎯 Option 4: Local Server (Testing)
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Then open http://localhost:8000
```

## 🎮 How to Use

### 📝 To-Do List
1. **Add Task**: Type in the input field and press Enter or click "Add Task"
2. **Set Priority**: Choose High, Medium, or Low priority
3. **Mark Complete**: Click the checkbox next to any task
4. **Filter Tasks**: Use the filter buttons to view specific task types
5. **Delete Task**: Click the trash icon on any task
6. **Clear Tasks**: Use "Clear Completed" or "Clear All" buttons

### 📇 Flashcards
1. **Create Cards**: Fill in front and back content, then click "Add Card"
2. **Study Mode**: Click on cards or use "Flip Card" button to reveal answers
3. **Navigate**: Use Previous/Next buttons to move through your deck
4. **Shuffle**: Click "Shuffle" to randomize card order
5. **Reset**: Start over from the first card anytime

### ⏰ Timers
**Pomodoro Timer:**
1. **Customize**: Set work duration, break times in settings
2. **Start Session**: Click "Start" to begin a work session
3. **Auto Breaks**: Enable auto-start breaks for hands-free studying
4. **Track Progress**: Watch your sessions and cycles count up

**Custom Timer:**
1. **Set Time**: Enter hours, minutes, seconds
2. **Start**: Click "Set Timer" then "Start"
3. **Control**: Pause, resume, or reset as needed

## 🎨 Customization

### 🎯 Colors
You can customize the color scheme by editing the CSS variables in `styles.css`:
```css
:root {
  --primary-color: #4f46e5;
  --secondary-color: #10b981;
  --danger-color: #dc2626;
}
```

### 🔊 Sounds
Replace the timer notification sound by updating the audio source in `index.html`:
```html
<audio id="timer-end-sound" preload="auto">
    <source src="your-sound-file.mp3" type="audio/mpeg">
</audio>
```

## 🧩 Features in Detail

### 💾 Data Persistence
- All your data is saved automatically in your browser's local storage
- Data persists between sessions and browser restarts
- No account needed - everything stays local

### ⌨️ Keyboard Shortcuts
- `Ctrl/Cmd + 1` - Switch to To-Do List
- `Ctrl/Cmd + 2` - Switch to Flashcards  
- `Ctrl/Cmd + 3` - Switch to Timers
- `Space` - Flip current flashcard
- `Enter` - Add new todo item (when input is focused)
- `Ctrl + Enter` - Add flashcard (when textarea is focused)

### 📱 Mobile Support
- Fully responsive design works on phones and tablets
- Touch-friendly interface
- Optimized layouts for small screens

## 🔧 Troubleshooting

### 🚫 Audio Not Playing
- Make sure your browser allows audio autoplay
- Check if your device is muted
- Try clicking anywhere on the page first (browsers require user interaction)

### 💾 Data Not Saving
- Ensure you're not in private/incognito mode
- Check if local storage is enabled in your browser
- Try clearing browser cache and reloading

### 📱 Mobile Issues
- Try refreshing the page
- Ensure you have a stable internet connection for external fonts/icons
- Update your mobile browser to the latest version

## 🤝 Contributing

Want to improve the Study Tools app? Here's how:

1. **Fork** the project
2. **Create** your feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### 💡 Feature Ideas
- 🌙 Dark mode toggle
- 📊 Study statistics and analytics
- 🏷️ Tags for todos and flashcards
- 🔄 Import/export functionality
- 📝 Note-taking feature
- 🎵 Background music/sounds
- 🏆 Achievement system

## 📞 Support

Having issues or questions? Here are your options:

- 🐛 **Bug Reports**: Open an issue on GitHub
- 💡 **Feature Requests**: Create a feature request issue
- ❓ **Questions**: Check existing issues or create a new one
- 📧 **Contact**: Reach out via GitHub

## 📜 License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).

## 🙏 Acknowledgments

- 🎨 **Design Inspiration**: Modern productivity apps
- 🔤 **Fonts**: Google Fonts (Inter family)
- 🎯 **Icons**: Font Awesome
- 🍅 **Pomodoro Technique**: Francesco Cirillo
- 💪 **Motivation**: All the students working hard to achieve their goals

## 📈 Version History

### v1.0.0 (Current)
- ✅ Complete to-do list with priorities and filtering
- ✅ Interactive flashcard system with shuffle
- ✅ Pomodoro and custom timers
- ✅ Local storage persistence
- ✅ Responsive design
- ✅ Keyboard shortcuts
- ✅ Audio notifications

---

## 🎉 Ready to Start Studying?

1. **Open** `index.html` in your browser
2. **Create** your first todo item
3. **Add** some flashcards for your subject
4. **Start** a Pomodoro timer
5. **Focus** and achieve your study goals!

**Happy Studying! 📚✨**

Made with ❤️ for students everywhere

---

*Last updated: $(date)*
