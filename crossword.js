// ===== Advanced Crossword Puzzle Game =====
class AdvancedCrosswordGame {
    constructor() {
        // Game Settings
        this.gridSize = 15;
        this.language = 'english';
        this.difficulty = 5;
        this.gameTime = 180; // 3 minutes default
        this.timer = this.gameTime;
        this.score = 0;
        this.gameActive = false;
        this.isPaused = false;
        this.soundEnabled = true;
        this.theme = 'light';
        
        // Game State
        this.grid = [];
        this.solution = [];
        this.words = [];
        this.clues = { across: [], down: [] };
        this.wordPositions = new Map();
        this.completedWords = new Set();
        this.currentSelection = null;
        this.timerInterval = null;
        
        // Word Database
        this.wordDatabase = new Map();
        this.initializeWordDatabase();
        
        this.initDOM();
        this.initEventListeners();
        this.initTheme();
        this.loadHighScores();
        this.updateWordCount();
    }

    // ===== Word Database System =====
    initializeWordDatabase() {
        const database = {
            english: {
                1: [
                    { 
                        word: 'CAT', 
                        hints: [
                            'Domestic animal that says meow',
                            'Pet that catches mice and likes milk'
                        ]
                    },
                    { 
                        word: 'DOG', 
                        hints: [
                            'Mans best friend with four legs',
                            'Loyal pet that barks and wags tail'
                        ]
                    },
                    { 
                        word: 'SUN', 
                        hints: [
                            'Bright star that gives us light during day',
                            'Hot celestial body at center of solar system'
                        ]
                    },
                    { 
                        word: 'CAR', 
                        hints: [
                            'Four-wheeled vehicle for transportation',
                            'Automobile that runs on roads with engine'
                        ]
                    },
                    { 
                        word: 'BOX', 
                        hints: [
                            'Square container used for storage',
                            'Rectangular package for shipping items'
                        ]
                    },
                    { 
                        word: 'HAT', 
                        hints: [
                            'Clothing worn on head for protection',
                            'Fashion accessory that covers your hair'
                        ]
                    },
                    { 
                        word: 'BAT', 
                        hints: [
                            'Flying mammal that sleeps upside down',
                            'Nocturnal creature that uses echolocation'
                        ]
                    },
                    { 
                        word: 'RUN', 
                        hints: [
                            'Move quickly on foot at fast pace',
                            'Exercise activity faster than walking'
                        ]
                    }
                ],
                2: [
                    { 
                        word: 'HOUSE', 
                        hints: [
                            'Building where people live and sleep',
                            'Residential structure with rooms and roof'
                        ]
                    },
                    { 
                        word: 'WATER', 
                        hints: [
                            'Clear liquid essential for all life',
                            'H2O that falls from sky as rain'
                        ]
                    },
                    { 
                        word: 'HAPPY', 
                        hints: [
                            'Emotional state of joy and contentment',
                            'Feeling pleased and cheerful about life'
                        ]
                    },
                    { 
                        word: 'GREEN', 
                        hints: [
                            'Color of grass and leaves in nature',
                            'Mix of blue and yellow creates this hue'
                        ]
                    },
                    { 
                        word: 'MUSIC', 
                        hints: [
                            'Art form using sounds and rhythms',
                            'Harmonious combinations of notes and melodies'
                        ]
                    },
                    { 
                        word: 'BREAD', 
                        hints: [
                            'Baked food made from flour and water',
                            'Staple food often eaten with butter'
                        ]
                    },
                    { 
                        word: 'LIGHT', 
                        hints: [
                            'Illumination that helps us see things',
                            'Opposite of darkness that brightens space'
                        ]
                    },
                    { 
                        word: 'PHONE', 
                        hints: [
                            'Communication device for talking to others',
                            'Electronic gadget for making calls and texts'
                        ]
                    }
                ],
                3: [
                    { 
                        word: 'COMPUTER', 
                        hints: [
                            'Electronic machine for processing information',
                            'Digital device with keyboard, screen and programs'
                        ]
                    },
                    { 
                        word: 'RAINBOW', 
                        hints: [
                            'Colorful arc appearing in sky after rain',
                            'Spectrum of colors formed by light and water'
                        ]
                    },
                    { 
                        word: 'BICYCLE', 
                        hints: [
                            'Two-wheeled vehicle powered by pedaling',
                            'Eco-friendly transport with handlebars and chain'
                        ]
                    },
                    { 
                        word: 'KITCHEN', 
                        hints: [
                            'Room in house where food is prepared',
                            'Area with stove, refrigerator and cooking tools'
                        ]
                    },
                    { 
                        word: 'PICTURE', 
                        hints: [
                            'Visual image captured by camera or drawn',
                            'Artwork or photograph displayed on wall'
                        ]
                    },
                    { 
                        word: 'STUDENT', 
                        hints: [
                            'Person who attends school or university',
                            'Learner studying subjects and taking tests'
                        ]
                    }
                ]
            },
            korean: {
                1: [
                    { 
                        word: '고양이', 
                        hints: [
                            '야옹하는 털복숭이 애완동물',
                            '쥐를 잡고 우유를 좋아하는 네발짐승'
                        ]
                    },
                    { 
                        word: '강아지', 
                        hints: [
                            '멍멍 짖는 사람의 가장 친한 동물친구',
                            '꼬리 흔들며 주인에게 충성하는 반려동물'
                        ]
                    },
                    { 
                        word: '햇빛', 
                        hints: [
                            '낮에 우리에게 빛과 따스함을 주는 것',
                            '태양에서 나와서 지구를 밝게 만드는 에너지'
                        ]
                    },
                    { 
                        word: '자동차', 
                        hints: [
                            '바퀴 네 개로 도로를 달리는 교통수단',
                            '엔진으로 움직이며 사람을 태우고 다니는 기계'
                        ]
                    },
                    { 
                        word: '상자', 
                        hints: [
                            '물건을 담아두는 네모난 용기',
                            '택배나 선물을 포장할 때 쓰는 박스'
                        ]
                    }
                ],
                2: [
                    { 
                        word: '집', 
                        hints: [
                            '사람이 살면서 잠을 자는 건물',
                            '가족이 모여 생활하는 따뜻한 공간'
                        ]
                    },
                    { 
                        word: '물', 
                        hints: [
                            '모든 생명체에게 꼭 필요한 투명한 액체',
                            '갈증을 해소하고 몸에 수분을 공급하는 것'
                        ]
                    },
                    { 
                        word: '행복', 
                        hints: [
                            '마음이 즐겁고 기쁜 감정상태',
                            '만족스럽고 웃음이 나오는 좋은 기분'
                        ]
                    },
                    { 
                        word: '음악', 
                        hints: [
                            '아름다운 소리와 리듬으로 만드는 예술',
                            '악기나 목소리로 연주하는 멜로디'
                        ]
                    }
                ]
            }
        };

        // Convert to Map for better performance
        for (const [lang, difficulties] of Object.entries(database)) {
            if (!this.wordDatabase.has(lang)) {
                this.wordDatabase.set(lang, new Map());
            }
            for (const [diff, words] of Object.entries(difficulties)) {
                this.wordDatabase.get(lang).set(parseInt(diff), words);
            }
        }
    }

    async updateWordDatabase() {
        // Simulate API call for word database update
        return new Promise((resolve) => {
            this.showModal('wordUpdateModal');
            let progress = 0;
            const progressBar = document.getElementById('updateProgress');
            const statusText = document.getElementById('updateStatus');
            
            const updateInterval = setInterval(() => {
                progress += 10;
                progressBar.style.width = progress + '%';
                statusText.textContent = `새로운 단어를 가져오는 중... ${progress}%`;
                
                if (progress >= 100) {
                    clearInterval(updateInterval);
                    statusText.textContent = '업데이트 완료! 10개의 새로운 단어가 추가되었습니다.';
                    
                    // Add 10 simulated new words
                    this.addSimulatedWords();
                    
                    setTimeout(() => {
                        this.closeModal('wordUpdateModal');
                        this.updateWordCount();
                        resolve(true);
                    }, 1000);
                }
            }, 200);
        });
    }

    addSimulatedWords() {
        // Add some simulated new words to database
        const newWords = {
            english: {
                2: [
                    { 
                        word: 'PLANT', 
                        hints: [
                            'Living organism that grows in soil',
                            'Green life form that needs water and sunlight'
                        ]
                    },
                    { 
                        word: 'DREAM', 
                        hints: [
                            'Images and stories your mind creates while sleeping',
                            'Hope or aspiration for future goals'
                        ]
                    }
                ]
            },
            korean: {
                2: [
                    { 
                        word: '꿈', 
                        hints: [
                            '잠들 때 머릿속에 떠오르는 상상의 이야기',
                            '미래에 이루고 싶은 소망이나 목표'
                        ]
                    }
                ]
            }
        };

        for (const [lang, difficulties] of Object.entries(newWords)) {
            if (this.wordDatabase.has(lang)) {
                for (const [diff, words] of Object.entries(difficulties)) {
                    const difficulty = parseInt(diff);
                    if (this.wordDatabase.get(lang).has(difficulty)) {
                        this.wordDatabase.get(lang).get(difficulty).push(...words);
                    }
                }
            }
        }
    }

    updateWordCount() {
        let totalWords = 0;
        for (const [lang, difficulties] of this.wordDatabase.entries()) {
            for (const [diff, words] of difficulties.entries()) {
                totalWords += words.length;
            }
        }
        const countElement = document.getElementById('currentWordCount');
        if (countElement) {
            countElement.textContent = totalWords;
        }
    }

    // ===== DOM Initialization =====
    initDOM() {
        // Screens
        this.startScreen = document.getElementById('startScreen');
        this.gameScreen = document.getElementById('gameScreen');
        this.highScoreScreen = document.getElementById('highScoreScreen');
        this.gameOverScreen = document.getElementById('gameOverScreen');
        
        // Settings
        this.gridSizeSelect = document.getElementById('gridSize');
        this.languageSelect = document.getElementById('language');
        this.difficultySlider = document.getElementById('difficulty');
        this.gameTimerSelect = document.getElementById('gameTimer');
        this.sliderValue = document.querySelector('.slider-value');
        
        // Game elements
        this.crosswordGrid = document.getElementById('crosswordGrid');
        this.acrossClues = document.getElementById('acrossClues');
        this.downClues = document.getElementById('downClues');
        this.timerDisplay = document.getElementById('gameTimer');
        this.scoreDisplay = document.getElementById('gameScore');
        this.completedDisplay = document.getElementById('completedWords');
        this.totalDisplay = document.getElementById('totalWords');
        
        // Input panel
        this.wordNumberSelect = document.getElementById('wordNumber');
        this.wordDirectionSelect = document.getElementById('wordDirection');
        this.wordInput = document.getElementById('wordInput');
        this.autocompleteSuggestions = document.getElementById('autocompleteSuggestions');
        
        // Modals
        this.pauseModal = document.getElementById('pauseModal');
        this.nameModal = document.getElementById('nameModal');
        this.helpModal = document.getElementById('helpModal');
        this.wordUpdateModal = document.getElementById('wordUpdateModal');
        
        // Other
        this.celebrationCanvas = document.getElementById('celebrationCanvas');
        this.scoreList = document.getElementById('scoreList');
    }

    // ===== Event Listeners =====
    initEventListeners() {
        // Start screen
        document.getElementById('startGame').addEventListener('click', () => this.startGame());
        document.getElementById('highScoreBtn').addEventListener('click', () => this.showHighScores());
        document.getElementById('backToMenuBtn').addEventListener('click', () => this.showStartScreen());
        document.getElementById('updateWordsBtn').addEventListener('click', () => this.updateWordDatabase());
        
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
        
        this.gameTimerSelect.addEventListener('change', (e) => {
            this.gameTime = parseInt(e.target.value);
        });
        
        // Game controls
        document.getElementById('pauseBtn').addEventListener('click', () => this.pauseGame());
        document.getElementById('resumeBtn').addEventListener('click', () => this.resumeGame());
        document.getElementById('quitBtn').addEventListener('click', () => this.endGame());
        
        // Input panel
        this.wordNumberSelect.addEventListener('change', () => this.onNumberChange());
        this.wordDirectionSelect.addEventListener('change', () => this.onDirectionChange());
        this.wordInput.addEventListener('input', () => this.onWordInput());
        this.wordInput.addEventListener('keydown', (e) => this.onWordKeydown(e));
        document.getElementById('submitWord').addEventListener('click', () => this.submitWord());
        
        // Clues tabs
        document.querySelectorAll('.clue-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchClueTab(e.target.dataset.direction));
        });
        
        // Header controls
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
        document.getElementById('soundToggle').addEventListener('click', () => this.toggleSound());
        document.getElementById('helpBtn').addEventListener('click', () => this.showHelp());
        
        // Modal controls
        document.getElementById('saveScoreBtn').addEventListener('click', () => this.saveHighScore());
        document.getElementById('skipNameBtn').addEventListener('click', () => this.skipNameInput());
        document.getElementById('closeHelpBtn').addEventListener('click', () => this.closeModal('helpModal'));
        document.getElementById('cancelUpdateBtn').addEventListener('click', () => this.closeModal('wordUpdateModal'));
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Click outside autocomplete
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.word-input-container')) {
                this.hideAutocomplete();
            }
        });
    }

    // ===== Input Panel Logic =====
    onNumberChange() {
        const selectedNumber = parseInt(this.wordNumberSelect.value);
        if (selectedNumber) {
            this.updateDirectionOptions(selectedNumber);
            this.highlightWordInGrid(selectedNumber, this.wordDirectionSelect.value);
        }
    }

    onDirectionChange() {
        const selectedNumber = parseInt(this.wordNumberSelect.value);
        const selectedDirection = this.wordDirectionSelect.value;
        if (selectedNumber && selectedDirection) {
            this.highlightWordInGrid(selectedNumber, selectedDirection);
            this.wordInput.focus();
        }
    }

    onWordInput() {
        const input = this.wordInput.value.toUpperCase();
        
        // Show autocomplete for difficulty <= 3
        if (this.difficulty <= 3 && input.length >= 2) {
            this.showAutocomplete(input);
        } else {
            this.hideAutocomplete();
        }
    }

    onWordKeydown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.submitWord();
        } else if (e.key === 'Escape') {
            this.hideAutocomplete();
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            this.navigateAutocomplete(e.key === 'ArrowDown');
        }
    }

    updateDirectionOptions(number) {
        // Clear and rebuild direction options
        this.wordDirectionSelect.innerHTML = '<option value="">선택</option>';
        
        const acrossWord = this.clues.across.find(clue => clue.number === number);
        const downWord = this.clues.down.find(clue => clue.number === number);
        
        if (acrossWord && !this.completedWords.has(`across-${number}`)) {
            const option = document.createElement('option');
            option.value = 'across';
            option.textContent = '가로';
            this.wordDirectionSelect.appendChild(option);
        }
        
        if (downWord && !this.completedWords.has(`down-${number}`)) {
            const option = document.createElement('option');
            option.value = 'down';
            option.textContent = '세로';
            this.wordDirectionSelect.appendChild(option);
        }
        
        // Auto-select if only one option
        const options = this.wordDirectionSelect.querySelectorAll('option[value!=""]');
        if (options.length === 1) {
            this.wordDirectionSelect.value = options[0].value;
            this.onDirectionChange();
        }
    }

    populateNumberOptions() {
        this.wordNumberSelect.innerHTML = '<option value="">선택</option>';
        
        const allNumbers = new Set();
        this.clues.across.forEach(clue => allNumbers.add(clue.number));
        this.clues.down.forEach(clue => allNumbers.add(clue.number));
        
        Array.from(allNumbers).sort((a, b) => a - b).forEach(number => {
            // Only show numbers that have incomplete words
            const acrossComplete = this.completedWords.has(`across-${number}`);
            const downComplete = this.completedWords.has(`down-${number}`);
            const acrossExists = this.clues.across.some(clue => clue.number === number);
            const downExists = this.clues.down.some(clue => clue.number === number);
            
            if ((acrossExists && !acrossComplete) || (downExists && !downComplete)) {
                const option = document.createElement('option');
                option.value = number;
                option.textContent = number;
                this.wordNumberSelect.appendChild(option);
            }
        });
    }

    highlightWordInGrid(number, direction) {
        // Clear previous highlights
        document.querySelectorAll('.crossword-cell').forEach(cell => {
            cell.classList.remove('highlighted');
        });
        
        if (!direction) return;
        
        const word = this.clues[direction].find(clue => clue.number === number);
        if (!word) return;
        
        // Highlight word cells
        for (let i = 0; i < word.answer.length; i++) {
            const row = direction === 'across' ? word.row : word.row + i;
            const col = direction === 'across' ? word.col + i : word.col;
            
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            if (cell) {
                cell.classList.add('highlighted');
            }
        }
    }

    // ===== Autocomplete System =====
    showAutocomplete(input) {
        if (this.difficulty > 3) return;
        
        const suggestions = this.getWordSuggestions(input);
        if (suggestions.length === 0) {
            this.hideAutocomplete();
            return;
        }
        
        this.autocompleteSuggestions.innerHTML = '';
        suggestions.forEach((suggestion, index) => {
            const item = document.createElement('div');
            item.className = 'autocomplete-item';
            item.textContent = suggestion;
            item.addEventListener('click', () => this.selectAutocomplete(suggestion));
            this.autocompleteSuggestions.appendChild(item);
        });
        
        this.autocompleteSuggestions.style.display = 'block';
        this.autocompleteSuggestions.style.bottom = '100%';
    }

    hideAutocomplete() {
        this.autocompleteSuggestions.style.display = 'none';
    }

    getWordSuggestions(input) {
        const currentNumber = parseInt(this.wordNumberSelect.value);
        const currentDirection = this.wordDirectionSelect.value;
        
        if (!currentNumber || !currentDirection) return [];
        
        const targetWord = this.clues[currentDirection].find(clue => clue.number === currentNumber);
        if (!targetWord) return [];
        
        // Get all possible words that match current input and length
        const suggestions = [];
        const langDatabase = this.wordDatabase.get(this.language);
        
        if (langDatabase) {
            for (const [difficulty, words] of langDatabase.entries()) {
                words.forEach(wordObj => {
                    if (wordObj.word.length === targetWord.answer.length && 
                        wordObj.word.startsWith(input)) {
                        suggestions.push(wordObj.word);
                    }
                });
            }
        }
        
        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }

    selectAutocomplete(word) {
        this.wordInput.value = word;
        this.hideAutocomplete();
        this.submitWord();
    }

    navigateAutocomplete(down) {
        const items = this.autocompleteSuggestions.querySelectorAll('.autocomplete-item');
        if (items.length === 0) return;
        
        const current = this.autocompleteSuggestions.querySelector('.autocomplete-item.selected');
        let newIndex = 0;
        
        if (current) {
            current.classList.remove('selected');
            const currentIndex = Array.from(items).indexOf(current);
            newIndex = down ? 
                Math.min(currentIndex + 1, items.length - 1) : 
                Math.max(currentIndex - 1, 0);
        }
        
        items[newIndex].classList.add('selected');
    }

    // ===== Word Submission =====
    submitWord() {
        const number = parseInt(this.wordNumberSelect.value);
        const direction = this.wordDirectionSelect.value;
        const word = this.wordInput.value.toUpperCase().trim();
        
        if (!number || !direction || !word) {
            this.showError('번호, 방향, 단어를 모두 입력해주세요.');
            return;
        }
        
        const targetWord = this.clues[direction].find(clue => clue.number === number);
        if (!targetWord) {
            this.showError('잘못된 번호입니다.');
            return;
        }
        
        if (word.length !== targetWord.answer.length) {
            this.showError(`이 단어는 ${targetWord.answer.length}글자여야 합니다.`);
            return;
        }
        
        if (word === targetWord.answer) {
            this.handleCorrectAnswer(number, direction, word);
        } else {
            this.handleIncorrectAnswer(number, direction, word);
        }
        
        // Clear input
        this.wordInput.value = '';
        this.hideAutocomplete();
    }

    handleCorrectAnswer(number, direction, word) {
        const wordKey = `${direction}-${number}`;
        this.completedWords.add(wordKey);
        
        // Add score
        this.score += 100;
        this.updateScore();
        
        // Fill grid
        this.fillWordInGrid(number, direction, word);
        
        // Mark as completed
        this.markWordAsCompleted(number, direction);
        
        // Update UI
        this.populateNumberOptions();
        this.updateProgress();
        
        // Play sound
        this.playSound('correct');
        
        // Check if game is complete
        if (this.completedWords.size === this.clues.across.length + this.clues.down.length) {
            setTimeout(() => this.completeGame(), 500);
        }
        
        // Clear selections
        this.wordNumberSelect.value = '';
        this.wordDirectionSelect.innerHTML = '<option value="">선택</option>';
        document.querySelectorAll('.crossword-cell').forEach(cell => {
            cell.classList.remove('highlighted');
        });
    }

    handleIncorrectAnswer(number, direction, word) {
        this.showError('틀렸습니다. 다시 시도해보세요.');
        this.playSound('error');
        
        // Show error animation on highlighted cells
        document.querySelectorAll('.crossword-cell.highlighted').forEach(cell => {
            cell.classList.add('error');
            setTimeout(() => cell.classList.remove('error'), 300);
        });
    }

    fillWordInGrid(number, direction, word) {
        const targetWord = this.clues[direction].find(clue => clue.number === number);
        if (!targetWord) return;
        
        for (let i = 0; i < word.length; i++) {
            const row = direction === 'across' ? targetWord.row : targetWord.row + i;
            const col = direction === 'across' ? targetWord.col + i : targetWord.col;
            
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            if (cell) {
                cell.textContent = word[i];
                cell.classList.add('completed');
            }
        }
    }

    markWordAsCompleted(number, direction) {
        const clueElement = document.querySelector(
            `.${direction}-clues .clue-item[data-number="${number}"]`
        );
        if (clueElement) {
            clueElement.classList.add('completed');
        }
    }

    showError(message) {
        // Simple error display - could be enhanced with toast notifications
        console.error(message);
        // You could add a toast notification system here
    }

    // ===== Game Logic =====
    startGame() {
        this.initializeGame();
        this.generateCrossword();
        this.renderGrid();
        this.renderClues();
        this.populateNumberOptions();
        this.showGameScreen();
        this.startTimer();
        this.gameActive = true;
        this.playSound('click');
    }

    initializeGame() {
        // Reset game state
        this.grid = Array(this.gridSize).fill().map(() => 
            Array(this.gridSize).fill({ type: 'black', value: '', number: null })
        );
        this.solution = Array(this.gridSize).fill().map(() => 
            Array(this.gridSize).fill('')
        );
        this.words = [];
        this.clues = { across: [], down: [] };
        this.wordPositions.clear();
        this.completedWords.clear();
        this.score = 0;
        this.timer = this.gameTime;
        this.updateScore();
        this.updateProgress();
    }

    generateCrossword() {
        // Select words for current settings
        this.selectWordsForCrossword();
        
        // Place words on grid
        this.placeWordsOnGrid();
        
        // Add numbers
        this.addNumbersToGrid();
        
        // Generate clues
        this.generateClues();
    }

    selectWordsForCrossword() {
        this.words = [];
        const langDatabase = this.wordDatabase.get(this.language);
        
        if (!langDatabase) return;
        
        // Calculate minimum words needed (at least gridSize)
        const minWords = this.gridSize;
        const maxWords = Math.floor(this.gridSize * 1.5);
        
        // Select words from difficulty levels 1 to current difficulty
        for (let diff = 1; diff <= Math.min(this.difficulty, 3); diff++) {
            if (langDatabase.has(diff)) {
                const difficultyWords = langDatabase.get(diff);
                const wordsToAdd = Math.min(
                    Math.floor(minWords / 3), 
                    difficultyWords.length
                );
                
                // Shuffle and select
                const shuffled = this.shuffleArray([...difficultyWords]);
                this.words.push(...shuffled.slice(0, wordsToAdd));
            }
        }
        
        // Ensure we have enough words
        if (this.words.length < minWords) {
            // Add more words from any available difficulty
            for (const [diff, diffWords] of langDatabase.entries()) {
                if (this.words.length >= minWords) break;
                const remaining = minWords - this.words.length;
                const available = diffWords.filter(w => !this.words.find(existing => existing.word === w.word));
                const shuffled = this.shuffleArray(available);
                this.words.push(...shuffled.slice(0, remaining));
            }
        }
        
        // Limit to max words
        if (this.words.length > maxWords) {
            this.words = this.words.slice(0, maxWords);
        }
        
        // Shuffle final word list
        this.words = this.shuffleArray(this.words);
    }

    placeWordsOnGrid() {
        // Simple placement algorithm
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
                    number: null
                };
                this.solution[r][c] = word[i];
            }
        }
        
        // Store word info
        wordObj.row = row;
        wordObj.col = col;
        wordObj.direction = direction;
        wordObj.answer = word;
    }

    findPlacementForWord(wordObj) {
        const word = wordObj.word.toUpperCase();
        let placed = false;
        
        // Try to intersect with existing words
        for (let row = 0; row < this.gridSize && !placed; row++) {
            for (let col = 0; col < this.gridSize && !placed; col++) {
                if (this.grid[row][col].type === 'white') {
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
        
        // If can't intersect, try to place in empty area
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
            
            // Check surrounding cells to avoid adjacent words
            const neighbors = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1],           [0, 1],
                [1, -1],  [1, 0],  [1, 1]
            ];
            
            for (const [dr, dc] of neighbors) {
                const nr = r + dr;
                const nc = c + dc;
                
                if (nr >= 0 && nr < this.gridSize && nc >= 0 && nc < this.gridSize) {
                    const neighborCell = this.grid[nr][nc];
                    if (neighborCell.type === 'white') {
                        // Check if this would create an invalid intersection
                        const isPartOfCurrentWord = (
                            (direction === 'across' && nr === r && nc >= col && nc < col + word.length) ||
                            (direction === 'down' && nc === c && nr >= row && nr < row + word.length)
                        );
                        
                        if (!isPartOfCurrentWord) {
                            // This could be problematic - need more sophisticated checking
                        }
                    }
                }
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
            // Try to find an empty area
            for (let attempts = 0; attempts < 50; attempts++) {
                const row = Math.floor(Math.random() * (maxRow + 1));
                const col = Math.floor(Math.random() * (maxCol + 1));
                
                let canPlace = true;
                for (let i = 0; i < word.length; i++) {
                    const r = direction === 'across' ? row : row + i;
                    const c = direction === 'across' ? col + i : col;
                    
                    if (this.grid[r][c].type === 'white') {
                        canPlace = false;
                        break;
                    }
                }
                
                if (canPlace) {
                    this.placeWord(wordObj, row, col, direction);
                    break;
                }
            }
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
            if (wordObj.row !== undefined && wordObj.col !== undefined) {
                const clue = {
                    number: this.grid[wordObj.row][wordObj.col].number,
                    hints: wordObj.hints,
                    answer: wordObj.answer,
                    row: wordObj.row,
                    col: wordObj.col,
                    length: wordObj.answer.length
                };
                
                if (clue.number) {
                    this.clues[wordObj.direction].push(clue);
                }
            }
        });
        
        // Sort clues by number
        this.clues.across.sort((a, b) => a.number - b.number);
        this.clues.down.sort((a, b) => a.number - b.number);
    }

    // ===== Rendering =====
    renderGrid() {
        this.crosswordGrid.innerHTML = '';
        this.crosswordGrid.style.gridTemplateColumns = `repeat(${this.gridSize}, 1fr)`;
        
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const cell = document.createElement('div');
                const cellData = this.grid[row][col];
                
                cell.className = `crossword-cell ${cellData.type}`;
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                if (cellData.type === 'white') {
                    if (cellData.number) {
                        const numberDiv = document.createElement('div');
                        numberDiv.className = 'cell-number';
                        numberDiv.textContent = cellData.number;
                        cell.appendChild(numberDiv);
                    }
                }
                
                this.crosswordGrid.appendChild(cell);
            }
        }
    }

    renderClues() {
        this.renderClueList(this.acrossClues, this.clues.across, 'across');
        this.renderClueList(this.downClues, this.clues.down, 'down');
    }

    renderClueList(container, clues, direction) {
        container.innerHTML = '';
        
        clues.forEach(clue => {
            const clueElement = document.createElement('div');
            clueElement.className = 'clue-item';
            clueElement.dataset.number = clue.number;
            clueElement.dataset.direction = direction;
            
            clueElement.innerHTML = `
                <div class="clue-header">
                    <span class="clue-number">${clue.number}.</span>
                    <span class="clue-length">(${clue.length}글자)</span>
                </div>
                <div class="clue-hints">
                    ${clue.hints.map(hint => `<div class="clue-hint">• ${hint}</div>`).join('')}
                </div>
            `;
            
            clueElement.addEventListener('click', () => {
                this.selectWordFromClue(clue.number, direction);
            });
            
            container.appendChild(clueElement);
        });
    }

    selectWordFromClue(number, direction) {
        this.wordNumberSelect.value = number;
        this.onNumberChange();
        this.wordDirectionSelect.value = direction;
        this.onDirectionChange();
    }

    switchClueTab(direction) {
        // Update tab appearance
        document.querySelectorAll('.clue-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-direction="${direction}"]`).classList.add('active');
        
        // Show corresponding clue list
        document.querySelectorAll('.clues-list').forEach(list => {
            list.classList.remove('active');
        });
        document.querySelector(`.${direction}-clues`).classList.add('active');
    }

    // ===== Timer and Game Flow =====
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
        this.endGame(false);
    }

    completeGame() {
        this.gameActive = false;
        clearInterval(this.timerInterval);
        
        const finalScore = this.calculateFinalScore();
        this.score = finalScore;
        
        this.showCelebration();
        this.playSound('complete');
        
        setTimeout(() => {
            if (this.isHighScore(finalScore)) {
                this.showNameInput();
            } else {
                this.showGameOver(true);
            }
        }, 3000);
    }

    endGame(completed = false) {
        this.gameActive = false;
        clearInterval(this.timerInterval);
        this.closeAllModals();
        
        const finalScore = this.calculateFinalScore();
        this.score = finalScore;
        
        if (completed && this.isHighScore(finalScore)) {
            this.showNameInput();
        } else {
            this.showGameOver(completed);
        }
    }

    calculateFinalScore() {
        let baseScore = this.score;
        const timeBonus = this.timer * 2;
        const difficultyMultiplier = this.difficulty * 0.1 + 1;
        const completionRatio = this.completedWords.size / (this.clues.across.length + this.clues.down.length);
        const completionBonus = completionRatio === 1 ? 500 : 0;
        
        return Math.round((baseScore + timeBonus + completionBonus) * difficultyMultiplier);
    }

    // ===== UI Updates =====
    updateScore() {
        this.scoreDisplay.textContent = this.score;
    }

    updateProgress() {
        this.completedDisplay.textContent = this.completedWords.size;
        this.totalDisplay.textContent = this.clues.across.length + this.clues.down.length;
    }

    // ===== Theme and Sound =====
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

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        const icon = document.querySelector('#soundToggle i');
        icon.className = this.soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
        localStorage.setItem('crossword-sound', this.soundEnabled);
        this.playSound('click');
    }

    playSound(type) {
        if (!this.soundEnabled) return;
        
        // Simple sound effects using Web Audio API
        try {
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
                    oscillator.frequency.value = 1000;
                    gainNode.gain.value = 0.2;
                    oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
                    break;
                case 'error':
                    oscillator.frequency.value = 300;
                    gainNode.gain.value = 0.15;
                    break;
                case 'complete':
                    oscillator.frequency.value = 1200;
                    gainNode.gain.value = 0.3;
                    oscillator.frequency.exponentialRampToValueAtTime(1600, audioContext.currentTime + 0.2);
                    break;
            }
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.2);
        } catch (e) {
            console.log('Audio not supported');
        }
    }

    // ===== Celebration Effects =====
    showCelebration() {
        this.celebrationCanvas.style.display = 'block';
        
        // Simple 2D confetti
        const canvas = this.celebrationCanvas;
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const confetti = [];
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
        
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
        
        function animate() {
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
                
                if (piece.y > canvas.height) {
                    confetti.splice(index, 1);
                }
            });
            
            if (confetti.length > 0) {
                requestAnimationFrame(animate);
            } else {
                canvas.style.display = 'none';
            }
        }
        
        animate();
    }

    // ===== Screen Management =====
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
            <h2>${isWin ? '🎉 축하합니다!' : '⏰ 시간 종료'}</h2>
            <p>최종 점수: <strong>${this.score.toLocaleString()}점</strong></p>
            <p>완성한 단어: <strong>${this.completedWords.size}/${this.clues.across.length + this.clues.down.length}개</strong></p>
            <p>완성률: <strong>${Math.round(this.completedWords.size / (this.clues.across.length + this.clues.down.length) * 100)}%</strong></p>
            <p>난이도: <strong>${this.difficulty}단계</strong></p>
            <div class="button-group" style="margin-top: 2rem;">
                <button class="btn btn-primary" onclick="game.startGame()">
                    <i class="fas fa-redo"></i> 다시 하기
                </button>
                <button class="btn btn-secondary" onclick="game.showStartScreen()">
                    <i class="fas fa-home"></i> 메뉴로
                </button>
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

    // ===== Modal Management =====
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

    // ===== High Score Management =====
    loadHighScores() {
        const saved = localStorage.getItem('crossword-highscores');
        this.highScores = saved ? JSON.parse(saved) : [];
    }

    saveHighScores() {
        localStorage.setItem('crossword-highscores', JSON.stringify(this.highScores));
    }

    isHighScore(score) {
        return this.highScores.length < 10 || score > (this.highScores[this.highScores.length - 1]?.score || 0);
    }

    addHighScore(name, score) {
        this.highScores.push({ 
            name, 
            score, 
            difficulty: this.difficulty,
            language: this.language,
            gridSize: this.gridSize,
            date: new Date().toLocaleDateString() 
        });
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
            this.scoreList.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">아직 기록이 없습니다.</p>';
            return;
        }
        
        this.highScores.forEach((score, index) => {
            const scoreItem = document.createElement('div');
            scoreItem.className = 'score-item';
            scoreItem.innerHTML = `
                <div class="score-rank">#${index + 1}</div>
                <div class="score-details">
                    <div class="score-name">${score.name}</div>
                    <div class="score-meta">${score.language} • ${score.gridSize}x${score.gridSize} • 난이도 ${score.difficulty} • ${score.date}</div>
                </div>
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
    game = new AdvancedCrosswordGame();
    
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