import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import BookmarkLine from '../img/bookmark_line.svg';
import routineDelete from '../img/routine_delete.svg';
import EditIcon from '../img/edit_icon.svg';
import { FooterButton, Text, Icon } from '../shared/Styles';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as exerciseActions } from '../redux/modules/exercise';
import DashBoard from '../components/DashBoard';
import BookmarkModal from '../components/BookmarkModal';
import logger from '../shared/Logger';
import { history } from '../redux/configureStore';
import Header from '../components/Header';
import AddAndDeleteModal from '../components/AddAndDeleteModal';
import ErrorModal from '../components/ErrorModal';

// 오늘 추가한 루틴 상세 컴포넌트 - 루틴 상세 확인하고 운동 시작으로 이동
const TodayRoutineDetail = (props) => {
  const dispatch = useDispatch();
  const routine = useSelector((store) => store.exercise.routine[0]);

  const selectedPrevItem = useSelector(
    (store) => store.exercise.selectedPrevItem,
  );
  const id = selectedPrevItem.id;
  const openedRow = useSelector((state) => state.exercise.openedRow);

  const [showModal, setShowModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (selectedPrevItem.length !== 0) {
      dispatch(exerciseActions.getRoutineDetailAPI(id));
    }
  }, []);

  useEffect(() => {
    if (selectedPrevItem.length !== 0) {
      // dispatch(exerciseActions.getRoutineDetailAPI(id));
    }
  }, [selectedPrevItem]);

  useEffect(() => {
    return () => {
      closeRow();
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
        <Header toMain message="Main"></Header>

        <IconWrapper>
          {/* 루틴  수정 */}
          <IconImg
            src={EditIcon}
            onClick={() => {
              dispatch(exerciseActions.setIsFromTodayRoutineDetail(true));
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

      <BodyWrapper>
        {/* 대시보드 */}
        <DashBoard />

        <ListContainer>
          {routine &&
            routine.myExercise.map((list, listIdx) =>
              listIdx === parseInt(openedRow) ? (
                <OpenList id={listIdx} key={listIdx}>
                  <Text
                    type="contents"
                    minWidth="80px"
                    padding="0 0 0 20px"
                    fontWeight="600"
                    fontSize="1.1em"
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
                          color="#000"
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
                          color="#000"
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
                          color="#000"
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
                  {openedRow === null ? (
                    <>
                      <div
                        style={{
                          minWidth: '120px',
                        }}
                      >
                        <Text
                          type="contents"
                          margin="1em 10px 1em 20px"
                          padding="0 10px 0 0"
                          fontWeight="600"
                          fontSize="1.1em"
                          bgColor="rgba(74, 64, 255, 0.2)"
                          lineHeight="1.2em"
                          style={{
                            display: 'inline-block',
                          }}
                        >
                          {list.exerciseName}
                        </Text>
                      </div>
                      <Text type="contents">
                        {list &&
                          list.set !== [] &&
                          list.set.filter((set) => set.type === 'exercise')
                            .length}
                        세트
                      </Text>
                      <Text type="contents">
                        {list && list.set === [] ? null : list.set[0].weight}kg
                      </Text>
                      <Text type="contents" padding="0 20px 0 0">
                        {list && list.set === [] ? null : list.set[0].count}회
                      </Text>
                    </>
                  ) : (
                    <>
                      <div
                        style={{
                          minWidth: '120px',
                        }}
                      >
                        <Text
                          type="contents"
                          margin="1em 10px 1em 20px"
                          padding="0 10px 0 0"
                          fontWeight="600"
                          fontSize="1.1em"
                          color="#848484"
                          style={{
                            display: 'inline-block',
                          }}
                        >
                          {list.exerciseName}
                        </Text>
                      </div>
                      <Text type="contents" color="#848484">
                        {list &&
                          list.set !== [] &&
                          list.set.filter((set) => set.type === 'exercise')
                            .length}
                        세트
                      </Text>
                      <Text type="contents" color="#848484">
                        {list && list.set === [] ? null : list.set[0].weight}kg
                      </Text>
                      <Text
                        type="contents"
                        padding="0 20px 0 0"
                        color="#848484"
                      >
                        {list && list.set === [] ? null : list.set[0].count}회
                      </Text>
                    </>
                  )}
                </List>
              ),
            )}

          {/* 삭제버튼 */}
          <Selected
            onClick={() => {
              setShowDeleteModal(true);
            }}
          >
            <Icon src={routineDelete} width="20px" margin="0px 5px 0px 0px" />
            <Text margin="0px" type="contents" >
              루틴 삭제
            </Text>
          </Selected>
        </ListContainer>

        {showDeleteModal ? (
          <ErrorModal
            message="루틴을 삭제하시겠습니까?"
            buttonMessage="삭제"
            setShowDeleteModal={setShowDeleteModal}
            id={id}
          />
        ) : null}

        {showShareModal ? (
          <AddAndDeleteModal
            message="내 피드에 추가"
            setShowShareModal={setShowShareModal}
          />
        ) : null}

        {/* 운동시작 버튼 */}
        <FooterButtonWrapper>
          {routine && routine.isCompleted === true ? (
            <FooterButton
              onClick={() => {
                setShowShareModal(true);
              }}
            >
              공유하기
            </FooterButton>
          ) : (
            <FooterButton
              onClick={() => {
                history.push('/workout');
              }}
            >
              운동 시작
            </FooterButton>
          )}
        </FooterButtonWrapper>
      </BodyWrapper>
    </>
  );
};

export default TodayRoutineDetail;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${Color.bgIvory};
`;

const BodyWrapper = styled.div`
  background-color: #f7f7fa;
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

const innerHeight = window.innerHeight - 353;

const ListContainer = styled.div`
  padding: 20px;
  box-sizing: border-box;
  background-color: #f7f7fa;
  height: ${innerHeight}px;
  overflow-y: scroll;
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
  align-items: center;
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

const Selected = styled.div`
  font-size: 14px;
  border: 1px solid black;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 9px 0 7px;
  color: black;
  line-height: 32px;
  border-radius: 16px;
  margin: 20px 16px 0px 0px;
  width: 80px;
  background-color: #fff;
`;
