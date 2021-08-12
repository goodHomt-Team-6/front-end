import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import api from '../../shared/Request';
import jwt_decode from 'jwt-decode';
import Cookies from 'universal-cookie';
import logger from '../../shared/Logger';

// initialState
const initialState = {
  selectedfeed: [],
  feed: [
    // {
    //   routineName: "insub's routine",
    //   description: "이것은..",
    //   myExercise: [
    //     {
    //       id: 1,
    //       exerciseName: "벤치프레스",
    //       set: [
    //         {
    //           id: 1,
    //           setCount: 1,
    //           weight: 10,
    //           count: 2,
    //           minutes: null,
    //           seconds: null,
    //           type: "exercise",
    //           order: 1
    //         },
    //       ]
    //     },
    //   ]
    // }
  ]
};

// actions
const GET_FEED = 'commnunity/GET_FEED_ALL';
const ADD_FEED = 'community/ADD_FEED';

// action creators
const getFeed = createAction(GET_FEED, (feed) => ({ feed }));
const addFeed = createAction(ADD_FEED, (feed) => ({ feed }));

// 루틴 커뮤니티 피드에 올리기
const addFeedAPI = (routine) => {
  return function (dispatch, getState, { history }) {
    api
      .post('/community', routine)
      .then((response) => {
        logger('루틴 커뮤니티 피드에 올리기 성공');
        console.log(response);
      })
      .catch((error) => {
        logger('루틴 커뮤니티 피드에 올리기 실패', error);
      });
  };
};

// 커뮤니티 피드 전체 가져오기
const getFeedAllAPI = () => {
  return function (dispatch, getState, { history }) {
    api
      .get('/community')
      .then((response) => {
        dispatch(getFeed(response.data.result));
        logger('커뮤니티 피드 전체 가져오기 성공');
        console.log(response.data.result);
      })
      .catch((error) => {
        logger('커뮤니티 피드 전체 가져오기 실패', error);
      });
  };
};

// 커뮤니티 검색어로 전체 가져오기
const getFeedSearchAPI = (팔굽) => {
  return function (dispatch, getState, { history }) {
    api
      .get(`/community?exerciseName=${"팔굽"}`)
      .then((response) => {
        console.log(response);
        dispatch(getFeed(response.data.result));
        logger('커뮤니티 피드 검색으로 가져오기 성공');
      })
      .catch((error) => {
        logger('커뮤니티 피드 검색으로 가져오기 실패', error);
      });
  };
};

// 커뮤니티 피드 상세 가져오기
const getFeedDetailAPI = (routineid) => {
  return function (dispatch, getState, { history }) {
    api
      .get(`/routines/${routineid}`)
      .then((response) => {
        dispatch(getFeed(response.data.result));
        logger('커뮤니티 피드 상세 가져오기 성공');
      })
      .catch((error) => {
        logger('커뮤니티 피드 상세 가져오기 실패', error);
      });
  };
};

// reducer
export default handleActions(
  {
    [GET_FEED]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.feed);
        draft.feed = action.payload.feed;
      })
  },
  initialState
);


// actionsCreator export
const actionCreators = {
  getFeedAllAPI,
  getFeedSearchAPI,
  getFeedDetailAPI,
  addFeedAPI,
};

export { actionCreators };
