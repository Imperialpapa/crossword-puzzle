-- ===================================================
-- Crossword Puzzle - Initial Word Database
-- ===================================================
-- 이 스크립트를 Supabase SQL Editor에서 실행하세요
-- ===================================================

-- 테이블이 없다면 먼저 생성
CREATE TABLE IF NOT EXISTS crossword_words (
    id BIGSERIAL PRIMARY KEY,
    word TEXT NOT NULL,
    language TEXT NOT NULL,
    difficulty INTEGER NOT NULL CHECK (difficulty >= 1 AND difficulty <= 10),
    hints JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(word, language, difficulty)
);

-- RLS (Row Level Security) 활성화
ALTER TABLE crossword_words ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽을 수 있도록 설정
DROP POLICY IF EXISTS "Enable read access for all users" ON crossword_words;
CREATE POLICY "Enable read access for all users"
ON crossword_words FOR SELECT
USING (true);

-- 모든 사용자가 쓸 수 있도록 설정 (게임에서 단어 추가 기능용)
DROP POLICY IF EXISTS "Enable insert access for all users" ON crossword_words;
CREATE POLICY "Enable insert access for all users"
ON crossword_words FOR INSERT
WITH CHECK (true);

-- 기존 데이터 초기화 (선택사항 - 필요시 주석 해제)
-- DELETE FROM crossword_words;

-- ===================================================
-- English Words
-- ===================================================

-- Difficulty 1 (3-letter words)
INSERT INTO crossword_words (word, language, difficulty, hints) VALUES
('CAT', 'english', 1, '["Domestic animal that says meow", "Pet that catches mice"]'),
('DOG', 'english', 1, '["Mans best friend", "Loyal pet that barks"]'),
('SUN', 'english', 1, '["Bright star in sky", "Hot celestial body"]'),
('BOX', 'english', 1, '["Square container used for storage", "Rectangular package for shipping items"]'),
('HAT', 'english', 1, '["Clothing worn on head for protection", "Fashion accessory that covers your hair"]'),
('BAT', 'english', 1, '["Flying mammal that sleeps upside down", "Nocturnal creature that uses echolocation"]'),
('RUN', 'english', 1, '["Move quickly on foot at fast pace", "Exercise activity faster than walking"]'),
('PEN', 'english', 1, '["Writing instrument using ink", "Tool for putting words on paper"]'),
('CUP', 'english', 1, '["Container for drinking beverages", "Vessel that holds liquid like coffee or tea"]'),
('BED', 'english', 1, '["Furniture for sleeping and resting", "Place where you lie down at night"]'),
('KEY', 'english', 1, '["Metal object that opens locks", "Tool used to unlock doors and start cars"]'),
('MAP', 'english', 1, '["Visual representation of geographical area", "Paper showing roads, cities and landmarks"]'),
('NET', 'english', 1, '["Mesh material with holes for catching", "Web-like structure used in sports and fishing"]'),
('OWL', 'english', 1, '["Nocturnal bird with large eyes", "Wise creature that hoots at night"]'),
('EGG', 'english', 1, '["Oval object laid by birds", "Breakfast food often fried or scrambled"]');

-- Difficulty 2 (5-letter words)
INSERT INTO crossword_words (word, language, difficulty, hints) VALUES
('HOUSE', 'english', 2, '["Building where people live and sleep", "Residential structure with rooms and roof"]'),
('WATER', 'english', 2, '["Clear liquid essential for all life", "H2O that falls from sky as rain"]'),
('HAPPY', 'english', 2, '["Emotional state of joy and contentment", "Feeling pleased and cheerful about life"]'),
('GREEN', 'english', 2, '["Color of grass and leaves in nature", "Mix of blue and yellow creates this hue"]'),
('MUSIC', 'english', 2, '["Art form using sounds and rhythms", "Harmonious combinations of notes and melodies"]'),
('BREAD', 'english', 2, '["Baked food made from flour and water", "Staple food often eaten with butter"]'),
('LIGHT', 'english', 2, '["Illumination that helps us see things", "Opposite of darkness that brightens space"]'),
('PHONE', 'english', 2, '["Communication device for talking to others", "Electronic gadget for making calls and texts"]'),
('TABLE', 'english', 2, '["Flat surface with legs for eating or working", "Furniture where family gathers for meals"]'),
('CHAIR', 'english', 2, '["Seat with back support for one person", "Furniture for sitting at desk or table"]'),
('PIANO', 'english', 2, '["Musical instrument with black and white keys", "Large keyboard instrument played by pressing keys"]'),
('TIGER', 'english', 2, '["Large striped wild cat from Asia", "Orange and black predator of the jungle"]'),
('STORM', 'english', 2, '["Severe weather with strong winds and rain", "Natural phenomenon with thunder and lightning"]'),
('OCEAN', 'english', 2, '["Vast body of salt water covering Earth", "Large sea with waves and marine life"]'),
('SMILE', 'english', 2, '["Happy facial expression showing teeth", "Upward curve of mouth indicating joy"]');

-- Difficulty 3 (7-8 letter words)
INSERT INTO crossword_words (word, language, difficulty, hints) VALUES
('COMPUTER', 'english', 3, '["Electronic machine for processing information", "Digital device with keyboard, screen and programs"]'),
('RAINBOW', 'english', 3, '["Colorful arc appearing in sky after rain", "Spectrum of colors formed by light and water"]'),
('BUTTERFLY', 'english', 3, '["Insect with colorful wings that flies", "Beautiful creature that transforms from caterpillar"]'),
('MOUNTAIN', 'english', 3, '["Very tall natural elevation of earth", "High rocky peak often covered with snow"]'),
('LIBRARY', 'english', 3, '["Building with many books for reading", "Public place where you can borrow books"]'),
('KITCHEN', 'english', 3, '["Room where food is prepared and cooked", "Place with stove, refrigerator and sink"]'),
('ELEPHANT', 'english', 3, '["Largest land animal with long trunk", "Gray mammal with big ears and tusks"]'),
('BIRTHDAY', 'english', 3, '["Anniversary of the day you were born", "Special celebration day with cake and gifts"]'),
('HOSPITAL', 'english', 3, '["Medical facility where doctors treat patients", "Building where sick people receive care"]'),
('VACATION', 'english', 3, '["Time off from work for rest and travel", "Holiday period for relaxation and fun"]');

-- Difficulty 4-5 (Longer common words)
INSERT INTO crossword_words (word, language, difficulty, hints) VALUES
('TELEVISION', 'english', 4, '["Electronic device for watching shows and news", "Screen that displays programs and movies"]'),
('BASKETBALL', 'english', 4, '["Sport played by throwing ball through hoop", "Team game with dribbling and shooting"]'),
('UNIVERSITY', 'english', 4, '["Higher education institution after high school", "Academic place where students earn degrees"]'),
('RESTAURANT', 'english', 4, '["Business establishment serving prepared meals", "Place where customers pay to eat food"]'),
('HELICOPTER', 'english', 5, '["Aircraft with rotating blades on top", "Flying vehicle that can hover in place"]'),
('PHOTOGRAPH', 'english', 5, '["Image captured by camera", "Visual record of moment in time"]'),
('DICTIONARY', 'english', 5, '["Book listing words and their meanings", "Reference showing definitions alphabetically"]'),
('CHOCOLATE', 'english', 5, '["Sweet brown food made from cocoa", "Dessert treat loved by many people"]');

-- ===================================================
-- Korean Words
-- ===================================================

-- Difficulty 1 (2-3 letter words)
INSERT INTO crossword_words (word, language, difficulty, hints) VALUES
('고양이', 'korean', 1, '["야옹하고 우는 동물", "쥐를 잡는 애완동물"]'),
('강아지', 'korean', 1, '["사람과 가장 친한 동물", "멍멍 짖는 애완동물"]'),
('하늘', 'korean', 1, '["머리 위 푸른 공간", "구름이 떠다니는 곳"]'),
('바다', 'korean', 1, '["짠물로 가득한 넓은 곳", "물고기가 사는 큰 물"]'),
('나무', 'korean', 1, '["뿌리와 가지가 있는 식물", "숲을 이루는 큰 식물"]'),
('꽃', 'korean', 1, '["예쁜 색과 향기가 나는 것", "식물이 피우는 아름다운 것"]'),
('달', 'korean', 1, '["밤하늘에 밝게 빛나는 것", "지구 주위를 도는 위성"]'),
('별', 'korean', 1, '["밤하늘에 반짝이는 것", "우주 공간의 빛나는 천체"]'),
('산', 'korean', 1, '["땅이 높이 솟은 곳", "등산하러 가는 높은 지형"]'),
('집', 'korean', 1, '["사람이 사는 건물", "가족이 함께 생활하는 공간"]'),
('책', 'korean', 1, '["글과 그림이 있는 것", "읽으면 지식을 얻는 것"]'),
('물', 'korean', 1, '["투명하고 마시는 액체", "H2O 화학식을 가진 것"]'),
('불', 'korean', 1, '["뜨겁고 밝게 타오르는 것", "촛불이나 모닥불처럼 빛나는 것"]'),
('눈', 'korean', 1, '["겨울에 내리는 흰색 것", "추운 날씨에 하늘에서 떨어지는 것"]'),
('비', 'korean', 1, '["하늘에서 떨어지는 물방울", "우산을 쓰게 만드는 날씨"]');

-- Difficulty 2 (4-5 letter words)
INSERT INTO crossword_words (word, language, difficulty, hints) VALUES
('컴퓨터', 'korean', 2, '["정보를 처리하는 전자기기", "키보드와 모니터가 있는 기계"]'),
('음악', 'korean', 2, '["소리와 리듬의 예술", "노래나 악기로 만드는 것"]'),
('학교', 'korean', 2, '["학생들이 공부하는 곳", "선생님이 가르치는 장소"]'),
('병원', 'korean', 2, '["아픈 사람을 치료하는 곳", "의사가 일하는 의료기관"]'),
('식당', 'korean', 2, '["음식을 파는 가게", "요리해서 손님에게 제공하는 곳"]'),
('도서관', 'korean', 2, '["책을 빌릴 수 있는 곳", "조용히 책 읽는 공공장소"]'),
('운동장', 'korean', 2, '["운동하는 넓은 공간", "학생들이 뛰어노는 야외 장소"]'),
('시장', 'korean', 2, '["물건을 사고파는 곳", "여러 가게가 모여있는 장소"]'),
('공원', 'korean', 2, '["나무와 꽃이 많은 쉬는 곳", "산책하고 놀 수 있는 녹지공간"]'),
('영화', 'korean', 2, '["극장에서 보는 동영상", "스크린에 상영되는 작품"]'),
('친구', 'korean', 2, '["서로 좋아하는 사이", "함께 놀고 이야기하는 관계"]'),
('가족', 'korean', 2, '["함께 사는 혈연관계", "부모와 자식으로 이루어진 집단"]'),
('선생님', 'korean', 2, '["학생을 가르치는 사람", "학교에서 수업하는 직업"]'),
('우산', 'korean', 2, '["비를 막아주는 도구", "접었다 펼 수 있는 빗물 방어용품"]'),
('모자', 'korean', 2, '["머리에 쓰는 것", "햇빛을 가리는 패션용품"]');

-- Difficulty 3 (6-7 letter words)
INSERT INTO crossword_words (word, language, difficulty, hints) VALUES
('냉장고', 'korean', 3, '["음식을 차갑게 보관하는 가전제품", "부엌에서 식재료 신선도를 유지하는 기계"]'),
('세탁기', 'korean', 3, '["옷을 빠는 가전제품", "더러운 빨래를 깨끗하게 만드는 기계"]'),
('텔레비전', 'korean', 3, '["방송 프로그램을 보는 기기", "드라마와 뉴스를 시청하는 화면"]'),
('에어컨', 'korean', 3, '["더울 때 시원하게 해주는 기기", "실내 온도를 낮추는 냉방장치"]'),
('엘리베이터', 'korean', 3, '["건물에서 층을 이동하는 것", "버튼을 눌러 위아래로 움직이는 상자"]'),
('자전거', 'korean', 3, '["페달을 밟아 가는 탈것", "두 바퀴가 달린 친환경 교통수단"]'),
('비행기', 'korean', 3, '["하늘을 나는 교통수단", "먼 곳으로 빠르게 이동하는 탈것"]'),
('기차역', 'korean', 3, '["기차가 서는 장소", "여행객이 열차를 타는 곳"]'),
('박물관', 'korean', 3, '["역사 유물을 전시하는 곳", "옛날 물건을 구경하는 문화시설"]'),
('놀이터', 'korean', 3, '["어린이가 노는 공간", "그네와 미끄럼틀이 있는 장소"]');

-- Difficulty 4-5 (Complex words)
INSERT INTO crossword_words (word, language, difficulty, hints) VALUES
('백화점', 'korean', 4, '["여러 층에 다양한 상품을 파는 큰 가게", "명품과 식료품을 함께 판매하는 대형매장"]'),
('주차장', 'korean', 4, '["자동차를 세워두는 공간", "차량을 일시적으로 보관하는 장소"]'),
('운동화', 'korean', 4, '["운동할 때 신는 신발", "편하게 걷거나 뛸 수 있는 신발"]'),
('컴퓨터게임', 'korean', 5, '["전자기기로 즐기는 놀이", "마우스와 키보드로 조작하는 디지털 오락"]'),
('슈퍼마켓', 'korean', 4, '["생활용품을 파는 가게", "장바구니 들고 쇼핑하는 마트"]'),
('도서관사서', 'korean', 5, '["책을 관리하는 전문직", "도서관에서 자료 정리하는 사람"]'),
('과학실험', 'korean', 5, '["과학 원리를 확인하는 활동", "가설을 검증하기 위한 테스트"]'),
('인터넷', 'korean', 4, '["전 세계를 연결하는 네트워크", "웹사이트를 통해 정보를 얻는 통신망"]');

-- 추가적인 다양한 난이도의 단어들
INSERT INTO crossword_words (word, language, difficulty, hints) VALUES
-- English 6-10
('ARCHITECTURE', 'english', 6, '["Art and science of designing buildings", "Study of construction and structural design"]'),
('PHOTOGRAPHY', 'english', 6, '["Art of capturing images with camera", "Skill of taking professional pictures"]'),
('ENVIRONMENT', 'english', 6, '["Natural world around us", "Surroundings affecting living organisms"]'),
('TECHNOLOGY', 'english', 7, '["Application of scientific knowledge", "Modern tools and digital innovations"]'),
('CIVILIZATION', 'english', 7, '["Advanced state of human society", "Complex culture with cities and writing"]'),
('CONSTITUTION', 'english', 8, '["Fundamental law of a nation", "Document establishing government principles"]'),
('IMAGINATION', 'english', 7, '["Ability to form mental images", "Creative power of the mind"]'),
('PHILOSOPHICAL', 'english', 9, '["Related to fundamental questions of existence", "Concerning deep thinking about life and reality"]'),
('EXTRAORDINARY', 'english', 9, '["Beyond what is usual or ordinary", "Remarkably exceptional and amazing"]'),
('TRANSFORMATION', 'english', 10, '["Complete change in form or appearance", "Process of thorough alteration"]'),

-- Korean 6-10
('지구온난화', 'korean', 6, '["지구 평균기온이 상승하는 현상", "온실가스로 인한 기후변화"]'),
('광합성작용', 'korean', 7, '["식물이 햇빛으로 양분을 만드는 과정", "엽록소가 이산화탄소와 물로 포도당 생성"]'),
('민주주의', 'korean', 6, '["국민이 주인인 정치체제", "다수의 의견을 존중하는 통치방식"]'),
('헌법재판소', 'korean', 8, '["헌법 관련 분쟁을 다루는 법원", "위헌법률을 심판하는 사법기관"]'),
('국제연합', 'korean', 7, '["세계 평화를 위한 국제기구", "UN이라고 부르는 국가 간 협력체"]'),
('생물다양성', 'korean', 8, '["다양한 생명체의 풍부함", "생태계 내 종의 다채로운 존재"]'),
('지속가능발전', 'korean', 9, '["미래세대를 고려한 개발", "환경보호와 경제성장의 조화"]'),
('인공지능기술', 'korean', 9, '["기계가 학습하고 판단하는 기술", "컴퓨터가 인간처럼 사고하는 과학"]'),
('양자역학이론', 'korean', 10, '["미시세계를 설명하는 물리학", "원자와 입자의 행동을 다루는 이론"]'),
('문화재보존정책', 'korean', 10, '["역사 유산을 지키는 제도", "전통 문화유산 관리와 보호 방안"]');

-- ===================================================
-- 완료 메시지
-- ===================================================
SELECT COUNT(*) as total_words FROM crossword_words;
SELECT language, COUNT(*) as count FROM crossword_words GROUP BY language;
SELECT difficulty, COUNT(*) as count FROM crossword_words GROUP BY difficulty ORDER BY difficulty;
