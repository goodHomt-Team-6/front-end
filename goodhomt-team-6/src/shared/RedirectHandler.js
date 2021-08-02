import React, { useEffect } from 'react';
import { useDispatch } from

// 카카오 로그인 성공시 리다이렉트되는 화면
const RedirectHandler = (props) => {
  const dispatch = useDispatch();

  // 인가코드 받아오기
  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {

  })

};

export default RedirectHandler;

