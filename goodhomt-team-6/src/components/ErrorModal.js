import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';

import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configureStore';
import { Text } from '../shared/Styles';
import Mascort from '../img/mascort_blue.svg';
import logger from '../shared/Logger';
import { actionCreators as challengeActions } from '../redux/modules/challenge';
import { actionCreators as exerciseActions } from '../redux/modules/exercise';
import { actionCreators as feedActions } from '../redux/modules/feed';

// 검색어 키워드 없을 시에 생성되는 모달 컴포넌트(삭제시에 확인 모달로도 활용할 예정)
const ErrorModal = ({ id, message, buttonMessage, setShowDeleteModal, setShowErrorModal, buttonLink }) => {
  const dispatch = useDispatch();

  const modalRef = useRef();
  const buttonRef = useRef();

  const isNickname = useSelector((store) => store.feed.isNickname);
  const nickname = useSelector((store) => store.feed.nickname);
  const selectedPrevItem = useSelector(
    (store) => store.exercise.selectedPrevItem,
  );
  const [routineRename, setRoutineRename] = useState(
    selectedPrevItem.routineName,
  );

  const closeModal = (e) => {
    if (e.target === modalRef.current || buttonRef.current) {
      if (setShowErrorModal) {
        setShowErrorModal(false);
        return;
      }
      if (setShowDeleteModal) {
        setShowDeleteModal(false);
        return;
      }
    }
  };

  return (
    <ModalWrapper ref={modalRef} onClick={closeModal}>
      {setShowErrorModal ? (
        <ModalInner>
          <PurpleAcc></PurpleAcc>
          <Inner>
            <MascortIcon src={Mascort} borderRadius="0" />
            <Text
              type="contents"
              color="black"
              fontSize="17px"
              margin="10px 0 10px 0"
            >
              {message}
            </Text>

            {/* 피드로 돌아가기 */}
            <ConfirmButton
              onClick={() => {
                history.replace('/feed');
                dispatch(feedActions.isSearchError(false));
              }}
              ref={buttonRef}
            >
              {buttonMessage}
            </ConfirmButton>
          </Inner>
        </ModalInner>
      ) : (
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
              {message}
            </Text>

            {/* 삭제버튼 */}
            <ConfirmButton onClick={() => {
              dispatch(exerciseActions.deleteMyTodayRoutineAPI(id));
              history.replace('/');
            }} ref={buttonRef}>
              {buttonMessage}
            </ConfirmButton>
          </Inner>
        </ModalInner>
      )}
    </ModalWrapper>
  );
};

export default ErrorModal;

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
