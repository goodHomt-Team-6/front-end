const env = process.env.NODE_ENV;

const CLIENT_ID = '093628d3df5c7d419bf518bf830b147c';
const REDIRECT_URI =
  env === 'development'
    ? 'http://localhost:3000/oauth/callback/kakao'
    : 'http://goohomt.p-e.kr.s3-website.ap-northeast-2.amazonaws.com//oauth/callback/kakao';

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export { KAKAO_AUTH_URL, CLIENT_ID, REDIRECT_URI };
