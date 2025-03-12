# møgua

![image](https://github.com/user-attachments/assets/2b5baf68-b3e3-47f7-a321-466bd26e8274)

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

## Stacks
### Development

<p>
  <img src="https://skillicons.dev/icons?i=react,nextjs,ts,tailwind" />
  <img witdh="48" height="48" src="https://i.ibb.co/fY9ht9zM/react-query.png" />
</p>

<br>

## 주요 작업

### 1. 백엔드 협업 및 네트워크 인프라

#### 1.1 API 명세서 설계

명확한 API 명세서를 직접 설계하고 백엔드 개발자와 지속적인 피드백을 주고 받으며 효율적인 협업 환경 구축

**예시**
| API URL, 파라미터 및 응답 구조 | 작성가능한 리뷰 데이터 구조 | 작성한 리뷰 데이터 구조 |
| ------------------------------ | --------------------------- | ----------------------- |
| ![](https://i.ibb.co/jP2RqpnD/2025-03-12-5-50-38.png) | ![](https://i.ibb.co/8Lxx9Rr4/2025-03-12-6-01-51.png) | ![](https://i.ibb.co/p6S2DL3b/2025-03-12-6-02-12.png) |

#### 1.2 커스텀 fetch 모듈: [fetcher.ts](https://github.com/Stilllee/mogua-fe/blob/main/src/lib/user/fetcher.ts)

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

#### 1.3 전역 에러 처리: [error.tsx](https://github.com/mogua-station/FE/blob/Production/src/app/error.tsx)

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

<br>

### 2. 데이터 관리 전략

### 3. 코드 품질 및 리팩토링

<br>

## 담당 작업 상세

### 유저 페이지

#### 복잡한 데이터 구조

프로필 정보와 4가지 활동 탭(`내 모임`/`내 리뷰`/`만든 모임`/`수강평`)으로 구성

#### 효율적인 데이터 로딩

React Query와 무한 스크롤을 통한 최적화된 데이터 fetching

- 데이터는 10개씩 무한 스크롤로 자동 로딩되며, 로딩 중에는 반응형 스켈레톤 UI 제공
- 데이터 캐싱(10분)을 통해 탭 전환 시 불필요한 API 호출 감소

| 마이페이지 (일반유저)                                                                | 다른 유저페이지 (과외선생님)                                                         |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| ![](https://github.com/user-attachments/assets/c9ce5dba-ad7e-4e0f-977f-6153235226c7) | ![](https://github.com/user-attachments/assets/6dcd5fa3-eefa-4562-9c52-b75a8738b221) |

### 유저 프로필 수정 페이지

#### 폼 상태 관리

기존 정보를 기본값으로 설정하고 변경사항을 실시간으로 감지

#### 이미지 처리

프로필 이미지 미리보기 및 IndexedDB를 활용한 상태 유지

#### 유효성 검증

변경사항이 없거나 유효하지 않은 값이 있을 때 수정 제한

#### 사용자 경험 개선

페이지 이탈 시 확인 모달로 실수 방지

![](https://github.com/user-attachments/assets/fc4fd5d0-7813-4150-bbbc-4ae071b2016c)

### 리뷰 작성/수정 및 삭제

#### 3단계 평점 시스템

직관적인 평가 UI (그냥 그래요/괜찮아요/추천해요)

#### 실시간 UI 업데이트

React Query의 낙관적 업데이트를 활용하며 작성/수정/삭제 시 즉각적인 UI 반영

#### 폼 상태 관리

필수 항목 검증 및 기존 데이터 자동 로딩

#### 사용자 경험 개선

작업 전 확인 모달을 통한 실수 방지

| 리뷰 작성                                                                            | 리뷰 수정                                                                            |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| ![](https://github.com/user-attachments/assets/59d67797-8f15-4f61-82f6-4fcc896eda06) | ![](https://github.com/user-attachments/assets/a05c1390-6cc0-46c6-ab34-abd07111e5ee) |

| 리뷰 삭제  
 ![](https://github.com/user-attachments/assets/dd67c768-1c2b-4306-8be0-cc779fcd2d38)

<br>

## 신경쓴 기능

### 반응형 스켈레톤 UI를 활용한 로딩 상태 처리

- 유저페이지에서는 사용자 기기의 화면 크기에 따라 적절한 개수의 스켈레톤 UI를 보여주도록 구현했습니다.
- 모바일과 태블릿에서는 3개, 데스크탑에서는 6개의 스켈레톤을 표시하여 자연스러운 레이아웃을 유지하면서도 로딩 중임을 효과적으로 전달합니다.

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
