# møgua
![image](https://github.com/user-attachments/assets/2b5baf68-b3e3-47f7-a321-466bd26e8274)

## møgua station

> 개발기간: 25.01.03 - 25.02.12

> [FrontEnd Repository](https://github.com/mogua-station/FE)

> [배포 사이트](https://mogua.vercel.app/welcome) 

<br/>

**Frontend**

| <img src="https://github.com/joshuayeyo.png" width="100"> | <img src="https://github.com/Stilllee.png" width="100"> |<img src="https://github.com/ITHPARK.png" width="100"> | <img src="https://github.com/wjsdncl.png" width="100">|
| :-------------------------------------------------------: | :-----------------------------------------------------: |:----------------------------------------------------: |:----------------------------------------------------: |
|          [곽정원](https://github.com/joshuayeyo)            |         [이에스더](https://github.com/Stilllee)           |[박태현](https://github.com/ITHPARK)                     |[정민재](https://github.com/wjsdncl)                    |
|     프론트 배포 <br />  CI-CD <br /> 로그인 <br /> 랜딩페이지     |        유저 페이지 <br /> 프로필 수정 <br /> 리뷰 활동         |찜한 모임 <br /> 모임 상세                                  |메인페이지 <br /> 모임 생성                                 |


<br/>

**Backend & 디자이너**
| <img src="https://avatars.githubusercontent.com/u/192950560?s=48&v=4" width="100"> | <img src="https://avatars.githubusercontent.com/u/192950560?s=48&v=4" width="100"> |
| :--------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------: |
| [김기현](https://github.com/keeff11)                                                 | 김은지                                                                              |
| 백엔드                                                                               | 디자이너                                                                             |

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

<br>

## Stacks

### Environment
[![Environment](https://skillicons.dev/icons?i=vscode,git,github)](https://skillicons.dev)

### Config
[![Config](https://skillicons.dev/icons?i=npm)](https://skillicons.dev)

### Development
<p>
  <img src="https://skillicons.dev/icons?i=react,nextjs,ts,tailwind" />
  <img witdh="48" height="48" src="https://private-user-images.githubusercontent.com/53892427/320696277-542dfd4e-6428-42f9-8fcd-54beaa1c4929.svg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Mzk0Mjk2ODUsIm5iZiI6MTczOTQyOTM4NSwicGF0aCI6Ii81Mzg5MjQyNy8zMjA2OTYyNzctNTQyZGZkNGUtNjQyOC00MmY5LThmY2QtNTRiZWFhMWM0OTI5LnN2Zz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAyMTMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMjEzVDA2NDk0NVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWZmZDY2ZjlmNjMzNjgwNDE2MTQ1ZmM0N2ZiZTUzNjI0YjJjZjI2OWM1ZGFlN2RjNGE3ZTRkZTY0NzI0NWVhYjQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.CsmAdxEYbxz45Y3zC6DrZ2tFmRYA9xOHJI0JCjBnHX8" />
</p>


### Communication

[![Communication](https://skillicons.dev/icons?i=discord,notion)](https://skillicons.dev)

<br>

## 담당 작업
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

<br>

## 신경쓴 기능
### 반응형 스켈레톤 UI를 활용한 로딩 상태 처리

- 유저페이지에서는 사용자 기기의 화면 크기에 따라 적절한 개수의 스켈레톤 UI를 보여주도록 구현했습니다.
- 모바일과 태블릿에서는 3개, 데스크탑에서는 6개의 스켈레톤을 표시하여 자연스러운 레이아웃을 유지하면서도 로딩 중임을 효과적으로 전달합니다.

| 태블릿                                                                               | 데스크탑                                                                             |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| ![](https://github.com/user-attachments/assets/b466040f-2b52-47f8-b848-7ee7a3366919) | ![](https://github.com/user-attachments/assets/c199d5d1-3349-481a-b8b9-2bde5bb477c5) |
