import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:5000",
});

// 가지고 있는 토큰 넣어주기!
// 로그인 전이면 토큰이 없으니 못 넣어요.
// 그럴 땐 로그인 하고 토큰을 받아왔을 때 넣어줍시다.
// const USER_TOKEN = cookies.get("refresh_token");
// api.defaults.headers.common["Authorization"] = USER_TOKEN;

export default api;
