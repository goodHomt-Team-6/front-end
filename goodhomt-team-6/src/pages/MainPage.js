import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Image, Text } from '../shared/Styles';
import Color from '../shared/Color';
import playButton from '../img/play_button.svg';
import { history } from '../redux/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import profileImage from '../img/profile-image.svg';
import formerRoutine from '../img/former_routine_button.svg';
import NavBar from '../components/NavBar';
import { actionCreators as userActions } from '../redux/modules/user';
import { actionCreators as exerciseActions } from '../redux/modules/exercise';
import moment from 'moment';
import logger from '../shared/Logger';
import NextBtn from '../img/next_button.svg';
import PrevBtn from '../img/prev_button.svg';
import RemoveBtn from '../img/remove_button.svg';
import CompletedBtn from '../img/completed_icon.svg';
import BadRating from '../img/clicked_bad_rating.svg';
import GoodRating from '../img/clicked_good_rating.svg';
import NormalRating from '../img/clicked_normal_rating.svg';

// 메인 페이지 컴포넌트
const Main = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((store) => store.user.is_login);

  const todayDate = moment().format('MM.DD').replace(/(^0+)/, "");
  const userName = useSelector((store) => store.user.user.nickname);
  const userImg = useSelector((store) => store.user.user.userImg);
  const myTodayRoutine = useSelector((store) => store.exercise.myTodayRoutine);
  const getDate = moment().format('YYYYMMDD');

  const [clicked, setClicked] = useState([]);
  const [completed, isCompleted] = useState(true);

  // 오늘 저장한 나의 루틴 가져오기
  useEffect(() => {
    dispatch(exerciseActions.getMyTodayRoutineAPI(getDate));
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

            {/* 임시 로그인 버튼 - 삭제예정 */}
            <DateBox>
              {/* {is_login ? null : (
                <LoginBtn
                  onClick={() => {
                    history.push('/login');
                  }}
                >
                  Login
                </LoginBtn>
              )} */}

              <PrevIcon src={PrevBtn} />
              <Today>{todayDate}</Today>
              <NextIcon src={NextBtn} />
            </DateBox>
          </UserWrapper>

          {/* 오늘 등록한 운동 보여주기 - 대시보드 */}
          <RegisterWrapper>
            <Text textAlign="left" type="title" margin="0px 0px 10px 0px;" fontSize="18px;">Today</Text>
            {myTodayRoutine && myTodayRoutine.length !== 0 ?
              <TodayMainBox>
                {myTodayRoutine[0].isCompleted ? (
                  <TodayWrapper>
                    <Enrolled>{myTodayRoutine.length}</Enrolled>
                    <DashBoardDiv>
                      <TextItem>
                        오늘의 운동을 완료했습니다!
                      </TextItem>
                    </DashBoardDiv>
                  </TodayWrapper>
                ) : (
                  <TodayWrapper
                    onClick={() => {
                      history.push('/workout');
                    }}>
                    <Enrolled>{myTodayRoutine.length}</Enrolled>
                    <DashBoardDiv>
                      <PlayBtnIcon src={playButton} />
                      <TextItem>
                        오늘의 운동을 시작해보세요!
                      </TextItem>
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
                    {myTodayRoutine[0].isCompleted ?
                      <TextItem>
                        {Math.floor(myTodayRoutine[0].routineTime / 60)}:{myTodayRoutine[0].routineTime % 60}
                      </TextItem>
                      :
                      <TextItem>00:00</TextItem>
                    }
                  </TypeWrapper>
                </TodayTypeContainer>
              </TodayMainBox>
              : // 코드 변경 예정
              <TodayMainBox>
                <TodayWrapper>
                  <EnrolledZero>0</EnrolledZero>
                  <DashBoardDiv>
                    <TextItem>
                      아직 등록된 운동이 없습니다
                    </TextItem>
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
            }
          </RegisterWrapper>

          {/* 이전 루틴 불러오기 */}
          {myTodayRoutine && myTodayRoutine.length > 0 ?
            null
            : <FormerRoutineWrapper
              onClick={() => {
                history.push('/mypastroutines');
              }}>
              <FormerRoutineIcon
                width="24px"
                height="24px"
                margin="0px 15px 0px 0px"
                src={formerRoutine}
              />
              <GetFormerRoutine>이전 루틴 불러오기</GetFormerRoutine>
            </FormerRoutineWrapper>}

          {/* 나의 오늘 운동 루틴 가져오기 */}
          <CategoryList>
            {myTodayRoutine &&
              myTodayRoutine.map((routine, idx) => (
                <div key={idx}>
                  <TodayExerciseWrapper
                  >
                    {routine.isCompleted ? (
                      <TimeBox src={CompletedBtn} completed={completed}>
                      </TimeBox>
                    ) : (
                      <TimeBox>
                        <Time>{routine.routineTime}분</Time>
                      </TimeBox>
                    )}

                    <RoutineBox
                      clicked={clicked}
                      onClick={() => {
                        const selected = myTodayRoutine.filter((m) => m.id == routine.id);
                        const toObject = selected[0];
                        dispatch(exerciseActions.addSelectedPrevItem(toObject));
                        history.push('/routinedetail');
                      }}>
                      <RoutineName>{routine.routineName}</RoutineName>
                      <RoutineBoxDiv>
                        {/* {routine.createdAt &&
                          <WorkoutDate>
                            {routine.createdAt.substring(5, 7)}.{routine.createdAt.substring(8, 10)}
                          </WorkoutDate>
                        } */}
                        <WorkoutDate>
                          {Math.floor(routine.routineTime / 60)}:{routine.routineTime % 60}
                        </WorkoutDate>
                      </RoutineBoxDiv>
                    </RoutineBox>

                    <RoutineInfo>
                      {routine.rating === 'soso' &&
                        <RemoveButton src={NormalRating}></RemoveButton>}
                      {routine.rating === 'bad' &&
                        <RemoveButton src={BadRating}></RemoveButton>}
                      {routine.rating === 'good' &&
                        <RemoveButton src={GoodRating}></RemoveButton>}
                      {routine.rating === null &&
                        <RemoveButton
                          src={RemoveBtn}
                          onClick={() => {
                            dispatch(exerciseActions.deleteMyTodayRoutineAPI(routine.id));
                          }}>
                        </RemoveButton>}
                    </RoutineInfo>
                  </TodayExerciseWrapper>
                </div>
              ))
            }
          </CategoryList>
        </InboxWrapper>
      </Wrapper>

      {myTodayRoutine && myTodayRoutine.length !== 0 ?
        null :
        <DivBox>
          <AddBtn
            onClick={() => {
              history.push('/exercise');
            }}>
            <AddBtnText>
              +
            </AddBtnText>
          </AddBtn>
        </DivBox>}


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
  padding: 1.5rem;
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

const TypeContainer = styled.div`
  display: flex;
  height: 30px;
  margin: 24px 0px;
  padding: 0px;
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

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
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

const CategoryList = styled.ul`
  padding: 0px;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
  height: calc(100vh - 314px);
  overflow-x: scroll;
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
  position: absolute;
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
  z-index: 1000;
  `;

const AddBtnText = styled.span`
`;

const DivBox = styled.div`
  width: 100%;
  `;

const PrevIcon = styled.img`
  margin-right: 8px;
  `;

const NextIcon = styled.img`
  margin-left: 8px;
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