import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button, Image } from '../shared/Styles';
import Color from '../shared/Color';
import plusButton from '../img/plus-button.svg';
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

// 메인 페이지 컴포넌트
const Main = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((store) => store.user.is_login);
  const todayDate = moment().format('MM.DD');
  const userName = useSelector((store) => store.user.user.nickname);
  const userImg = useSelector((store) => store.user.user.userImg);
  const myRoutine = useSelector((store) => store.exercise.routine);
  const getDate = moment().format('YYYYMMDD');

  console.log(myRoutine);

  // 오늘 저장한 나의 루틴 가져오기
  useEffect(() => {
    if (myRoutine.myExercise.length > 0) {
      dispatch(exerciseActions.getMyTodayRoutineAPI(getDate));
      console.log("디스패치가 되나?");
      return;
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
              {is_login ? null : <LoginBtn onClick={() => {
                history.push('/login');
              }}>Login</LoginBtn>}
              <Today>{todayDate}</Today>
            </DateBox>
          </UserWrapper>

          {/* 등록한 운동 보여주기 */}
          <RegisterWrapper>
            <Index>Today</Index>
            <MainBox>
              <TodayWrapper>
                {myRoutine.myExercise.length !== 0 ?
                  <Enrolled>1</Enrolled>
                  : <Enrolled>0</Enrolled>
                }
                {myRoutine ?
                  <span>오늘의 운동을 시작해보세요!</span>
                  : <span>아직 등록된 운동이 없습니다</span>
                }
              </TodayWrapper>
              <TypeContainer>
                <TypeWrapper>
                  <span>종목</span>
                  {myRoutine &&
                    <span>{myRoutine.routineName}</span>}
                </TypeWrapper>
                <TypeWrapper>
                  <span>운동시간</span>
                  <span>0m</span>
                </TypeWrapper>
              </TypeContainer>
            </MainBox>
          </RegisterWrapper>

          {/* 이전 루틴 불러오기 */}
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


          {/* 나의 오늘 운동 루틴 가져오기 */}
          <CategoryList>
            {/* {myTodayRoutine &&
              <RoutineItem {...myTodayRoutine} />
            } */}
          </CategoryList>

        </InboxWrapper>
      </Wrapper>

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
  height: 100vh;
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
`;

const TypeContainer = styled.div`
  display: flex;
`;

const TypeWrapper = styled.div`
  margin-top: 20px;
  width: 50%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px 25px;
  &:last-child {
    border-left: 1px solid black;
  }
`;

const Enrolled = styled.span`
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
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px 10px;
  background-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.05), 0px 1px 3px rgba(0, 0, 0, 0.1),
    inset 0px 1px 0px rgba(255, 255, 255, 0.1);
  transition: background-color 300ms ease-in-out, box-shadow 300ms ease-in-out;
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
`;

const FormerRoutineIcon = styled.img`
  position: absolute;
  top: 18px;
  left: 30px;
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