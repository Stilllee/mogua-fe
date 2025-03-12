# møgua

![image](https://github.com/user-attachments/assets/2b5baf68-b3e3-47f7-a321-466bd26e8274)

## 목차

- [프로젝트 소개](#møgua-station)
- [팀 구성](#frontend)
- [기술 스택](#기술-스택)
- [담당 페이지 소개](#담당-페이지-소개)
- [데모 영상](#데모-영상)
- [주요 작업](#주요-작업)
  - [1. API 통신](#1-api-통신)
    - [1.1 API 명세서 설계](#11-api-명세서-설계)
    - [1.2 커스텀 fetch 모듈 개발](#12-커스텀-fetch-모듈-개발)
  - [2. 데이터 관리 전략](#2-데이터-관리-전략)
    - [2.1 복잡한 구조의 탭 데이터 관리](#21-복잡한-구조의-탭-데이터-관리)
    - [2.2 데이터 동기화](#22-데이터-동기화)
    - [2.3 무한 스크롤 구현](#23-무한-스크롤-구현)
  - [3. 사용자 경험](#3-사용자-경험)
    - [3.1 전역 에러 처리](#32-전역-에러-처리)
    - [3.2 반응형 스켈레톤 UI](#32-반응형-스켈레톤-ui)
- [시작 가이드](#시작-가이드)

## møgua station

> 개발기간: 25.01.03 - 25.02.12

> [FrontEnd Repository](https://github.com/mogua-station/FE)

> [배포 사이트](https://mogua.vercel.app/welcome)

<br/>

**Frontend**

| <img src="https://github.com/joshuayeyo.png" width="100"> | <img src="https://github.com/Stilllee.png" width="100"> | <img src="https://github.com/ITHPARK.png" width="100"> | <img src="https://github.com/wjsdncl.png" width="100"> |
| :-------------------------------------------------------: | :-----------------------------------------------------: | :----------------------------------------------------: | :----------------------------------------------------: |
|          [곽정원](https://github.com/joshuayeyo)          |         [이에스더](https://github.com/Stilllee)         |          [박태현](https://github.com/ITHPARK)          |          [정민재](https://github.com/wjsdncl)          |
| 프론트 배포 <br /> CI-CD <br /> 로그인 <br /> 랜딩페이지  |     유저 페이지 <br /> 프로필 수정 <br /> 리뷰 활동     |               찜한 모임 <br /> 모임 상세               |              메인페이지 <br /> 모임 생성               |

<br/>

**Backend & 디자이너**
| <img src="https://avatars.githubusercontent.com/u/192950560?s=48&v=4" width="100"> | <img src="https://avatars.githubusercontent.com/u/192950560?s=48&v=4" width="100"> |
| :--------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------: |
| [김기현](https://github.com/keeff11) | 김은지 |
| 백엔드 | 디자이너 |

<br>

## 기술 스택

<p>
  <img src="https://skillicons.dev/icons?i=react,nextjs,ts,tailwind" />
  <img witdh="48" height="48" src="https://i.ibb.co/fY9ht9zM/react-query.png" />
</p>

<br>

## 담당 페이지 소개

<details>
<summary>페이지 상세 설명 보기</summary>

<div markdown="1">

### 유저 페이지

- 프로필 정보와 4가지 활동 탭(`내 모임`/`내 리뷰`/`만든 모임`/`수강평`)으로 구성되어 있습니다.
  - 내 모임: 참여 중인 스터디/과외 목록
  - 내 리뷰: 스터디/과외별로 구분되며, 각각 '작성 가능한 리뷰'와 '작성한 리뷰' 목록 제공
  - 만든 모임: 생성한 스터디/과외 목록
  - 수강평: 과외선생님이 생성한 과외에 대한 리뷰 목록
- 데이터는 10개씩 무한 스크롤로 자동 로딩되며, 로딩 중에는 스켈레톤 UI를 보여줍니다.
- 페이지 진입 시 새로운 데이터를 요청하고, 이후 10분간은 탭 전환 시에도 캐시된 데이터를 바로 확인할 수 있습니다.
- 본인 페이지에서만 프로필 수정과 리뷰 관리가 가능합니다.
- `과외선생님`은 수강평 탭이 추가로 제공됩니다.

| 마이페이지 (일반유저)                                                                | 다른 유저페이지 (과외선생님)                                                         |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| ![](https://github.com/user-attachments/assets/c9ce5dba-ad7e-4e0f-977f-6153235226c7) | ![](https://github.com/user-attachments/assets/6dcd5fa3-eefa-4562-9c52-b75a8738b221) |

### 유저 프로필 수정 페이지

- 기존 정보(`닉네임`, `이메일`, `자기소개`, `태그`)가 기본값으로 표시되며, 이메일을 제외한 모든 정보를 수정할 수 있습니다.
- 프로필 이미지는 선택 즉시 미리보기로 확인되며, IndexedDB를 활용해 새로고침해도 유지됩니다.
- 변경사항이 없거나 유효하지 않은 값이 있으면 수정이 제한됩니다.
- 페이지 이탈 시 확인 모달이 표시되어 실수를 방지합니다.

![](https://github.com/user-attachments/assets/fc4fd5d0-7813-4150-bbbc-4ae071b2016c)

### 리뷰 작성/수정

- 3단계 평점 시스템(그냥 그래요/괜찮아요/추천해요)으로 평가합니다.
- 평점과 리뷰 내용은 필수로 입력해야 하며, 사진은 1장까지 선택적으로 첨부할 수 있습니다.
- 수정 시에는 기존 리뷰 정보가 기본값으로 표시되며, 변경사항이 있어야만 수정이 가능합니다.
- 작성/수정 완료 시 유저 페이지의 리뷰 목록이 자동으로 업데이트됩니다.

| 리뷰 작성                                                                            | 리뷰 수정                                                                            |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| ![](https://github.com/user-attachments/assets/59d67797-8f15-4f61-82f6-4fcc896eda06) | ![](https://github.com/user-attachments/assets/a05c1390-6cc0-46c6-ab34-abd07111e5ee) |

### 리뷰 삭제

- 유저 페이지에서 더보기 메뉴를 통해 즉시 삭제할 수 있습니다.
- 삭제 전 확인 모달을 통해 실수를 방지합니다.
- 삭제 즉시 리뷰 목록에서 제거되며, 관련 데이터가 자동으로 업데이트됩니다.

![](https://github.com/user-attachments/assets/dd67c768-1c2b-4306-8be0-cc779fcd2d38)

</div>

</details>

<br>

## 데모 영상
[![](https://github.com/user-attachments/assets/a09f7823-0416-4bdd-a2c7-60f445d4d459)](https://youtube.com/shorts/x_3VGVIGzhw?feature=share)

<br>

## 주요 작업

### 1. API 통신

#### 1.1 API 명세서 설계

명확한 API 명세서를 직접 설계하고 백엔드 개발자와 지속적인 피드백을 주고 받으며 효율적인 협업 환경 구축

**예시**
| API URL, 파라미터 및 응답 구조 | 작성가능한 리뷰 데이터 구조 | 작성한 리뷰 데이터 구조 |
| ------------------------------ | --------------------------- | ----------------------- |
| ![](https://i.ibb.co/jP2RqpnD/2025-03-12-5-50-38.png) | ![](https://i.ibb.co/8Lxx9Rr4/2025-03-12-6-01-51.png) | ![](https://i.ibb.co/p6S2DL3b/2025-03-12-6-02-12.png) |

#### 1.2 커스텀 fetch 모듈 개발

[fetcher.ts](https://github.com/Stilllee/mogua-fe/blob/main/src/lib/user/fetcher.ts)

Next.js와 fetch의 캐싱 옵션을 최대한 활용하기 위해 axios 대신 fetch API를 기반으로 한 재사용 가능한 모듈 개발

```ts
// fetcher.ts 핵심 부분

async function fetcher(url: string, method = "GET", data, options = {}) {
  const config = {
    ...options,
    method,
    credentials: "include",
    headers: {
      // FormData 처리
      ...(data instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...options.headers,
    },
    // 요청 바디 설정
    ...(data && {
      body: data instanceof FormData ? data : JSON.stringify(data),
    }),
  };

  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, config);
}

// HTTP 메소드별 간편 함수
export const get = (url, options) => fetcher(url, "GET", undefined, options);
export const post = (url, data, options) => fetcher(url, "POST", data, options);
export const patch = (url, data, options) =>
  fetcher(url, "PATCH", data, options);
export const del = (url, options) => fetcher(url, "DELETE", undefined, options);
```

<br>

### 2. 데이터 관리 전략

#### 2.1 복잡한 구조의 탭 데이터 관리

[useInfiniteMeetings.ts](https://github.com/Stilllee/mogua-fe/blob/main/src/hooks/useInfiniteMeetings.ts)

```ts
const { data: 탭별데이터 } = useInfiniteQuery({
  queryKey: ["탭이름", ...필터상태],
  queryFn: ({ pageParam = 1 }) =>
    fetchTabData({ type: 모임타입, page: pageParam, ...필터상태 }),
  getNextPageParam: (lastPage) =>
    lastPage.isLast ? undefined : lastPage.nextPage,
  staleTime: 1000 * 60 * 10,
});
```

- `queryKey`에 탭과 필터 상태를 포함시켜 각 조건별 데이터를 독립적으로 캐싱
- 동일한 탭과 필터 조합 재방문 시에는 `staleTime`동안 캐시된 데이터를 사용하여 불필요한 API 호출을 방지

#### 2.2 데이터 동기화

```ts
const { mutate: deleteReview } = useMutation({
  mutationFn: (reviewId: number) => deleteReviewRequest(reviewId),
  onSuccess: () => {
    // 리뷰 삭제 시 연관된 데이터 자동 갱신
    queryClient.invalidateQueries({
      queryKey: ["reviews"],
    });
  },
});
```

- `useMutation`의 `onSuccess` 콜백에서 `invalidateQueries`로 관련 쿼리들을 무효화하여 최신 데이터로 자동 갱신

#### 2.3 무한 스크롤 구현

```ts
// Intersection Observer로 스크롤 감지
const { ref } = useInView({
  onChange: (inView) => {
    // 요소가 화면에 보이고, 다음 페이지가 있으며, 현재 요청 중이 아닐 때
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage(); // 다음 페이지 데이터 요청
    }
  },
});

// 마지막 요소에 ref 연결
<li ref={isLastItem ? ref : undefined}>
  <Card />
</li>
```

- `react-intersection-observer`의 `useInView`로 스크롤을 감지하고, 마지막 아이템이 뷰포트에 진입 시 다음 페이지 데이터를 요청

<br>

### 3. 사용자 경험

#### 3.1 전역 에러 처리

[error.tsx](https://github.com/mogua-station/FE/blob/Production/src/app/error.tsx)

Next.js의 error.tsx를 활용한 일관된 에러 UI 제공

```tsx
// error.tsx

export default function Error({ error }: ErrorProps) {
  const router = useRouter();

  return (
    <div className='flex h-full flex-1 flex-col items-center justify-center gap-4'>
      <p className='text-gray-100'>
        // 프론트에서 처리한 에러 메시지 또는 기본 메시지 표시
        {error?.message || "오류가 발생했습니다."}
      </p>

      <SolidButton
        className='w-fit'
        size='small'
        onClick={() => router.replace("/")}
      >
        홈으로 돌아가기
      </SolidButton>
    </div>
  );
}
```

<details>
<summary>활용 예시</summary>
  
<div markdown="1">

```typescript
// /user/[id]/page.tsx

const userInfo = await getUserProfile(userId, { cache: "no-store" });
```

```typescript
// getUserProfile.ts

export async function getUserProfile(userId: string, options?: RequestInit) {
  const res = await fetcher(`/user/profile/${userId}`, "", { ...options });
  const { data, message } = await res.json();

  if (!res.ok) {
    // 디버깅을 위한 상세 에러 로깅
    console.error("사용자 프로필 조회 실패:", {
      url: `/user/profile/${userId}`,
      status: res.status,
      errorMessage: message,
    });

    // 사용자 친화적인 에러 메시지 표시
    throw new Error(message || "유저 프로필을 불러오는데 실패했습니다.");
  }

  return data as UserProfile;
}
```

</div>

<img src="https://private-user-images.githubusercontent.com/108785772/410378674-e0e70aab-41c2-4018-a886-2e587cb6790c.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDE3NzAwOTYsIm5iZiI6MTc0MTc2OTc5NiwicGF0aCI6Ii8xMDg3ODU3NzIvNDEwMzc4Njc0LWUwZTcwYWFiLTQxYzItNDAxOC1hODg2LTJlNTg3Y2I2NzkwYy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwMzEyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDMxMlQwODU2MzZaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT03OTA0ZjQ5NmRkMWM1YzA2MDZkODJjZjNiNTBkMzIxZGVjN2EzM2U3Y2EwZDM3ODljYTIyZjRlZGVjMzVjZDIxJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.l0SITeGIV18b9sI3M4MMHl5ql_THBunxGuuxyn5n-e4" />
<img src="https://private-user-images.githubusercontent.com/108785772/410382093-418bfb42-85f1-42e1-a0b8-9ab533b0c333.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDE3NzAwOTYsIm5iZiI6MTc0MTc2OTc5NiwicGF0aCI6Ii8xMDg3ODU3NzIvNDEwMzgyMDkzLTQxOGJmYjQyLTg1ZjEtNDJlMS1hMGI4LTlhYjUzM2IwYzMzMy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwMzEyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDMxMlQwODU2MzZaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0wZGU2YWUxNTE1OWU5YWZkYTg1ZDJjMWE3NTc2ZjVkZTg4NGJiMGEwZGRhZjAyNDJjZjEyNWVmOGU1OGU0OTUxJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.4p2SUylkvr-_a4Lwj840ijpxD_bHIfeq3Apvp1eFzZI" />
</details>

#### 3.2 반응형 스켈레톤 UI

디바이스 화면 크기에 따라 최적화된 개수의 스켈레톤 UI 제공

| 태블릿                                                                               | 데스크탑                                                                             |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| ![](https://github.com/user-attachments/assets/b466040f-2b52-47f8-b848-7ee7a3366919) | ![](https://github.com/user-attachments/assets/c199d5d1-3349-481a-b8b9-2bde5bb477c5) |

<br>

## 시작 가이드

### Requirements

- Node.js v20.10.0 or higher
- React v18 or higher

### Installation

```bash
$ git clone https://github.com/mogua-station/fe.git
$ cd fe
$ npm i
$ npm run dev
```
