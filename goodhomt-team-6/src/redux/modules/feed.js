import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import api from '../../shared/Request';
import jwt_decode from 'jwt-decode';
import Cookies from 'universal-cookie';
import logger from '../../shared/Logger';

// initialState
const initialState = {
  selectedfeed: [],
  feed: []
};

// actions
const GET_FEED = 'commnunity/GET_FEED_ALL';
const ADD_FEED = 'community/ADD_FEED';

// action creators
const getFeed = createAction(GET_FEED, (feed) => ({ feed }));
const addFeed = createAction(ADD_FEED, (feed) => ({ feed }));

// 루틴 커뮤니티 피드에 올리기
const addFeedAPI = () => {
  return function (dispatch, getState, { history }) {
    api
      .post('/community',
      // {
      //   routineTime: 0,
      //   comment: [],
      //   like: [],
      //   createdAt: "2021-08-12 17:17:26",
      //   communityNickname: "인섭",
      //   description: "이것은 김인섭의 루틴입니다",
      //   rating: null,
      //   is_bookmarked: false,
      //   is_completed: false,
      //   routineName: "insub's routien",
      //   totalLike: 0,
      //   userId: 1,
      //   _id: "6114d9899ee28118d9ec29d6",
      //   myExercise: [
      //     {
      //       exerciseName: "팔굽혀펴기",
      //       id: 1,
      //       set: [
      //         {
      //           count: 2,
      //           id: 1,
      //           minutes: null,
      //           order: 1,
      //           seconds: null,
      //           setCount: 1,
      //           type: "exercise",
      //           weight: 10
      //         },
      //         {
      //           count: null,
      //           id: 2,
      //           minutes: 30,
      //           order: 2,
      //           seconds: 2,
      //           setCount: null,
      //           type: "break",
      //           weight: null,
      //         },
      //       ],
      //     },
      //   ],
      // }
    )
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
const getFeedSearchAPI = (keyword) => {
  return function (dispatch, getState, { history }) {
    api
      .get(`/community?exerciseName=${keyword}`)
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
      .get(`/community/${routineid}`)
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
        dispatch(getFeed());
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
  likeAPI,
};

export { actionCreators };
