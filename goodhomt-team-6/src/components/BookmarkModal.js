import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';

import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as exerciseCreator } from '../redux/modules/exercise';
import { history } from '../redux/configureStore';
import { FooterButton, Input } from '../shared/Styles';
import BookmarkSolid from '../img/bookmark_solid.svg';

// 북마크 버튼 클릭시 모달 생성 컴포넌트
const BookmarkModal = ({ setShowModal }) => {
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
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
              <TextValue>3</TextValue>
            </TextWrapper>
            <Div />
            <TextWrapper>
              <Text>날짜</Text>
              <TextValue>07.26</TextValue>
            </TextWrapper>
            <Div />
            <TextWrapper>
              <Text>시간</Text>
              <TextValue>0:00</TextValue>
            </TextWrapper>
            <WhiteDiv />
          </RoutineBasicInfo>
          <Input>스쿼트 외2</Input>
          <Text>저장할 루틴의 이름을 입력해주세요.</Text>
          <SaveButton onClick={() => setShowModal(false)}>저장</SaveButton>
        </Inner>
      </ModalInner>
    </ModalWrapper>

  );
};

export default BookmarkModal;

const ModalWrapper = styled.div`
  box-sizing: border-box;
  /* display: ${(props) => (props.visible ? 'block' : 'none')}; */
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  width: 70%;
  height: 40%;
  max-width: 480px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 10px;
`;

const BookmarkIcon = styled.img`
  width: 24px;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 90%;
  margin-top: 10px;
`;

const RoutineBasicInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const TextWrapper = styled.div`
  /* border-right: 1px solid black;
  :last-child{
    border-right: none;
  } */
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40px;
`;

const Div = styled.div`
  border-right: 1px solid black;
`;

const WhiteDiv = styled.div`
  border-right: 1px solid transparent;
`;

const Text = styled.span`
  color: gray;
  font-size: 12px;
`;

const TextValue = styled.span`
`;

const SaveButton = styled.button`
  background-color: black;
  color: white;
  text-align: center;
  line-height: 60px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  width: 100%;
  border-radius: 50px;
  margin-top: 20px;
`;

