import React from 'react';
import styled from 'styled-components';
import { Button, Image } from "../shared/Styles";
import plusButton from '../img/plus-button.svg';
import { history } from '../redux/configureStore';
import profileImage from '../img/profile-image.svg';

import ImportExercise from "../components/ImportExercise";

// 메인 페이지 컴포넌트
const Main = (props) => {

  const onMealButtonClick = () => {
    history.push('/exercise');
  };

  const breakfast = JSON.parse(localStorage.getItem('breakfast') || 'null');

  return (
    <Container>
      <Wrapper>
        <InboxWrapper>
          {/* 유저 프로필 */}
          <UserWrapper>
            <InfoBox>
              <Image width="40px" height="40px" margin="0px 15px 0px 0px"
                src={profileImage}>
              </Image>
              <Text>OO님,
                <br />안녕하세요:)</Text>
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


          {/* 운동 불러오기 */}
          {/* {breakfast ?
        <div className="meal-menu">
          {Object.entries(breakfast).map(([name, value], i) =>
            <div key={i} className="meal-menu-entry">{name}{value.count}</div>
          )}
        </div> */}

          {/* <Index>2021.7</Index>
            <Button
            width="100%"
            height="50px"
          >+</Button> */}
        </InboxWrapper>

        <BtnWrapper>
          <AddBtn
            onClick={onMealButtonClick}
          >+</AddBtn>
        </BtnWrapper>

      </Wrapper >
    </Container>
  );
};

export default Main;

const RegisterWrapper = styled.div`

`;

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

const Container = styled.div`
background-color: #F7F7FA;

`;

const Wrapper = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
`;

const InboxWrapper = styled.div`
  width: 100%;
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

const DateBox = styled.div`
`;

const Today = styled.span`
  font-size: 20px;
  margin: 0px 14px;
`;

const Text = styled.span`
  font-size: 18px;
`;

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
`;

const AddBtn = styled.button`
  position: relative;
  bottom: 30px;
  color: white;
  font-size: 30px;
  width: 72px;
  height: 72px;
  border: none;
  border-radius: 50%;
  background-color: black;
  margin: 0px auto;
`;