import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import api from "../../shared/Request";
import axios from "axios";

// initialState
const initialState = {
  user: null,
  is_login: false,
};

// actions
const GET_USER = "user/GET_USER";
const LOG_OUT = "user/LOG_OUT";

// action creators
const getUser = createAction(GET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));

const getUserAPI = () => {
  return function (dispatch, getState, { history }) {
    api
      .get(`/auth/kakao`)
      .then((response) => {
        dispatch(getUser(
          {
            name: response.data.name,
            image: response.data.imageUrl,
          }
        ));
      })
      .catch((error) => {
        console.log("유저 정보 가져오기 실패");
      });
  };
};

const logOutAPI = () => {
  return function (dispatch, getState, { history }) {
    dispatch(logOut());
  }
}

// reducer
export default handleActions(
  {
    [GET_USER]: (state, action) => produce(state, (draft) => {
      draft.user = action.payload.user;
      draft.is_login = true;
    }),
    [LOG_OUT]: (state, action) => produce(state, (draft) => {
      draft.user = null;
      draft.is_login = false;
    }
  }, initialState
);

// actionsCreator export 
const actionCreators = {
  getUser,
  getUserAPI,
  logOut,
  logOutAPI,
};

export { actionCreators };