import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import api from '../../shared/Request';
import logger from '../../shared/Logger';
import _ from "lodash";

// initialState
const initialState = {
  selectedFeed: {},
  feed: [],
  isNickname: false,
  savedNickname: '',
  savedRoutineName: '',
  savedDescription: '',
  isDoubleChecked: false,
  isSearchError: false,
  keyword: [],
  keywordInput: '',
  isKeyword: false,
};

// actions
const GET_FEED = 'community/GET_FEED';
const GET_SELECTED_FEED = 'community/GET_SELECTED_FEED';
const GET_LIKE_FEED = 'community/GET_LIKE_FEED';
const SELECT_FEED = 'community/SELECT_FEED';
const CHECK_NICKNAME = 'community/CHECK_NICKNAME';
const SAVE_NICKNAME = 'community/SAVE_NICKNAME';
const SAVE_ROUTINENAME = 'community/SAVE_ROUTINENAME';
const SAVE_DESCRIPTION = 'community/SAVE_DESCRIPTION';
const INITIALIZE_WRITTEN_FEED = 'community/INITIALIZE_WRITTEN_FEED';
const IS_DOUBLE_CHECKED = 'community/IS_DOUBLE_CHECKED';
const IS_SEARCH_ERROR = 'community/IS_SEARCH_ERROR';
const GET_KEYWORD = 'community/GET_KEYWORD';
const INITIALIZE_KEYWORD = 'community/INITIALIZE_KEYWORD';
const ADD_KEYWORD = 'community/ADD_KEYWORD';
const INITIALIZE_KEYWORD_INPUT = 'community/INITIALIZE_KEYWORD_INPUT';

// action creators
const getFeed = createAction(GET_FEED, (feed) => ({ feed }));
const getSelectedFeed = createAction(GET_SELECTED_FEED, (selectedFeed) => ({ selectedFeed }));
const getLikeFeed = createAction(GET_LIKE_FEED, (routineId) => ({ routineId }));
const selectFeed = createAction(SELECT_FEED, (routineId) => ({ routineId }));
const checkNickname = createAction(CHECK_NICKNAME, (isNickname) => ({ isNickname }));
const saveNickname = createAction(SAVE_NICKNAME, (nickname) => ({ nickname }));
const saveRoutinename = createAction(SAVE_ROUTINENAME, (routinename) => ({ routinename }));
const saveDescription = createAction(SAVE_DESCRIPTION, (description) => ({ description }));
const initializeWrittenFeed = createAction(INITIALIZE_WRITTEN_FEED, () => ({}));
const isDoubleChecked = createAction(IS_DOUBLE_CHECKED, (isDoubleChecked) => ({ isDoubleChecked }));
const isSearchError = createAction(IS_SEARCH_ERROR, (isSearchError) => ({ isSearchError }));
const getKeyword = createAction(GET_KEYWORD, (feed) => ({ feed }));
const initializeKeyword = createAction(INITIALIZE_KEYWORD, () => ({}));
const addKeyword = createAction(ADD_KEYWORD, (keywordInput) => ({ keywordInput }));
const initializeKeywordInput = createAction(INITIALIZE_KEYWORD_INPUT, () => ({}));

// ?????? ????????????
const addFeedAPI = (routine) => {
  return function (dispatch, getState, { history }) {
    api
      .post('/community', routine)
      .then((response) => {
        logger('?????? ???????????? ????????? ????????? ??????');
      })
      .catch((error) => {
        logger('?????? ???????????? ????????? ????????? ??????', error);
      });
  };
};

// ?????? ?????? ????????????
const getFeedAllAPI = (userId) => {
  return function (dispatch, getState, { history }) {
    api
      .get(`/community?userId=${userId}`)
      .then((response) => {
        dispatch(getFeed(response.data.result));
        logger('???????????? ?????? ?????? ???????????? ??????');
      })
      .catch((error) => {
        logger('???????????? ?????? ?????? ???????????? ??????', error);
      });
  };
};

// ???????????? ?????? ?????? ????????????
const getFeedSearchAPI = (keyword, userId) => {
  return function (dispatch, getState, { history }) {
    api
      .get(`/community?exerciseName=${keyword}&userId=${userId}`)
      .then((response) => {
        dispatch(getFeed(response.data.result));
        logger('???????????? ?????? ???????????? ???????????? ??????');
      })
      .catch((error) => {
        logger('???????????? ?????? ???????????? ???????????? ??????', error);
        dispatch(isSearchError(true));
      });
  };
};

// ???????????? ????????????(?????????API ??????)
const getKeywordSearchAPI = (keyword, userId) => {
  return function (dispatch, getState, { history }) {
    api
      .get(`/community?exerciseName=${keyword}&userId=${userId}`)
      .then((response) => {
        dispatch(getKeyword(response.data.result));
        logger('?????? ????????? ???????????? ??????');
      })
      .catch((error) => {
        logger('?????? ????????? ???????????? ??????', error);
      });
  };
};


// ?????? ?????? ????????????
const getFeedDetailAPI = (routineId) => {
  return function (dispatch, getState, { history }) {
    api
      .get(`/community/${routineId}`)
      .then((response) => {
        dispatch(getSelectedFeed(response.data.result));
        logger('???????????? ?????? ?????? ???????????? ??????');
      })
      .catch((error) => {
        logger('???????????? ?????? ?????? ???????????? ??????', error);
      });
  };
};

// ?????? ????????????
const deleteFeedAPI = (routineId) => {
  return function (dispatch, getState, { history }) {
    api
      .delete(`/community/${routineId}`)
      .then((response) => {
        logger('?????? ?????? ??????');
        const userId = getState().user.user.userId;
        dispatch(getFeedAllAPI(userId));
      })
      .catch((error) => {
        logger('?????? ?????? ??????', error);
      });
  };
};

// ?????? ????????? ??????
const likeAPI = (routineId) => {
  return function (dispatch, getState, { history }) {
    api
      .put(`/like/${routineId}`)
      .then((response) => {
        logger('????????? ?????? ??????');
        dispatch(getLikeFeed(routineId));
      })
      .catch((error) => {
        logger('????????? ?????? ??????', error);
      });
  };
};

// ???????????? ????????? ????????????
const checkNicknameAPI = (communityNickname) => {
  return function (dispatch, getState, { history }) {
    api
      .post('/community/dupCheck', { communityNickname })
      .then((response) => {
        logger('???????????? ??????');
        dispatch(checkNickname(response.data.ok));
      })
      .catch((error) => {
        logger('???????????? ??????', error);
        dispatch(checkNickname(false));
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
    [CHECK_NICKNAME]: (state, action) =>
      produce(state, (draft) => {
        draft.isNickname = action.payload.isNickname;
      }),
    [SAVE_NICKNAME]: (state, action) =>
      produce(state, (draft) => {
        draft.savedNickname = action.payload.nickname;
      }),
    [SAVE_ROUTINENAME]: (state, action) =>
      produce(state, (draft) => {
        draft.savedRoutineName = action.payload.routinename;
      }),
    [SAVE_DESCRIPTION]: (state, action) =>
      produce(state, (draft) => {
        draft.savedDescription = action.payload.description;
      }),
    [INITIALIZE_WRITTEN_FEED]: (state, action) =>
      produce(state, (draft) => {
        draft.savedNickname = initialState.savedNickname;
        draft.savedRoutineName = initialState.savedRoutineName;
        draft.savedDescription = initialState.savedDescription;
      }),
    [IS_DOUBLE_CHECKED]: (state, action) =>
      produce(state, (draft) => {
        draft.isDoubleChecked = action.payload.isDoubleChecked;
      }),
    [IS_SEARCH_ERROR]: (state, action) =>
      produce(state, (draft) => {
        draft.isSearchError = action.payload.isSearchError;
      }),
    [GET_KEYWORD]: (state, action) =>
      produce(state, (draft) => {
        // feed??? ????????? ???????????? ???????????? ????????? ????????? ???
        if (state.keywordInput === '') {
          draft.keyword = [];
        } else {
          const findA = action.payload.feed.map((i) => i.myExercise);
          const findB = _.flatten(findA, true);
          const findC = _.uniqBy(findB, "exerciseName");
          const keywordArr = findC.filter((i) => i.exerciseName.includes(state.keywordInput));
          draft.keyword = keywordArr;
        }
      }),
    [INITIALIZE_KEYWORD]: (state, action) =>
      produce(state, (draft) => {
        draft.keyword = [];
      }),
    [ADD_KEYWORD]: (state, action) =>
      produce(state, (draft) => {
        draft.keywordInput = action.payload.keywordInput;
      }),
    [INITIALIZE_KEYWORD_INPUT]: (state, action) =>
      produce(state, (draft) => {
        draft.keywordInput = '';
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
  checkNicknameAPI,
  getKeywordSearchAPI,
  selectFeed,
  saveNickname,
  saveRoutinename,
  saveDescription,
  initializeWrittenFeed,
  isDoubleChecked,
  isSearchError,
  initializeKeyword,
  addKeyword,
  initializeKeywordInput,
};

export { actionCreators };
