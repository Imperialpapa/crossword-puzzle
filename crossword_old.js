// ===== Crossword Puzzle Game =====
class CrosswordGame {
    constructor() {
        this.gridSize = 15;
        this.language = 'english';
        this.difficulty = 5;
        this.timer = 300; // 5 minutes for crossword
        this.score = 0;
        this.gameActive = false;
        this.isPaused = false;
        this.soundEnabled = true;
        this.theme = 'light';
        
        // Crossword specific
        this.grid = [];
        this.solution = [];
        this.words = [];
        this.clues = { across: [], down: [] };
        this.currentCell = null;
        this.currentDirection = 'across';
        this.currentWord = null;
        this.timerInterval = null;
        this.completedWords = new Set();
        
        this.initDOM();
        this.initEventListeners();
        this.initTheme();
        this.loadHighScores();
    }

    // ===== Crossword Word Database =====
    getCrosswordDatabase() {
        return {
            english: {
                1: [
                    { word: 'CAT', clue: 'Pet that meows' },
                    { word: 'DOG', clue: 'Mans best friend' },
                    { word: 'SUN', clue: 'Our nearest star' },
                    { word: 'CAR', clue: 'Vehicle with wheels' },
                    { word: 'BOX', clue: 'Square container' },
                    { word: 'HAT', clue: 'Head covering' },
                    { word: 'BAT', clue: 'Flying mammal' },
                    { word: 'RUN', clue: 'Move quickly' },
                    { word: 'FUN', clue: 'Enjoyment' },
                    { word: 'CUP', clue: 'Drinking vessel' }
                ],
                2: [
                    { word: 'HOUSE', clue: 'Place to live' },
                    { word: 'WATER', clue: 'H2O liquid' },
                    { word: 'HAPPY', clue: 'Feeling joyful' },
                    { word: 'GREEN', clue: 'Color of grass' },
                    { word: 'MUSIC', clue: 'Sound art' },
                    { word: 'BREAD', clue: 'Baked food' },
                    { word: 'LIGHT', clue: 'Opposite of dark' },
                    { word: 'CHAIR', clue: 'Furniture to sit' },
                    { word: 'PHONE', clue: 'Communication device' },
                    { word: 'HEART', clue: 'Organ that pumps blood' }
                ],
                3: [
                    { word: 'COMPUTER', clue: 'Electronic machine' },
                    { word: 'RAINBOW', clue: 'Colorful arc after rain' },
                    { word: 'BICYCLE', clue: 'Two-wheeled vehicle' },
                    { word: 'KITCHEN', clue: 'Room for cooking' },
                    { word: 'PICTURE', clue: 'Visual image' },
                    { word: 'WEATHER', clue: 'Atmospheric conditions' },
                    { word: 'STUDENT', clue: 'Person learning' },
                    { word: 'BROTHER', clue: 'Male sibling' },
                    { word: 'FLOWERS', clue: 'Blooming plants' },
                    { word: 'MACHINE', clue: 'Mechanical device' }
                ]
            },
            korean: {
                1: [
                    { word: '고양이', clue: '야옹하는 애완동물' },
                    { word: '강아지', clue: '사람의 친구인 동물' },
                    { word: '햇빛', clue: '태양에서 나오는 빛' },
                    { word: '자동차', clue: '바퀴로 움직이는 탈것' },
                    { word: '상자', clue: '물건을 담는 그릇' },
                    { word: '모자', clue: '머리에 쓰는 것' },
                    { word: '박쥐', clue: '밤에 나는 동물' },
                    { word: '달리기', clue: '빠르게 움직이는 것' },
                    { word: '재미', clue: '즐거운 느낌' },
                    { word: '컵', clue: '물을 마시는 그릇' }
                ],
                2: [
                    { word: '집', clue: '사람이 사는 곳' },
                    { word: '물', clue: '마시는 투명한 액체' },
                    { word: '행복', clue: '기쁜 마음' },
                    { word: '초록', clue: '풀의 색깔' },
                    { word: '음악', clue: '귀로 듣는 예술' },
                    { word: '빵', clue: '밀가루로 만든 음식' },
                    { word: '빛', clue: '어둠의 반대' },
                    { word: '의자', clue: '앉는 가구' },
                    { word: '전화', clue: '멀리 있는 사람과 이야기하는 기계' },
                    { word: '심장', clue: '피를 보내는 기관' }
                ],
                3: [
                    { word: '컴퓨터', clue: '정보를 처리하는 기계' },
                    { word: '무지개', clue: '비 온 후 하늘의 색깔 띠' },
                    { word: '자전거', clue: '페달로 움직이는 탈것' },
                    { word: '부엌', clue: '요리하는 방' },
                    { word: '그림', clue: '그려서 만든 작품' },
                    { word: '날씨', clue: '하늘의 상태' },
                    { word: '학생', clue: '공부하는 사람' },
                    { word: '형제', clue: '같은 부모의 아들들' },
                    { word: '꽃', clue: '식물의 아름다운 부분' },
                    { word: '기계', clue: '일을 도와주는 도구' }
                ]
            }
        };
    }

    // ===== DOM Initialization =====
    initDOM() {
        // Screens
        this.startScreen = document.getElementById('startScreen');
        this.gameScreen = document.getElementById('gameScreen');
        this.highScoreScreen = document.getElementById('highScoreScreen');
        this.gameOverScreen = document.getElementById('gameOverScreen');
        
        // Controls
        this.gridSizeSelect = document.getElementById('gridSize');
        this.languageSelect = document.getElementById('language');
        this.difficultySlider = document.getElementById('difficulty');
        this.sliderValue = document.querySelector('.slider-value');
        
        // Game elements
        this.wordGrid = document.getElementById('wordGrid');
        this.cluesList = document.getElementById('wordList'); // Reuse for clues
        this.timerDisplay = document.getElementById('timer');
        this.scoreDisplay = document.getElementById('score');
        this.foundWordsDisplay = document.getElementById('foundWords');
        this.totalWordsDisplay = document.getElementById('totalWords');
        
        // Modals
        this.pauseModal = document.getElementById('pauseModal');
        this.nameModal = document.getElementById('nameModal');
        this.helpModal = document.getElementById('helpModal');
        
        // Other elements
        this.celebrationCanvas = document.getElementById('celebrationCanvas');
        this.scoreList = document.getElementById('scoreList');
    }

    // ===== Event Listeners =====
    initEventListeners() {
        // Start screen controls
        document.getElementById('startGame').addEventListener('click', () => this.startGame());
        document.getElementById('highScoreBtn').addEventListener('click', () => this.showHighScores());
        document.getElementById('backToMenuBtn').addEventListener('click', () => this.showStartScreen());
        
        // Settings
        this.difficultySlider.addEventListener('input', (e) => {
            this.difficulty = parseInt(e.target.value);
            this.sliderValue.textContent = this.difficulty;
        });
        
        this.gridSizeSelect.addEventListener('change', (e) => {
            this.gridSize = parseInt(e.target.value);
        });
        
        this.languageSelect.addEventListener('change', (e) => {
            this.language = e.target.value;
        });
        
        // Game controls
        document.getElementById('pauseBtn').addEventListener('click', () => this.pauseGame());
        document.getElementById('hintBtn').addEventListener('click', () => this.showHint());
        document.getElementById('resumeBtn').addEventListener('click', () => this.resumeGame());
        document.getElementById('quitBtn').addEventListener('click', () => this.endGame());
        
        // Header controls
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
        document.getElementById('soundToggle').addEventListener('click', () => this.toggleSound());
        document.getElementById('helpBtn').addEventListener('click', () => this.showHelp());
        
        // Modal controls
        document.getElementById('saveScoreBtn').addEventListener('click', () => this.saveHighScore());
        document.getElementById('skipNameBtn').addEventListener('click', () => this.skipNameInput());
        document.getElementById('closeHelpBtn').addEventListener('click', () => this.closeModal('helpModal'));
        
        // Keyboard input for crossword
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        document.addEventListener('click', (e) => this.handleClick(e));
    }

    // ===== Theme Management =====
    initTheme() {
        const savedTheme = localStorage.getItem('crossword-theme') || 'light';
        this.theme = savedTheme;
        document.body.setAttribute('data-theme', this.theme);
        this.updateThemeIcon();
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', this.theme);
        localStorage.setItem('crossword-theme', this.theme);
        this.updateThemeIcon();
        this.playSound('click');
    }

    updateThemeIcon() {
        const icon = document.querySelector('#themeToggle i');
        icon.className = this.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    // ===== Sound Management =====
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        const icon = document.querySelector('#soundToggle i');
        icon.className = this.soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
        localStorage.setItem('crossword-sound', this.soundEnabled);
        this.playSound('click');
    }

    playSound(type) {
        if (!this.soundEnabled) return;
        
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        switch(type) {
            case 'click':
                oscillator.frequency.value = 800;
                gainNode.gain.value = 0.1;
                break;
            case 'correct':
                oscillator.frequency.value = 1200;
                gainNode.gain.value = 0.2;
                break;
            case 'error':
                oscillator.frequency.value = 400;
                gainNode.gain.value = 0.1;
                break;
            case 'complete':
                oscillator.frequency.value = 1500;
                gainNode.gain.value = 0.3;
                break;
        }
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
    }

    // ===== Crossword Generation =====
    startGame() {
        this.initializeGame();
        this.generateCrossword();
        this.renderGrid();
        this.renderClues();
        this.showGameScreen();
        this.startTimer();
        this.gameActive = true;
        this.playSound('click');
    }

    initializeGame() {
        this.grid = Array(this.gridSize).fill().map(() => 
            Array(this.gridSize).fill({ type: 'black', value: '', number: null, userInput: '' })
        );
        this.solution = Array(this.gridSize).fill().map(() => 
            Array(this.gridSize).fill('')
        );
        this.words = [];
        this.clues = { across: [], down: [] };
        this.completedWords.clear();
        this.score = 0;
        this.timer = 300;
        this.currentCell = null;
        this.currentDirection = 'across';
        this.updateScore();
    }

    generateCrossword() {
        // Select words based on difficulty
        this.selectWordsForCrossword();
        
        // Place words on grid
        this.placeWordsOnGrid();
        
        // Add numbers to grid
        this.addNumbersToGrid();
        
        // Generate clues
        this.generateClues();
    }

    selectWordsForCrossword() {
        const database = this.getCrosswordDatabase();
        const langWords = database[this.language];
        
        this.words = [];
        
        // Select words from different difficulty levels
        for (let level = 1; level <= Math.min(this.difficulty, 3); level++) {
            if (langWords[level]) {
                const wordsToAdd = Math.min(4, langWords[level].length);
                const selectedWords = this.shuffleArray(langWords[level]).slice(0, wordsToAdd);
                this.words.push(...selectedWords);
            }
        }
        
        // Limit total words for grid size
        const maxWords = Math.floor(this.gridSize * 0.8);
        if (this.words.length > maxWords) {
            this.words = this.words.slice(0, maxWords);
        }
    }

    placeWordsOnGrid() {
        // Simple placement algorithm - start with center and branch out
        const centerRow = Math.floor(this.gridSize / 2);
        const centerCol = Math.floor(this.gridSize / 2);
        
        // Place first word horizontally in center
        if (this.words.length > 0) {
            this.placeWord(this.words[0], centerRow, centerCol - Math.floor(this.words[0].word.length / 2), 'across');
        }
        
        // Place remaining words
        for (let i = 1; i < this.words.length; i++) {
            this.findPlacementForWord(this.words[i]);
        }
    }

    placeWord(wordObj, row, col, direction) {
        const word = wordObj.word.toUpperCase();
        
        for (let i = 0; i < word.length; i++) {
            const r = direction === 'across' ? row : row + i;
            const c = direction === 'across' ? col + i : col;
            
            if (r >= 0 && r < this.gridSize && c >= 0 && c < this.gridSize) {
                this.grid[r][c] = { 
                    type: 'white', 
                    value: word[i], 
                    number: null, 
                    userInput: '',
                    wordId: `${direction}-${this.words.indexOf(wordObj)}`
                };
                this.solution[r][c] = word[i];
            }
        }
        
        // Store word position
        wordObj.row = row;
        wordObj.col = col;
        wordObj.direction = direction;
        wordObj.length = word.length;
    }

    findPlacementForWord(wordObj) {
        const word = wordObj.word.toUpperCase();
        let placed = false;
        
        // Try to intersect with existing words
        for (let row = 0; row < this.gridSize && !placed; row++) {
            for (let col = 0; col < this.gridSize && !placed; col++) {
                if (this.grid[row][col].type === 'white') {
                    // Try both directions
                    const directions = ['across', 'down'];
                    
                    for (const direction of directions) {
                        for (let letterIndex = 0; letterIndex < word.length; letterIndex++) {
                            if (word[letterIndex] === this.grid[row][col].value) {
                                const startRow = direction === 'across' ? row : row - letterIndex;
                                const startCol = direction === 'across' ? col - letterIndex : col;
                                
                                if (this.canPlaceWordAt(word, startRow, startCol, direction)) {
                                    this.placeWord(wordObj, startRow, startCol, direction);
                                    placed = true;
                                    break;
                                }
                            }
                        }
                        if (placed) break;
                    }
                }
            }
        }
        
        // If can't intersect, place randomly in empty area
        if (!placed) {
            this.placeWordRandomly(wordObj);
        }
    }

    canPlaceWordAt(word, row, col, direction) {
        if (row < 0 || col < 0) return false;
        
        const endRow = direction === 'across' ? row : row + word.length - 1;
        const endCol = direction === 'across' ? col + word.length - 1 : col;
        
        if (endRow >= this.gridSize || endCol >= this.gridSize) return false;
        
        // Check each position
        for (let i = 0; i < word.length; i++) {
            const r = direction === 'across' ? row : row + i;
            const c = direction === 'across' ? col + i : col;
            
            const currentCell = this.grid[r][c];
            
            if (currentCell.type === 'white' && currentCell.value !== word[i]) {
                return false;
            }
        }
        
        return true;
    }

    placeWordRandomly(wordObj) {
        const word = wordObj.word.toUpperCase();
        const direction = Math.random() < 0.5 ? 'across' : 'down';
        
        const maxRow = direction === 'across' ? this.gridSize - 1 : this.gridSize - word.length;
        const maxCol = direction === 'across' ? this.gridSize - word.length : this.gridSize - 1;
        
        if (maxRow >= 0 && maxCol >= 0) {
            const row = Math.floor(Math.random() * (maxRow + 1));
            const col = Math.floor(Math.random() * (maxCol + 1));
            
            this.placeWord(wordObj, row, col, direction);
        }
    }

    addNumbersToGrid() {
        let number = 1;
        
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                if (this.grid[row][col].type === 'white') {
                    let needsNumber = false;
                    
                    // Check if start of across word
                    if (col === 0 || this.grid[row][col - 1].type === 'black') {
                        if (col + 1 < this.gridSize && this.grid[row][col + 1].type === 'white') {
                            needsNumber = true;
                        }
                    }
                    
                    // Check if start of down word
                    if (row === 0 || this.grid[row - 1][col].type === 'black') {
                        if (row + 1 < this.gridSize && this.grid[row + 1][col].type === 'white') {
                            needsNumber = true;
                        }
                    }
                    
                    if (needsNumber) {
                        this.grid[row][col].number = number;
                        number++;
                    }
                }
            }
        }
    }

    generateClues() {
        this.clues = { across: [], down: [] };
        
        this.words.forEach(wordObj => {
            const clue = {
                number: this.grid[wordObj.row][wordObj.col].number,
                clue: wordObj.clue,
                answer: wordObj.word.toUpperCase(),
                row: wordObj.row,
                col: wordObj.col,
                length: wordObj.length
            };
            
            this.clues[wordObj.direction].push(clue);
        });
        
        // Sort clues by number
        this.clues.across.sort((a, b) => a.number - b.number);
        this.clues.down.sort((a, b) => a.number - b.number);
    }

    // ===== Rendering =====
    renderGrid() {
        this.wordGrid.innerHTML = '';
        this.wordGrid.style.gridTemplateColumns = `repeat(${this.gridSize}, 1fr)`;
        this.wordGrid.className = 'crossword-grid';
        
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const cell = document.createElement('div');
                const cellData = this.grid[row][col];
                
                cell.className = `crossword-cell ${cellData.type}`;
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                if (cellData.type === 'white') {
                    // Add number if exists
                    if (cellData.number) {
                        const numberDiv = document.createElement('div');
                        numberDiv.className = 'cell-number';
                        numberDiv.textContent = cellData.number;
                        cell.appendChild(numberDiv);
                    }
                    
                    // Add input for user
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.maxLength = 1;
                    input.className = 'cell-input';
                    input.dataset.row = row;
                    input.dataset.col = col;
                    cell.appendChild(input);
                } else {
                    cell.classList.add('black-cell');
                }
                
                this.wordGrid.appendChild(cell);
            }
        }
    }

    renderClues() {
        this.cluesList.innerHTML = '';
        
        // Create clues sections
        const acrossSection = document.createElement('div');
        acrossSection.className = 'clues-section';
        acrossSection.innerHTML = '<h3>가로 (Across)</h3>';
        
        const downSection = document.createElement('div');
        downSection.className = 'clues-section';
        downSection.innerHTML = '<h3>세로 (Down)</h3>';
        
        // Add across clues
        this.clues.across.forEach(clue => {
            const clueElement = document.createElement('div');
            clueElement.className = 'clue-item';
            clueElement.innerHTML = `<span class="clue-number">${clue.number}.</span> ${clue.clue}`;
            clueElement.addEventListener('click', () => this.selectWord(clue, 'across'));
            acrossSection.appendChild(clueElement);
        });
        
        // Add down clues
        this.clues.down.forEach(clue => {
            const clueElement = document.createElement('div');
            clueElement.className = 'clue-item';
            clueElement.innerHTML = `<span class="clue-number">${clue.number}.</span> ${clue.clue}`;
            clueElement.addEventListener('click', () => this.selectWord(clue, 'down'));
            downSection.appendChild(clueElement);
        });
        
        this.cluesList.appendChild(acrossSection);
        this.cluesList.appendChild(downSection);
        
        this.updateWordCount();
    }

    // ===== Input Handling =====
    handleClick(e) {
        if (!this.gameActive) return;
        
        const cell = e.target.closest('.crossword-cell');
        if (cell && cell.classList.contains('white')) {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            this.selectCell(row, col);
        }
    }

    selectCell(row, col) {
        // Clear previous selection
        document.querySelectorAll('.crossword-cell').forEach(cell => {
            cell.classList.remove('selected', 'word-selected');
        });
        
        this.currentCell = { row, col };
        
        // Highlight selected cell
        const cellElement = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        cellElement.classList.add('selected');
        
        // Highlight current word
        this.highlightCurrentWord();
        
        // Focus input
        const input = cellElement.querySelector('.cell-input');
        if (input) {
            input.focus();
        }
    }

    highlightCurrentWord() {
        if (!this.currentCell) return;
        
        const { row, col } = this.currentCell;
        
        // Find word that contains this cell
        const word = this.findWordAtPosition(row, col, this.currentDirection);
        if (word) {
            this.currentWord = word;
            this.highlightWord(word);
        }
    }

    findWordAtPosition(row, col, direction) {
        return this.clues[direction].find(clue => {
            if (direction === 'across') {
                return clue.row === row && col >= clue.col && col < clue.col + clue.length;
            } else {
                return clue.col === col && row >= clue.row && row < clue.row + clue.length;
            }
        });
    }

    highlightWord(word) {
        for (let i = 0; i < word.length; i++) {
            const r = word.direction === 'across' ? word.row : word.row + i;
            const c = word.direction === 'across' ? word.col + i : word.col;
            
            const cell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
            if (cell) {
                cell.classList.add('word-selected');
            }
        }
    }

    selectWord(clue, direction) {
        this.currentDirection = direction;
        this.selectCell(clue.row, clue.col);
        this.playSound('click');
    }

    handleKeyboard(e) {
        if (!this.gameActive || !this.currentCell) return;
        
        const { row, col } = this.currentCell;
        
        if (e.key >= 'a' && e.key <= 'z' || e.key >= 'A' && e.key <= 'Z' || 
            (this.language === 'korean' && e.key.length === 1)) {
            e.preventDefault();
            this.enterLetter(row, col, e.key.toUpperCase());
            this.moveToNextCell();
        } else if (e.key === 'Backspace') {
            e.preventDefault();
            this.enterLetter(row, col, '');
            this.moveToPreviousCell();
        } else if (e.key === 'Tab') {
            e.preventDefault();
            this.currentDirection = this.currentDirection === 'across' ? 'down' : 'across';
            this.highlightCurrentWord();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || 
                   e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            this.handleArrowKey(e.key);
        } else if (e.key === 'Escape') {
            this.pauseGame();
        } else if (e.key === ' ') {
            e.preventDefault();
            this.showHint();
        }
    }

    enterLetter(row, col, letter) {
        const input = document.querySelector(`input[data-row="${row}"][data-col="${col}"]`);
        if (input) {
            input.value = letter;
            this.grid[row][col].userInput = letter;
            this.checkWordCompletion();
            this.playSound(letter ? 'click' : 'error');
        }
    }

    moveToNextCell() {
        if (!this.currentCell || !this.currentWord) return;
        
        const { row, col } = this.currentCell;
        let nextRow = row;
        let nextCol = col;
        
        if (this.currentDirection === 'across') {
            nextCol++;
            if (nextCol >= this.currentWord.col + this.currentWord.length) {
                return; // End of word
            }
        } else {
            nextRow++;
            if (nextRow >= this.currentWord.row + this.currentWord.length) {
                return; // End of word
            }
        }
        
        this.selectCell(nextRow, nextCol);
    }

    moveToPreviousCell() {
        if (!this.currentCell || !this.currentWord) return;
        
        const { row, col } = this.currentCell;
        let prevRow = row;
        let prevCol = col;
        
        if (this.currentDirection === 'across') {
            prevCol--;
            if (prevCol < this.currentWord.col) {
                return; // Start of word
            }
        } else {
            prevRow--;
            if (prevRow < this.currentWord.row) {
                return; // Start of word
            }
        }
        
        this.selectCell(prevRow, prevCol);
    }

    handleArrowKey(key) {
        if (!this.currentCell) return;
        
        const { row, col } = this.currentCell;
        let newRow = row;
        let newCol = col;
        
        switch (key) {
            case 'ArrowLeft':
                newCol = Math.max(0, col - 1);
                break;
            case 'ArrowRight':
                newCol = Math.min(this.gridSize - 1, col + 1);
                break;
            case 'ArrowUp':
                newRow = Math.max(0, row - 1);
                break;
            case 'ArrowDown':
                newRow = Math.min(this.gridSize - 1, row + 1);
                break;
        }
        
        if (this.grid[newRow][newCol].type === 'white') {
            this.selectCell(newRow, newCol);
        }
    }

    checkWordCompletion() {
        // Check all words for completion
        [...this.clues.across, ...this.clues.down].forEach(clue => {
            let isComplete = true;
            let userWord = '';
            
            for (let i = 0; i < clue.length; i++) {
                const r = clue.direction === 'across' ? clue.row : clue.row + i;
                const c = clue.direction === 'across' ? clue.col + i : clue.col;
                
                const userInput = this.grid[r][c].userInput;
                userWord += userInput;
                
                if (!userInput || userInput !== clue.answer[i]) {
                    isComplete = false;
                }
            }
            
            const wordKey = `${clue.direction}-${clue.number}`;
            
            if (isComplete && !this.completedWords.has(wordKey)) {
                this.completedWords.add(wordKey);
                this.score += clue.length * 100 * this.difficulty;
                this.updateScore();
                this.highlightCompletedWord(clue);
                this.playSound('correct');
                
                // Check if game is complete
                if (this.completedWords.size === this.clues.across.length + this.clues.down.length) {
                    setTimeout(() => this.completeGame(), 500);
                }
            }
        });
    }

    highlightCompletedWord(clue) {
        for (let i = 0; i < clue.length; i++) {
            const r = clue.direction === 'across' ? clue.row : clue.row + i;
            const c = clue.direction === 'across' ? clue.col + i : clue.col;
            
            const cell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
            if (cell) {
                cell.classList.add('completed');
            }
        }
        
        // Highlight completed clue
        const clueElements = document.querySelectorAll('.clue-item');
        clueElements.forEach(el => {
            if (el.textContent.includes(`${clue.number}.`)) {
                el.classList.add('completed');
            }
        });
    }

    // ===== Timer Management =====
    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timer--;
            this.updateTimer();
            
            if (this.timer <= 0) {
                this.timeOut();
            }
        }, 1000);
    }

    updateTimer() {
        const minutes = Math.floor(this.timer / 60);
        const seconds = this.timer % 60;
        this.timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (this.timer <= 30) {
            this.timerDisplay.className = 'timer danger';
        } else if (this.timer <= 60) {
            this.timerDisplay.className = 'timer warning';
        } else {
            this.timerDisplay.className = 'timer';
        }
    }

    pauseGame() {
        if (!this.gameActive || this.isPaused) return;
        
        this.isPaused = true;
        clearInterval(this.timerInterval);
        this.showModal('pauseModal');
        this.playSound('click');
    }

    resumeGame() {
        if (!this.isPaused) return;
        
        this.isPaused = false;
        this.closeModal('pauseModal');
        this.startTimer();
        this.playSound('click');
    }

    timeOut() {
        this.endGame();
    }

    // ===== Game Completion =====
    completeGame() {
        this.gameActive = false;
        clearInterval(this.timerInterval);
        
        const finalScore = this.calculateFinalScore();
        this.score = finalScore;
        
        // Show celebration
        this.showCelebration();
        
        // Check for high score
        setTimeout(() => {
            if (this.isHighScore(finalScore)) {
                this.showNameInput();
            } else {
                this.showGameOver(true);
            }
        }, 3000);
    }

    calculateFinalScore() {
        let baseScore = this.score;
        const timeBonus = this.timer * 5;
        const difficultyMultiplier = this.difficulty * 0.3 + 1;
        const completionBonus = this.completedWords.size === (this.clues.across.length + this.clues.down.length) ? 2000 : 0;
        
        return Math.round((baseScore + timeBonus + completionBonus) * difficultyMultiplier);
    }

    endGame() {
        this.gameActive = false;
        clearInterval(this.timerInterval);
        this.closeAllModals();
        
        const finalScore = this.calculateFinalScore();
        this.score = finalScore;
        
        if (this.isHighScore(finalScore)) {
            this.showNameInput();
        } else {
            this.showGameOver(false);
        }
    }

    // ===== Hint System =====
    showHint() {
        if (!this.gameActive || this.isPaused || !this.currentWord) return;
        
        // Fill in one empty letter in current word
        for (let i = 0; i < this.currentWord.length; i++) {
            const r = this.currentWord.direction === 'across' ? this.currentWord.row : this.currentWord.row + i;
            const c = this.currentWord.direction === 'across' ? this.currentWord.col + i : this.currentWord.col;
            
            if (!this.grid[r][c].userInput) {
                this.enterLetter(r, c, this.currentWord.answer[i]);
                
                // Highlight hinted cell
                const cell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
                if (cell) {
                    cell.classList.add('hint');
                    setTimeout(() => cell.classList.remove('hint'), 2000);
                }
                
                this.checkWordCompletion();
                this.playSound('click');
                break;
            }
        }
    }

    // ===== UI Management =====
    updateScore() {
        this.scoreDisplay.textContent = this.score.toLocaleString();
    }

    updateWordCount() {
        this.foundWordsDisplay.textContent = this.completedWords.size;
        this.totalWordsDisplay.textContent = this.clues.across.length + this.clues.down.length;
    }

    showStartScreen() {
        this.hideAllScreens();
        this.startScreen.classList.add('active');
    }

    showGameScreen() {
        this.hideAllScreens();
        this.gameScreen.classList.add('active');
    }

    showHighScores() {
        this.renderHighScores();
        this.hideAllScreens();
        this.highScoreScreen.classList.add('active');
        this.playSound('click');
    }

    showGameOver(isWin) {
        this.hideAllScreens();
        this.gameOverScreen.classList.add('active');
        
        const content = document.getElementById('gameOverContent');
        content.innerHTML = `
            <h2>${isWin ? '🎉 축하합니다!' : '😢 시간 종료'}</h2>
            <p>최종 점수: <strong>${this.score.toLocaleString()}</strong></p>
            <p>완성한 단어: <strong>${this.completedWords.size}/${this.clues.across.length + this.clues.down.length}</strong></p>
            <p>난이도: <strong>${this.difficulty}</strong></p>
            <div class="button-group" style="margin-top: 2rem;">
                <button class="btn btn-primary" onclick="game.startGame()">다시 하기</button>
                <button class="btn btn-secondary" onclick="game.showStartScreen()">메뉴로</button>
            </div>
        `;
    }

    showHelp() {
        this.showModal('helpModal');
        const helpContent = document.querySelector('#helpModal .help-content');
        helpContent.innerHTML = `
            <p><strong>목표:</strong> 십자말풀이를 완성하세요.</p>
            <p><strong>조작:</strong> 칸을 클릭하고 키보드로 글자를 입력하세요.</p>
            <p><strong>방향키:</strong> 셀 간 이동</p>
            <p><strong>Tab:</strong> 가로/세로 방향 전환</p>
            <p><strong>백스페이스:</strong> 글자 지우기</p>
            <p><strong>Space:</strong> 힌트 보기</p>
            <p><strong>점수:</strong> 단어 길이와 난이도에 따라 계산</p>
        `;
        this.playSound('click');
    }

    hideAllScreens() {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
    }

    showModal(modalId) {
        document.getElementById(modalId).classList.add('active');
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    }

    // ===== Celebration Effects =====
    showCelebration() {
        this.playSound('complete');
        
        // Create confetti effect
        this.createConfetti();
        
        // Show celebration canvas
        this.celebrationCanvas.style.display = 'block';
        
        // Hide after animation
        setTimeout(() => {
            this.celebrationCanvas.style.display = 'none';
        }, 3000);
    }

    createConfetti() {
        // Simple 2D confetti animation
        const canvas = this.celebrationCanvas;
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const confetti = [];
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
        
        // Create confetti pieces
        for (let i = 0; i < 100; i++) {
            confetti.push({
                x: Math.random() * canvas.width,
                y: -10,
                size: Math.random() * 5 + 2,
                speed: Math.random() * 3 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360
            });
        }
        
        // Animation loop
        function animateConfetti() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            confetti.forEach((piece, index) => {
                piece.y += piece.speed;
                piece.rotation += 2;
                
                ctx.save();
                ctx.translate(piece.x, piece.y);
                ctx.rotate(piece.rotation * Math.PI / 180);
                ctx.fillStyle = piece.color;
                ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
                ctx.restore();
                
                // Remove pieces that have fallen off screen
                if (piece.y > canvas.height) {
                    confetti.splice(index, 1);
                }
            });
            
            if (confetti.length > 0) {
                requestAnimationFrame(animateConfetti);
            }
        }
        
        animateConfetti();
    }

    // ===== High Score Management =====
    loadHighScores() {
        const saved = localStorage.getItem('crossword-highscores');
        this.highScores = saved ? JSON.parse(saved) : [];
    }

    saveHighScores() {
        localStorage.setItem('crossword-highscores', JSON.stringify(this.highScores));
    }

    isHighScore(score) {
        return this.highScores.length < 10 || score > this.highScores[this.highScores.length - 1]?.score || 0;
    }

    addHighScore(name, score) {
        this.highScores.push({ name, score, date: new Date().toLocaleDateString() });
        this.highScores.sort((a, b) => b.score - a.score);
        this.highScores = this.highScores.slice(0, 10);
        this.saveHighScores();
    }

    showNameInput() {
        this.showModal('nameModal');
        document.getElementById('playerName').focus();
    }

    saveHighScore() {
        const name = document.getElementById('playerName').value.trim() || 'Anonymous';
        this.addHighScore(name, this.score);
        this.closeModal('nameModal');
        this.showGameOver(true);
        this.playSound('click');
    }

    skipNameInput() {
        this.closeModal('nameModal');
        this.showGameOver(true);
        this.playSound('click');
    }

    renderHighScores() {
        this.scoreList.innerHTML = '';
        
        if (this.highScores.length === 0) {
            this.scoreList.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">아직 기록이 없습니다.</p>';
            return;
        }
        
        this.highScores.forEach((score, index) => {
            const scoreItem = document.createElement('div');
            scoreItem.className = 'score-item';
            scoreItem.innerHTML = `
                <div class="score-rank">#${index + 1}</div>
                <div class="score-name">${score.name}</div>
                <div class="score-value">${score.score.toLocaleString()}</div>
            `;
            this.scoreList.appendChild(scoreItem);
        });
    }

    // ===== Utility Functions =====
    shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
}

// ===== Initialize Game =====
let game;

document.addEventListener('DOMContentLoaded', () => {
    game = new CrosswordGame();
    
    // Load saved settings
    const savedSound = localStorage.getItem('crossword-sound');
    if (savedSound !== null) {
        game.soundEnabled = savedSound === 'true';
        const icon = document.querySelector('#soundToggle i');
        icon.className = game.soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
    }
});

// ===== Service Worker for PWA =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(registrationError => console.log('SW registration failed'));
    });
}