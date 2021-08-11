import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';

import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as exerciseActions } from '../redux/modules/exercise';
import { history } from '../redux/configureStore';
import { FooterButton, Input } from '../shared/Styles';
import BookmarkSolid from '../img/bookmark_solid.svg';

// 북마크 버튼 클릭시 모달 생성 컴포넌트
const BookmarkModal = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const selectedPrevItem = useSelector((store) => store.exercise.selectedPrevItem);
  const [routineRename, setRoutineRename] = useState(selectedPrevItem.routineName);

  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };

  const reArrangeDetail = {
    id: selectedPrevItem.id,
    isBookmarked: true,
    routineName: routineRename
  };

  return (
    <ModalWrapper ref={modalRef} onClick={closeModal}>
      <ModalInner>
        <Inner>
          <BookmarkIcon src={BookmarkSolid} />
          <RoutineBasicInfo>
            <WhiteDiv />
            <TextWrapper>
              <Text>종목</Text>
              <TextValue>{selectedPrevItem.myExercise.length}</TextValue>
            </TextWrapper>
            <Div />
            <TextWrapper>
              <Text>날짜</Text>
              {selectedPrevItem &&
                <TextValue>{selectedPrevItem.createdAt.substring(5, 7)}.{selectedPrevItem.createdAt.substring(8, 10)}</TextValue>
              }
            </TextWrapper>
            <Div />
            <TextWrapper>
              <Text>시간</Text>
              <TextValue>{Math.floor(selectedPrevItem.routineTime / 60)}:{selectedPrevItem.routineTime % 60}</TextValue>
            </TextWrapper>
            <WhiteDiv />
          </RoutineBasicInfo>
          <Input
            placeholder={selectedPrevItem.routineName}
            value={routineRename}
            _onChange={(e) => {
              setRoutineRename(e.target.value);
            }} />
          <Text>저장할 루틴의 이름을 입력해주세요.</Text>

          {/* 저장버튼 */}
          <SaveButton
            onClick={() => {
              dispatch(exerciseActions.reArrangeRoutineDetailAPI(reArrangeDetail));
              setShowModal(false);
            }
            }>
            저장
          </SaveButton>
        </Inner>
      </ModalInner>
    </ModalWrapper>

  );
};

export default BookmarkModal;

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
  background-color: #fff;
  width: 76%;
  height: 40%;
  max-width: 480px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BookmarkIcon = styled.img`
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

const RoutineBasicInfo = styled.div`
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
  width: 45px;
`;

const Div = styled.div`
  border-right: 1px solid black;
  height: 22px;
`;

const WhiteDiv = styled.div`
  border-right: 1px solid transparent;
`;

const Text = styled.span`
  color: black;
  opacity: 54%;
  font-size: 10px;
  font-weight: 600;
  margin-bottom: 3px;
`;

const TextValue = styled.span`
  font-size: 14px;
`;

const SaveButton = styled.button`
  background-color: black;
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
`;

