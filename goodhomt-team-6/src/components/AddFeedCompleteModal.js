import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';

import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as exerciseActions } from '../redux/modules/exercise';
import { history } from '../redux/configureStore';
import { FooterButton, Input, Text } from '../shared/Styles';
import BookmarkSolid from '../img/bookmark_solid.svg';
import Mascort from '../img/mascort_blue.svg';


// 피드 업로드 완료 버튼 클릭시 모달 생성 컴포넌트
const AddFeedCompleteModal = ({ setShowModal }) => {
  const dispatch = useDispatch();

  const modalRef = useRef();
  const buttonRef = useRef();

  const selectedPrevItem = useSelector((store) => store.exercise.selectedPrevItem);
  const [routineRename, setRoutineRename] = useState(selectedPrevItem.routineName);

  const closeModal = (e) => {
    if (e.target === modalRef.current || buttonRef.current) {
      setShowModal(false);
    }
  };

  return (
    <ModalWrapper ref={modalRef} onClick={closeModal}>
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
            내 피드를 업로드 했습니다!
          </Text>

          {/* 저장버튼 */}
          <ConfirmButton
            onClick={() => {
              history.replace('/feed');
            }}
            ref={buttonRef}
          >바로 확인하기
          </ConfirmButton>
        </Inner>
      </ModalInner>
    </ModalWrapper>

  );
};

export default AddFeedCompleteModal;

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
