import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

// 카카오 로그인 성공시 리다이렉트되는 화면
const RedirectHandler = (props) => {
  const dispatch = useDispatch();

  // 인가코드 받아오기
  let code = new URL(window.location.href).searchParams.get("code");
  console.log(code);


  useEffect(() => {
    dispatch(userActions.kakaoLogin(code));
    console.log(code);
  }, []);

  return null;
};

export default RedirectHandler;

