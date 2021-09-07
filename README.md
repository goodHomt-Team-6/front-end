# goodHomt

## 🏋🏻‍♀️ 1. 개요

- 명칭 : goodHomt 굿홈트
- 개발 인원 : 4명
  - Frontend: **박경준, 우지음**
  - Backend: **김영록, 이대성**
- 개발 기간 : 2021.07.23 ~ 2021.08.31
- 주요 기능
  - 운동 루틴 기록 및 운동하기, 운동 루틴 공유, 챌린지, 운동 기록 캘린더
- 개발 언어 : JavaScript
- 개발 라이브러리 : React.js
- URL : https://goodhomt.com (모바일 최적화 UI)
- 구글 플레이스토어 : https://play.google.com/store/apps/details?id=com.goodhomt.twa
- 형상 관리 툴 : git
- 협업 툴 : [notion project board](https://www.notion.so/_6-_goodHomt-24a47662c9b9452882255d64e16d282a)
<br>

## 👉 2. 프로젝트 배경 및 진행방향

- PainPoint : 사용자 10명의 해비유저를 심층적으로 인터뷰하였고 앱을 이용하는 사람은 4명이었고, 운동일기 앱을 사용할 때 가장 중요한 점으로 간결한 UI와 편리성을 꼽았고 나머지 6명은 수기로 쓰는 것이 앱으로 사용하는 것보다 편하다고 대답했습니다. 또한 어플기록에서 중요한 점은 기록을 쉽게보고 비교할 수 있는 캘린더, 목표설정에 용이한 기록 데이터 비교, 운동하기 전에 타이머를 통해 휴식 시간 알림과 총 운동시간을 자동 기록할 수 있는 기능을 요청했습니. 이러한 시장의 니즈를 파악하고 이를 충족시킬 웹 페이지 및 앱을 만들어보았습니다.

<img width="650" alt="스크린샷 2021-09-02 오후 10 36 24" src="https://user-images.githubusercontent.com/77391482/131853349-b1cc1105-b19f-401b-ba50-a3c4d32a1c9c.png">

<img width="650" alt="스크린샷 2021-09-02 오후 8 24 19" src="https://user-images.githubusercontent.com/29696692/131835452-043776ce-36a6-4781-ac08-87a46d122a25.png">
<br>

## ☝🏻 3. 프로젝트 특징

- 배포 : AWS S3, Route 53, CloudFront
- PWA 기반의 앱을 구글 플레이 스토어에 등록

![스크린샷 2021-09-02 오후 1 38 1](https://user-images.githubusercontent.com/29696692/132271725-02671ff8-df6c-478c-adc3-ba3fe2da4065.png)

<br>

## 💻 4. 사용 패키지

* **react-redux**
  - 데이터 전역 관리를 위한 리덕스 관리 패키지
* **styled-components**
  - 컴포넌트의 스타일을 설정하는 패키지
* **axios**
  - 서버 통신을 위한 패키지
* **prettier, eslint**
  - 작업자 간 코드 컨벤션 통일을 위한 패키지
* **sentry**
  - 클라이언트 버그 리포팅
* **lodash**
  - 명료한 자바스크립트 함수 구현위한 패키지
* **redux-persist**
  - 웹 스토리지에 reducer state를 저장하는 패키지
* **slick-carousel**
  - 슬라이더를 구현위한 패키지
* **beautiful-dnd**
  - 드래그앤 드롭 구현위한 패키지

  
<br>


## 🚀 5. 주요 기능 소개

### 1️⃣ 운동 루틴 생성하기
- 운동 종목 선택
- 세트 설정, 휴식 추가 기능
- 운동 순서 변경, 운동 추가 기능
<img width="650" src="https://user-images.githubusercontent.com/77391482/131851049-45eed235-218d-43ef-a347-6190de88fe6b.gif">

### 2️⃣ 운동하기
- 스탑워치 기능으로 운동 시간 카운팅
- 휴식은 자동으로 흘러가는 UI 구성
- 루틴의 모든 세트와 휴식이 끝나면 운동의 만족도 기록
<img width="650" src="https://user-images.githubusercontent.com/77391482/131851302-3064a41f-3bf0-4aaa-9a19-d00f3aa54cf7.gif">

### 3️⃣ 피드에 공유하기
- 나의 운동 기록을 피드에 공유
- 다른 사람이 공유한 피드를 나의 루틴으로 가져와서 운동하기
<img width="650" src="https://user-images.githubusercontent.com/77391482/131851524-826af4ce-3b01-427f-bbb8-06e2653e2fa4.gif">

### 4️⃣ 챌린지로 여러명이서 운동하기
- 챌린지를 통해 다른 사람들과 같은 시간에 함께 운동하는 기능
<img width="650" src="https://user-images.githubusercontent.com/77391482/131851664-46cbf5c3-38c1-410a-a6eb-d4337e2d1f1a.gif">

### 5️⃣ 나의 운동기록 달력에 기록하기
- 달력을 통해 일일 나의 운동기록과 챌린지 기록 확인
- 만족스러웠던 루틴을 다시 가져와서 운동 루틴으로 생성해서 운동하기
<img width="650" src="https://user-images.githubusercontent.com/77391482/131851850-8065eb5a-0327-400e-812a-8bd4e930b37d.gif">
<br>


## 🚀 6. 트러블 슈팅

### 1) 효율적인 에러 핸들링
### 1-1) 문제 상황
- 운동 루틴을 만들고 메인화면에서 바로 재생버튼을 클릭해 이동
- 새로고침을 할 경우 흰 화면이 노출되는 문제

### 1-2) 해결 방안 1 - Error Boundary

- 유저의 에러 이후 상황을 케어
- 홈으로 가도록 유도하여 redux state를 재정돈
<img width="250" src="https://user-images.githubusercontent.com/77391482/131863006-0a9b687e-5a7b-420e-b3e5-6821d053e1fb.png">

### 1-3) 해결 방안 2 - Sentry

- Sentry를 이용해 에러 상황 모니터링
- 예측하기 힘든 여러 에러 케이스들을 수집하고 디버깅에 반영
<img src="https://user-images.githubusercontent.com/77391482/131863630-f6ae8361-230a-4cac-8aee-29c50c3f185c.png">

### 1-4) 해결 방안 3 - Redux-persist

- 위의 2가지 방법 모두 최악의 상황에 대비한 에러처리
- 더 근본적으로 에러가 안날 수 있는 상황을 찾는 것이 해결책이라고 판단
- Redux-persist를 사용하여 로컬 스토리지에 reducer state 저장해 새로고침해도 같은 state를 유지할 수 있게함
<br>

### 2) 데이터를 재가공해서 사용해 DB최적화

- 백엔드에서 DB 최적화를 위해 테이블 join에 제한하였고, 성능과 연관된 문제이므로 프론트에서 api를 조합해서 사용하기로 결정
- '나의 챌린지 데이터' + '챌린지 상세 데이터' -> '챌린지 종목 데이터'로 재가공해서 사용
- 각각 다른 api의 response 형태를 위해 추가 작업 필요 : thunk 함수에 넣을 파라미터 값 다시 재가공 필요


```jsx
const challenge = response.data.result.challenge;
const routine = {
  id: challenge.id,
  routineName: challenge.challengeName,
  routineTime: challenge.runningTime,
  rating: null,
  isBookmarked: false,
  isCompleted: false,
  myExercise: challenge.Challenge_Exercises.map((l, idx) => {
    return { exerciseName: l.exerciseName, set: l.Challenge_Sets };
  }),
  createdAt: challenge.createdAt,
};

dispatch(exerciseActions.addSelectedPrevItem(routine));
```
<br>

### 3) 리렌더링 최소화
- 운동 시간 기록을 위한 스탑워치 : 1초씩 증가할 때마다 액션 발생으로 페이지 리렌더링되는 현상 발생
- 렌더링이 계속 되어야하는 숫자 부분의 컴포넌트 계층구조를 재구성하여 리렌더링 최소화
- 운동 페이지 이탈시에도 스탑워치 렌더링 되는 상황 발생 : 페이지 이탈시 clearInterval을 통해 외부에서 스탑워치가 계속 렌더링을 시도하는 문제 해결

<img width="250" src="https://user-images.githubusercontent.com/77391482/131873717-7e1c8c4c-000f-450b-9495-b962b4a89cbc.gif">

```jsx
const timeRef = useRef(0);
  const [time, setTime] = useState(0);
  const timerId = useRef(null);
  // 스톱워치
  useEffect(() => {
    timerId.current = setInterval(() => {
      if (!timeStop) {
        timeRef.current += 1;
        setTime(timeRef.current);
      } else {
        clearInterval(timerId.current);
        setResultTime(timeRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId.current);
      setResultTime(timeRef.current);
    };
  }, [time.current, timeStop]);
```

<br>

### 4) Redux-persist 적용 후 발생한 에러
- redux-persist를 적용 후, 캘린더에 사용한 moment 객체가 로컬 스토리지에 저장되면서 string으로 저장되고 불러와지는 문제 발생
- JSON 형태로 직렬화하고, 읽은 데이터를 JSON 형태로 역직렬화하여 처음엔 1차 해결 
- 캘린더 페이지는 api를 호출해서 데이터를 가져오는 페이지이므로, redux-persist blacklist에 캘린더 모듈을 추가해주어서 재차 해결
<br>

### 5) 운동 종목 선택
- 운동 종목을 클릭하면 해당 카테고리 목록에서 지워주어야 함
- 자바스크립트의 배열 메소드를 사용했으나, 코드가 길어지는 문제로 lodash 라이브러리로 코드 리팩토링 진행

```jsx
// 선택한 항목이 있을 경우 운동 항목 걸러서 가져오기
let currentExerciseItems = action.payload.exercise;
let currentSelectedItems = state.selectedItems;
let leftOverExerciseItems = _.differenceBy(
  currentExerciseItems,
  currentSelectedItems,
  'id',
);
draft.exercise = leftOverExerciseItems;
```
<br>

### 6) Login 이후 선택한 페이지로 Redirect 경로 설정

- 로그인을 하지 않은 사용자의 경우, 어떤 페이지를 선택했을 때 로그인 창을 띄운 뒤 로그인 이후에 다시 해당 페이지로 이동
- 어떤 경우에는 제대로 경로를 잘 찾아서 가는데 어떤 경우에는 경로를 잘 찾지 못하는 문제가 있었다. Redirect 되는 경로가 설정되어있었으나 2가지 경우에 밖에 대응하지못해서 에러가 났던 문제가 있었다. 그래서 한번 확실하게 Redirect를 못시키는 경우가 없도록 해야했다.

```jsx
// /exercise로 갈때는 initializeRoutine 로직이 들어있어서 첫 로그인 하면서 이동할때도 적용
if (sessionStorage.getItem('redirect_url') === '/exercise') {
  dispatch(exerciseActions.initializeRoutine());
}

if (sessionStorage.getItem('redirect_url')) {
  history.replace(sessionStorage.getItem('redirect_url'));
  sessionStorage.removeItem('redirect_url');
} else {
  history.replace('/');
}
dispatch(isLoaded(false));
}
```
<br>

## 🚀 7. UI/UX 개선

- goodHomt 앱이 런칭되고 헤비유저들을 직접 만나 심층 인터뷰를 나눴다. 실제 만나서 얘기해본 유저들의 생각은 기획 시에 예상했던 부분과 다른 점이 많았다. 유저들이 필요로 하는 정보와 편하게 생각하는 UI는 따로 있었고, 그러한 부분들을 반영하는 작업을 진행했다. 좀 더 유저친화적인 UI/UX 구성으로 변화를 주었다.

<img width="919" alt="스크린샷 2021-09-07 오전 10 49 20" src="https://user-images.githubusercontent.com/29696692/132272027-9a6c266a-3bff-4ce6-b9b3-a1ef7afe3c0f.png">

- 운동의 횟수와 세트를 결정하는 UI가 사용성을 결정하는 중요한 요소라고 생각했고, 여러 와이어프레임의 시안들 중에 최종적으로 가장 깔끔하면서도 직관적인 UI를 선택해서 최종안으로 결정했다.

<img width="648" alt="스크린샷 2021-09-07 오전 10 51 48" src="https://user-images.githubusercontent.com/29696692/132272198-445058a9-4a3b-4ae9-9962-067bd6257d3c.png">
