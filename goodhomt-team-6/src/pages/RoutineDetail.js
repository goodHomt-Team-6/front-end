import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import BookmarkLine from '../img/bookmark_line.svg';
import EditIcon from '../img/edit_icon.svg';
import { FooterButton, Text } from '../shared/Styles';
import FormExercise from './FormExercise';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as exerciseActions } from '../redux/modules/exercise';
import DashBoard from '../components/DashBoard';
import BookmarkModal from '../components/BookmarkModal';
import logger from '../shared/Logger';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { history } from '../redux/configureStore';

// 루틴 상세화면 컴포넌트 - 루틴 수정, 북마크추가, 루틴 이름 설정
const RoutineDetail = (props) => {
  const dispatch = useDispatch();
  const selectedPrevItem = useSelector(
    (store) => store.exercise.selectedPrevItem,
  );
  const id = selectedPrevItem.id;
  const myRoutine = useSelector((store) => store.exercise.routine);
  const routineName = selectedPrevItem.routineName;

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (selectedPrevItem.length !== 0) {
      dispatch(exerciseActions.getRoutineDetailAPI(id));
    }
  }, [routineName]);

  return (
    <>
      {/* 뒤로가기 */}
      <HeaderWrapper>
        <GoBackButton
          onClick={() => {
            history.goBack();
          }}
        >
          <ArrowBackIosIcon style={{ width: '16px', height: '16px' }} />
          <Text
            fontWeight="500"
            type="title"
            margin="0px 5px 0px 0px;"
            fontSize="18px;"
          >
            Routine
          </Text>
        </GoBackButton>

        {/* 루틴  수정 */}
        <IconWrapper>
          <IconImg
            src={EditIcon}
            onClick={() => {
              history.push('/editroutine');
            }}
          />

          {/* 북마크 모달 */}
          <IconImg
            src={BookmarkLine}
            onClick={() => {
              setShowModal(true);
            }}
          />
        </IconWrapper>
      </HeaderWrapper>

      {showModal ? <BookmarkModal setShowModal={setShowModal} /> : null}

      <Wrapper>
        {/* 대시보드 */}
        <DashBoard />

        {/* 루틴의 세트 모음 */}
        <Container>
          {selectedPrevItem &&
            selectedPrevItem.myExercise.map((e, listIdx) => (
              <List key={listIdx}>
                <Text type="contents" minWidth="80px" padding="0 0 0 10px">
                  {e.exerciseName}
                </Text>
                <Text type="contents"> {e.set[0].setCount}세트</Text>
                <Text type="contents">{e.set[0].weight}kg</Text>
                <Text type="contents" padding="0 10px 0 0">
                  {e.set[0].count}회
                </Text>
              </List>
            ))}
        </Container>

        {/* 운동시작 버튼 */}
        <FooterButtonWrapper>
          <FooterButton
            onClick={() => {
              history.push('/workout');
            }}
          >
            운동시작
          </FooterButton>
        </FooterButtonWrapper>
      </Wrapper>
    </>
  );
};

export default RoutineDetail;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${Color.bgIvory};
`;

const IconWrapper = styled.div`
  margin: 25px;
  box-sizing: border-box;
  align-items: baseline;
`;

const IconImg = styled.img`
  cursor: pointer;
  :last-child {
    margin-left: 5px;
  }
`;

const Wrapper = styled.div`
  background-color: #f7f7fa;
`;

const Container = styled.div`
  padding: 20px;
  box-sizing: border-box;
  background-color: #f7f7fa;
  height: ${innerHeight}px;
  overflow-y: scroll;
`;

const FooterButtonWrapper = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
`;

const OpenList = styled.div`
  background-color: #fff;
  margin-top: 20px;
  /* &:first-child {
    margin-top: 0;
  } */
`;

const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #000;
  margin: 0 20px;
`;

const List = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  margin-top: 20px;
  &:first-child {
    margin-top: 0;
  }
`;

const GoBackButton = styled.div`
  display: flex;
  width: auto;
  justify-content: flex-start;
  padding: 25px;
  /* width: 100%; */
  box-sizing: border-box;
  align-items: baseline;
  background-color: #f7f7fa;
`;

const RoutineText = styled.h2`
  margin: 0px 5px 0px 0px;
  font-size: 14px;
  font-weight: 500;
`;
