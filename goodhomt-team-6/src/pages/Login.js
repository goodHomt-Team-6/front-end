import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';
import { KAKAO_AUTH_URL } from '../shared/OAuth';
import kakaoLoginButton from '../img/kakao_login_medium_narrow.png';

const Login = (props) => {
  return (
    <>
      <LoginWrapper>
        <img
          src={kakaoLoginButton}
          onClick={() => {
            window.location.href = KAKAO_AUTH_URL;
          }}
        />
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
