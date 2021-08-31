import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Image, Text, Icon } from '../shared/Styles';
import Color from '../shared/Color';
import playButton from '../img/play_button.svg';
import { history } from '../redux/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import profileImage from '../img/profile-image.svg';
import formerRoutine from '../img/former_routine_button.svg';

import calendarIcon from '../img/calendar_main_icon.svg';
import ratingGood from '../img/rating_good.svg';
import ratingBad from '../img/rating_bad.svg';
import ratingSoso from '../img/rating_soso.svg';
import BookmarkSolid from '../img/bookmark_solid.svg';
import NavBar from '../components/NavBar';
import { actionCreators as userActions } from '../redux/modules/user';
import { actionCreators as exerciseActions } from '../redux/modules/exercise';
import { actionCreators as challengeActions } from '../redux/modules/challenge';
import moment from 'moment';
import logger from '../shared/Logger';
import CompletedBtn from '../img/completed_icon.svg';
import BadRating from '../img/rating_bad_big.svg';
import GoodRating from '../img/rating_good_big.svg';
import NormalRating from '../img/rating_soso_big.svg';
import nullUserImg from '../img/no_profile-image.jpg';
import ChallengeBox from '../components/MainChallengeBox';
import ChallengeModal from '../components/ChallengeModal';
import LoginModal from '../components/LoginModal';
import Cookies from 'universal-cookie';
import Crontab from 'reactjs-crontab';
import './MainPage.css';
import Mascort from '../img/mascort_white.svg';
import DashBoardBase from '../components/DashBoardBase';
import AddAndDeleteModal from '../components/AddAndDeleteModal';

const cookie = new Cookies();

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
  const is_login = useSelector((store) => store.user?.is_login);
  const loginModal = useSelector((store) => store.user.loginModal);
  const myFirstChallengeExercises = useSelector(
    (store) => store.challenge.challengeDetail.challenge?.Challenge_Exercises,
  );
  const [isNotiCont, showNotiCont] = useState(false);

  const myFirstChallengeUserCount = useSelector(
    (store) => store.challenge.challengeDetail.challenge?.userCount,
  );
  const notiCont = useRef(null);

  const [clicked, setClicked] = useState([]);
  const [completed, isCompleted] = useState(true);
  const [challengeModal, showChallengeModal] = useState(false);
  const tokenCookie = cookie.get('homt6_is_login');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Crontab 적용
  const notiChallengeStart = () => {
    dispatch(challengeActions.getMyChallengesAPI('get_detail'));
    showNotiCont(true);
    setTimeout(() => {
      if (notiCont.current) {
        notiCont.current.classList.replace(
          'slide-in-bottom',
          'slide-out-bottom',
        );
        setTimeout(() => {
          showNotiCont(false);
        }, 5000);
      }
    }, 3500);
  };

  let tasks;
  if (myFirstChallenge) {
    const myFirstChallengeDateTime =
      myFirstChallenge?.Challenge.challengeDateTime;
    tasks = [
      {
        fn: notiChallengeStart,
        // this is the function which is triggered based on the config
        id: '1',
        config: `${myFirstChallengeDateTime.slice(
          10,
          12,
        )} ${myFirstChallengeDateTime.slice(
          8,
          10,
        )} ${myFirstChallengeDateTime.slice(
          6,
          8,
        )} ${myFirstChallengeDateTime.slice(4, 6)} *}`,
        name: '', // optional
      },
    ];
  }

  // 오늘 저장한 나의 루틴 가져오기
  useEffect(() => {
    if (is_login) {
      dispatch(exerciseActions.getMyTodayRoutineAPI(getDate));
      dispatch(challengeActions.getMyChallengesAPI('get_detail'));
    }
  }, []);

  useEffect(() => {
    if (is_login) {
      dispatch(exerciseActions.getMyTodayRoutineAPI(getDate));
      dispatch(challengeActions.getMyChallengesAPI('get_detail'));
    }
  }, [is_login]);
  return (
    <>
      {/* 유저 프로필 */}
      <UserWrapper>
        <InfoBox>
          {userImg === null ? (
            <Image
              width="40px"
              height="40px"
              margin="0px 15px 0px 0px"
              src={nullUserImg}
            ></Image>
          ) : (
            <Image
              width="40px"
              height="40px"
              margin="0px 15px 0px 0px"
              src={userImg}
              _onClick={() => {
                if (is_login) {
                  setShowLogoutModal(true);
                }
              }}
            ></Image>
          )}

          {showLogoutModal && (
            <AddAndDeleteModal
              message="로그 아웃"
              setShowLogoutModal={setShowLogoutModal}
            />
          )}
          {is_login ? (
            <>
              <TextUser>
                <TextUserDeco>{userName}</TextUserDeco> 님,
                <br />
                안녕하세요 :)
              </TextUser>
            </>
          ) : (
            <LoginCont
              onClick={() => {
                sessionStorage.setItem('redirect_url', '/');
                dispatch(userActions.showLoginModal(true));
              }}
            >
              <Text fontSize="0.9em" type="contents" margin="0">
                LogIn
              </Text>
            </LoginCont>
          )}
        </InfoBox>
        <DateBox
          onClick={() => {
            if (!tokenCookie) {
              sessionStorage.setItem('redirect_url', '/calendar');
              dispatch(userActions.showLoginModal(true));
            } else {
              history.push('/calendar');
            }
          }}
        >
          <Icon margin="0px 5px 0px 0px" src={calendarIcon}></Icon>
          <Today>{todayDate}</Today>
        </DateBox>
      </UserWrapper>

      <Container>
        <Wrapper>
          <InboxWrapper>
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
                <>
                  {myFirstChallenge.Challenge.progressStatus === 'start' &&
                    isNotiCont && (
                      <NotiBorder ref={notiCont} className="slide-in-bottom">
                        <NotiCont>
                          <Image
                            src={Mascort}
                            width="25px"
                            height="25px"
                            borderRadius="0"
                          />
                          <Text
                            type="contents"
                            fontSize="18px"
                            fontWeight="bold"
                            margin="4px 0 4px 0"
                          >
                            챌린지가 시작되었어요!
                          </Text>
                          <Text
                            type="contents"
                            fontSize="16px"
                            textAlign="center"
                            margin="0"
                          >
                            위 챌린지 박스를 클릭해서
                            <br />
                            챌린지를 시작해보세요
                          </Text>
                        </NotiCont>
                      </NotiBorder>
                    )}
                  {/* 리액트 crontab으로 api 재호출 예약을 걸어둬서 화면을 켜놔도
                실시간으로 변하는것처럼 보여줄순 없을까? */}
                  <Crontab
                    tasks={tasks}
                    timeZone="Asia/Seoul"
                    dashboard={{ hidden: true }}
                  // if true, dashboard is hidden
                  />
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
                </>
              )}
              {challengeModal &&
                myFirstChallengeExercises &&
                myFirstChallenge.Challenge.progressStatus === 'start' && (
                  <ChallengeModal
                    exerciseLength={myFirstChallengeExercises.length}
                    time={myFirstChallenge.Challenge.challengeDateTime}
                    challengeName={myFirstChallenge.Challenge.challengeName}
                    firstExerciseName={
                      myFirstChallengeExercises[0].exerciseName
                    }
                    userCount={myFirstChallengeUserCount}
                    showChallengeModal={showChallengeModal}
                    progressStatus={myFirstChallenge.Challenge.progressStatus}
                    mainMessage="오늘의 챌린지를 시작할까요?"
                    buttonMessage="시작하기"
                    myFirstChallengeExercises={myFirstChallengeExercises}
                    isCompleted={myFirstChallenge.isCompleted}
                    onClick={() => {
                      myFirstChallenge.isCompleted
                        ? logger('완료 인증하기')
                        : showChallengeModal(true);
                    }}
                  ></ChallengeModal>
                )}
              {challengeModal &&
                myFirstChallengeExercises &&
                myFirstChallenge.Challenge.progressStatus === 'start' && (
                  <ChallengeModal
                    exerciseLength={myFirstChallengeExercises.length}
                    time={myFirstChallenge.Challenge.challengeDateTime}
                    challengeName={myFirstChallenge.Challenge.challengeName}
                    firstExerciseName={
                      myFirstChallengeExercises[0].exerciseName
                    }
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
                    firstExerciseName={
                      myFirstChallengeExercises[0].exerciseName
                    }
                    userCount={myFirstChallengeUserCount}
                    showChallengeModal={showChallengeModal}
                    progressStatus={myFirstChallenge.Challenge.progressStatus}
                    mainMessage="아직 챌린지 시작 전이에요"
                    buttonMessage="돌아가기"
                  ></ChallengeModal>
                )}

              {/* 대시 보드 */}
              {myTodayRoutine && myTodayRoutine.length !== 0 ? (
                <>
                  {myTodayRoutine[0].isCompleted ? (
                    <DashBoardBase
                      message="오늘의 루틴을 완료했습니다!"
                      exerciseType={
                        myTodayRoutine[0].myExercise.length > 1
                          ? `${myTodayRoutine[0].myExercise[0].exerciseName
                          } 외 ${myTodayRoutine[0].myExercise.length - 1} 개`
                          : `${myTodayRoutine[0].myExercise[0].exerciseName}`
                      }
                    />
                  ) : (
                    <DashBoardBase
                      message="오늘의 루틴을 시작해보세요!"
                      exerciseType={
                        myTodayRoutine[0].myExercise.length > 1
                          ? `${myTodayRoutine[0].myExercise[0].exerciseName
                          } 외 ${myTodayRoutine[0].myExercise.length - 1}개`
                          : `${myTodayRoutine[0].myExercise[0].exerciseName}`
                      }
                    />
                  )}
                </>
              ) : (
                <DashBoardBase
                  message="버튼을 눌러 루틴을 추가해보세요!"
                  exerciseType="종목없음"
                />
              )}
            </RegisterWrapper>

            {/* 이전 루틴 불러오기 */}
            {myTodayRoutine && myTodayRoutine.length > 0 ? null : (
              <FormerRoutineWrapper
                onClick={() => {
                  if (!tokenCookie) {
                    sessionStorage.setItem('redirect_url', '/mypastroutines');
                    dispatch(userActions.showLoginModal(true));
                  } else {
                    history.push('/mypastroutines');
                  }
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
                      {/* 운동 전, 운동 완료 후 만족도 */}
                      {routine.isCompleted === true &&
                        routine.rating === 'soso' && (
                          <TimeBox
                            src={ratingSoso}
                            completed={completed}
                          ></TimeBox>
                        )}
                      {routine.isCompleted === true &&
                        routine.rating === 'bad' && (
                          <TimeBox
                            src={ratingBad}
                            completed={completed}
                          ></TimeBox>
                        )}
                      {routine.isCompleted === true &&
                        routine.rating === 'good' && (
                          <TimeBox
                            src={ratingGood}
                            completed={completed}
                          ></TimeBox>
                        )}
                      {routine.isCompleted === false && (
                        <TimeBox>
                          <Text lineHeight="1" fontSize="0.9em" type="contents">
                            운동 전
                          </Text>
                        </TimeBox>
                      )}

                      {myTodayRoutine && myTodayRoutine[0].isCompleted ? (
                        <RoutineBox
                          clicked={clicked}
                          onClick={() => {
                            const selected = myTodayRoutine.filter(
                              (select) => select.id == routine.id,
                            );
                            dispatch(
                              exerciseActions.addSelectedPrevItem(selected[0]),
                            );
                            history.push('/todayroutinedetail');
                          }}
                        >
                          <RoutineTextBox>
                            {routine.isBookmarked === true ? (
                              <Icon
                                margin="0px 3px 0px 0px"
                                width="15px"
                                src={BookmarkSolid}
                              />
                            ) : null}
                            <Time>{routine.routineName}</Time>
                          </RoutineTextBox>
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
                        </RoutineBox>
                      ) : (
                        <RoutineBox
                          clicked={clicked}
                          onClick={() => {
                            const selected = myTodayRoutine.filter(
                              (select) => select.id == routine.id,
                            );
                            dispatch(
                              exerciseActions.addSelectedPrevItem(selected[0]),
                            );
                            history.push('/todayroutinedetail');
                          }}
                        >
                          <RoutineTextBox>
                            {routine.isBookmarked === true ? (
                              <Icon
                                margin="0px 3px 0px 0px"
                                width="15px"
                                src={BookmarkSolid}
                              />
                            ) : null}
                            <Time>{routine.routineName}</Time>
                          </RoutineTextBox>
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
                    </TodayExerciseWrapper>
                  </div>
                ))}
            </CategoryList>
          </InboxWrapper>
        </Wrapper>
      </Container>

      {/* 고정 하단바 */}
      <NavBarWrapper>
        <NavBar />
      </NavBarWrapper>
      {loginModal && <LoginModal></LoginModal>}
    </>
  );
};

export default Main;

const innerHeight = window.innerHeight - 165;

const Container = styled.div`
  background-color: #f7f7fa;
  overflow-y: scroll;
  height: ${innerHeight}px;
`;

const Wrapper = styled.div`
  padding: 0px 20px 0px 20px;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: center;
  overflow-y: scroll;
  box-sizing: border-box;
`;

const InboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: ${innerHeight}px;
  box-sizing: border-box;
  width: 100%;
`;

const RegisterWrapper = styled.div``;

const TodayMainBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  /* box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.05), 0px 1px 3px rgba(0, 0, 0, 0.1),
    inset 0px 1px 0px rgba(255, 255, 255, 0.1); */
`;

const UserWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 20px 20px;
  background-color: ${Color.bgIvory};
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
`;

const DateBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
`;

const Today = styled.span`
  font-size: 15px;
  line-height: 1.4;
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
  font-size: 15px;
  line-height: 1.4;
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
    font-size: 15px;
  font-weight: 500;
  padding: 30px 0px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.05), 0px 1px 3px rgba(0, 0, 0, 0.1),
    inset 0px 1px 0px rgba(255, 255, 255, 0.1);
`;

const NavBarWrapper = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
`;

const CategoryList = styled.ul`
  padding: 0px;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
`;

const TodayExerciseWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid ${Color.lightGray};
  padding: 28px 0px;
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

const WorkoutDate = styled.span`
  font-size: 14px;
  line-height: 24px;
  margin-right: 8px;
`;

const RoutineBox = styled.div`
  width: 100%;
  margin: 0px;
  display: flex;
  flex-direction: column;
`;

const RoutineBoxDiv = styled.div`
  display: flex;
`;

const TextUserDeco = styled.span`
  background-color: rgba(74, 64, 255, 0.3);
  padding-right: 10px;
  font-weight: 400;
`;

const LoginCont = styled.div`
  border-radius: 17px;
  height: 22px;
  line-height: 1.4;
  background-color: #000;
  color: #fff;
  padding: 5px 12px;
`;

const RoutineTextBox = styled.div`
  display: flex;
`;

const NotiBorder = styled.div`
  padding: 6px;
  border: 2px solid #234e70;
  position: fixed;
  bottom: 90px;
  left: calc(15% - 6px);
  width: 70%;
  z-index: 999999;
  border-radius: 10px;
  -webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const NotiCont = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 150px;
  border-radius: 10px;
  background-color: #234e70;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  box-sizing: border-box;
  padding: 8px;
`;
