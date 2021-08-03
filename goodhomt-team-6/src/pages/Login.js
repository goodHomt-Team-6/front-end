import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';
import { Scope } from '@babel/traverse';
import axios from "axios";

import KakaoLogin from 'react-kakao-login';
import { KAKAO_AUTH_URL } from '../shared/Auth';

const Login = (props) => {

  const restApiKey = "6c4b5d8827b24d1ee8c8aca8ef6ce05d";


  const oAuthLoginHandler = (resData) => {
    console.log(resData);
  };

  return (
    <>
      {/* <LoginWrapper>
        <KakaoLogin
          token={restApiKey}
          buttonText="kakao"
          onSuccess={oAuthLoginHandler}
          onFail={oAuthLoginHandler}
        >
          카카오 로그인
        </KakaoLogin>
      </LoginWrapper> */}

      <LoginWrapper>
        <KakaoBtn
          onClick={() => {
            window.location.href = KAKAO_AUTH_URL;
          }
          }
        >
          카카오톡 로그인
        </KakaoBtn>
      </LoginWrapper>
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