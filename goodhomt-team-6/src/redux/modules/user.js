import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import api from '../../shared/Request';
import jwt_decode from 'jwt-decode';
import { history } from '../configureStore';
import logger from '../../shared/Logger';

// initialState
const initialState = {
  user: null,
  is_login: false,
};

// actions
const LOG_IN = 'user/LOG_IN';
const GET_USER = 'user/GET_USER';
const LOG_OUT = 'user/LOG_OUT';
const CHECK_LOGIN = 'user/CHECK_LOGIN';

// action creators
const logIn = createAction(LOG_IN, (token) => ({ token }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const checkLogin = createAction(CHECK_LOGIN, (token) => ({ token }));

const kakaoLogin = (code) => {
  return function (dispatch, getState, { history }) {
    api({
      method: 'GET',
      url: `http://54.180.158.188?code=${code}`,
    })
      .then((res) => {
        console.log(res); // 토큰이 넘어올 것임
        const ACCESS_TOKEN = res.data.accessToken;
        localStorage.setItem('token', ACCESS_TOKEN); //예시로 로컬에 저장함
        history.replace('/'); // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
      })
      .catch((err) => {
        console.log('소셜로그인 에러', err);
        window.alert('로그인에 실패하였습니다.');
        history.replace('/login'); // 로그인 실패하면 로그인화면으로 돌려보냄
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
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        // localStorage.setItem('goodHomt_token', action.payload.token);
        // const decoded = jwt_decode(action.payload.token);
        // payload 내용 ->
        // {email: "pkj6921@naver.com",
        // iat: 1627994026}
        // draft.is_login = true;
        // draft.user = {email: decoded.email};
        // window.location.replace('/');
      }),
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = null;
        draft.is_login = false;
      }),
    [CHECK_LOGIN]: (state, action) =>
      produce(state, (draft) => {
        const decoded = jwt_decode(action.payload.token);
        draft.is_login = true;
        draft.user = { email: decoded.email };
      }),
  },
  initialState,
);

// actionsCreator export
const actionCreators = {
  logIn,
  getUser,
  logOut,
  logOutAPI,
  kakaoLogin,
};

export { actionCreators };
