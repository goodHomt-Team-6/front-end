// import api from './Request';

// const API_BASE_URL = `${api}`;

const CLIENT_ID = "068735ef1f3f529391f322045e26fa87";
const REDIRECT_URI = "http://localhost:3002";

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export {
  KAKAO_AUTH_URL
};

