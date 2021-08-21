import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';

import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configureStore';
import { Text } from '../shared/Styles';
import Mascort from '../img/mascort_blue.svg';
import logger from '../shared/Logger';
import { actionCreators as userActions } from '../redux/modules/user';
import kakaoLoginButton from '../img/kakao_login_medium_narrow.png';
import { KAKAO_AUTH_URL, KAKAO_LOGOUT_URL } from '../shared/OAuth';

// 북마크 버튼 클릭시 모달 생성 컴포넌트
const ChallengeModal = (props) => {
  const dispatch = useDispatch();
  const modalRef = useRef();

  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      dispatch(userActions.showLoginModal(false));
    }
  };

  return (
    <ModalWrapper ref={modalRef} onClick={closeModal}>
      <ModalInner>
        <PurpleAcc></PurpleAcc>
        <Inner>
          <Text
            type="contents"
            fontSize="13px"
            margin="0 0 20px 0"
            style={{
              letterSpacing: '-0.43px',
            }}
            textAlign="center"
          >
            클릭하신 페이지로 접속하기 위해서는
            <br />
            로그인이 필요합니다.
          </Text>
          <img
            src={kakaoLoginButton}
            onClick={() => {
              window.location.href = KAKAO_AUTH_URL;
            }}
          />
          <Text
            type="contents"
            fontSize="14px"
            color="rgb(158, 158, 158)"
            margin="30px 0 0 0"
            style={{
              letterSpacing: '-0.43px',
              borderTop: '1px solid rgb(158,158,158)',
            }}
            padding="20px 0 0 0"
            textAlign="center"
            width="100%"
            onClick={() => {
              dispatch(userActions.showLoginModal(false));
            }}
          >
            다음에 할게요
          </Text>
        </Inner>
      </ModalInner>
    </ModalWrapper>
  );
};

export default ChallengeModal;

const ModalWrapper = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: auto;
  outline: 0;
  background: rgba(0, 0, 0, 0.8);
`;

const ModalInner = styled.div`
  z-index: 1000;
  box-sizing: border-box;
  position: relative;
  background-color: #f7f7fa;
  width: 76%;
  width: 90vw;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 90%;
  width: 95%;
  margin: 15px auto 0px;
`;

const PurpleAcc = styled.div`
  position: absolute;
  width: 84px;
  height: 28px;
  background-color: rgba(74, 64, 255, 0.6);
  top: -14px;
  left: calc(50% - 42px);
`;
