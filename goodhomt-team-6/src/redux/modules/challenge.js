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

const getMyChallengesAPI = () => {
  return function (dispatch, getState, { history }) {
    api
      .get('/challenges/user')
      .then((response) => {
        dispatch(getMyChallenges(response.data.result));
      })
      .catch(function (err) {
        logger('나의 챌린지를 가져오지 못했습니다.');
      });
  };
};

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
};

export { actionCreators };
