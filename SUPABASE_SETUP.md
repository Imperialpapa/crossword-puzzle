# Supabase 전용 단어 데이터베이스 전환 완료

## ✅ 완료된 작업

### 1. 로컬 하드코딩 단어 제거
- `crossword.js`에서 456줄의 하드코딩된 단어 데이터 제거
- `initializeWordDatabase()` 메서드를 간단한 버전으로 교체
- 이제 게임은 **Supabase에서만** 단어를 로드합니다

### 2. Supabase 접속 정보 업데이트
```javascript
const SUPABASE_CONFIG = {
    url: "https://mpmzixrzongtrxhzbbcw.supabase.co",
    anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wbXppeHJ6b25ndHJ4aHpiYmN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNzU5NTQsImV4cCI6MjA4MDY1MTk1NH0.L7kqxWgHG-ThhZv9MDAUPgFlVto49_Ue-wWGp8zby8s"
};
```

### 3. 초기 단어 데이터 SQL 스크립트 생성
- `initial_words.sql` 파일 생성
- 영어 단어: 난이도 1-10, 총 48개
- 한국어 단어: 난이도 1-10, 총 48개
- **총 96개의 초기 단어** 포함

## 📋 다음 단계 (Supabase 설정)

### 1. Supabase 프로젝트에서 SQL 실행

1. Supabase 대시보드 접속: https://app.supabase.com
2. "crossword" 프로젝트 선택
3. 왼쪽 메뉴에서 **SQL Editor** 클릭
4. **New query** 버튼 클릭
5. `initial_words.sql` 파일의 내용을 복사하여 붙여넣기
6. **RUN** 버튼 클릭하여 실행

### 2. 실행 결과 확인

SQL 실행 후 하단에 다음과 같은 결과가 표시됩니다:

```
total_words: 96

language | count
---------|------
english  | 48
korean   | 48

difficulty | count
-----------|------
1          | 30
2          | 30
3          | 20
...
```

### 3. 테이블 데이터 확인

1. 왼쪽 메뉴에서 **Table Editor** 클릭
2. `crossword_words` 테이블 선택
3. 96개의 단어가 정상적으로 삽입되었는지 확인

## 🧪 테스트 방법

### 로컬 테스트
1. `index.html` 파일을 브라우저로 열기
2. 브라우저 개발자 도구 (F12) 열기
3. Console 탭에서 다음 메시지 확인:
   ```
   ✅ Supabase 초기화 성공
   📚 단어 데이터베이스 구조 초기화...
   ✅ 단어 데이터베이스 구조 초기화 완료
   ℹ️ 실제 단어는 Supabase에서 로드됩니다.
   ✅ Supabase에서 XX개의 단어를 로드했습니다.
   ```
4. 게임 시작하여 정상 작동 확인

### GitHub 업로드 및 모바일 테스트
1. Git commit 및 push:
   ```bash
   git add .
   git commit -m "Supabase 전용 단어 데이터베이스로 전환"
   git push origin main
   ```

2. GitHub Pages 활성화:
   - GitHub 저장소 > Settings > Pages
   - Source: Deploy from a branch
   - Branch: main, 폴더: / (root)
   - Save

3. 모바일에서 접속:
   - `https://[your-username].github.io/[repository-name]/`
   - 또는 커스텀 도메인 설정

## 📁 변경된 파일

- ✅ `crossword.js` - 456줄 제거, Supabase 전용으로 전환
- ✅ `initial_words.sql` - 초기 단어 데이터 (새로 생성)
- ✅ `SUPABASE_SETUP.md` - 설정 가이드 (이 파일)
- 📦 `crossword.js.backup` - 백업 파일 (필요시 복원용)
- 🗑️ `replace_hardcoded.js` - 사용 완료 (삭제 가능)
- 🗑️ `replace_method.js` - 사용 완료 (삭제 가능)
- 🗑️ `init_db_simple.js` - 사용 완료 (삭제 가능)

## 💡 단어 추가 방법

### 게임 UI를 통한 추가
1. 게임 시작 화면에서 "단어 DB 업데이트 (10개)" 버튼 클릭
2. 자동으로 10개의 새로운 단어가 Supabase에 추가됨

### SQL을 통한 직접 추가
```sql
INSERT INTO crossword_words (word, language, difficulty, hints) VALUES
('EXAMPLE', 'english', 5, '["Hint 1", "Hint 2", "Hint 3"]');
```

## ⚠️ 주의사항

1. **RLS 정책 확인**: `initial_words.sql`에 포함된 RLS 정책이 정상 적용되었는지 확인
2. **hints 형식**: hints는 JSONB 배열 형태로 최소 2개 이상 필요
3. **중복 방지**: (word, language, difficulty) 조합은 UNIQUE 제약조건 적용됨

## 🎮 게임 기능

- ✅ Supabase에서 단어 자동 로드
- ✅ 난이도별, 언어별 필터링
- ✅ 게임 내에서 새 단어 추가 기능
- ✅ 자동완성 (난이도 3 이하)
- ✅ 정답 보기 기능
- ✅ 십자말풀이 자동 생성

모든 작업이 완료되었습니다! 🎉
