import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Button, Image, Text } from '../shared/Styles';
import Color from '../shared/Color';
import playButton from '../img/play_button.svg';
import { history } from '../redux/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import profileImage from '../img/profile-image.svg';
import formerRoutine from '../img/former_routine_button.svg';
import addButton from '../img/add_exercise_button.svg';
import NavBar from '../components/NavBar';
import { actionCreators as userActions } from '../redux/modules/user';
import { actionCreators as exerciseActions } from '../redux/modules/exercise';
import { actionCreators as challengeActions } from '../redux/modules/challenge';
import moment from 'moment';
import logger from '../shared/Logger';
import NextBtn from '../img/next_button.svg';
import PrevBtn from '../img/prev_button.svg';
import RemoveBtn from '../img/remove_button.svg';
import CompletedBtn from '../img/completed_icon.svg';
import BadRating from '../img/clicked_bad_rating.svg';
import GoodRating from '../img/clicked_good_rating.svg';
import NormalRating from '../img/clicked_normal_rating.svg';
import ChallengeBox from '../components/MainChallengeBox';
import ChallengeModal from '../components/ChallengeModal';

// 메인 페이지 컴포넌트
const Main = (props) => {
  const dispatch = useDispatch();

  const todayDate = moment().format('MM.DD').replace(/(^0+)/, '');
  const userName = useSelector((store) => store.user.user.nickname);
  const userImg = useSelector((store) => store.user.user.userImg);
  const myTodayRoutine = useSelector((store) => store.exercise.myTodayRoutine);
  const getDate = moment().format('YYYYMMDD');
  const myChallenges = useSelector((store) => store.challenge.myChallenges);
  const myFirstChallenge = myChallenges.filter(
    (challenge, idx) => challenge.Challenge.progressStatus != 'end',
  )[0];

  const myFirstChallengeExercises = useSelector(
    (store) => store.challenge.challengeDetail.challenge?.Challenge_Exercises,
  );

  const myFirstChallengeUserCount = useSelector(
    (store) => store.challenge.challengeDetail.challenge?.userCount,
  );

  const [clicked, setClicked] = useState([]);
  const [completed, isCompleted] = useState(true);
  const [challengeModal, showChallengeModal] = useState(false);

  // 오늘 저장한 나의 루틴 가져오기
  useEffect(() => {
    dispatch(exerciseActions.getMyTodayRoutineAPI(getDate));
    dispatch(challengeActions.getMyChallengesAPI('get_detail'));
  }, []);

  return (
    <Container>
      <Wrapper>
        <InboxWrapper>
          {/* 유저 프로필 */}
          <UserWrapper>
            <InfoBox>
              <Image
                width="40px"
                height="40px"
                margin="0px 15px 0px 0px"
                src={userImg}
              ></Image>
              {userName && (
                <TextUser>
                  {userName} 님,
                  <br />
                  안녕하세요 :)
                </TextUser>
              )}
            </InfoBox>
            <DateBox>
              <Today>{todayDate}</Today>
            </DateBox>
          </UserWrapper>

          {/* 대시 보드 - 오늘 등록한 운동 종목 수 */}
          <RegisterWrapper>
            <Text
              textAlign="left"
              type="title"
              margin="0px 0px 1rem 0px;"
              fontSize="18px;"
            >
              Today
            </Text>
            {myFirstChallenge && (
              // 리액트 crontab으로 api 재호출 예약을 걸어둬서 화면을 켜놔도 실시간으로 변하는것처럼 보여줄순 없을까?
              <ChallengeBox
                status={myFirstChallenge.Challenge.progressStatus}
                isCompleted={myFirstChallenge.isCompleted}
                myFirstChallenge={myFirstChallenge}
                myFirstChallengeExercises={myFirstChallengeExercises}
                isCompleted={myFirstChallenge.isCompleted}
                onClick={() => {
                  myFirstChallenge.isCompleted
                    ? logger('완료 인증하기')
                    : showChallengeModal(true);
                }}
              ></ChallengeBox>
            )}
            {challengeModal &&
              myFirstChallengeExercises &&
              myFirstChallenge.Challenge.progressStatus === 'start' && (
                <ChallengeModal
                  exerciseLength={myFirstChallengeExercises.length}
                  time={myFirstChallenge.Challenge.challengeDateTime}
                  challengeName={myFirstChallenge.Challenge.challengeName}
                  firstExerciseName={myFirstChallengeExercises[0].exerciseName}
                  userCount={myFirstChallengeUserCount}
                  showChallengeModal={showChallengeModal}
                  progressStatus={myFirstChallenge.Challenge.progressStatus}
                  mainMessage="오늘의 챌린지를 시작할까요?"
                  buttonMessage="시작하기"
                  myFirstChallengeExercises={myFirstChallengeExercises}
                  challengeId={myFirstChallenge.id}
                ></ChallengeModal>
              )}

            {challengeModal &&
              myFirstChallengeExercises &&
              myFirstChallenge.Challenge.progressStatus === 'before' && (
                <ChallengeModal
                  exerciseLength={myFirstChallengeExercises.length}
                  time={myFirstChallenge.Challenge.challengeDateTime}
                  challengeName={myFirstChallenge.Challenge.challengeName}
                  firstExerciseName={myFirstChallengeExercises[0].exerciseName}
                  userCount={myFirstChallengeUserCount}
                  showChallengeModal={showChallengeModal}
                  progressStatus={myFirstChallenge.Challenge.progressStatus}
                  mainMessage="아직 챌린지 시작 전이에요"
                  buttonMessage="돌아가기"
                ></ChallengeModal>
              )}

            {myTodayRoutine && myTodayRoutine.length !== 0 ? (
              <TodayMainBox>
                {myTodayRoutine[0].isCompleted ? (
                  <TodayWrapper>
                    <Enrolled>{myTodayRoutine.length}</Enrolled>
                    <DashBoardDiv>
                      <TextItem>오늘의 운동을 완료했습니다!</TextItem>
                    </DashBoardDiv>
                  </TodayWrapper>
                ) : (
                  <TodayWrapper
                    onClick={() => {
                      history.push('/workout');
                    }}
                  >
                    <Enrolled>{myTodayRoutine.length}</Enrolled>
                    <DashBoardDiv>
                      <PlayBtnIcon src={playButton} />
                      <TextItem>오늘의 운동을 시작해보세요!</TextItem>
                    </DashBoardDiv>
                  </TodayWrapper>
                )}
                <TodayTypeContainer>
                  <TypeWrapper>
                    <Span>종목</Span>
                    <TextItem>{myTodayRoutine[0].routineName}</TextItem>
                  </TypeWrapper>
                  <Div />
                  <TypeWrapper>
                    <Span>운동시간</Span>
                    {myTodayRoutine[0].isCompleted ? (
                      <TextItem>
                        <WorkoutDate>
                          {Math.floor(myTodayRoutine[0].routineTime / 60) <
                          10 ? (
                            <Time>
                              {'0' +
                                Math.floor(myTodayRoutine[0].routineTime / 60)}
                              :
                            </Time>
                          ) : (
                            <Time>
                              {Math.floor(myTodayRoutine[0].routineTime / 60)}:
                            </Time>
                          )}
                          {myTodayRoutine[0].routineTime % 60 < 10 ? (
                            <Time>
                              {'0' + (myTodayRoutine[0].routineTime % 60)}
                            </Time>
                          ) : (
                            <Time>{myTodayRoutine[0].routineTime % 60}</Time>
                          )}
                        </WorkoutDate>
                      </TextItem>
                    ) : (
                      <TextItem>00:00</TextItem>
                    )}
                  </TypeWrapper>
                </TodayTypeContainer>
              </TodayMainBox>
            ) : (
              <TodayMainBox>
                <TodayWrapper>
                  <EnrolledZero>0</EnrolledZero>
                  <DashBoardDiv>
                    <TextItem>아직 등록된 운동이 없습니다</TextItem>
                  </DashBoardDiv>
                </TodayWrapper>
                <TodayTypeContainer>
                  <TypeWrapper>
                    <Span>종목</Span>
                    <TextItem>종목없음</TextItem>
                  </TypeWrapper>
                  <Div />
                  <TypeWrapper>
                    <Span>운동시간</Span>
                    <TextItem>00:00</TextItem>
                  </TypeWrapper>
                </TodayTypeContainer>
              </TodayMainBox>
            )}
          </RegisterWrapper>

          {/* 이전 루틴 불러오기 */}
          {myTodayRoutine && myTodayRoutine.length > 0 ? null : (
            <FormerRoutineWrapper
              onClick={() => {
                history.push('/mypastroutines');
              }}
            >
              <FormerRoutineIcon
                width="24px"
                height="24px"
                margin="0px 15px 0px 0px"
                src={formerRoutine}
              />
              <GetFormerRoutine>이전 루틴 불러오기</GetFormerRoutine>
            </FormerRoutineWrapper>
          )}

          {/* 나의 오늘 운동 루틴 가져오기 */}
          <CategoryList>
            {myTodayRoutine &&
              myTodayRoutine.map((routine, idx) => (
                <div key={idx}>
                  <TodayExerciseWrapper>
                    {routine.isCompleted ? (
                      <TimeBox
                        src={CompletedBtn}
                        completed={completed}
                      ></TimeBox>
                    ) : (
                      <TimeBox>
                        <Time>운동 전</Time>
                      </TimeBox>
                    )}
                    {myTodayRoutine && myTodayRoutine[0].isCompleted ? (
                      <RoutineBox>
                        <RoutineName>{routine.routineName}</RoutineName>
                        <RoutineBoxDiv>
                          {routine && routine.routineTime == 0 ? (
                            <WorkoutDate>00:00</WorkoutDate>
                          ) : (
                            <WorkoutDate>
                              {Math.floor(routine.routineTime / 60) < 10 ? (
                                <Time>
                                  {'0' + Math.floor(routine.routineTime / 60)}:
                                </Time>
                              ) : (
                                <Time>
                                  {Math.floor(routine.routineTime / 60)}:
                                </Time>
                              )}
                              {routine.routineTime % 60 < 10 ? (
                                <Time>{'0' + (routine.routineTime % 60)}</Time>
                              ) : (
                                <Time>{routine.routineTime % 60}</Time>
                              )}
                            </WorkoutDate>
                          )}
                        </RoutineBoxDiv>
                      </RoutineBox>
                    ) : (
                      <RoutineBox
                        clicked={clicked}
                        onClick={() => {
                          const selected = myTodayRoutine.filter(
                            (m) => m.id == routine.id,
                          );
                          dispatch(
                            exerciseActions.addSelectedPrevItem(selected[0]),
                          );
                          history.push('/todayroutinedetail');
                        }}
                      >
                        <RoutineName>{routine.routineName}</RoutineName>
                        <RoutineBoxDiv>
                          {routine && routine.routineTime == 0 ? (
                            <WorkoutDate>00:00</WorkoutDate>
                          ) : (
                            <WorkoutDate>
                              {Math.floor(routine.routineTime / 60)}:
                              {routine.routineTime % 60}
                            </WorkoutDate>
                          )}
                        </RoutineBoxDiv>
                      </RoutineBox>
                    )}

                    {/* 운동 만족도 아이콘 */}
                    <RoutineInfo>
                      {routine.rating === 'soso' && (
                        <RemoveButton src={NormalRating}></RemoveButton>
                      )}
                      {routine.rating === 'bad' && (
                        <RemoveButton src={BadRating}></RemoveButton>
                      )}
                      {routine.rating === 'good' && (
                        <RemoveButton src={GoodRating}></RemoveButton>
                      )}
                      {routine.rating === null && (
                        <RemoveButton
                          src={RemoveBtn}
                          onClick={() => {
                            dispatch(
                              exerciseActions.deleteMyTodayRoutineAPI(
                                routine.id,
                              ),
                            );
                          }}
                        ></RemoveButton>
                      )}
                    </RoutineInfo>
                  </TodayExerciseWrapper>
                </div>
              ))}
          </CategoryList>
        </InboxWrapper>
      </Wrapper>

      {myTodayRoutine && myTodayRoutine.length !== 0 ? null : (
        <DivBox>
          <AddBtn
            onClick={() => {
              history.push('/exercise');
              dispatch(exerciseActions.initializeRoutine());
            }}
          >
            <AddBtnText src={addButton}></AddBtnText>
          </AddBtn>
        </DivBox>
      )}

      {/* 고정 하단바 */}
      <NavBarWrapper>
        <NavBar />
      </NavBarWrapper>
    </Container>
  );
};

export default Main;

const Container = styled.div`
  background-color: #f7f7fa;
  overflow-y: scroll;
`;

const Wrapper = styled.div`
  padding: 20px 20px 0px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  overflow: scroll;
`;

const RegisterWrapper = styled.div``;

const TodayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
  box-sizing: border-box;
  padding: 30px;
  width: 100%;
`;

const TodayTypeContainer = styled.div`
  display: flex;
  height: 30px;
  margin: 24px 0px;
  padding: 0px 15px;
`;

const Div = styled.div`
  border-left: 1px solid gray;
  padding: 10px;
  margin-left: 20px;
`;

const TypeWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 30px;
`;

const Enrolled = styled.span`
  font-size: 72px;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 1;
  color: ${Color.mainBlue};
`;

const EnrolledZero = styled.span`
  font-size: 72px;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 1;
`;

const InboxWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TodayMainBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const UserWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const DateBox = styled.div``;

const Today = styled.span`
  font-size: 17px;
  margin: 0px;
`;

const LoginBtn = styled.button`
  margin-right: 9px;
  border-style: none;
  background-color: black;
  color: white;
  border-radius: 19px;
  padding: 8px 15px;
  cursor: pointer;
`;

const TextUser = styled.span`
  font-size: 16px;
`;

const FormerRoutineWrapper = styled.div`
  position: relative;
  margin: 20px 0px;
  cursor: pointer;
`;

const FormerRoutineIcon = styled.img`
  position: absolute;
  top: 18px;
  left: 30px;
`;

const PlayBtnIcon = styled.img`
  width: 15px;
  margin-right: 5px;
`;

const GetFormerRoutine = styled.div`
  border-style: none;
  display: flex;
  box-sizing: border-box;
  height: 56px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  padding: 30px 0px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.05), 0px 1px 3px rgba(0, 0, 0, 0.1),
    inset 0px 1px 0px rgba(255, 255, 255, 0.1);
`;

const NavBarWrapper = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
`;

const innerHeight = window.innerHeight - 460;

const CategoryList = styled.ul`
  padding: 0px;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
  height: ${innerHeight}px;
  overflow-y: scroll;
`;

const Span = styled.span`
  color: black;
  opacity: 54%;
  font-size: 14px;
  font-weight: 600;
`;

const TextItem = styled.span`
  color: black;
  font-size: 14px;
  font-weight: 600;
`;

const AddBtn = styled.button`
  /* position: absolute;
  bottom: 6rem;
  right: 1.5rem;
  color: white;
  font-size: 30px;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: ${Color.mainBlue};
  cursor: pointer;
  border: none;
  z-index: 1000; */
`;

const AddBtnText = styled.img`
  position: absolute;
  bottom: 6rem;
  right: 1.5rem;
  color: white;
  font-size: 30px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  z-index: 1000;
`;

const DivBox = styled.div`
  width: 100%;
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
  background-color: ${(props) => (props.completed ? '#4A40FF' : 'black')};
  width: 25%;
  min-width: 75px;
  height: 44px;
  border-radius: 30px;
  color: white;
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-content: center;
  background-image: url('${(props) => props.src}');
  background-size: 25%;
  background-repeat: no-repeat;
  background-position: center;
`;

const Time = styled.span`
  font-size: 14px;
`;

const Completed = styled.img`
  width: 17px;
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

const RemoveButton = styled.img`
  width: 24px;
`;

const RoutineBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const RoutineBoxDiv = styled.div`
  display: flex;
`;

const DashBoardDiv = styled.div`
  display: flex;
`;
