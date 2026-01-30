# Artshaker - Street Dance Battle Scoreboard Blueprint

## Overview
Artshaker는 스트릿 댄스 배틀을 위한 디지털 스코어보드로 설계된 웹 기반 애플리케이션입니다. 기존의 수동 점수 기록 방식을 대체하여, 이벤트에서 시각적으로 매력적이고 역동적인 디지털 인터페이스를 제공합니다. 이 앱은 라운드 추적, 심사위원 투표, 실시간 결과 표시에 중점을 둡니다.

## Project Structure & Tech Stack
-   **프레임워크:** Next.js (App Router)
-   **스타일링:** Tailwind CSS (`src/app/globals.css`를 통해 구성), `tailwind.config.ts`를 통해 사용자 정의 색상 및 애니메이션 추가
-   **언어:** TypeScript
-   **상태 관리:** React 로컬 상태 (초기)
-   **디자인 철학:** "스트릿 & 하이프" - 높은 대비, 네온 악센트, 볼드한 타이포그래피, 기본 다크 모드.

## Features

### Phase 1: Core Scoreboard (현재 목표)
1.  **배틀 설정 화면 (`BattleSetup.tsx`):**
    -   "레드 팀" (댄서/크루 이름) 입력.
    -   "블루 팀" (댄서/크루 이름) 입력.
    -   심사위원 수 (예: 3명 또는 5명) 입력.
    -   총 라운드 수 (예: 1, 3, 또는 무제한) 입력.

2.  **라이브 배틀 인터페이스 (`BattleArena.tsx`):**
    -   **ScoreHeader 통합:** 사용자 제공 코드를 기반으로 한 고급 헤더 컴포넌트 (`ScoreHeader.tsx`) 통합.
        -   로고 및 팀 이미지 업로드 기능.
        -   팀 이름 인라인 편집 기능.
        -   실시간 팀 점수 및 승자 표시.
        -   "ORIGINALITY 25TH X LOCK'N'LOL 20TH ANNIVERSARY", "LOCK STEADY PARTY", "5:5 팀 배틀"과 같은 이벤트 특정 텍스트 포함.
    -   **라운드 표시:** 현재 라운드를 크게 표시.
    -   **심사위원 입력:** 각 심사위원이 투표(레드 / 무승부 / 블루)할 수 있는 대화형 버튼.
    -   **점수 공개:** 드라마틱하게 투표 결과를 공개하는 "결과 보기" 트리거.
    -   **승리 카운터:** 각 팀이 승리한 라운드 수를 자동으로 추적.
    -   **배틀 종료 및 리셋:** 배틀 종료 시 최종 승자 표시 및 새 배틀 시작 버튼 제공.

3.  **시각 및 사용자 경험:**
    -   반응형 디자인 (심사위원/MC를 위한 태블릿/노트북에서 작동).
    -   투표 공개 및 라운드 승자 발표를 위한 애니메이션 (ScoreHeader의 shimmer 효과 포함).
    -   새로운 Tailwind 사용자 정의 색상 (accent-yellow, card, border, input, team-a, team-b, muted-foreground, secondary) 적용.

## Development Plan (Current Session)
1.  **설정 및 정리:** 기본 Next.js 보일러플레이트 정리.
2.  **컴포넌트 아키텍처:**
    -   `BattleSetup`: 배틀 상태를 초기화하는 폼.
    -   `BattleArena` (구 `ScoreBoard`): `ScoreHeader`를 포함하고 나머지 배틀 로직을 관리하는 메인 뷰.
    -   `ScoreHeader`: 팀 정보, 점수, 이미지 등을 표시하는 고급 헤더 컴포넌트 (사용자 제공 코드를 기반으로 생성).
3.  **구현:** 설정 모드와 배틀 모드 사이를 전환하는 메인 페이지 (`src/app/page.tsx`) 구축 및 `BattleArena`에 `ScoreHeader` 통합.
4.  **한글화:** 모든 사용자 인터페이스 텍스트를 한국어로 번역 완료.
5.  **새로운 의존성 및 설정:**
    -   `lucide-react`, `clsx`, `tailwind-merge` 설치.
    -   `src/lib/utils.ts`에 `cn` 유틸리티 함수 생성.
    -   `tailwind.config.ts`에 `ScoreHeader`에 필요한 사용자 정의 Tailwind 색상 및 애니메이션 정의.
