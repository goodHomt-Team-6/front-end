import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';
import { KAKAO_AUTH_URL, KAKAO_LOGOUT_URL } from '../shared/OAuth';
import kakaoLoginButton from '../img/kakao_login_medium_narrow.png';
import { actionCreators as userAction } from '../redux/modules/user';

const Login = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      <LoginWrapper>
        <img
          src={kakaoLoginButton}
          onClick={() => {
            window.location.href = KAKAO_AUTH_URL;
          }}
        />
        <div
          onClick={() => {
            dispatch(userAction.kakaoLogOut());
          }}
        >
          로그아웃 (사용 불가)
        </div>
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
