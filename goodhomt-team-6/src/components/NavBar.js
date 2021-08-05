import React from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import { history } from '../redux/configureStore';
import Community from '../img/community.svg';
import MyPage from '../img/mypage.svg';
import Calendar from '../img/calendar.svg';
import Workout from '../img/workout.svg';

// 고정 하단바 컴포넌트
const NavBar = (props) => {

  return (
    <>
      <BtnWrapper>
        <RouteBox
          onClick={() => {
            history.push('/');
          }}>
          <IconImage src={Workout} />
          <Title>Workout</Title>
        </RouteBox>

        <RouteBox
          onClick={() => {
            history.push('/exercise');
          }}>
          <IconImage src={Calendar} />
          <Title>Calendar</Title>
        </RouteBox>

        <AddBtn
          onClick={() => {
            history.push('/exercise');
          }}>
          <AddBtnText>
            +
          </AddBtnText>
        </AddBtn>

        <RouteBox
          onClick={() => {
            history.push('/exercise');
          }}>
          <IconImage src={Community} />
          <Title>Community</Title>
        </RouteBox>

        <RouteBox
          onClick={() => {
            history.push('/exercise');
          }}>
          <IconImage src={MyPage} />
          <Title>Mypage</Title>
        </RouteBox>
      </BtnWrapper>
    </>
  );
};

export default NavBar;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 75px;
  background-color: black;
`;

const RouteBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  margin: 0px;
  min-width: 20px;
`;

const IconImage = styled.img`
  width: 24px;
`;

const Title = styled.span`
  color: white;
  font-size: 9px;
  padding-top: 8px; 
  opacity: 60%;
`;

const AddBtn = styled.button`
  position: relative;
  bottom: 30px;
  color: white;
  font-size: 30px;
  width: 72px;
  height: 72px;
  border: 3px solid ${Color.bgIvory};
  border-radius: 50%;
  background-color: ${Color.mainBlue};
  margin: 0px 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddBtnText = styled.span`

`;