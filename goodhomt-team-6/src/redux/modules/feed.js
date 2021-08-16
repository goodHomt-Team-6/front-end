import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import api from '../../shared/Request';
import jwt_decode from 'jwt-decode';
import Cookies from 'universal-cookie';
import logger from '../../shared/Logger';
import { actionCreators as userActions } from './user';

// initialState
const initialState = {
  selectedfeed: [],
  feed: [],
};

// actions
const GET_FEED = 'commnunity/GET_FEED_ALL';

// action creators
const getFeed = createAction(GET_FEED, (feed) => ({ feed }));

// 루틴 커뮤니티 피드에 올리기
const addFeedAPI = (routine) => {
  return function (dispatch, getState, { history }) {
    api
      .post('/community', routine)
      .then((response) => {
        logger('루틴 커뮤니티 피드에 올리기 성공');
      })
      .catch((error) => {
        logger('루틴 커뮤니티 피드에 올리기 실패', error);
      });
  };
};

// 커뮤니티 피드 전체 가져오기
const getFeedAllAPI = (userId) => {
  return function (dispatch, getState, { history }) {
    api
      .get('/community', { userId })
      .then((response) => {
        dispatch(getFeed(response.data.result));
        logger('커뮤니티 피드 전체 가져오기 성공');
      })
      .catch((error) => {
        logger('커뮤니티 피드 전체 가져오기 실패', error);
      });
  };
};

// 커뮤니티 검색어로 전체 가져오기
const getFeedSearchAPI = (keyword) => {
  return function (dispatch, getState, { history }) {
    api
      .get(`/community?exerciseName=${keyword}`)
      .then((response) => {
        dispatch(getFeed(response.data.result));
        logger('커뮤니티 피드 검색으로 가져오기 성공');
      })
      .catch((error) => {
        logger('커뮤니티 피드 검색으로 가져오기 실패', error);
      });
  };
};

// 커뮤니티 피드 상세 가져오기
const getFeedDetailAPI = (routineId) => {
  return function (dispatch, getState, { history }) {
    api
      .get(`/community/${routineId}`)
      .then((response) => {
        dispatch(getFeed(response.data.result));
        logger('커뮤니티 피드 상세 가져오기 성공');
      })
      .catch((error) => {
        logger('커뮤니티 피드 상세 가져오기 실패', error);
      });
  };
};

// 피드에서 루틴 좋아요
const likeAPI = (routineId) => {
  return function (dispatch, getState, { history }) {
    api
      .put(`/like/${routineId}`)
      .then((response) => {
        logger('좋아요 토글 성공');
        console.log(response);
      })
      .catch((error) => {
        logger('좋아요 토글 실패', error);
      });
  };
};

// reducer
export default handleActions(
  {
    [GET_FEED]: (state, action) =>
      produce(state, (draft) => {
        draft.feed = action.payload.feed;
      }),
  },
  initialState
);


// actionsCreator export
const actionCreators = {
  getFeedAllAPI,
  getFeedSearchAPI,
  getFeedDetailAPI,
  addFeedAPI,
  likeAPI,
};

export { actionCreators };
