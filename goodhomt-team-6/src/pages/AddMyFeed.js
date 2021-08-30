import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configureStore';
import { Text, FooterButton, Icon } from '../shared/Styles';
import { actionCreators as feedActions } from '../redux/modules/feed';
import NextArrow from '../img/next_arrow_icon.svg';
import ratingGood from '../img/rating_good.svg';
import ratingBad from '../img/rating_bad.svg';
import ratingSoso from '../img/rating_soso.svg';
import AddFeedCompleteModal from '../components/AddFeedCompleteModal';
import { actionCreators as userActions } from '../redux/modules/user';
import logger from '../shared/Logger';

// input, textarea를 클릭했을때 해당 요소를 저장
var activeElement = document.activeElement;

// 피드 나의 루틴 추가하기 페이지
const AddMyFeed = (props) => {
  const dispatch = useDispatch();
  const selectedPrevItem = useSelector(
    (store) => store.exercise.selectedPrevItem,
  );
  const routine = useSelector((store) => store.exercise.routine[0]);
  const user = useSelector((store) => store.user.user);
  const communityNickname = useSelector(
    (store) => store.user.user.communityNickname,
  );
  const userImg = useSelector((store) => store.user.user.userImg);
  const isNickname = useSelector((store) => store.feed.isNickname);
  const savedNickname = useSelector((store) => store.feed.savedNickname);
  const savedRoutineName = useSelector((store) => store.feed.savedRoutineName);
  const savedDescription = useSelector((store) => store.feed.savedDescription);
  const isDoubleChecked = useSelector((store) => store.feed.isDoubleChecked);

  const [nickname, setNickname] = useState('');
  const [writeroutinename, setRoutinename] = useState('');
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showCheckModal, setShowCheckModal] = useState(false);
  var [innerHeight, setInnerHeight] = useState(window.innerHeight - 267);

  useEffect(() => {
    if (savedNickname !== '' || savedRoutineName !== '') {
      setNickname(savedNickname);
      setRoutinename(savedRoutineName);
      setDescription(savedDescription);
    }
  }, []);

  // 클릭한 input, textarea 요소가 생기거나 변할때마다 resize 이벤트를 감지해서 useState를 이용해 innerHeight 값을 변경시켜줌
  useEffect(() => {
    const detctMobileKeyboard = () => {
      setInnerHeight(window.innerHeight - 267);
    };
    window.addEventListener('resize', detctMobileKeyboard);
    return window.addEventListener('resize', detctMobileKeyboard);
  }, [activeElement]);

  useEffect(() => {
    if (savedNickname !== '' || savedRoutineName !== '') {
      setNickname(savedNickname);
      setRoutinename(savedRoutineName);
      setDescription(savedDescription);
    }
  }, [isDoubleChecked]);

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
    dispatch(feedActions.isDoubleChecked(false));
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
    isBookmarked: routine.isBookmarked,
    routineTime: routine.routineTime,
    myExercise: routine.myExercise,
    userImg: userImg,
  };

  const notFirstWriteRoutine = {
    routineName: writeroutinename,
    communityNickname: communityNickname,
    description: description,
    isBookmarked: routine.isBookmarked,
    routineTime: routine.routineTime,
    myExercise: routine.myExercise,
    userImg: userImg,
  };

  return (
    <>
      {/* 헤더 */}
      <Header message="Feed" />

      <Text
        type="contents"
        fontSize="14px"
        padding="0px 1.5rem 1rem 1.5rem"
        margin="0px"
        bgColor="#f7f7fa"
      >
        루틴 제목과 설명을 입력해주세요 :)
      </Text>

      {/* 나의 오늘 운동 루틴 가져오기 */}
      <CategoryList>
        <TodayExerciseWrapper>
          {routine && routine.rating === 'soso' && (
            <TimeBox src={ratingSoso}></TimeBox>
          )}
          {routine && routine.rating === 'bad' && (
            <TimeBox src={ratingBad}></TimeBox>
          )}
          {routine && routine.rating === 'good' && (
            <TimeBox src={ratingGood}></TimeBox>
          )}

          <RoutineBox>
            <RoutineName>{routine.routineName}</RoutineName>
            <TextWrapper>
              <WorkoutDate>
                {routine.createdAt.substring(5, 7)}.
                {routine.createdAt.substring(8, 10)}
              </WorkoutDate>
              <WorkoutDate>
                {Math.floor(routine.routineTime / 60) < 10 ? (
                  <Time>{'0' + Math.floor(routine.routineTime / 60)}:</Time>
                ) : (
                  <Time>{Math.floor(routine.routineTime / 60)}:</Time>
                )}
                {routine.routineTime % 60 < 10 ? (
                  <Time>{'0' + (routine.routineTime % 60)}</Time>
                ) : (
                  <Time>{routine.routineTime % 60}</Time>
                )}
              </WorkoutDate>
            </TextWrapper>
          </RoutineBox>
          <Icon
            src={NextArrow}
            onClick={() => {
              history.push('/feedroutinedetail');
              dispatch(feedActions.saveRoutinename(writeroutinename));
              dispatch(feedActions.saveDescription(description));
            }}
          />
        </TodayExerciseWrapper>
      </CategoryList>

      {/* 피드 작성하기 */}
      <Container innerHeight={innerHeight}>
        {/* 커뮤니티 닉네임 - 토큰에 닉네임 있는지 없는지 확인 */}
        <TextCont>
          {user && user.communityNickname === null ? (
            <Text type="contents">User name</Text>
          ) : null}
          {user && user.communityNickname === null ? (
            <NicknameCont>
              <TextInput
                onChange={onChangeNickname}
                value={nickname}
                placeholder="닉네임"
              ></TextInput>
              <CheckerBtn
                onClick={() => {
                  dispatch(feedActions.checkNicknameAPI(nickname));
                  dispatch(feedActions.saveNickname(nickname));
                  setShowCheckModal(true);
                  dispatch(feedActions.isDoubleChecked(true));
                }}
              >
                중복확인
              </CheckerBtn>
            </NicknameCont>
          ) : null}

          {showCheckModal ? (
            <AddFeedCompleteModal
              setShowCheckModal={setShowCheckModal}
              setNickname={setNickname}
            />
          ) : null}

          <Text type="contents">Routine name</Text>
          <TextInput
            placeholder="루틴 이름을 작성해주세요."
            onChange={onChangeRoutinename}
            value={writeroutinename || ''}
          ></TextInput>

          <Text type="contents">Description</Text>
          <ElTextarea
            onChange={onChangeDescription}
            value={description || ''}
            placeholder="루틴에 대해 설명해주세요."
          ></ElTextarea>
        </TextCont>
      </Container>

      {showModal ? (
        <AddFeedCompleteModal
          message={'내 피드를 업로드 했습니다!'}
          buttonMessage={'바로 확인하기'}
          setShowModal={setShowModal}
        />
      ) : null}

      <FooterButtonWrapper>
        {writeroutinename !== '' && description !== '' ? (
          <FooterButton
            onClick={() => {
              if (communityNickname !== null) {
                dispatch(feedActions.addFeedAPI(notFirstWriteRoutine));
                setShowModal(true);
              }
              if (communityNickname === null && isDoubleChecked === true) {
                dispatch(feedActions.addFeedAPI(firstWriteRoutine));
                dispatch(userActions.getUpdatedAccessTokenAPI());
                setShowModal(true);
              }
              dispatch(feedActions.initializeWrittenFeed());
            }}
          >
            업로드 하기
          </FooterButton>
        ) : (
          <FooterButton disabled>업로드하기</FooterButton>
        )}
      </FooterButtonWrapper>
    </>
  );
};

export default AddMyFeed;

const Container = styled.div`
  padding: 0px 1.5rem;
  height: ${(props) => props.innerHeight}px;
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
  padding: 1rem 0px 28px 0px;
  font-size: 1rem;
  &:hover,
  &:active {
    cursor: pointer;
  }
`;

const TimeBox = styled.div`
  background-color: ${(props) => (props.completed ? '#4A40FF' : 'black')};
  width: 75px;
  min-width: 75px;
  height: 44px;
  border-radius: 30px;
  color: white;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-content: center;
  background-image: url('${(props) => props.src}');
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
`;

const Time = styled.span`
  font-size: 14px;
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
  min-width: 75px;
`;

const ElTextarea = styled.textarea`
  background-color: #eeedff;
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
  word-spacing: -0.2em;
`;

const NicknameCont = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const TextInput = styled.input`
  background-color: #eeedff;
  border: none;
  padding: 15px;
  box-sizing: border-box;
  width: 100%;
  :focus {
    outline: none;
  }
`;

const TextWrapper = styled.div`
  display: flex;
`;

const FooterButtonWrapper = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
`;
