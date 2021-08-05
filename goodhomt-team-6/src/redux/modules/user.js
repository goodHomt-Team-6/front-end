import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import api from '../../shared/Request';
import jwt_decode from 'jwt-decode';
import Cookies from 'universal-cookie';
import { history } from '../configureStore';
import logger from '../../shared/Logger';
import {
  CLIENT_ID,
  REDIRECT_URI,
  LOGOUT_REDIRECT_URI,
} from '../../shared/OAuth';

const cookies = new Cookies();

// initialState
const initialState = {
  // user: {nickname: nickname, userImg: img},
  // is_login: false,
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

const kakaoLoginAPI = (code) => {
  return function (dispatch, getState, { history }) {
    api({
      method: 'GET',
      url: `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code=${code}`,
    })
      .then((res) => {
        api
          .post('/auth/kakaoLogin', {
            token: res.data,
          })
          .then((res) => {
            const accessToken = res.data.loginUser.token.accessToken;
            const refreshToken = res.data.loginUser.token.refreshToken;

            dispatch(checkLogin(accessToken));
            cookies.set('homt6_is_login', 'true', { path: '/' });

            // CSRF 공격에 대한 방지책 생각해보기.
            // cookie 보안 관련 방법 더 알아보기.
            // samesite: strict를 하면 왜 쿠키 저장이 안되는지...
            // 만료기한은 어떻게 잡아야할지...
            cookies.set('homt6_access_token', accessToken, { path: '/' });
            cookies.set('homt6_refresh_token', refreshToken, { path: '/' });
            history.push('/');
          })
          .catch((err) => {
            logger('서버로 토큰 전송 실패', err);
            window.alert('로그인에 실패하였습니다.');
            history.replace('/login');
          });
      })
      .catch((err) => {
        logger('소셜로그인 에러', err);
        window.alert('로그인에 실패하였습니다.');
        history.replace('/login');
      });
  };
};

const getUpdatedAccessTokenAPI = () => {
  return function (dispatch, getState, { history }) {
    api
      .get('/tokens')
      .then((res) => {
        // 최초 access token을 받아와서 쓰다보면 만료가 됨.
        // 갱신된 accesstoken을 받아야함
        // 최초 access token으로 payload 내용을 redux에 담아서 쓰다가 새로고침을 하면 다 날아감.
        // 갱신하는 로직이 어떤지 모르겠지만 프론트에서 요청을 할때마다 갱신된 access token을 받을수 있으면 좋겠다.
        const accessToken = res.data.loginUser.token.accessToken;
        const refreshToken = res.data.loginUser.token.refreshToken;

        cookies.set('homt6_is_login', 'true', { path: '/' });
        cookies.set('homt6_access_token', accessToken, { path: '/' });
        cookies.set('homt6_refresh_token', refreshToken, { path: '/' });

        dispatch(checkLogin(accessToken));
      })
      .catch((err) => {
        logger('갱신된 토큰 반환 실패', err);
      });
  };
};

const kakaoLogOut = (code) => {
  return function (dispatch, getState, { history }) {
    api({
      method: 'GET',
      url: `https://kauth.kakao.com/oauth/logout?client_id=${CLIENT_ID}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`,
    })
      .then((res) => {
        logger(res);
      })
      .catch((err) => {
        logger('소셜로그아웃 에러', err);
        window.alert('로그아웃에 실패하였습니다.');
        // history.replace('/login'); // 로그인 실패하면 로그인화면으로 돌려보냄
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
        draft.user = { nickname: decoded.nickname, userImg: decoded.img };
      }),
  },
  initialState,
);

// actionsCreator export
const actionCreators = {
  logIn,
  getUser,
  logOut,
  checkLogin,
  logOutAPI,
  kakaoLoginAPI,
  kakaoLogOut,
  getUpdatedAccessTokenAPI,
};

export { actionCreators };
