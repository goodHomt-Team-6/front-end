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

// 메인 페이지 컴포넌트
const Main = (props) => {
  const dispatch = useDispatch();

  // 유저 이름 가져오기
  // useEffect(() => {
  //   dispatch()
  // });

  const userName = useSelector((store) => store.user.user.nickname);

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

              ></Image>
              <Text>

                님,
                <br />
                안녕하세요:)
              </Text>
            </InfoBox>

            <DateBox>
              <Today>7.20</Today>
            </DateBox>
          </UserWrapper>

          {/* 등록한 운동 보여주기 */}
          <RegisterWrapper>
            <Index>Today</Index>
            <MainBox>
              <TodayWrapper>
                <Enrolled>0</Enrolled>
                <span>아직 등록된 운동이 없습니다</span>
              </TodayWrapper>
              <TypeContainer>
                <TypeWrapper>
                  <span>종목</span>
                  <span>none</span>
                </TypeWrapper>
                <TypeWrapper>
                  <span>운동시간</span>
                  <span>0m</span>
                </TypeWrapper>
              </TypeContainer>
            </MainBox>
          </RegisterWrapper>

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

          {/* 운동 불러오기
          {breakfast ?
        <div className="meal-menu">
          {Object.entries(breakfast).map(([name, value], i) =>
            <div key={i} className="meal-menu-entry">{name}{value.count}</div>
          )}
        </div>

          <Index>2021.7</Index>
            <Button
            width="100%"
            height="50px"
          >+</Button>  */}
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
  font-size: 20px;
  margin: 0px 14px;
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
