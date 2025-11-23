// ===== Crossword Game State Management =====
class CrosswordGame {
    constructor() {
        this.gridSize = 15;
        this.language = 'english';
        this.difficulty = 5;
        this.timer = 60;
        this.score = 0;
        this.gameActive = false;
        this.isPaused = false;
        this.soundEnabled = true;
        this.theme = 'light';
        
        // Crossword elements
        this.grid = [];
        this.words = [];
        this.clues = { across: [], down: [] };
        this.currentCell = null;
        this.currentDirection = 'across';
        this.timerInterval = null;
        this.lastWordFoundTime = Date.now();
        this.wordPositions = new Map();
        this.completedWords = new Set();
        
        // DOM elements
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
                    { word: 'DOG', clue: 'Man\'s best friend' },
                    { word: 'SUN', clue: 'Our nearest star' },
                    { word: 'CAR', clue: 'Vehicle with four wheels' },
                    { word: 'BOX', clue: 'Square container' },
                    { word: 'HAT', clue: 'Head covering' },
                    { word: 'BAT', clue: 'Flying mammal' },
                    { word: 'RUN', clue: 'Move quickly on foot' },
                    { word: 'FUN', clue: 'Enjoyment or amusement' },
                    { word: 'CUP', clue: 'Drinking vessel' }
                ],
                2: [
                    { word: 'HOUSE', clue: 'Place where people live' },
                    { word: 'WATER', clue: 'Essential liquid for life' },
                    { word: 'HAPPY', clue: 'Feeling of joy' },
                    { word: 'GREEN', clue: 'Color of grass' },
                    { word: 'MUSIC', clue: 'Art of sound and rhythm' }
                ],
                3: [
                    { word: 'COMPUTER', clue: 'Electronic device for processing data' },
                    { word: 'RAINBOW', clue: 'Colorful arc in the sky' },
                    { word: 'BICYCLE', clue: 'Two-wheeled vehicle' },
                    { word: 'ELEPHANT', clue: 'Large gray mammal with trunk' },
                    { word: 'MOUNTAIN', clue: 'High elevation landform' }
                ],
                4: [
                    { word: 'BEAUTIFUL', clue: 'Pleasing to look at' },
                    { word: 'WONDERFUL', clue: 'Inspiring delight' },
                    { word: 'ADVENTURE', clue: 'Exciting journey or experience' },
                    { word: 'CHOCOLATE', clue: 'Sweet brown confection' },
                    { word: 'BUTTERFLY', clue: 'Colorful flying insect' }
                ],
                5: [
                    { word: 'TECHNOLOGY', clue: 'Application of scientific knowledge' },
                    { word: 'BASKETBALL', clue: 'Sport played with orange ball' },
                    { word: 'RESTAURANT', clue: 'Place to eat meals' },
                    { word: 'UNIVERSITY', clue: 'Higher education institution' },
                    { word: 'INCREDIBLE', clue: 'Hard to believe' }
                ],
                6: [
                    { word: 'EXTRAORDINARY', clue: 'Very unusual or remarkable' },
                    { word: 'PHILOSOPHICAL', clue: 'Relating to the study of knowledge' },
                    { word: 'ENTERTAINMENT', clue: 'Activities for amusement' },
                    { word: 'INTERNATIONAL', clue: 'Between or among nations' },
                    { word: 'SOPHISTICATED', clue: 'Having great knowledge' }
                ],
                7: [
                    { word: 'RESPONSIBILITY', clue: 'The state of being accountable' },
                    { word: 'TRANSFORMATION', clue: 'A thorough change' },
                    { word: 'REVOLUTIONARY', clue: 'Involving complete change' },
                    { word: 'UNBELIEVABLE', clue: 'So extraordinary as to seem impossible' },
                    { word: 'CHARACTERISTIC', clue: 'A distinguishing quality' }
                ],
                8: [
                    { word: 'INCOMPREHENSIBLE', clue: 'Impossible to understand' },
                    { word: 'COUNTERPRODUCTIVE', clue: 'Having the opposite effect' },
                    { word: 'INTERDISCIPLINARY', clue: 'Combining multiple fields' },
                    { word: 'OVERWHELMINGLY', clue: 'To a very great degree' },
                    { word: 'DISPROPORTIONATE', clue: 'Too large or small in comparison' }
                ],
                9: [
                    { word: 'ARCHAEOLOGIST', clue: 'Studies human history through excavation' },
                    { word: 'ENVIRONMENTALIST', clue: 'Advocates for nature protection' },
                    { word: 'PSYCHIATRIST', clue: 'Medical doctor treating mental disorders' },
                    { word: 'PHOTOGRAPHER', clue: 'Person who takes pictures professionally' },
                    { word: 'MATHEMATICIAN', clue: 'Expert in the field of mathematics' }
                ],
                10: [
                    { word: 'PHENOMENOLOGICAL', clue: 'Related to the study of consciousness' },
                    { word: 'THERMODYNAMICS', clue: 'Branch of physics dealing with heat' },
                    { word: 'ELECTROMAGNETIC', clue: 'Related to electricity and magnetism' },
                    { word: 'CRYSTALLOGRAPHY', clue: 'Study of crystal structure' },
                    { word: 'PSYCHOANALYSIS', clue: 'Method of treating mental disorders' }
                ]
            },
            korean: {
                1: [
                    { word: '고양이', clue: '집에서 기르는 작은 동물' },
                    { word: '강아지', clue: '사람과 친한 동물' },
                    { word: '햇빛', clue: '태양에서 나오는 빛' },
                    { word: '자동차', clue: '바퀴가 네 개인 탈것' },
                    { word: '상자', clue: '물건을 담는 네모난 그릇' }
                ],
                2: [
                    { word: '컴퓨터', clue: '정보를 처리하는 전자기기' },
                    { word: '무지개', clue: '비 온 후 하늘에 나타나는 색깔 띠' },
                    { word: '자전거', clue: '바퀴가 두 개인 탈것' },
                    { word: '코끼리', clue: '코가 길고 큰 동물' },
                    { word: '산', clue: '높이 솟은 땅' }
                ],
                3: [
                    { word: '아름다운', clue: '보기에 좋고 예쁜' },
                    { word: '놀라운', clue: '매우 신기하고 대단한' },
                    { word: '모험', clue: '위험을 무릅쓰고 하는 일' },
                    { word: '초콜릿', clue: '달콤하고 갈색인 과자' },
                    { word: '나비', clue: '아름다운 날개를 가진 곤충' }
                ],
                4: [
                    { word: '기술', clue: '과학 지식을 실제로 응용하는 것' },
                    { word: '농구', clue: '공을 바구니에 넣는 운동' },
                    { word: '식당', clue: '음식을 파는 곳' },
                    { word: '대학교', clue: '고등교육을 하는 곳' },
                    { word: '믿을수없는', clue: '정말 놀라운' }
                ],
                5: [
                    { word: '특별한', clue: '다른 것과 다르게 뛰어난' },
                    { word: '철학적인', clue: '깊이 생각하는' },
                    { word: '오락', clue: '즐겁게 노는 것' },
                    { word: '국제적인', clue: '나라와 나라 사이의' },
                    { word: '세련된', clue: '품격이 높고 우아한' }
                ],
                6: [
                    { word: '책임감', clue: '맡은 일을 해내려는 마음' },
                    { word: '변화', clue: '모습이나 상태가 바뀜' },
                    { word: '혁명적인', clue: '완전히 바꾸는' },
                    { word: '믿기어려운', clue: '정말 놀라워서 믿기 힘든' },
                    { word: '특성', clue: '다른 것과 구별되는 성질' }
                ],
                7: [
                    { word: '이해할수없는', clue: '알아듣기 매우 어려운' },
                    { word: '역효과를내는', clue: '원하는 것과 반대 결과를 내는' },
                    { word: '학제간의', clue: '여러 학문 분야를 결합한' },
                    { word: '압도적으로', clue: '매우 강하게' },
                    { word: '불균형한', clue: '비율이 맞지 않는' }
                ],
                8: [
                    { word: '고고학자', clue: '옛날 문화를 연구하는 사람' },
                    { word: '환경보호론자', clue: '자연을 보호하려는 사람' },
                    { word: '정신과의사', clue: '마음의 병을 치료하는 의사' },
                    { word: '사진작가', clue: '사진을 전문적으로 찍는 사람' },
                    { word: '수학자', clue: '수학을 전문으로 연구하는 사람' }
                ],
                9: [
                    { word: '현상학적', clue: '의식의 연구와 관련된' },
                    { word: '열역학', clue: '열과 에너지를 다루는 물리학' },
                    { word: '전자기학', clue: '전기와 자기를 다루는 학문' },
                    { word: '결정학', clue: '결정의 구조를 연구하는 학문' },
                    { word: '정신분석학', clue: '무의식을 연구하는 심리학' }
                ],
                10: [
                    { word: '현상학적방법론', clue: '의식 연구의 체계적 방법' },
                    { word: '열역학적평형', clue: '온도가 균일한 상태' },
                    { word: '전자기복사', clue: '전기와 자기로 이루어진 파동' },
                    { word: '결정구조분석', clue: '결정의 내부 구조를 분석' },
                    { word: '정신분석치료', clue: '무의식을 통한 치료 방법' }
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
        this.wordList = document.getElementById('wordList');
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
        
        // Grid interaction
        this.setupGridInteraction();
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    // ===== Theme Management =====
    initTheme() {
        const savedTheme = localStorage.getItem('wordpuzzle-theme') || 'light';
        this.theme = savedTheme;
        document.body.setAttribute('data-theme', this.theme);
        this.updateThemeIcon();
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', this.theme);
        localStorage.setItem('wordpuzzle-theme', this.theme);
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
        localStorage.setItem('wordpuzzle-sound', this.soundEnabled);
        this.playSound('click');
    }

    playSound(type) {
        if (!this.soundEnabled) return;
        
        // Create audio context for sound effects
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
            case 'success':
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

    // ===== Game Logic =====
    startGame() {
        this.initializeGame();
        this.generateGrid();
        this.placeWords();
        this.fillEmptyCells();
        this.renderGrid();
        this.renderWordList();
        this.showGameScreen();
        this.startTimer();
        this.gameActive = true;
        this.lastWordFoundTime = Date.now();
        this.playSound('click');
    }

    initializeGame() {
        this.grid = [];
        this.words = [];
        this.foundWords.clear();
        this.selectedCells = [];
        this.score = 0;
        this.timer = 60;
        this.updateScore();
        
        // Get words for current difficulty
        this.selectWordsForGame();
    }

    selectWordsForGame() {
        const database = this.getWordDatabase();
        const langWords = database[this.language];
        
        const wordsPerDifficulty = Math.max(1, Math.floor(this.difficulty * 0.8));
        this.words = [];
        
        // Select words from different difficulty levels
        for (let level = 1; level <= Math.min(this.difficulty, 10); level++) {
            if (langWords[level]) {
                const levelWords = langWords[level].slice(0, wordsPerDifficulty);
                this.words.push(...levelWords);
            }
        }
        
        // Ensure we have enough words for the grid size
        const maxWords = Math.floor(this.gridSize * this.gridSize * 0.15);
        if (this.words.length > maxWords) {
            this.words = this.words.slice(0, maxWords);
        }
        
        // Shuffle words
        this.words = this.shuffleArray(this.words);
    }

    generateGrid() {
        this.grid = Array(this.gridSize).fill().map(() => 
            Array(this.gridSize).fill('')
        );
    }

    placeWords() {
        const directions = [
            [1, 0],   // horizontal
            [0, 1],   // vertical
            [1, 1],   // diagonal down-right
            [-1, 1],  // diagonal down-left
            [1, -1],  // diagonal up-right
            [-1, -1], // diagonal up-left
            [0, -1],  // vertical up
            [-1, 0]   // horizontal left
        ];

        for (const wordObj of this.words) {
            const word = wordObj.word.toUpperCase();
            let placed = false;
            let attempts = 0;
            
            while (!placed && attempts < 100) {
                const direction = directions[Math.floor(Math.random() * directions.length)];
                const startRow = Math.floor(Math.random() * this.gridSize);
                const startCol = Math.floor(Math.random() * this.gridSize);
                
                if (this.canPlaceWord(word, startRow, startCol, direction)) {
                    this.placeWordInGrid(word, startRow, startCol, direction);
                    placed = true;
                }
                attempts++;
            }
        }
    }

    canPlaceWord(word, row, col, direction) {
        const [dRow, dCol] = direction;
        
        for (let i = 0; i < word.length; i++) {
            const newRow = row + i * dRow;
            const newCol = col + i * dCol;
            
            if (newRow < 0 || newRow >= this.gridSize || 
                newCol < 0 || newCol >= this.gridSize) {
                return false;
            }
            
            const currentCell = this.grid[newRow][newCol];
            if (currentCell !== '' && currentCell !== word[i]) {
                return false;
            }
        }
        
        return true;
    }

    placeWordInGrid(word, row, col, direction) {
        const [dRow, dCol] = direction;
        
        for (let i = 0; i < word.length; i++) {
            const newRow = row + i * dRow;
            const newCol = col + i * dCol;
            this.grid[newRow][newCol] = word[i];
        }
    }

    fillEmptyCells() {
        const alphabet = this.language === 'korean' ? 
            'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ' :
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                if (this.grid[row][col] === '') {
                    this.grid[row][col] = alphabet[Math.floor(Math.random() * alphabet.length)];
                }
            }
        }
    }

    renderGrid() {
        this.wordGrid.innerHTML = '';
        this.wordGrid.style.gridTemplateColumns = `repeat(${this.gridSize}, 1fr)`;
        
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.textContent = this.grid[row][col];
                cell.dataset.row = row;
                cell.dataset.col = col;
                this.wordGrid.appendChild(cell);
            }
        }
    }

    renderWordList() {
        this.wordList.innerHTML = '';
        
        this.words.forEach((wordObj, index) => {
            const wordItem = document.createElement('div');
            wordItem.className = 'word-item';
            wordItem.innerHTML = `
                <div class="word">${wordObj.word}</div>
                <div class="clue">${wordObj.clue}</div>
            `;
            this.wordList.appendChild(wordItem);
        });
        
        this.updateWordCount();
    }

    // ===== Grid Interaction =====
    setupGridInteraction() {
        let isMouseDown = false;
        
        this.wordGrid.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('grid-cell')) {
                isMouseDown = true;
                this.startSelection(e.target);
                e.preventDefault();
            }
        });
        
        this.wordGrid.addEventListener('mouseover', (e) => {
            if (isMouseDown && e.target.classList.contains('grid-cell')) {
                this.updateSelection(e.target);
            }
        });
        
        document.addEventListener('mouseup', () => {
            if (isMouseDown) {
                isMouseDown = false;
                this.endSelection();
            }
        });
        
        // Touch support for mobile
        this.wordGrid.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            const element = document.elementFromPoint(touch.clientX, touch.clientY);
            if (element && element.classList.contains('grid-cell')) {
                this.startSelection(element);
                e.preventDefault();
            }
        });
        
        this.wordGrid.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            const element = document.elementFromPoint(touch.clientX, touch.clientY);
            if (element && element.classList.contains('grid-cell')) {
                this.updateSelection(element);
                e.preventDefault();
            }
        });
        
        this.wordGrid.addEventListener('touchend', (e) => {
            this.endSelection();
            e.preventDefault();
        });
    }

    startSelection(cell) {
        this.clearSelection();
        this.isSelecting = true;
        this.startCell = cell;
        this.selectedCells = [cell];
        cell.classList.add('selected');
    }

    updateSelection(cell) {
        if (!this.isSelecting || !this.startCell) return;
        
        const path = this.getSelectionPath(this.startCell, cell);
        
        this.clearSelection();
        this.selectedCells = path;
        
        path.forEach(pathCell => {
            pathCell.classList.add('selected');
        });
    }

    getSelectionPath(start, end) {
        const startRow = parseInt(start.dataset.row);
        const startCol = parseInt(start.dataset.col);
        const endRow = parseInt(end.dataset.row);
        const endCol = parseInt(end.dataset.col);
        
        const rowDiff = endRow - startRow;
        const colDiff = endCol - startCol;
        
        // Check if selection is in a straight line
        if (rowDiff === 0 || colDiff === 0 || Math.abs(rowDiff) === Math.abs(colDiff)) {
            const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));
            const rowStep = steps === 0 ? 0 : rowDiff / steps;
            const colStep = steps === 0 ? 0 : colDiff / steps;
            
            const path = [];
            for (let i = 0; i <= steps; i++) {
                const row = startRow + Math.round(i * rowStep);
                const col = startCol + Math.round(i * colStep);
                const cell = this.wordGrid.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                if (cell) path.push(cell);
            }
            return path;
        }
        
        return [start];
    }

    endSelection() {
        if (!this.isSelecting) return;
        
        this.isSelecting = false;
        
        const selectedWord = this.selectedCells.map(cell => cell.textContent).join('');
        const reversedWord = this.selectedCells.map(cell => cell.textContent).reverse().join('');
        
        const foundWord = this.words.find(wordObj => 
            wordObj.word.toUpperCase() === selectedWord || 
            wordObj.word.toUpperCase() === reversedWord
        );
        
        if (foundWord && !this.foundWords.has(foundWord.word)) {
            this.foundWords.add(foundWord.word);
            this.markWordAsFound(foundWord);
            this.updateScore(foundWord.word.length);
            this.playSound('success');
            this.lastWordFoundTime = Date.now();
            
            // Add found animation
            this.selectedCells.forEach((cell, index) => {
                setTimeout(() => {
                    cell.classList.add('found');
                }, index * 50);
            });
            
            // Check if game is complete
            if (this.foundWords.size === this.words.length) {
                setTimeout(() => this.completeGame(), 1000);
            }
        } else {
            this.playSound('error');
        }
        
        setTimeout(() => this.clearSelection(), 300);
    }

    clearSelection() {
        this.selectedCells.forEach(cell => {
            cell.classList.remove('selected');
        });
        this.selectedCells = [];
    }

    markWordAsFound(wordObj) {
        const wordItems = this.wordList.querySelectorAll('.word-item');
        wordItems.forEach(item => {
            const wordElement = item.querySelector('.word');
            if (wordElement.textContent === wordObj.word) {
                item.classList.add('found');
            }
        });
        this.updateWordCount();
    }

    // ===== Timer Management =====
    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timer--;
            this.updateTimer();
            
            // Check for timeout
            const timeSinceLastWord = Date.now() - this.lastWordFoundTime;
            if (this.timer <= 0 || (timeSinceLastWord > 60000 && this.foundWords.size === 0)) {
                this.timeOut();
            }
        }, 1000);
    }

    updateTimer() {
        this.timerDisplay.textContent = this.timer;
        
        if (this.timer <= 10) {
            this.timerDisplay.className = 'timer danger';
        } else if (this.timer <= 20) {
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
        const timeBonus = this.timer * 10;
        const difficultyMultiplier = this.difficulty * 0.2 + 1;
        const completionBonus = this.foundWords.size === this.words.length ? 1000 : 0;
        
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

    // ===== Celebration Effects =====
    showCelebration() {
        this.playSound('complete');
        
        // Create 3D celebration effect
        this.create3DCelebration();
        
        // Show celebration canvas
        this.celebrationCanvas.style.display = 'block';
        
        // Hide after animation
        setTimeout(() => {
            this.celebrationCanvas.style.display = 'none';
        }, 3000);
    }

    create3DCelebration() {
        const canvas = this.celebrationCanvas;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        // Create confetti particles
        const particleCount = 100;
        const particles = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];
        
        const colorPalette = [
            new THREE.Color(0xff6b6b),
            new THREE.Color(0x4ecdc4),
            new THREE.Color(0x45b7d1),
            new THREE.Color(0x96ceb4),
            new THREE.Color(0xfeca57),
            new THREE.Color(0xff9ff3)
        ];
        
        for (let i = 0; i < particleCount; i++) {
            positions.push(
                (Math.random() - 0.5) * 20,
                Math.random() * 10 + 5,
                (Math.random() - 0.5) * 20
            );
            
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors.push(color.r, color.g, color.b);
        }
        
        particles.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        particles.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 0.2,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });
        
        const particleSystem = new THREE.Points(particles, material);
        scene.add(particleSystem);
        
        camera.position.z = 5;
        
        // Animation
        const animate = () => {
            const positions = particleSystem.geometry.attributes.position.array;
            
            for (let i = 1; i < positions.length; i += 3) {
                positions[i] -= 0.05; // Gravity
                
                // Reset particles that fall below screen
                if (positions[i] < -5) {
                    positions[i] = 10;
                }
            }
            
            particleSystem.geometry.attributes.position.needsUpdate = true;
            particleSystem.rotation.y += 0.01;
            
            renderer.render(scene, camera);
        };
        
        const animationId = setInterval(animate, 16);
        
        // Stop animation after 3 seconds
        setTimeout(() => {
            clearInterval(animationId);
        }, 3000);
    }

    // ===== Hint System =====
    showHint() {
        if (!this.gameActive || this.isPaused) return;
        
        const unFoundWords = this.words.filter(wordObj => !this.foundWords.has(wordObj.word));
        if (unFoundWords.length === 0) return;
        
        const hintWord = unFoundWords[Math.floor(Math.random() * unFoundWords.length)];
        this.highlightWordCells(hintWord.word);
        this.playSound('click');
        
        // Remove hint highlight after 3 seconds
        setTimeout(() => {
            document.querySelectorAll('.grid-cell.hint').forEach(cell => {
                cell.classList.remove('hint');
            });
        }, 3000);
    }

    highlightWordCells(word) {
        // Find word in grid and highlight first few letters
        const wordUpper = word.toUpperCase();
        const hintsToShow = Math.min(3, word.length);
        
        // Simple search - in a real implementation, you'd want to track word positions
        const cells = document.querySelectorAll('.grid-cell');
        let hintCount = 0;
        
        for (let i = 0; i < cells.length && hintCount < hintsToShow; i++) {
            if (cells[i].textContent === wordUpper[hintCount]) {
                cells[i].classList.add('hint');
                hintCount++;
            }
        }
    }

    // ===== High Score Management =====
    loadHighScores() {
        const saved = localStorage.getItem('wordpuzzle-highscores');
        this.highScores = saved ? JSON.parse(saved) : [];
    }

    saveHighScores() {
        localStorage.setItem('wordpuzzle-highscores', JSON.stringify(this.highScores));
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

    // ===== UI Management =====
    updateScore(wordLength = 0) {
        if (wordLength > 0) {
            const points = wordLength * 100 * this.difficulty;
            this.score += points;
        }
        this.scoreDisplay.textContent = this.score.toLocaleString();
    }

    updateWordCount() {
        this.foundWordsDisplay.textContent = this.foundWords.size;
        this.totalWordsDisplay.textContent = this.words.length;
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
            <h2>${isWin ? '🎉 축하합니다!' : '😢 게임 오버'}</h2>
            <p>최종 점수: <strong>${this.score.toLocaleString()}</strong></p>
            <p>찾은 단어: <strong>${this.foundWords.size}/${this.words.length}</strong></p>
            <p>난이도: <strong>${this.difficulty}</strong></p>
            <div class="button-group" style="margin-top: 2rem;">
                <button class="btn btn-primary" onclick="game.startGame()">다시 하기</button>
                <button class="btn btn-secondary" onclick="game.showStartScreen()">메뉴로</button>
            </div>
        `;
    }

    showHelp() {
        this.showModal('helpModal');
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

    // ===== Keyboard Shortcuts =====
    handleKeyboard(e) {
        if (e.key === 'Escape') {
            if (this.gameActive && !this.isPaused) {
                this.pauseGame();
            } else {
                this.closeAllModals();
            }
        } else if (e.key === ' ' && this.gameActive) {
            e.preventDefault();
            this.showHint();
        } else if (e.key === 'Enter' && !this.gameActive) {
            if (this.startScreen.classList.contains('active')) {
                this.startGame();
            }
        }
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
    game = new WordPuzzleGame();
    
    // Load saved settings
    const savedSound = localStorage.getItem('wordpuzzle-sound');
    if (savedSound !== null) {
        game.soundEnabled = savedSound === 'true';
        const icon = document.querySelector('#soundToggle i');
        icon.className = game.soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
    }
});

// ===== Service Worker for PWA (optional) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(registrationError => console.log('SW registration failed'));
    });
}