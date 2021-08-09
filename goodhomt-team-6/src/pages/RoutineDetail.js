import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import BookmarkLine from '../img/bookmark_line.svg';
import EditIcon from '../img/edit_icon.svg';
import GoBackHeader from '../components/GoBackHeader';
import { FooterButton, Text } from '../shared/Styles';
import FormExercise from './FormExercise';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as exerciseActions } from '../redux/modules/exercise';
import DashBoard from '../components/DashBoard';
import Modal from '@material-ui/core/Modal';
import BookmarkModal from '../components/BookmarkModal';
import { history } from '../redux/configureStore';

// 루틴 상세화면 컴포넌트 - 루틴 수정, 북마크추가, 루틴 이름 설정
const RoutineDetail = (props) => {
  const dispatch = useDispatch();
  const selectedPrevItem = useSelector(
    (store) => store.exercise.selectedPrevItem,
  );
  const id = selectedPrevItem[0].id;
  const myRoutine = useSelector((store) => store.exercise.routine);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(exerciseActions.getRoutineDetailAPI(id));
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <>
      {/* 뒤로가기 */}
      <HeaderWrapper>
        <GoBackHeader>Routine</GoBackHeader>
        <IconWrapper>
          <IconImg src={EditIcon} />

          {/* 북마크 모달 */}
          <IconImg src={BookmarkLine} onClick={openModal} />
        </IconWrapper>
      </HeaderWrapper>

      {showModal ? <BookmarkModal setShowModal={setShowModal} /> : null}

      <Wrapper>
        {/* 대시보드 */}
        <DashBoard />

        {/* 루틴의 세트 모음 */}
        <Container>
          {myRoutine &&
            myRoutine[0].myExercise.map((e, listIdx) => (
              <List key={listIdx}>
                <Text type="contents" minWidth="80px" padding="0 0 0 10px">
                  {e.exerciseName}
                </Text>
                <Text type="contents"> {e.Sets[0].setCount}세트</Text>
                <Text type="contents">{e.Sets[0].weight}kg</Text>
                <Text type="contents" padding="0 10px 0 0">
                  {e.Sets[0].count}회
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
