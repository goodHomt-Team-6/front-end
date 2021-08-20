import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import BookmarkLine from '../img/bookmark_line.svg';
import EditIcon from '../img/edit_icon.svg';
import { FooterButton, Text } from '../shared/Styles';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as exerciseActions } from '../redux/modules/exercise';
import DashBoard from '../components/DashBoard';
import BookmarkModal from '../components/BookmarkModal';
import logger from '../shared/Logger';
import { history } from '../redux/configureStore';
import Header from '../components/Header';
import AddFeedCompleteModal from '../components/AddFeedCompleteModal';
import moment from 'moment';

// 루틴 상세화면 컴포넌트 - 루틴 수정, 북마크추가, 루틴 이름 설정
const RoutineDetail = (props) => {
  const dispatch = useDispatch();
  const getDate = moment().format('YYYYMMDD');
  const selectedPrevItem = useSelector(
    (store) => store.exercise.selectedPrevItem,
  );

  const id = selectedPrevItem.id;
  const myTodayRoutine = useSelector((store) => store.exercise.myTodayRoutine);
  const routineName = selectedPrevItem.routineName;
  const myExercise = selectedPrevItem.myExercise;

  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (selectedPrevItem.length !== 0) {
      dispatch(exerciseActions.getRoutineDetailAPI(id));
    }
  }, [routineName]);

  useEffect(() => {
    dispatch(exerciseActions.getMyTodayRoutineAPI(getDate));
  }, []);

  return (
    <>
      {/* 뒤로가기 */}
      <HeaderWrapper>
        <Header message="Routine"></Header>

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
            selectedPrevItem.myExercise.map(
              (e, listIdx) =>
                e.set && (
                  <List key={listIdx}>
                    <Text type="contents" minWidth="80px" padding="0 0 0 10px">
                      {e.exerciseName}
                    </Text>
                    <Text type="contents"> {e?.set[0].setCount}세트</Text>
                    <Text type="contents">{e?.set[0].weight}kg</Text>
                    <Text type="contents" padding="0 10px 0 0">
                      {e.set[0].count}회
                    </Text>
                  </List>
                ),
            )}
        </Container>

        {/* 설정완료 버튼 */}
        <FooterButtonWrapper>
          <FooterButton
            onClick={() => {
              if (
                (myTodayRoutine && myTodayRoutine[0]?.isCompleted === true) ||
                myTodayRoutine.length !== 0
              ) {
                setShowConfirmModal(true);
              } else {
                const routine = {
                  routineName: routineName,
                  myExercise: myExercise,
                };
                dispatch(exerciseActions.addEditedRoutineAPI(routine));
              }
            }}
          >
            설정 완료
          </FooterButton>
        </FooterButtonWrapper>
        {showConfirmModal ? (
          <AddFeedCompleteModal
            message={'이미 오늘 운동을 등록했습니다!'}
            buttonMessage={'캘린더로 돌아가기'}
            setShowModal={setShowModal}
            buttonLink={'/calendar'}
          />
        ) : null}
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

const RoutineText = styled.h2`
  margin: 0px 5px 0px 0px;
  font-size: 14px;
  font-weight: 500;
`;
