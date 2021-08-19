import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import api from '../../shared/Request';
import logger from '../../shared/Logger';

// initialState
const initialState = {
  selectedFeed: {},
  feed: [],
  isNickname: false,
  savedNickname: '',
};

// actions
const GET_FEED = 'community/GET_FEED';
const GET_SELECTED_FEED = 'community/GET_SELECTED_FEED';
const GET_LIKE_FEED = 'community/GET_LIKE_FEED';
const SELECT_FEED = 'community/SELECT_FEED';
const NICKNAME_CHECK = 'community/NICKNAME_CHECK';
const NICKNAME_SAVE = 'community/NICKNAME_SAVE';

// action creators
const getFeed = createAction(GET_FEED, (feed) => ({ feed }));
const getSelectedFeed = createAction(GET_SELECTED_FEED, (selectedFeed) => ({ selectedFeed }));
const getLikeFeed = createAction(GET_LIKE_FEED, (routineId) => ({ routineId }));
const selectFeed = createAction(SELECT_FEED, (routineId) => ({ routineId }));
const nicknameCheck = createAction(NICKNAME_CHECK, (isNickname) => ({ isNickname }));
const nicknameSave = createAction(NICKNAME_SAVE, (nickname) => ({ nickname }));

// 피드 추가하기
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

// 피드 전체 가져오기
const getFeedAllAPI = (userId) => {
  return function (dispatch, getState, { history }) {
    api
      .get(`/community?userId=${userId}`)
      .then((response) => {
        dispatch(getFeed(response.data.result));
        logger('커뮤니티 피드 전체 가져오기 성공');
      })
      .catch((error) => {
        logger('커뮤니티 피드 전체 가져오기 실패', error);
      });
  };
};

// 검색어로 전체 피드 가져오기
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

// 피드 상세 가져오기
const getFeedDetailAPI = (routineId) => {
  return function (dispatch, getState, { history }) {
    api
      .get(`/community/${routineId}`)
      .then((response) => {
        dispatch(getSelectedFeed(response.data.result));
        logger('커뮤니티 피드 상세 가져오기 성공');
      })
      .catch((error) => {
        logger('커뮤니티 피드 상세 가져오기 실패', error);
      });
  };
};

// 피드 삭제하기
const deleteFeedAPI = (routineId) => {
  return function (dispatch, getState, { history }) {
    api
      .delete(`/community/${routineId}`)
      .then((response) => {
        logger('피드 삭제 성공');
        const userId = getState().user.user.userId;
        dispatch(getFeedAllAPI(userId));
      })
      .catch((error) => {
        logger('피드 삭제 실패', error);
      });
  };
};

// 피드 좋아요 토글
const likeAPI = (routineId) => {
  return function (dispatch, getState, { history }) {
    api
      .put(`/like/${routineId}`)
      .then((response) => {
        logger('좋아요 토글 성공');
        dispatch(getLikeFeed(routineId));
      })
      .catch((error) => {
        logger('좋아요 토글 실패', error);
      });
  };
};

// 커뮤니티 닉네임 중복체크
const nicknameCheckAPI = (communityNickname) => {
  return function (dispatch, getState, { history }) {
    api
      .post('/community/dupCheck', { communityNickname })
      .then((response) => {
        console.log(response);
        logger('중복체크 성공');
        dispatch(nicknameCheck(response.data.ok));
      })
      .catch((error) => {
        logger('중복체크 실패', error);
        dispatch(nicknameCheck(false));
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
    [GET_SELECTED_FEED]: (state, action) =>
      produce(state, (draft) => {
        draft.selectedFeed = action.payload.selectedFeed;
      }),
    [GET_LIKE_FEED]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.feed.findIndex((i) => i.id === action.payload.routineId);
        if (draft.feed[idx].isLiked === 1) {
          draft.feed[idx].isLiked = 0;
          draft.feed[idx].totalLike = draft.feed[idx].totalLike - 1;
        } else {
          draft.feed[idx].isLiked = 1;
          draft.feed[idx].totalLike = draft.feed[idx].totalLike + 1;
        }
      }),
    [SELECT_FEED]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.feed.findIndex((i) => i.id === action.payload.routineId);
        draft.selectedFeed = state.feed[idx];
      }),
    [NICKNAME_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.isNickname = action.payload.isNickname;
      }),
    [NICKNAME_SAVE]: (state, action) =>
      produce(state, (draft) => {
        draft.savedNickname = action.payload.nickname;
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
  deleteFeedAPI,
  likeAPI,
  nicknameCheckAPI,
  selectFeed,
  nicknameSave,
};

export { actionCreators };
