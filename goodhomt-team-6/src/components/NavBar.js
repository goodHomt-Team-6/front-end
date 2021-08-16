import React from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import { history } from '../redux/configureStore';
import Community from '../img/community.svg';
import MyPage from '../img/mypage.svg';
import Calendar from '../img/calendar.svg';
import Workout from '../img/workout.svg';
import { useDispatch } from 'react-redux';
import { actionCreators as exerciseActions } from '../redux/modules/exercise';

// 고정 하단바 컴포넌트
const NavBar = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      <BtnWrapper>
        <RouteBox
          onClick={() => {
            history.push('/');
          }}
        >
          <IconImage src={Workout} />
          <Title>Workout</Title>
        </RouteBox>

        <RouteBox
          onClick={() => {
            history.push('/community');
          }}
        >
          <IconImage src={Community} />
          <Title>Feed</Title>
        </RouteBox>

        <RouteBox
          onClick={() => {
            history.push('/challenge');
          }}
        >
          <IconImage src={Community} />
          <Title>Challenge</Title>
        </RouteBox>

        <RouteBox
          onClick={() => {
            history.push('/calendar');
          }}
        >
          <IconImage src={Calendar} />
          <Title>Calendar</Title>
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
