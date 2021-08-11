import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Image } from '../shared/Styles';
import Color from '../shared/Color';
import plusButton from '../img/plus-button.svg';
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
import RoutineItem from '../components/RoutineItem';
import NextBtn from '../img/next_button.svg';
import PrevBtn from '../img/prev_button.svg';

// 메인 페이지 컴포넌트
const Main = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((store) => store.user.is_login);

  const todayDate = moment().format('MM.DD').replace(/(^0+)/, "");
  const userName = useSelector((store) => store.user.user.nickname);
  const userImg = useSelector((store) => store.user.user.userImg);
  const myTodayRoutine = useSelector((store) => store.exercise.myTodayRoutine);
  const getDate = moment().format('YYYYMMDD');

  const [todayRoutine, isTodayRoutine] = useState(false);

  // 오늘 저장한 나의 루틴 가져오기
  useEffect(() => {
    dispatch(exerciseActions.getMyTodayRoutineAPI(getDate));
    if (myTodayRoutine) {
      isTodayRoutine(true);
    }
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
                <Text>
                  {userName} 님,
                  <br />
                  안녕하세요 :)
                </Text>
              )}
            </InfoBox>

            {/* 임시 로그인 버튼, 오늘 날짜 */}
            <DateBox>
              {is_login ? null : (
                <LoginBtn
                  onClick={() => {
                    history.push('/login');
                  }}
                >
                  Login
                </LoginBtn>
              )}

              <PrevIcon src={PrevBtn} />
              <Today>{todayDate}</Today>
              <NextIcon src={NextBtn} />
            </DateBox>
          </UserWrapper>

          {/* 등록한 운동 보여주기 */}
          <RegisterWrapper>
            <Index>Today</Index>
            {myTodayRoutine && myTodayRoutine.length > 0 ?
              (<TodayMainBox>
                <TodayWrapper>
                  <Enrolled>{myTodayRoutine.length}</Enrolled>
                  <TextItem>
                    <PlayBtnIcon src={playButton} />
                    오늘의 운동을 시작해보세요!</TextItem>
                </TodayWrapper>
                <TodayTypeContainer>
                  <TypeWrapper>
                    <Span>종목</Span>
                    <TextItem>{myTodayRoutine[0]?.routineName}</TextItem>
                  </TypeWrapper>
                  <Div />
                  <TypeWrapper>
                    <Span>운동시간</Span>
                    <TextItem>0m</TextItem>
                  </TypeWrapper>
                </TodayTypeContainer>
              </TodayMainBox>
              ) :
              (
                <MainBox>
                  <TodayWrapper>
                    <EnrolledZero>0</EnrolledZero>
                    <TextItem>아직 등록된 운동이 없습니다</TextItem>
                  </TodayWrapper>
                  <TypeContainer>
                    <TypeWrapper>
                      <Span>종목</Span>
                      <TextItem></TextItem>
                    </TypeWrapper>
                    <Div />
                    <TypeWrapper>
                      <Span>운동시간</Span>
                      <TextItem>0m</TextItem>
                    </TypeWrapper>
                  </TypeContainer>
                </MainBox>
              )
            }
          </RegisterWrapper>

          {/* 이전 루틴 불러오기 */}
          {/* {myTodayRoutine ?
            null
            : */}
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
          {/* } */}

          {/* 나의 오늘 운동 루틴 가져오기 */}
          <CategoryList>
            {myTodayRoutine &&
              myTodayRoutine.map((routine, idx) => (
                <RoutineItem key={idx} {...routine}
                />
              ))
            }
          </CategoryList>
        </InboxWrapper>
      </Wrapper>

      <DivBox>
        <AddBtn
          onClick={() => {
            history.push('/exercise');
          }}>
          <AddBtnText>
            +
          </AddBtnText>
        </AddBtn>
      </DivBox>

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
  overflow: scroll;
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
  font-weight: bold;
  margin-bottom: 10px;
  line-height: 1;
  color: ${Color.mainBlue};
`;

const EnrolledZero = styled.span`
  font-size: 72px;
  font-weight: bold;
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

const Index = styled.h2`
  font-size: 18px;
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

const Text = styled.span`
  font-size: 18px;
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
  /* width: 100%; */
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