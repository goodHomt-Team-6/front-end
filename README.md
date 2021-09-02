# goodHomt

## 🏋🏻‍♀️ 개요

- 명칭 : goodHomt
- 개발 인원 : 4명
  - Front end: **박경준, 우지음**
  - Back end: **김영록, 이대성**
- 개발 기간 : 2021.07.23 ~ 2021.08.31
- 주요 기능
  - 운동 루틴 기록 및 운동하기, 운동 루틴 공유, 챌린지, 운동 기록 캘린더
- 개발 언어 : JavaScript
- 개발 라이브러리 : React.js
- URL : https://goodhomt.com
- 형상 관리 툴 : git
- 협업 툴 : [notion](https://www.notion.so/_6-_goodHomt-24a47662c9b9452882255d64e16d282a)

## 👉 프로젝트 배경 및 진행방향

- PainPoint : 사용자 10명의 해비유저를 심층적으로 인터뷰하였고 앱을 이용하는 사람은 4명이었고, 운동일기 앱을 사용할 때 가장 중요한 점으로 간결한 UI와 편리성을 꼽았고 나머지 6명은 수기로 쓰는 것이 앱으로 사용하는 것보다 편하다고 대답했습니다. 또한 어플기록에서 중요한 점은 기록을 쉽게보고 비교할 수 있는 캘린더, 목표설정에 용이한 기록 데이터 비교, 운동하기 전에 타이머를 통해 휴식 시간 알림과 총 운동시간을 자동 기록할 수 있는 기능을 요청했습니. 이러한 시장의 니즈를 파악하고 이를 충족시킬 웹 페이지 및 앱을 만들어보았습니다.

<img width="850" alt="스크린샷 2021-09-02 오후 8 21 51" src="https://user-images.githubusercontent.com/29696692/131835130-311e0ea8-d653-470f-ae7c-46ffb3e5c551.png">

<img width="850" alt="스크린샷 2021-09-02 오후 8 24 19" src="https://user-images.githubusercontent.com/29696692/131835452-043776ce-36a6-4781-ac08-87a46d122a25.png">

## ☝🏻 프로젝트 특징

- 배포 : AWS S3, CloudFront
- pwa 기반의 앱을 구글 플레이 스토어에 등록 (goodhomt.twa)
- 

## 💻 사용 패키지

* **reduxjs/toolkit**
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

<img src="https://images.velog.io/images/uvula6921/post/44c62413-9689-4568-bb41-0f8f2dacd74d/%EB%B0%A9%EC%98%AC%EB%A6%AC%EA%B8%B0GIF.gif">
<img src="https://images.velog.io/images/uvula6921/post/a97ebc6d-366a-4042-b1ee-f3b706cb5e59/%EC%98%AC%EB%A6%B0%20%EB%B0%A9%20GIF.gif">
<img src="https://images.velog.io/images/uvula6921/post/8cee216c-efe8-4318-bcef-d4bb36af9d7e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-07-23%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%209.01.24.png">


<img src="https://user-images.githubusercontent.com/77391482/131851049-45eed235-218d-43ef-a347-6190de88fe6b.gif">








## 🚀 핵심 트러블 슈팅

### 월세 전세 row 삭제하는 X 버튼 클릭 시 2회 발생하는 문제.
- 월세, 전세 row 생성 후 X 버튼으로 row 하나를 삭제하려고 하면 두개가 삭제되는 문제.
- 첫번째 X 버튼을 누르면 row가 두개 모두 삭제됨.
- 클릭한 버튼 자체(if (id === "monthly"))를 이용해 분기하니 해결됨.

- 버튼 클릭 시 2회 발생하는 문제 코드
```jsx
// TradeInfo.js
if (id === "monthly") {
  ...
  const remove_row_btn1 = document.getElementsByClassName("remove_row_btn1")[0];

  remove_row_btn1.addEventListener("click", function (event) {
    // 대충 event.target 을 삭제하는 코드가 있었음...
    document.getElementById("monthly").disabled = false;
  });
}
```

- remove_tr 함수를 넣어서, row가 한개인지 두개인지에 따라 어떤 부분을 지울것인지 상세하게 정의해둠.

```jsx
const remove_tr = (target) => {
  if (document.getElementsByClassName("iNyxMi").length === 1) {
    const th = document.getElementsByClassName("iNyxMi")[0].parentNode.parentNode.previousSibling;
    th.removeAttribute("rowspan");
    const tr = th.parentNode.nextSibling;
    tr.insertBefore(th, tr.firstChild);
    tr.previousSibling.remove();
  } else {
    target.disabled = true;
    target.parentNode.remove();
  }
};
```

### 캘린더 라이브러리 활용
- 캘린더 날짜 클릭 시 모달창 닫히도록 구현.
- onDateChange 값에 여러개의 props를 넘길 수 없음. 애초에 이 캘린더 라이브러리에서 모달기능을 제공하지 않는게 문제.

```jsx
<DatePickerCalendar
  date={date}
  onDateChange={setDate}
  locale={enGB}
  />
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
