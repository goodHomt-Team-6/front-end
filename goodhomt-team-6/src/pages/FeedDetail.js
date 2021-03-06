import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import BookmarkLine from '../img/bookmark_line.svg';
import EditIcon from '../img/edit_icon.svg';
import { FooterButton, Text } from '../shared/Styles';
import FormExercise from './FormExercise';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as exerciseActions } from '../redux/modules/exercise';
import { actionCreators as feedActions } from '../redux/modules/feed';
import DashBoard from '../components/DashBoard';
import AddFeedCompleteModal from '../components/AddFeedCompleteModal';
import logger from '../shared/Logger';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { history } from '../redux/configureStore';
import Header from '../components/Header';
import _ from 'lodash';
import moment from 'moment';

// 피드 루틴 상세화면 컴포넌트
const RoutineDetail = (props) => {
  const dispatch = useDispatch();

  const selectedPrevItem = useSelector(
    (store) => store.exercise.selectedPrevItem,
  );
  const id = selectedPrevItem.id;
  const openedRow = useSelector((state) => state.exercise.openedRow);
  const selectedFeed = useSelector((state) => state.feed.selectedFeed);
  const _selectedFeed = { ...selectedFeed, date: moment().format('YYYYMMDD') };
  const myTodayRoutine = useSelector((state) => state.exercise.myTodayRoutine);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(exerciseActions.initializeRoutine());
    dispatch(feedActions.getFeedDetailAPI(id));
  }, []);

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
      <HeaderWrapper>
        {/* 뒤로가기 */}
        <Header message="Feed" />
      </HeaderWrapper>

      {showModal ? (
        <AddFeedCompleteModal
          message={'이미 오늘 운동을 등록했습니다!'}
          buttonMessage={'피드로 돌아가기'}
          setShowModal={setShowModal}
        />
      ) : null}

      <Wrapper>
        {/* 대시보드 */}
        <DashBoard selectedFeed={selectedFeed} />

        {/* 루틴의 세트 모음 */}
        <ListContainer>
          {!_.isEmpty(selectedFeed) &&
            selectedFeed.myExercise.map((list, listIdx) =>
              listIdx === parseInt(openedRow) ? (
                <OpenList id={listIdx} key={listIdx}>
                  <Text
                    type="contents"
                    minWidth="80px"
                    padding="0 0 0 20px"
                    fontWeight="500"
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
                          fontWeight="500"
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
                          fontWeight="500"
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
        </ListContainer>

        {/* 루틴불러오기 버튼 */}
        <FooterButtonWrapper>
          <FooterButton
            onClick={() => {
              if (myTodayRoutine.length === 0 || myTodayRoutine === null) {
                dispatch(exerciseActions.addEditedRoutineAPI(_selectedFeed));
              } else {
                setShowModal(true);
              }
            }}
          >
            루틴 불러오기
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

const innerHeight = window.innerHeight - 355;

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
