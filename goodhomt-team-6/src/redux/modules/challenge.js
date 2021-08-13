import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import api from '../../shared/Request';
import logger from '../../shared/Logger';

// initial state
const initialState = {
  challenges: [],
  myChallenges: [],
  challengeDetail: {},
};

// actions
const GET_CHALLENGES = 'challenge/GET_CHALLENGES';
const GET_MY_CHALLENGES = 'challenge/GET_MY_CHALLENGES';
const GET_CHALLENGE_DETAIL = 'challenge/GET_CHALLENGE_DETAIL';

// action creators
const getChallenges = createAction(GET_CHALLENGES, (challenges) => ({
  challenges,
}));
const getMyChallenges = createAction(GET_MY_CHALLENGES, (myChallenges) => ({
  myChallenges,
}));
const getChallengeDetail = createAction(GET_CHALLENGE_DETAIL, (challenge) => ({
  challenge,
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
    api
      .get('/challenges/user')
      .then((response) => {
        if (value === 'get_detail') {
          // DB쪽 내 챌린지 api에서 Challenge_Exercises 컬럼과 join 하면 부하가 높을것 같다고 하여 챌린지 상세 api로 대체함.
          dispatch(getChallengeDetailAPI(response.data.result[0].challengeId));
        }
        dispatch(getMyChallenges(response.data.result));
      })
      .catch(function (err) {
        logger('나의 챌린지를 가져오지 못했습니다.');
      });
  };
};

// 챌린지 상세 페이지 데이터
const getChallengeDetailAPI = (challengeId) => {
  return function (dispatch, getState, { history }) {
    api
      .get(`/challenges/${challengeId}`)
      .then((response) => {
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
        history.replace('/community');
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
        history.push('/community');
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
      .put(`/challenges/record`, result)
      .then((response) => {
        history.replace('/');
      })
      .catch(function (err) {
        logger('챌린지 결과 기록에 실패했습니다.');
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
    [GET_CHALLENGE_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.challengeDetail = action.payload.challenge;
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
