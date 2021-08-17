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

// 피드 추가, 삭제할 때 생성되는 모달 컴포넌트
const AddAndDeleteModal = ({ showModal, setShowModal, showAddFeedModal, setShowAddFeedModal, message }) => {
  const dispatch = useDispatch();

  const modalRef = useRef();
  const buttonRef = useRef();
  const [cancel, setCancel] = useState(true);

  const selectedPrevItem = useSelector((store) => store.exercise.selectedPrevItem);
  const [routineRename, setRoutineRename] = useState(selectedPrevItem.routineName);

  const selectedFeed = useSelector((store) => store.feed.selectedFeed);

  const closeModal = (e) => {
    if (e.target === modalRef.current || buttonRef.current) {
      if (setShowModal) {
        setShowModal(false);
        return;
      }
      if (setShowAddFeedModal) {
        setShowAddFeedModal(false);
        return;
      }
    }
  };

  return (
    <>
      <ModalWrapper ref={modalRef} onClick={closeModal}>
        {setShowModal ? (
          <ModalInner>
            <Inner>
              {/* 삭제하기 버튼 */}
              <ConfirmButton
                onClick={() => {
                  history.replace('/feed');
                  dispatch(feedActions.deleteFeedAPI(selectedFeed._id));
                }}
                ref={buttonRef}
              >{message}
              </ConfirmButton>
            </Inner>
          </ModalInner>
        ) : (
          <ModalInner>
            <Inner>
              {/* 추가하기 버튼 */}
              <ConfirmButton
                onClick={() => {
                  history.push('/selectmyfeed');
                }}
                ref={buttonRef}
              >{message}
              </ConfirmButton>
            </Inner>
          </ModalInner>
        )}


        <ModalInner cancel={cancel}>
          <Inner >
            {/* 취소 버튼 */}
            <ConfirmButton
              onClick={() => {
                history.replace('/feed');
              }}
              ref={buttonRef}
            >취소
            </ConfirmButton>
          </Inner>
        </ModalInner>
      </ModalWrapper>
    </>
  );
};

export default AddAndDeleteModal;

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
      background-color: ${(props) => props.cancel ? '#E9E8FF' : '#fff'};
  width: 90%;
  max-width: 480px;
  top: 80%;
  transform: translateY(-50%);
  margin: 0 auto 15px auto;
  padding: 10px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;

`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 90%;
  width: 95%;

`;

const ConfirmButton = styled.button`
  background-color: transparent;
  color: black;
  text-align: center;
  line-height: 60px;
  font-size: 15px;
  cursor: pointer;
  border: none;
  height: 40px;
  width: 100%;
  border-radius: 50px;
  line-height: 1;
`;

const PurpleAcc = styled.div`
  position: absolute;
  width: 84px;
  height: 28px;
  background-color: rgba(74, 64, 255, 0.6);
  top: -14px;
  left: calc(50% - 42px);
`;
