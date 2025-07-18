# LOL-Persona

리그 오브 레전드 사용자의 챔피언 숙련도를 기반으로 게임 성향과 페르소나를 분석해주는 웹 애플리케이션입니다.

## 🎮 주요 기능

- **챔피언 숙련도 분석**: Riot API를 통해 사용자의 챔피언 숙련도 데이터 수집
- **AI 기반 페르소나 분석**: Google Gemini AI를 활용한 게임 성향 및 성격 분석
- **다국어 지원**: 한국어/영어 지원 (next-intl)
- **반응형 디자인**: 모바일부터 데스크탑까지 최적화된 UI

## 🛠 기술 스택

### Frontend
- **Next.js 14** - App Router 사용
- **React 18** - 사용자 인터페이스
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 스타일링
- **Framer Motion** - 애니메이션

### Backend & API
- **Riot Games API** - 게임 데이터 수집
- **Google Gemini AI** - AI 기반 분석
- **Supabase** - 데이터베이스 및 인증

### 상태 관리 & 유틸리티
- **Zustand** - 전역 상태 관리
- **TanStack Query** - 서버 상태 관리
- **next-intl** - 국제화

## 📁 프로젝트 구조

```
lol-persona/
├── src/
│   ├── app/
│   │   └── [locale]/
│   │       ├── (site)/          # 메인 페이지
│   │       └── result/[id]/     # 분석 결과 페이지
│   ├── i18n.ts                  # 국제화 설정
│   └── middleware.ts            # 미들웨어
├── components/
│   ├── ui/                      # 재사용 가능한 UI 컴포넌트
│   ├── champMasteryUI.jsx       # 챔피언 숙련도 UI
│   ├── localeSwitcher.jsx       # 언어 전환기
│   └── ...
├── lib/
│   ├── riotApi.ts              # Riot API 함수
│   ├── geminiApi.ts            # Gemini AI API 함수
│   ├── constant.ts             # 상수 정의
│   └── utils.ts                # 유틸리티 함수
├── hooks/
│   └── useUIState.js           # UI 상태 관리 훅
├── messages/
│   ├── en.json                 # 영어 번역
│   └── kr.json                 # 한국어 번역
└── types/
    └── supabase.ts             # Supabase 타입 정의
```

## 🚀 시작하기

### 필수 조건
- Node.js 18+
- npm 또는 yarn

### 환경 변수 설정
```env
LOL_API_KEY=your_riot_api_key
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 설치 및 실행
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 🌍 지원 지역

- **한국 (KR)**
- **북미 (NA1)**
- **유럽 서부 (EUW1)**
- **유럽 북동부 (EUNE1)**
- **브라질 (BR1)**
- **라틴 아메리카 (LA1, LA2)**
- **오세아니아 (OC1)**
- **러시아 (RU)**
- **터키 (TR1)**
- **일본 (JP1)**
- **동남아시아 (SG2, TH2, TW2, VN2)**
- **필리핀 (PH2)**

## 📱 사용 방법

1. 메인 페이지에서 지역 선택
2. 게임 닉네임 + 태그 입력 (예: SummonerName#KR1)
3. 분석 버튼 클릭
4. AI가 분석한 게임 성향 및 페르소나 확인

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.