import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import BookmarkLine from '../img/bookmark_line.svg';
import routineDelete from '../img/routine_delete.svg';
import EditIcon from '../img/edit_icon.svg';
import { FooterButton, Text, Icon } from '../shared/Styles';
import FormExercise from './FormExercise';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as exerciseActions } from '../redux/modules/exercise';
import DashBoard from '../components/DashBoard';
import BookmarkModal from '../components/BookmarkModal';
import logger from '../shared/Logger';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { history } from '../redux/configureStore';
import Header from '../components/Header';
import AddAndDeleteModal from '../components/AddAndDeleteModal';


// 오늘 추가한 루틴 상세 컴포넌트 - 루틴 상세 확인하고 운동 시작으로 이동
const TodayRoutineDetail = (props) => {
  const dispatch = useDispatch();

  const selectedPrevItem = useSelector((store) => store.exercise.selectedPrevItem);
  const id = selectedPrevItem.id;
  const routineName = selectedPrevItem.routineName;
  const openedRow = useSelector((state) => state.exercise.openedRow);

  const [showModal, setShowModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    dispatch(exerciseActions.getRoutineDetailAPI(id));
  }, []);

  useEffect(() => {
    if (selectedPrevItem.length !== 0) {
      dispatch(exerciseActions.getRoutineDetailAPI(id));
    }
  }, [routineName]);

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

        {/* 루틴  수정 */}
        <IconWrapper>
          <IconImg
            src={EditIcon}
            onClick={() => {
              history.push('/editroutine');
            }} />

          {/* 북마크 모달 */}
          <IconImg
            src={BookmarkLine}
            onClick={() => {
              setShowModal(true);
            }} />
        </IconWrapper>
      </HeaderWrapper>

      {showModal ?
        <BookmarkModal setShowModal={setShowModal} />
        : null}

      <BodyWrapper>
        {/* 대시보드 */}
        <DashBoard />

        <ListContainer>
          {selectedPrevItem &&
            selectedPrevItem.myExercise.map((list, listIdx) =>
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
                          fontSize="1.2em"
                          minWidth="80px"
                          color="#848484"
                        >
                          {set.type === 'exercise'
                            ? `${set.setCount}세트`
                            : '휴식'}
                        </Text>
                        <Text
                          type="contents"
                          fontSize="1.2em"
                          minWidth="80px"
                          textAlign="center"
                          color="#848484"
                        >
                          {set.type === 'exercise'
                            ? `${set.weight}Kg`
                            : `${set.minutes}분`}
                        </Text>
                        <Text
                          type="contents"
                          fontSize="1.2em"
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
                    {list && list.set !== [] &&
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

          {/* 삭제버튼 */}
          <Selected
            onClick={() => {
              dispatch(exerciseActions.deleteMyTodayRoutineAPI(id));
              history.replace('/');
            }}>
            <Icon
              src={routineDelete}
              width="20px"
              margin="0px 5px 0px 0px" />
            <Text
              margin="0px"
              type="contents"
            >삭제
            </Text>
          </Selected>
        </ListContainer>

        {showShareModal ? (
          <AddAndDeleteModal message="내 피드에 추가" setShowShareModal={setShowShareModal} />
        ) : null}

        {/* 운동시작 버튼 */}
        <FooterButtonWrapper>
          {selectedPrevItem && selectedPrevItem.isCompleted === true ? (
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
  padding: 0 8px;
  color: black;
  line-height: 32px;
  border-radius: 16px;
  margin: 20px 16px 0px 0px;
  width: 60px;
  background-color: #fff;
`;

const CloseBtn = styled.img`
  &:hover {
    cursor: pointer;
  }
`;
