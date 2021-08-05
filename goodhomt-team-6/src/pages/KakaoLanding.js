import React from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators as userAction } from '../redux/modules/user';
// import Spinner from './Spinner';

const KakaoLanding = (props) => {
  const dispatch = useDispatch();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get('code');

  React.useEffect(async () => {
    await dispatch(userAction.kakaoLoginAPI(code));
  }, []);

  // React.useEffect(() => {
  //   const is_token = window.location.href.includes('token');
  //   console.log(is_token);
  //   if (is_token) {
  //     let token = window.location.href.split('/')[3].split('=')[1];
  //     dispatch(userCreator.logIn(code));
  //     loginCheckAPI;
  //     is_login = true;
  //   }
  // }, []);

  return <>{/* <Spinner /> */}</>;
};

export default KakaoLanding;
