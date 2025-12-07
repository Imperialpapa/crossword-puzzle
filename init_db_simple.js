// ===== Word Database System - Supabase Only =====
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
