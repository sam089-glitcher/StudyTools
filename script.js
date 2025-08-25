// Study Tools Application JavaScript
// Handles all functionality for To-Do List, Flashcards, and Timers

class StudyToolsApp {
    constructor() {
        // Initialize all components
        this.initializeApp();
        this.todoManager = new TodoManager();
        this.flashcardManager = new FlashcardManager();
        this.timerManager = new TimerManager();
        
        this.setupEventListeners();
        this.loadInitialTool();
    }

    initializeApp() {
        // Set up navigation between tools
        this.currentTool = 'todo';
    }

    setupEventListeners() {
        // Navigation tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const toolName = e.currentTarget.dataset.tool;
                this.switchTool(toolName);
            });
        });
    }

    switchTool(toolName) {
        // Hide all tools
        document.querySelectorAll('.tool-section').forEach(section => {
            section.classList.remove('active');
        });

        // Show selected tool
        document.getElementById(`${toolName}-tool`).classList.add('active');

        // Update nav tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tool="${toolName}"]`).classList.add('active');

        this.currentTool = toolName;
    }

    loadInitialTool() {
        // Load the todo tool by default
        this.switchTool('todo');
    }
}

// To-Do List Manager
class TodoManager {
    constructor() {
        this.todos = this.loadTodos();
        this.currentFilter = 'all';
        this.setupEventListeners();
        this.renderTodos();
        this.updateStats();
    }

    loadTodos() {
        const saved = localStorage.getItem('studytools-todos');
        return saved ? JSON.parse(saved) : [];
    }

    saveTodos() {
        localStorage.setItem('studytools-todos', JSON.stringify(this.todos));
    }

    setupEventListeners() {
        // Add todo button
        document.getElementById('add-todo-btn').addEventListener('click', () => {
            this.addTodo();
        });

        // Enter key in input
        document.getElementById('todo-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // Action buttons
        document.getElementById('clear-completed-btn').addEventListener('click', () => {
            this.clearCompleted();
        });

        document.getElementById('clear-all-btn').addEventListener('click', () => {
            this.clearAll();
        });
    }

    addTodo() {
        const input = document.getElementById('todo-input');
        const priority = document.getElementById('priority-select').value;
        const text = input.value.trim();

        if (!text) return;

        const todo = {
            id: Date.now().toString(),
            text: text,
            completed: false,
            priority: priority,
            createdAt: new Date().toISOString()
        };

        this.todos.unshift(todo);
        input.value = '';
        this.saveTodos();
        this.renderTodos();
        this.updateStats();
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.renderTodos();
            this.updateStats();
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.saveTodos();
        this.renderTodos();
        this.updateStats();
    }

    setFilter(filter) {
        this.currentFilter = filter;
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        this.renderTodos();
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'completed':
                return this.todos.filter(t => t.completed);
            case 'pending':
                return this.todos.filter(t => !t.completed);
            case 'high':
                return this.todos.filter(t => t.priority === 'high');
            default:
                return this.todos;
        }
    }

    renderTodos() {
        const container = document.getElementById('todo-list');
        const filteredTodos = this.getFilteredTodos();

        if (filteredTodos.length === 0) {
            container.innerHTML = '<div style="text-align: center; color: #6b7280; padding: 40px;">No tasks to display.</div>';
            return;
        }

        container.innerHTML = filteredTodos.map(todo => `
            <div class="todo-item ${todo.completed ? 'completed' : ''}">
                <input type="checkbox" class="todo-checkbox" 
                       ${todo.completed ? 'checked' : ''} 
                       onchange="app.todoManager.toggleTodo('${todo.id}')">
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <span class="todo-priority priority-${todo.priority}">${todo.priority}</span>
                <button class="delete-btn" onclick="app.todoManager.deleteTodo('${todo.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }

    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const remaining = total - completed;

        document.getElementById('total-tasks').textContent = total;
        document.getElementById('completed-tasks').textContent = completed;
        document.getElementById('remaining-tasks').textContent = remaining;
    }

    clearCompleted() {
        if (confirm('Are you sure you want to clear all completed tasks?')) {
            this.todos = this.todos.filter(t => !t.completed);
            this.saveTodos();
            this.renderTodos();
            this.updateStats();
        }
    }

    clearAll() {
        if (confirm('Are you sure you want to clear all tasks? This cannot be undone.')) {
            this.todos = [];
            this.saveTodos();
            this.renderTodos();
            this.updateStats();
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Flashcard Manager
class FlashcardManager {
    constructor() {
        this.flashcards = this.loadFlashcards();
        this.currentIndex = 0;
        this.isFlipped = false;
        this.setupEventListeners();
        this.renderFlashcards();
        this.updateStats();
    }

    loadFlashcards() {
        const saved = localStorage.getItem('studytools-flashcards');
        return saved ? JSON.parse(saved) : [];
    }

    saveFlashcards() {
        localStorage.setItem('studytools-flashcards', JSON.stringify(this.flashcards));
    }

    setupEventListeners() {
        // Add card button
        document.getElementById('add-card-btn').addEventListener('click', () => {
            this.addCard();
        });

        // Card navigation
        document.getElementById('prev-card-btn').addEventListener('click', () => {
            this.previousCard();
        });

        document.getElementById('next-card-btn').addEventListener('click', () => {
            this.nextCard();
        });

        document.getElementById('flip-card-btn').addEventListener('click', () => {
            this.flipCard();
        });

        // Card click to flip
        document.addEventListener('click', (e) => {
            if (e.target.closest('.flashcard')) {
                this.flipCard();
            }
        });

        // Action buttons
        document.getElementById('shuffle-cards-btn').addEventListener('click', () => {
            this.shuffleCards();
        });

        document.getElementById('reset-study-btn').addEventListener('click', () => {
            this.resetStudy();
        });

        document.getElementById('delete-all-cards-btn').addEventListener('click', () => {
            this.deleteAllCards();
        });

        // Enter key in textareas
        document.getElementById('card-front').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.addCard();
            }
        });

        document.getElementById('card-back').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.addCard();
            }
        });
    }

    addCard() {
        const frontInput = document.getElementById('card-front');
        const backInput = document.getElementById('card-back');
        const front = frontInput.value.trim();
        const back = backInput.value.trim();

        if (!front || !back) {
            alert('Please fill in both front and back of the flashcard.');
            return;
        }

        const card = {
            id: Date.now().toString(),
            front: front,
            back: back,
            createdAt: new Date().toISOString()
        };

        this.flashcards.push(card);
        frontInput.value = '';
        backInput.value = '';
        this.saveFlashcards();
        this.renderFlashcards();
        this.updateStats();

        // If this is the first card, show it
        if (this.flashcards.length === 1) {
            this.currentIndex = 0;
            this.showCurrentCard();
        }
    }

    renderFlashcards() {
        const noCardsMsg = document.getElementById('no-cards-message');
        const flashcard = document.getElementById('current-flashcard');
        const controls = document.getElementById('flashcard-controls');

        if (this.flashcards.length === 0) {
            noCardsMsg.style.display = 'block';
            flashcard.style.display = 'none';
            controls.style.display = 'none';
        } else {
            noCardsMsg.style.display = 'none';
            flashcard.style.display = 'block';
            controls.style.display = 'flex';
            this.showCurrentCard();
        }
    }

    showCurrentCard() {
        if (this.flashcards.length === 0) return;

        const card = this.flashcards[this.currentIndex];
        const frontContent = document.querySelector('#card-front-content .card-text');
        const backContent = document.querySelector('#card-back-content .card-text');
        
        frontContent.textContent = card.front;
        backContent.textContent = card.back;

        // Reset flip state
        this.isFlipped = false;
        document.getElementById('current-flashcard').classList.remove('flipped');

        // Update navigation buttons
        document.getElementById('prev-card-btn').disabled = this.currentIndex === 0;
        document.getElementById('next-card-btn').disabled = this.currentIndex === this.flashcards.length - 1;
    }

    flipCard() {
        if (this.flashcards.length === 0) return;

        const flashcard = document.getElementById('current-flashcard');
        this.isFlipped = !this.isFlipped;
        
        if (this.isFlipped) {
            flashcard.classList.add('flipped');
        } else {
            flashcard.classList.remove('flipped');
        }
    }

    previousCard() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.showCurrentCard();
            this.updateStats();
        }
    }

    nextCard() {
        if (this.currentIndex < this.flashcards.length - 1) {
            this.currentIndex++;
            this.showCurrentCard();
            this.updateStats();
        }
    }

    shuffleCards() {
        if (this.flashcards.length <= 1) return;

        // Fisher-Yates shuffle
        for (let i = this.flashcards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.flashcards[i], this.flashcards[j]] = [this.flashcards[j], this.flashcards[i]];
        }

        this.currentIndex = 0;
        this.saveFlashcards();
        this.showCurrentCard();
        this.updateStats();
    }

    resetStudy() {
        this.currentIndex = 0;
        this.showCurrentCard();
        this.updateStats();
    }

    deleteAllCards() {
        if (confirm('Are you sure you want to delete all flashcards? This cannot be undone.')) {
            this.flashcards = [];
            this.currentIndex = 0;
            this.saveFlashcards();
            this.renderFlashcards();
            this.updateStats();
        }
    }

    updateStats() {
        const total = this.flashcards.length;
        const current = total > 0 ? this.currentIndex + 1 : 0;
        const progress = total > 0 ? Math.round((current / total) * 100) : 0;

        document.getElementById('total-cards').textContent = total;
        document.getElementById('current-card-index').textContent = current;
        document.getElementById('study-progress').textContent = progress + '%';
    }
}

// Timer Manager
class TimerManager {
    constructor() {
        this.currentTimer = 'pomodoro';
        this.timers = {
            pomodoro: new PomodoroTimer(),
            custom: new CustomTimer()
        };
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Timer tabs
        document.querySelectorAll('.timer-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const timerType = e.currentTarget.dataset.timer;
                this.switchTimer(timerType);
            });
        });
    }

    switchTimer(timerType) {
        // Stop current timer
        this.timers[this.currentTimer].stop();

        // Hide all timer containers
        document.querySelectorAll('.timer-container').forEach(container => {
            container.classList.remove('active');
        });

        // Show selected timer
        document.getElementById(`${timerType}-timer`).classList.add('active');

        // Update timer tabs
        document.querySelectorAll('.timer-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-timer="${timerType}"]`).classList.add('active');

        this.currentTimer = timerType;
    }
}

// Pomodoro Timer Class
class PomodoroTimer {
    constructor() {
        this.workDuration = 25 * 60; // 25 minutes in seconds
        this.shortBreak = 5 * 60; // 5 minutes
        this.longBreak = 15 * 60; // 15 minutes
        this.timeRemaining = this.workDuration;
        this.isRunning = false;
        this.isBreak = false;
        this.session = 1;
        this.cycles = 0;
        this.autoStartBreaks = false;
        this.interval = null;
        
        this.setupEventListeners();
        this.updateDisplay();
        this.loadSettings();
    }

    setupEventListeners() {
        document.getElementById('pomodoro-start-btn').addEventListener('click', () => {
            this.start();
        });

        document.getElementById('pomodoro-pause-btn').addEventListener('click', () => {
            this.pause();
        });

        document.getElementById('pomodoro-reset-btn').addEventListener('click', () => {
            this.reset();
        });

        document.getElementById('pomodoro-skip-btn').addEventListener('click', () => {
            this.skip();
        });

        // Settings
        document.getElementById('work-duration').addEventListener('change', () => {
            this.updateSettings();
        });

        document.getElementById('short-break').addEventListener('change', () => {
            this.updateSettings();
        });

        document.getElementById('long-break').addEventListener('change', () => {
            this.updateSettings();
        });

        document.getElementById('auto-start-breaks').addEventListener('change', () => {
            this.updateSettings();
        });
    }

    start() {
        if (this.isRunning) return;

        this.isRunning = true;
        document.getElementById('pomodoro-start-btn').style.display = 'none';
        document.getElementById('pomodoro-pause-btn').style.display = 'inline-flex';
        
        this.updateStatus();
        this.updateTimerClass();

        this.interval = setInterval(() => {
            this.timeRemaining--;
            this.updateDisplay();

            if (this.timeRemaining <= 0) {
                this.complete();
            }
        }, 1000);
    }

    pause() {
        this.isRunning = false;
        clearInterval(this.interval);
        
        document.getElementById('pomodoro-start-btn').style.display = 'inline-flex';
        document.getElementById('pomodoro-pause-btn').style.display = 'none';
        
        document.getElementById('pomodoro-status').textContent = 'Paused';
    }

    reset() {
        this.stop();
        this.isBreak = false;
        this.session = 1;
        this.cycles = 0;
        this.timeRemaining = this.workDuration;
        this.updateDisplay();
        this.updateSessionInfo();
        this.updateStatus();
        this.updateTimerClass();
    }

    skip() {
        this.stop();
        this.complete();
    }

    stop() {
        this.isRunning = false;
        clearInterval(this.interval);
        
        document.getElementById('pomodoro-start-btn').style.display = 'inline-flex';
        document.getElementById('pomodoro-pause-btn').style.display = 'none';
    }

    complete() {
        this.stop();
        this.playNotificationSound();

        if (!this.isBreak) {
            // Work session completed
            this.cycles++;
            this.isBreak = true;
            
            // Long break every 4 cycles, short break otherwise
            if (this.cycles % 4 === 0) {
                this.timeRemaining = this.longBreak;
                document.getElementById('pomodoro-status').textContent = 'Long Break!';
            } else {
                this.timeRemaining = this.shortBreak;
                document.getElementById('pomodoro-status').textContent = 'Short Break!';
            }
        } else {
            // Break completed
            this.isBreak = false;
            this.session++;
            this.timeRemaining = this.workDuration;
            document.getElementById('pomodoro-status').textContent = 'Work Time!';
        }

        this.updateDisplay();
        this.updateSessionInfo();
        this.updateTimerClass();

        if (this.autoStartBreaks && this.isBreak) {
            setTimeout(() => this.start(), 2000);
        }
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        document.getElementById('pomodoro-time').textContent = timeString;
        this.updateProgress();
    }

    updateProgress() {
        const circle = document.getElementById('pomodoro-progress');
        const totalTime = this.isBreak ? 
            (this.cycles % 4 === 0 ? this.longBreak : this.shortBreak) : 
            this.workDuration;
        
        const progress = ((totalTime - this.timeRemaining) / totalTime) * 283;
        circle.style.strokeDashoffset = 283 - progress;
    }

    updateStatus() {
        if (this.isRunning) {
            if (this.isBreak) {
                document.getElementById('pomodoro-status').textContent = 'Break Time - Relax!';
            } else {
                document.getElementById('pomodoro-status').textContent = 'Work Time - Focus!';
            }
        } else if (this.timeRemaining === (this.isBreak ? this.shortBreak : this.workDuration)) {
            document.getElementById('pomodoro-status').textContent = 'Ready to start';
        }
    }

    updateSessionInfo() {
        document.getElementById('pomodoro-session').textContent = this.session;
        document.getElementById('pomodoro-cycles').textContent = this.cycles;
    }

    updateTimerClass() {
        const timerContainer = document.getElementById('pomodoro-timer');
        timerContainer.className = 'timer-container active';
        
        if (this.isRunning && this.isBreak) {
            timerContainer.classList.add('timer-break');
        } else if (this.isRunning) {
            timerContainer.classList.add('timer-running');
        } else if (this.timeRemaining === 0) {
            timerContainer.classList.add('timer-finished');
        }
    }

    updateSettings() {
        this.workDuration = parseInt(document.getElementById('work-duration').value) * 60;
        this.shortBreak = parseInt(document.getElementById('short-break').value) * 60;
        this.longBreak = parseInt(document.getElementById('long-break').value) * 60;
        this.autoStartBreaks = document.getElementById('auto-start-breaks').checked;
        
        // If not running, update current time
        if (!this.isRunning && !this.isBreak) {
            this.timeRemaining = this.workDuration;
            this.updateDisplay();
        }

        this.saveSettings();
    }

    loadSettings() {
        const settings = localStorage.getItem('studytools-pomodoro-settings');
        if (settings) {
            const parsed = JSON.parse(settings);
            document.getElementById('work-duration').value = parsed.workDuration / 60;
            document.getElementById('short-break').value = parsed.shortBreak / 60;
            document.getElementById('long-break').value = parsed.longBreak / 60;
            document.getElementById('auto-start-breaks').checked = parsed.autoStartBreaks;
            this.updateSettings();
        }
    }

    saveSettings() {
        const settings = {
            workDuration: this.workDuration,
            shortBreak: this.shortBreak,
            longBreak: this.longBreak,
            autoStartBreaks: this.autoStartBreaks
        };
        localStorage.setItem('studytools-pomodoro-settings', JSON.stringify(settings));
    }

    playNotificationSound() {
        const audio = document.getElementById('timer-end-sound');
        audio.play().catch(e => console.log('Could not play sound:', e));
    }
}

// Custom Timer Class
class CustomTimer {
    constructor() {
        this.totalTime = 0;
        this.timeRemaining = 0;
        this.isRunning = false;
        this.interval = null;
        
        this.setupEventListeners();
        this.updateDisplay();
    }

    setupEventListeners() {
        document.getElementById('set-custom-timer-btn').addEventListener('click', () => {
            this.setTimer();
        });

        document.getElementById('custom-start-btn').addEventListener('click', () => {
            this.start();
        });

        document.getElementById('custom-pause-btn').addEventListener('click', () => {
            this.pause();
        });

        document.getElementById('custom-reset-btn').addEventListener('click', () => {
            this.reset();
        });
    }

    setTimer() {
        const hours = parseInt(document.getElementById('custom-hours').value) || 0;
        const minutes = parseInt(document.getElementById('custom-minutes').value) || 0;
        const seconds = parseInt(document.getElementById('custom-seconds').value) || 0;

        this.totalTime = hours * 3600 + minutes * 60 + seconds;
        
        if (this.totalTime === 0) {
            alert('Please set a valid time.');
            return;
        }

        this.timeRemaining = this.totalTime;
        this.updateDisplay();
        document.getElementById('custom-status').textContent = 'Timer set - Ready to start!';
    }

    start() {
        if (this.totalTime === 0) {
            this.setTimer();
            return;
        }

        if (this.isRunning) return;

        this.isRunning = true;
        document.getElementById('custom-start-btn').style.display = 'none';
        document.getElementById('custom-pause-btn').style.display = 'inline-flex';
        document.getElementById('custom-status').textContent = 'Timer running...';
        
        document.getElementById('custom-timer').classList.add('timer-running');

        this.interval = setInterval(() => {
            this.timeRemaining--;
            this.updateDisplay();

            if (this.timeRemaining <= 0) {
                this.complete();
            }
        }, 1000);
    }

    pause() {
        this.isRunning = false;
        clearInterval(this.interval);
        
        document.getElementById('custom-start-btn').style.display = 'inline-flex';
        document.getElementById('custom-pause-btn').style.display = 'none';
        document.getElementById('custom-status').textContent = 'Timer paused';
        
        document.getElementById('custom-timer').classList.remove('timer-running');
    }

    reset() {
        this.stop();
        this.timeRemaining = this.totalTime;
        this.updateDisplay();
        document.getElementById('custom-status').textContent = this.totalTime > 0 ? 'Ready to start!' : 'Set your timer';
        document.getElementById('custom-timer').className = 'timer-container active';
    }

    stop() {
        this.isRunning = false;
        clearInterval(this.interval);
        
        document.getElementById('custom-start-btn').style.display = 'inline-flex';
        document.getElementById('custom-pause-btn').style.display = 'none';
        
        document.getElementById('custom-timer').classList.remove('timer-running', 'timer-finished');
    }

    complete() {
        this.stop();
        document.getElementById('custom-status').textContent = 'Time\'s up!';
        document.getElementById('custom-timer').classList.add('timer-finished');
        this.playNotificationSound();
    }

    updateDisplay() {
        const hours = Math.floor(this.timeRemaining / 3600);
        const minutes = Math.floor((this.timeRemaining % 3600) / 60);
        const seconds = this.timeRemaining % 60;
        
        let timeString;
        if (hours > 0) {
            timeString = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        document.getElementById('custom-time').textContent = timeString;
        this.updateProgress();
    }

    updateProgress() {
        const circle = document.getElementById('custom-progress');
        if (this.totalTime === 0) {
            circle.style.strokeDashoffset = 283;
            return;
        }
        
        const progress = ((this.totalTime - this.timeRemaining) / this.totalTime) * 283;
        circle.style.strokeDashoffset = 283 - progress;
    }

    playNotificationSound() {
        const audio = document.getElementById('timer-end-sound');
        audio.play().catch(e => console.log('Could not play sound:', e));
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new StudyToolsApp();
});

// Handle page visibility change to pause timers
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Optionally pause timers when page becomes hidden
        console.log('Page is hidden');
    } else {
        // Resume or update when page becomes visible
        console.log('Page is visible');
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + 1, 2, 3 to switch tools
    if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey) {
        switch (e.key) {
            case '1':
                e.preventDefault();
                window.app.switchTool('todo');
                break;
            case '2':
                e.preventDefault();
                window.app.switchTool('flashcards');
                break;
            case '3':
                e.preventDefault();
                window.app.switchTool('timer');
                break;
        }
    }
    
    // Space to flip flashcard (when in flashcard tool)
    if (e.key === ' ' && window.app.currentTool === 'flashcards') {
        e.preventDefault();
        window.app.flashcardManager.flipCard();
    }
});
