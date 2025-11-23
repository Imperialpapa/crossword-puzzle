# 🧩 CrosswordHunt - 트렌디한 십자말풀이 게임

모던한 디자인과 다양한 기능을 갖춘 웹 기반 십자말풀이 게임입니다.

## ✨ 주요 기능

### 🎮 게임 기능
- **다양한 그리드 크기**: 10x10 ~ 30x30 (기본값: 15x15)
- **언어 선택**: 영어/한국어 지원
- **난이도 시스템**: 1~10 단계 (기본값: 5)
- **시간 제한**: 1분 이내 최소 1개 단어 발견 필수
- **최고 점수**: 이름 입력 후 기록 저장

### 🎨 모던 UI/UX
- **다크/라이트 테마**: 원클릭 테마 변경
- **반응형 디자인**: 모바일/태블릿/데스크톱 최적화
- **터치 인터페이스**: 모바일 친화적 터치 조작
- **애니메이션**: 부드러운 CSS 트랜지션
- **3D 축하 효과**: Three.js 기반 파티클 애니메이션

### 🔊 사용자 경험
- **사운드 효과**: 게임 액션별 음향 피드백
- **힌트 시스템**: 막힐 때 도움말 제공
- **일시정지**: 게임 중 언제든 일시정지 가능
- **키보드 단축키**: ESC, Space, Enter 지원

## 🚀 게임 방법

1. **설정 선택**: 그리드 크기, 언어, 난이도 설정
2. **십자말풀이**: 클릭으로 칸 선택 후 키보드로 글자 입력
3. **단서 활용**: 가로/세로 단서를 보고 정답 추론
4. **점수 획득**: 완성된 단어 길이와 난이도에 따른 점수
5. **최고 기록**: 새로운 기록 달성 시 이름 등록

### 🎯 조작법
- **칸 선택**: 마우스 클릭
- **글자 입력**: 키보드 직접 입력
- **방향 이동**: 방향키 또는 Tab (가로↔세로)
- **글자 지우기**: Backspace
- **힌트**: Space 키

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **3D Graphics**: Three.js
- **Icons**: Font Awesome 6
- **Fonts**: Google Fonts (Poppins)
- **Storage**: Local Storage (설정/점수 저장)

## 📱 지원 환경

- **브라우저**: Chrome, Firefox, Safari, Edge (최신 버전)
- **모바일**: iOS Safari, Android Chrome
- **화면**: 320px ~ 4K 반응형 지원

## 🎯 점수 시스템

```javascript
점수 = (단어길이 × 100 × 난이도) + 시간보너스 + 완료보너스
```

- **단어 점수**: 글자 수 × 100 × 난이도
- **시간 보너스**: 남은 시간 × 10
- **완료 보너스**: 모든 단어 발견 시 1000점

## 🎨 테마 시스템

### 라이트 테마
- 깔끔하고 밝은 색상
- 고대비로 가독성 최적화

### 다크 테마
- 눈의 피로감 감소
- 저조도 환경에 최적화

## 📦 설치 및 실행

### 로컬 실행
```bash
# 저장소 클론
git clone [repository-url]
cd puzzle_word

# HTTP 서버 실행 (Python 3)
python -m http.server 8000

# 브라우저에서 접속
http://localhost:8000
```

### GitHub Pages 배포
1. GitHub 저장소 생성
2. 파일 업로드
3. Settings → Pages → Deploy from branch 선택
4. `main` 브랜치 선택 후 Save

## 🎮 게임 플레이 팁

1. **교차점 활용**: 가로세로 단어가 만나는 지점부터 시작
2. **짧은 단어**: 3-4글자 단어를 먼저 완성
3. **단서 분석**: 단어 길이와 의미를 조합해서 추론
4. **힌트 활용**: 막힐 때 Space키로 힌트 확인
5. **방향 전환**: Tab키로 가로세로 방향 변경

## 🔧 개발자 정보

### 파일 구조
```
puzzle_word/
├── index.html          # 메인 HTML
├── styles.css          # 스타일시트  
├── crossword.js        # 십자말풀이 게임 로직
├── manifest.json       # PWA 매니페스트
├── sw.js              # 서비스 워커
├── README.md          # 프로젝트 문서
└── .gitignore         # Git 설정
```

### 확장 가능한 기능
- 온라인 멀티플레이어
- 사용자 정의 단어 목록
- 테마 커스터마이징
- 통계 및 진행률 트래킹
- PWA (Progressive Web App) 지원

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 버그 신고

이슈나 개선사항이 있다면 [Issues](https://github.com/username/puzzle_word/issues)에서 신고해주세요.

---

🎉 **즐거운 게임 되세요!** 🎮