# goodHomt

## 🏋🏻‍♀️ 개요

- 명칭 : goodHomt 굿홈트
- 개발 인원 : 4명
  - Frontend: **박경준, 우지음**
  - Backend: **김영록, 이대성**
- 개발 기간 : 2021.07.23 ~ 2021.08.31
- 주요 기능
  - 운동 루틴 기록 및 운동하기, 운동 루틴 공유, 챌린지, 운동 기록 캘린더
- 개발 언어 : JavaScript
- 개발 라이브러리 : React.js
- URL : https://goodhomt.com
- 구글 플레이스토어 : https://play.google.com/store/apps/details?id=com.goodhomt.twa
- 형상 관리 툴 : git
- 협업 툴 : [notion](https://www.notion.so/_6-_goodHomt-24a47662c9b9452882255d64e16d282a)

## 👉 프로젝트 배경 및 진행방향

- PainPoint : 사용자 10명의 해비유저를 심층적으로 인터뷰하였고 앱을 이용하는 사람은 4명이었고, 운동일기 앱을 사용할 때 가장 중요한 점으로 간결한 UI와 편리성을 꼽았고 나머지 6명은 수기로 쓰는 것이 앱으로 사용하는 것보다 편하다고 대답했습니다. 또한 어플기록에서 중요한 점은 기록을 쉽게보고 비교할 수 있는 캘린더, 목표설정에 용이한 기록 데이터 비교, 운동하기 전에 타이머를 통해 휴식 시간 알림과 총 운동시간을 자동 기록할 수 있는 기능을 요청했습니. 이러한 시장의 니즈를 파악하고 이를 충족시킬 웹 페이지 및 앱을 만들어보았습니다.

<img width="1464" alt="스크린샷 2021-09-02 오후 10 36 24" src="https://user-images.githubusercontent.com/77391482/131853349-b1cc1105-b19f-401b-ba50-a3c4d32a1c9c.png">

<img width="850" alt="스크린샷 2021-09-02 오후 8 24 19" src="https://user-images.githubusercontent.com/29696692/131835452-043776ce-36a6-4781-ac08-87a46d122a25.png">

## ☝🏻 프로젝트 특징

- 배포 : AWS S3, Route 53, CloudFront
- PWA 기반의 앱을 구글 플레이 스토어에 등록


## 💻 사용 패키지

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
  - 자바스크립트 유틸리티 패키지
* **redux-persist**
  - 웹 스토리지에 reducer state를 저장



## 🚀 주요 기능 소개

### 운동 루틴 생성하기
- 운동 종목 선택
- 세트 설정, 휴식 추가 기능
- 운동 순서 변경, 운동 추가 기능
<img src="https://user-images.githubusercontent.com/77391482/131851049-45eed235-218d-43ef-a347-6190de88fe6b.gif">

### 운동하기
- 스탑워치 기능으로 운동 시간 카운팅
- 휴식은 자동으로 흘러가는 UI 구성
- 루틴의 모든 세트와 휴식이 끝나면 운동의 만족도 기록
<img src="https://user-images.githubusercontent.com/77391482/131851302-3064a41f-3bf0-4aaa-9a19-d00f3aa54cf7.gif">

### 피드에 공유하기
- 나의 운동 기록을 피드에 공유
- 다른 사람이 공유한 피드를 나의 루틴으로 가져와서 운동하기
<img src="https://user-images.githubusercontent.com/77391482/131851524-826af4ce-3b01-427f-bbb8-06e2653e2fa4.gif">

### 챌린지로 여러명이서 운동하기
- 챌린지를 통해 다른 사람들과 같은 시간에 함께 운동하는 기능
<img src="https://user-images.githubusercontent.com/77391482/131851664-46cbf5c3-38c1-410a-a6eb-d4337e2d1f1a.gif">

### 나의 운동기록 달력에 기록하기
- 달력을 통해 일일 나의 운동기록과 챌린지 기록 확인
- 만족스러웠던 루틴을 다시 가져와서 운동 루틴으로 생성해서 운동하기
<img src="https://user-images.githubusercontent.com/77391482/131851850-8065eb5a-0327-400e-812a-8bd4e930b37d.gif">



## 🚀 핵심 트러블 슈팅

### 효율적인 에러 핸들링
1. 에러가 날 수 있는 상황
- 운동 루틴을 만들고 메인화면에서 바로 재생버튼을 클릭해 이동
- 새로고침을 할 경우 흰 화면이 노출되는 문제

1-1. 해결 1 
- Error Boundary
- 유저의 에러 이후 상황을 케어
- 홈으로 가도록 유도하여 redux state를 재정돈
<img src="https://user-images.githubusercontent.com/77391482/131863006-0a9b687e-5a7b-420e-b3e5-6821d053e1fb.png">

1-2. 해결 2
- Sentry
- 에러 상황 모니터링
- 예측하기 힘든 여러 에러 케이스들을 수집하고 디버깅에 반영
<img src="https://user-images.githubusercontent.com/77391482/131863630-f6ae8361-230a-4cac-8aee-29c50c3f185c.png">

1-3. 해결 3
- Redux-persist
- 로컬 스토리지에 reducer state 저장해 새로고침해도 같은 state를 유지할 수 있게함


### 데이터를 재가공해서 사용해 DB최적화
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

### 렌더링 최소화
- 스탑워치 : 1초씩 증가할 때마다 페이지 리렌더링
- 숫자 부분만 자식 컴포넌트로 빼서 해당 컴포넌트만 리렌더링되도록 최적화 
- 
<img src="https://user-images.githubusercontent.com/77391482/131873717-7e1c8c4c-000f-450b-9495-b962b4a89cbc.gif">

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

### 운동 종목 선택
- 운동 종목을 클릭하면 해당 카테고리 목록에서 지워주기
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

- 생각해낸 아이디어 : 오늘 날짜와 선택한 날짜가 다르면 모달창을 닫아주기.
- date가 변경될때만 setShowCalendar를 동작해줘야 함.
- 그냥 렌더 시에 동작시키면 무한 렌더링에 빠짐. (렌더 완료 -> showCalendar false set -> 재렌더 -> showCalendar false set)

```jsx
useEffect(() => {
  if (
    format(date, "yyyy.MM.dd", { locale: enGB }) !==
    format(today, "yyyy.MM.dd", { locale: enGB })
  ) {
    setShowCalendar(false);
    return;
  }
}, [date]);
```

- 단순히 date가 변경될때 그냥 모달창을 닫아주면 코드를 간소화할 수 있다.

```jsx
useEffect(() => {
  setShowCalendar(false);
}, [date]);
```

### input의 기본값이 남아있는 문제

<img src="https://images.velog.io/images/uvula6921/post/dd1bb896-f041-437c-a97b-4f6c3f9a721a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-07-20%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2011.49.44.png">

- 위 이미지처럼 값을 안넣어도 0이 input 안에 들어있었음.
- "" 빈칸으로 값이 들어가면 input 안에서는 상호 환산 과정에서 0으로 바뀌는 문제.
- 0이 들어가는 작업의 내용은 평과 제곱미터를 하나라도 입력하면 상호 변환이 되도록 해야하는 작업.

- useEffect로 값을 불러오면 최초 state 생성때 한번 값을 불러오기 때문에 input value가 처음부터 0으로 설정되어있음 -> 0도 없애고 싶었음
- 그래서 useEffect는 사용하기를 포기.

```jsx
useEffect(() => {
  if (!pyeongInput.current.value) {
    pyeongInput.current.value = "1";
  } else {
    pyeongInput.current.value = m_square / 3.306;
  }
}, [m_square]);

useEffect(() => {
  mSquareInput.current.value = pyeong * 3.306;
}, [pyeong]);
```

- input 값이 변할때마다 함수를 불러오기로 함.
- input 값을 지웠을때는 또 0으로 설정이 되기때문에 강제로 "" 빈칸으로 되도록 조건 분기함.

```jsx
const calcPyeong = (value) => {
  if (value) {
    pyeongInput.current.value = value / 3.306;
  } else {
    pyeongInput.current.value = "";
  }
};

const calcMSquare = (value) => {
  if (value) {
    mSquareInput.current.value = value * 3.306;
    setM_square(value * 3.306);
  } else {
    mSquareInput.current.value = "";
  }
};

...

<input
  ...
  onInput={(e) => {
    e.target.value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
    setPyeong(e.target.value);
    calcMSquare(e.target.value);
  }}
  ref={pyeongInput}
  />
<input
  ...
  onInput={(e) => {
    e.target.value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
    setM_square(e.target.value);
    calcPyeong(e.target.value);
  }}
  ref={mSquareInput}
  />
```
