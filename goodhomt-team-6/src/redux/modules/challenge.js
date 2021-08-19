import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import api from '../../shared/Request';
import logger from '../../shared/Logger';
import { actionCreators as exerciseActions } from './exercise';

// initial state
const initialState = {
  challenges: [],
  myChallenges: [],
  challengeDetail: {},
  loading: true,
  allMyChallenges: [],
};

// actions
const GET_CHALLENGES = 'challenge/GET_CHALLENGES';
const GET_MY_CHALLENGES = 'challenge/GET_MY_CHALLENGES';
const GET_ALL_MY_CHALLENGES = 'challenge/GET_ALL_MY_CHALLENGES';
const GET_CHALLENGE_DETAIL = 'challenge/GET_CHALLENGE_DETAIL';
const LOADING = 'challenge/Loading';

// action creators
const getChallenges = createAction(GET_CHALLENGES, (challenges) => ({
  challenges,
}));
const getMyChallenges = createAction(GET_MY_CHALLENGES, (myChallenges) => ({
  myChallenges,
}));
const getAllMyChallenges = createAction(
  GET_ALL_MY_CHALLENGES,
  (myChallenges) => ({
    myChallenges,
  }),
);
const getChallengeDetail = createAction(GET_CHALLENGE_DETAIL, (challenge) => ({
  challenge,
}));
const getLoading = createAction(LOADING, (value) => ({
  value,
}));

// middleware actions
// 전체 챌린지 리스트
const getChallengesAPI = () => {
  return function (dispatch, getState, { history }) {
    api
      .get('/challenges')
      .then((response) => {
        dispatch(getChallenges(response.data.result));
      })
      .catch(function (err) {
        logger('전체 챌린지 리스트를 가져오지 못했습니다.');
      });
  };
};

// 내가 참여한 챌린지 리스트
const getMyChallengesAPI = (value) => {
  return function (dispatch, getState, { history }) {
    if (value === 'all') {
      api.get(`/challenges/user?type=${value}`).then((response) => {
        dispatch(getAllMyChallenges(response.data.result));
      });
    } else {
      api
        .get('/challenges/user')
        .then((response) => {
          if (value === 'get_detail') {
            // DB쪽 내 챌린지 api에서 Challenge_Exercises 컬럼과 join 하면 부하가 높을것 같다고 하여 챌린지 상세 api로 대체함.
            dispatch(
              getChallengeDetailAPI(response.data.result[0].challengeId),
            );
          } else if (value === 'calendar') {
            // DB쪽 내 챌린지 api에서 Challenge_Exercises 컬럼과 join 하면 부하가 높을것 같다고 하여 챌린지 상세 api로 대체함.
            dispatch(
              getChallengeDetailAPI(response.data.result[0].challengeId, true),
            );
          }
          dispatch(getMyChallenges(response.data.result));
        })
        .catch(function (err) {
          logger('나의 챌린지를 가져오지 못했습니다.');
        });
    }
  };
};

// 챌린지 상세 페이지 데이터
const getChallengeDetailAPI = (challengeId, isCalendar) => {
  return function (dispatch, getState, { history }) {
    api
      .get(`/challenges/${challengeId}`)
      .then((response) => {
        if (isCalendar) {
          // 나의 챌린지 아이디 꺼내서 -> 상세 챌린지 데이터들 열람 -> 상세 챌린지 데이터들을 이용해 addSelectedPrevItem thunk 함수 파라미터 제작...
          // 너무 백엔드 친화적인 api였다...
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
          history.push('/routinedetail');
        }
        dispatch(getChallengeDetail(response.data.result));
      })
      .catch(function (err) {
        logger('챌린지 상세를 가져오지 못했습니다.');
      });
  };
};

// 챌린지 참여하기
const joinChallengeAPI = (challengeId) => {
  return function (dispatch, getState, { history }) {
    api
      .patch(`/challenges/${challengeId}`)
      .then((response) => {
        history.replace('/challenge');
        logger('챌린지 참여에 성공했습니다.');
      })
      .catch(function (err) {
        logger('챌린지 참여에 실패했습니다.');
      });
  };
};

// 챌린지 참여 취소하기
const leaveChallengeAPI = (challengeId) => {
  return function (dispatch, getState, { history }) {
    api
      .delete(`/challenges/${challengeId}`)
      .then((response) => {
        history.push('/challenge');
      })
      .catch(function (err) {
        logger('챌린지 참여 취소에 실패했습니다.');
      });
  };
};

// 챌린지 기록하기
const recordChallengeResultAPI = (result) => {
  return function (dispatch, getState, { history }) {
    api
      .patch(`/challenges/record`, result)
      .then((response) => {
        history.replace('/');
      })
      .catch(function (err) {
        logger('챌린지 결과 기록에 실패했습니다.');
        logger(err);
      });
  };
};

// reducer
export default handleActions(
  {
    [GET_CHALLENGES]: (state, action) =>
      produce(state, (draft) => {
        draft.challenges = action.payload.challenges;
      }),
    [GET_MY_CHALLENGES]: (state, action) =>
      produce(state, (draft) => {
        draft.myChallenges = action.payload.myChallenges;
      }),
    [GET_ALL_MY_CHALLENGES]: (state, action) =>
      produce(state, (draft) => {
        draft.allMyChallenges = action.payload.myChallenges;
      }),
    [GET_CHALLENGE_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.challengeDetail = action.payload.challenge;
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.loading = action.payload.value;
      }),
  },
  initialState,
);

// actionsCreator export
const actionCreators = {
  getChallengesAPI,
  getMyChallengesAPI,
  getChallengeDetailAPI,
  joinChallengeAPI,
  leaveChallengeAPI,
  recordChallengeResultAPI,
};

export { actionCreators };
