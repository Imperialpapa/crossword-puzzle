const fs = require('fs');

// 파일 읽기
const content = fs.readFileSync('crossword.js', 'utf-8');
const lines = content.split('\n');

// 새로운 메서드
const newMethod = `    // ===== Word Database System =====
    initializeWordDatabase() {
        // Supabase에서만 단어를 로드하므로 빈 구조만 초기화
        console.log('📚 단어 데이터베이스 구조 초기화...');

        // 언어별로 빈 Map 구조 생성
        const languages = ['english', 'korean'];
        const difficulties = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        languages.forEach(lang => {
            this.wordDatabase.set(lang, new Map());
            difficulties.forEach(diff => {
                this.wordDatabase.get(lang).set(diff, []);
            });
        });

        console.log('✅ 단어 데이터베이스 구조 초기화 완료');
        console.log('ℹ️ 실제 단어는 Supabase에서 로드됩니다.');
    }
`;

// 66라인까지 + 새 메서드 + 541라인부터
const newContent = lines.slice(0, 66).join('\n') + '\n' + newMethod + '\n' + lines.slice(541).join('\n');

// 파일 쓰기
fs.writeFileSync('crossword.js', newContent, 'utf-8');

console.log('✅ initializeWordDatabase 메서드가 간단한 버전으로 교체되었습니다.');
