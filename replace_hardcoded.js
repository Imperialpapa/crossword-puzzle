const fs = require('fs');

// 파일 읽기
const content = fs.readFileSync('crossword.js', 'utf-8');
const lines = content.split('\n');

// Line 67-84까지 유지 (simple initialization)
// Line 85-540 제거 (hardcoded fallback words)
// Line 541부터 끝까지 유지

const newContent = [
    ...lines.slice(0, 84),  // Line 0-84 (84는 console.log('ℹ️ 실제 단어는...')
    '    }',                 // Closing brace for initializeWordDatabase()
    '',                      // Empty line
    ...lines.slice(542)      // Line 542부터 끝까지 (async updateWordDatabase()...)
].join('\n');

// 파일 쓰기
fs.writeFileSync('crossword.js', newContent, 'utf-8');

console.log('✅ Hardcoded fallback words가 제거되었습니다.');
console.log('📊 제거된 라인 수: 456 lines (85-540)');
