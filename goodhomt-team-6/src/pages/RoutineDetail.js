import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import BookmarkLine from '../img/bookmark_line.svg';
import EditIcon from '../img/edit_icon.svg';
import { FooterButton, Text } from '../shared/Styles';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as exerciseActions } from '../redux/modules/exercise';
import { actionCreators as calendarActions } from '../redux/modules/calendar';
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
  const routine = useSelector((store) => store.exercise.routine[0]);
  const selectedPrevItem = useSelector(
    (store) => store.exercise.selectedPrevItem,
  );

  const id = selectedPrevItem.id;
  const myTodayRoutine = useSelector((store) => store.exercise.myTodayRoutine);
  const routineName = selectedPrevItem.routineName;
  const myExercise = routine.myExercise;
  const openedRow = useSelector((state) => state.exercise.openedRow);
  const isCalendarChallengeData = useSelector(
    (store) => store.calendar.isCalendarChallengeData,
  );
  const isFromCalendar = useSelector((state) => state.calendar.isFromCalendar);

  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (selectedPrevItem.length !== 0) {
      dispatch(exerciseActions.getRoutineDetailAPI(id));
    }
  }, [routineName]);

  // useEffect(() => {
  //   dispatch(exerciseActions.getRoutineDetailAPI(id));
  // }, []);

  useEffect(() => {
    dispatch(exerciseActions.getMyTodayRoutineAPI(getDate));
    return () => {
      dispatch(calendarActions.setIsCalendarChallengeData(false));
      dispatch(calendarActions.setIsFromCalendar(false));
    };
  }, []);

  const openRow = (e) => {
    const target = e.currentTarget.id;
    dispatch(exerciseActions.openRow(target));
  };

  const closeRow = () => {
    dispatch(exerciseActions.openRow(null));
  };

  return (
    <>
      {/* 뒤로가기 */}
      <HeaderWrapper>
        <Header message="Routine"></Header>

        {/* 루틴  수정 */}
        <IconWrapper>
          {!isFromCalendar && (
            <IconImg
              src={EditIcon}
              onClick={() => {
                // selectedPrevItem을 routine으로 옮겨줌
                // dispatch(exerciseActions.getMyRoutine([selectedPrevItem]));
                dispatch(exerciseActions.getRoutineDetailAPI(id));
                history.push('/editroutine');
              }}
            />
          )}

          {/* 북마크 모달 */}
          {/* 챌린지 데이터일때는 북마크를 숨김. 챌린지 데이터와 루틴 데이터는 구별이 되어있기 때문에 둘을 호환하기에는 수정 스코프가 너무 큼. */}
          {!isCalendarChallengeData && (
            <IconImg
              src={BookmarkLine}
              onClick={() => {
                setShowModal(true);
              }}
            />
          )}
        </IconWrapper>
      </HeaderWrapper>

      {showModal ? <BookmarkModal setShowModal={setShowModal} /> : null}

      <Wrapper>
        {/* 대시보드 */}
        <DashBoard />

        {/* 루틴의 세트 모음 */}
        <ListContainer>
          {routine &&
            routine.myExercise.map((list, listIdx) =>
              listIdx === parseInt(openedRow) ? (
                <OpenList id={listIdx} key={listIdx}>
                  <Text
                    type="contents"
                    minWidth="80px"
                    padding="0 0 0 20px"
                    onClick={() => {
                      closeRow();
                    }}
                  >
                    {list.exerciseName}
                  </Text>
                  {list &&
                    list.set.map((set, setIdx) => (
                      <DataRow key={setIdx}>
                        <Text
                          type="contents"
                          fontSize="1.1em"
                          minWidth="80px"
                          color="#848484"
                        >
                          {set.type === 'exercise'
                            ? `${set.setCount}세트`
                            : '휴식'}
                        </Text>
                        <Text
                          type="contents"
                          fontSize="1.1em"
                          minWidth="80px"
                          textAlign="center"
                          color="#848484"
                        >
                          {set.type === 'exercise'
                            ? `${set.weight}kg`
                            : `${set.minutes}분`}
                        </Text>
                        <Text
                          type="contents"
                          fontSize="1.1em"
                          minWidth="80px"
                          textAlign="right"
                          color="#848484"
                        >
                          {set.type === 'exercise'
                            ? `${set.count}회`
                            : `${set.seconds}초`}
                        </Text>
                      </DataRow>
                    ))}
                </OpenList>
              ) : (
                <List
                  id={listIdx}
                  key={listIdx}
                  onClick={(e) => {
                    openRow(e);
                  }}
                >
                  <Text type="contents" minWidth="80px" padding="0 0 0 20px">
                    {list.exerciseName}
                  </Text>
                  <Text type="contents">
                    {list &&
                      list.set !== [] &&
                      list.set.filter((set) => set.type === 'exercise').length}
                    세트
                  </Text>
                  <Text type="contents">
                    {list && list.set === [] ? null : list.set[0].weight}kg
                  </Text>
                  <Text type="contents" padding="0 20px 0 0">
                    {list && list.set === [] ? null : list.set[0].count}회
                  </Text>
                </List>
              ),
            )}
        </ListContainer>

        {/* 설정완료(루틴불러오기) 버튼 */}
        <FooterButtonWrapper>
          <FooterButton
            onClick={() => {
              if (
                (myTodayRoutine !== null &&
                  myTodayRoutine[0]?.isCompleted === true) ||
                (myTodayRoutine !== null && myTodayRoutine.length !== 0)
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
            루틴 불러오기
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

const innerHeight = window.innerHeight - 356;

const ListContainer = styled.div`
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
  &:first-child {
    margin-top: 0;
  }
  padding-bottom: 20px;
  overflow-y: scroll;
  -webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
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
  overflow-y: scroll;
  &:first-child {
    margin-top: 0;
  }
  -webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
`;

const RoutineText = styled.h2`
  margin: 0px 5px 0px 0px;
  font-size: 14px;
  font-weight: 500;
`;
