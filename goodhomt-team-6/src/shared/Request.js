import axios from 'axios';
import Cookies from 'universal-cookie';

const cookie = new Cookies();

const api = axios.create({
  baseURL: `http://54.180.158.188/`,
});

const accessToken = cookie.get('homt6_access_token');
const refreshToken = cookie.get('homt6_refresh_token');

// axios header에 기본적으로 토큰 넣어두기
// 서버에서 토큰 갱신을 해주기로 했어서, access_token과 refresh_token 모두를 전달해주면 서버에서 처리해줌.
api.defaults.headers.common['Authorization'] = `${accessToken},${refreshToken}`;

export default api;
