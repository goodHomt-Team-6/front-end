import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import Header from '../components/Header';
import Cookies from 'universal-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Image, Text, FooterButton, Icon } from '../shared/Styles';
import NextArrow from '../img/next_arrow_icon.svg';
import { actionCreators as feedActions } from '../redux/modules/feed';
import { history } from '../redux/configureStore';
import AddFeedCompleteModal from '../components/AddFeedCompleteModal';
import { actionCreators as userActions } from '../redux/modules/user';
import logger from '../shared/Logger';

// 피드에 나의 루틴 추가하기 페이지
const AddMyFeed = (props) => {
  const dispatch = useDispatch();
  const selectedPrevItem = useSelector((store) => store.exercise.selectedPrevItem);
  const user = useSelector((store) => store.user.user);
  const communityNickname = useSelector((store) => store.user.user.communityNickname);
  const userImg = useSelector((store) => store.user.user.userImg);

  const [nickname, setNickname] = useState('');
  const [writeroutinename, setRoutinename] = useState('');
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const onChangeRoutinename = (e) => {
    setRoutinename(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const firstWriteRoutine = {
    routineName: writeroutinename,
    communityNickname: nickname,
    description: description,
    isBookmarked: selectedPrevItem.isBookmarked,
    routineTime: selectedPrevItem.routineTime,
    myExercise: selectedPrevItem.myExercise,
    userImg: userImg
  };

  const notFirstWriteRoutine = {
    routineName: writeroutinename,
    communityNickname: communityNickname,
    description: description,
    isBookmarked: selectedPrevItem.isBookmarked,
    routineTime: selectedPrevItem.routineTime,
    myExercise: selectedPrevItem.myExercise,
    userImg: userImg
  };

  return (
    <>
      {/* 헤더 */}
      <Header message="Feed" />

      {/* 나의 오늘 운동 루틴 가져오기 */}
      <CategoryList>
        <TodayExerciseWrapper>
          <TimeBox>
            <Time>
              운동 전
            </Time>
          </TimeBox>
          <RoutineBox>
            <RoutineName>
              {selectedPrevItem.routineName}
            </RoutineName>
            <TextWrapper>
              <WorkoutDate>{selectedPrevItem.createdAt.substring(5, 7)}.{selectedPrevItem.createdAt.substring(8, 10)}
              </WorkoutDate>
              <WorkoutDate>
                {Math.floor(selectedPrevItem.routineTime / 60)}:{Math.floor(selectedPrevItem.routineTime % 60)}
              </WorkoutDate>
            </TextWrapper>
          </RoutineBox>
          <Icon
            src={NextArrow}
            onClick={() => {
              history.push('/feedroutinedetail');
            }} />
        </TodayExerciseWrapper>
      </CategoryList>

      {/* 피드 작성하기 */}
      <Container>
        {/* 커뮤니티 닉네임 - 토큰에 닉네임 있는지 없는지 확인 */}
        <TextCont>
          {user && user.communityNickname === null ?
            <Text type="contents">User name</Text>
            : null}
          {user && user.communityNickname === null ? (
            <NicknameCont>
              <TextInput
                onChange={onChangeNickname}
                value={nickname}
                placeholder="닉네임">
              </TextInput>
              <CheckerBtn
                onClick={() => {
                  logger('중복확인 버튼 클릭');
                }}
              >중복확인</CheckerBtn>
            </NicknameCont>
          ) : null}

          <Text
            type="contents">
            Routine name
          </Text>
          <TextInput
            placeholder={selectedPrevItem.routineName}
            onChange={onChangeRoutinename}
            value={writeroutinename}
          >
          </TextInput>

          <Text type="contents">Description</Text>
          <ElTextarea
            onChange={onChangeDescription}
            value={description}
            placeholder="루틴에 대해 설명해주세요.">
          </ElTextarea>
        </TextCont>
      </Container>

      <FooterButton
        onClick={
          () => {
            if (communityNickname !== null) {
              dispatch(feedActions.addFeedAPI(notFirstWriteRoutine));
              setShowModal(true);
            } else {
              dispatch(feedActions.addFeedAPI(firstWriteRoutine));
              setShowModal(true);
            }

          }}
      >업로드 하기
      </FooterButton>

      {showModal ? <AddFeedCompleteModal setShowModal={setShowModal} /> : null}
    </>
  );
};

export default AddMyFeed;

const Container = styled.div`
  padding: 0px 1.5rem;
  height: calc(100vh - 240px);
  overflow-y: scroll;
  background-color: #f7f7fa;
`;

const CategoryList = styled.ul`
  margin: 0px;
  list-style: none;
  box-sizing: border-box;
  overflow-x: scroll;
  padding: 0px 1.5rem;
  background-color: #f7f7fa;
`;

const TextCont = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  margin-bottom: 28px;
`;

const TodayExerciseWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 48px;
  border-bottom: 1px solid ${Color.lightGray};
  line-height: 48px;
  margin: 0px;
  padding: 28px 0px;
  font-size: 1rem;
  &:hover,
  &:active {
  cursor: pointer;
  }
`;

const TimeBox = styled.div`
  background-color: ${(props) => props.completed ? '#4A40FF' : 'black'};
  width: 25%;
  min-width: 75px;
  height: 44px;
  border-radius: 22px;
  color: white;
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-content: center;
  background-image: url("${(props) => props.src}");
  background-size: 25%;
  background-repeat: no-repeat;
  background-position: center;
`;

const Time = styled.span`
  line-height: 45px;
  font-size: 14px;
`;

const RoutineInfo = styled.div`
  display: flex;
`;

const RoutineName = styled.span`
  font-size: 14px;
  line-height: 24px;
`;

const WorkoutDate = styled.span`
  font-size: 14px;
  line-height: 24px;
  margin-right: 8px;
`;

const RoutineBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CheckerBtn = styled.button`
  font-size: 14px;
  border: 1px solid ${Color.mainBlue};
  height: 32px;
  padding: 0 8px;
  color: black;
  line-height: 32px;
  border-radius: 16px;
  background-color: transparent;
  width: 25%;
  margin-left: 15px;
  min-width: 70px;
`;

const ElTextarea = styled.textarea`
  background-color: #EEEDFF;
  box-sizing: border-box;
  min-height: 112px;
  padding: 20px;
  width: 100%;
  height: 120px;
  resize: none;
  border: none;
  border-radius: 5px;
  &:focus,
  &:active {
    outline: none;
  }
`;

// const TextInput = styled.input`
//   background-color: #EEEDFF;
//   border: none;
//   padding: 15px;
//   width: 75%;
//   border-radius: 10px;
// `;

const NicknameCont = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const TextInput = styled.input`
  background-color: #EEEDFF;
  border: none;
  padding: 15px;
  box-sizing: border-box;
  width: 100%;
  :focus{
    outline: none;
  }
`;

const TextWrapper = styled.div`
  display: flex;
`;