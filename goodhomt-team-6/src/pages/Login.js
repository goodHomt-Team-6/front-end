import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';
import { Scope } from '@babel/traverse';

import KakaoLogin from 'react-kakao-login';
import { KAKAO_AUTH_URL } from '../shared/Auth';

const Login = (props) => {

  const jsKey = "068735ef1f3f529391f322045e26fa87";

  // 카카오 로그인 성공시
  const handleKakaoSuccess = () => {
  };

  // 카카오 로그인 실패시
  const handleKakaoFail = () => {
  };

  return (
    <>
      <LoginWrapper>
        <KakaoBtn
          onClick={() => {
            window.location.href = KAKAO_AUTH_URL;
          }}
        >
          카카오톡 로그인
        </KakaoBtn>
      </LoginWrapper>

      {/* <KakaoLogin
        jsKey={jsKey}
        onSuccess={handleKakaoSuccess}
        onFailure={handleKakaoFail}
        getProfile="true"
        buttonText="카카오톡 로그인"
      /> */}

    </>
  );
};

export default Login;

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const KakaoBtn = styled.button`
  width: 190px;
  height: 44px;
  color: #783c00;
  background-color: #FFEB00;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
`;