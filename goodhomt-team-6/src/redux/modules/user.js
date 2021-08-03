import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { getCookie, setCookie, deleteCookie } from "../../shared/Cookie";
import api from "../../shared/Request";
import axios from "axios";

axios.defaults.baseURL = "http://54.180.158.188";
axios.defaults.headers.common["Authorization"] = `Bearer ${getCookie(
  "is_login"
)}`;

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

const kakaoLogin = (code) => {
  return async function (dispatch, getState, { history }) {
    api
      .get(`/auth/kakao`)
      .then((response) => {
        console.log("카카오톡 소셜 로그인 성공");
        console.log(response); // 토큰 넘어옴
        const ACCESS_TOKEN = response.data.token;
        setCookie("token", ACCESS_TOKEN);
        history.replace("/");
      })
      .catch((error) => {
        console.error('error!!!!!!', error);
        console.log("카카오 소셜 로그인 실패", error);
        window.alert("로그인에 실패하였습니다");
        history.replace("/login");
      });
  };
};

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
  };
};

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
    })
  }, initialState
);

// actionsCreator export 
const actionCreators = {
  kakaoLogin,
  getUser,
  getUserAPI,
  logOut,
  logOutAPI,
};

export { actionCreators };