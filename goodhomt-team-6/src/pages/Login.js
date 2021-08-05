import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';
import { KAKAO_AUTH_URL, KAKAO_LOGOUT_URL } from '../shared/OAuth';
import kakaoLoginButton from '../img/kakao_login_medium_narrow.png';
import { actionCreators as userAction } from '../redux/modules/user';
import LoginBackground from '../img/login_background.svg';

const Login = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      <ImgContainer
        src={LoginBackground}>
      </ImgContainer>
      <LoginWrapper>
        <img
          src={kakaoLoginButton}
          onClick={() => {
            window.location.href = KAKAO_AUTH_URL;
          }}
        />
        {/* <div
          onClick={() => {
            dispatch(userAction.kakaoLogOut());
          }}
        >
          로그아웃 (사용 불가)
        </div> */}
      </LoginWrapper>

    </>
  );
};

export default Login;

const ImgContainer = styled.img`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0px;
  z-index: -1;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 93vh;
  margin-bottom: 30px;
  cursor: pointer;
`;
