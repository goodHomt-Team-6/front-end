import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';

import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configureStore';
import { Text } from '../shared/Styles';
import Mascort from '../img/mascort_blue.svg';
import logger from '../shared/Logger';

// 북마크 버튼 클릭시 모달 생성 컴포넌트
const ChallengeModal = ({
  exerciseLength,
  time,
  challengeName,
  firstExerciseName,
  userCount,
}) => {
  const timeFormatting = () => {
    const month = time.slice(4, 6) < 10 ? time.slice(5, 6) : time.slice(4, 6);
    const day = time.slice(6, 8) < 10 ? time.slice(7, 8) : time.slice(6, 8);
    const hour = time.slice(8, 10);
    const minute = time.slice(10, 12);

    return `${month}/${day} ${hour}:${minute}`;
  };

  return (
    <ModalWrapper>
      <ModalInner>
        <PurpleAcc></PurpleAcc>
        <Inner>
          <MascortIcon src={Mascort} borderRadius="0" />
          <Text
            type="contents"
            color="black"
            fontSize="18px"
            margin="10px 0 10px 0"
          >
            챌린지 신청이 완료되었습니다!
          </Text>
          <ChallengeBasicInfo>
            <WhiteDiv />
            <TextWrapper>
              <Text type="contents" opacity="54%" fontSize="11px" margin="0px">
                종목
              </Text>
              <Text
                type="contents"
                color="black"
                fontSize="12px"
                margin="0 0 3px 0"
              >
                {firstExerciseName}
                {exerciseLength > 1 && ` 외 ${exerciseLength - 1}종목`}
              </Text>
            </TextWrapper>
            <Div />
            <TextWrapper>
              <Text type="contents" opacity="54%" fontSize="11px" margin="0px">
                날짜
              </Text>
              <Text
                type="contents"
                color="black"
                fontSize="12px"
                margin="0 0 3px 0"
              >
                {timeFormatting()}
              </Text>
            </TextWrapper>
            <Div />
            <TextWrapper>
              <Text type="contents" opacity="54%" fontSize="11px" margin="0px">
                참가자 수
              </Text>
              <Text
                type="contents"
                color="black"
                fontSize="14px"
                margin="0 0 3px 0"
              >
                {userCount}명
              </Text>
            </TextWrapper>
            <WhiteDiv />
          </ChallengeBasicInfo>

          {/* 저장버튼 */}
          <ConfirmButton
            onClick={() => {
              history.replace('/community');
            }}
          >
            {challengeName}
          </ConfirmButton>
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
  z-index: 100;
  overflow: auto;
  outline: 0;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
`;

const ModalInner = styled.div`
  z-index: 1000;
  box-sizing: border-box;
  position: relative;
  background-color: #f7f7fa;
  width: 76%;
  max-width: 480px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MascortIcon = styled.img`
  width: 24px;
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

const ChallengeBasicInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const TextWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
`;

const Div = styled.div`
  border-right: 1px solid black;
  height: 22px;
`;

const WhiteDiv = styled.div`
  border-right: 1px solid transparent;
`;

const ConfirmButton = styled.button`
  background-color: #4a40ff;
  color: white;
  text-align: center;
  line-height: 60px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  height: 40px;
  width: 100%;
  border-radius: 50px;
  margin-top: 20px;
  line-height: 1;
  padding: 8px 0px;
`;

const PurpleAcc = styled.div`
  position: absolute;
  width: 84px;
  height: 28px;
  background-color: rgba(74, 64, 255, 0.6);
  top: -14px;
  left: calc(50% - 42px);
`;