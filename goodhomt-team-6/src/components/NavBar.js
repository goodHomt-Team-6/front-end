import React from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import FeedGrey from '../img/feed_grey.svg';
import FeedWhite from '../img/feed_white.svg';
import ChallengeGrey from '../img/challenge_grey.svg';
import ChallengeWhite from '../img/challenge_white.svg';
import CalendarGrey from '../img/calendar_grey.svg';
import CalendarWhite from '../img/calendar_white.svg';
import WorkoutGrey from '../img/workout_grey.svg';
import WorkoutWhite from '../img/workout_white.svg';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import { actionCreators as userActions } from '../redux/modules/user';
import logger from '../shared/Logger';

const cookie = new Cookies();

// 고정 하단바 컴포넌트
const NavBar = (props) => {
  const dispatch = useDispatch();
  const tokenCookie = cookie.get('homt6_is_login');
  const path = history.location.pathname;

  return (
    <>
      <BtnWrapper>
        <RouteBox
          onClick={() => {
            history.push('/');
          }}
        >
          {path === '/' ? (
            <>
              <IconImage src={WorkoutWhite} />
              <Title opacity="1">Workout</Title>
            </>
          ) : (
            <>
              <IconImage src={WorkoutGrey} />
              <Title>Workout</Title>
            </>
          )}
        </RouteBox>

        <RouteBox
          onClick={() => {
            if (!tokenCookie) {
              sessionStorage.setItem('redirect_url', '/feed');
              dispatch(userActions.showLoginModal(true));
            } else {
              history.push('/feed');
            }
          }}
        >
          {path === '/feed' ? (
            <>
              <IconImage src={FeedWhite} />
              <Title opacity="1">Feed</Title>
            </>
          ) : (
            <>
              <IconImage src={FeedGrey} />
              <Title>Feed</Title>
            </>
          )}
        </RouteBox>

        <RouteBox
          onClick={() => {
            if (!tokenCookie) {
              sessionStorage.setItem('redirect_url', '/challenge');
              dispatch(userActions.showLoginModal(true));
            } else {
              history.push('/challenge');
            }
          }}
        >
          {path === '/challenge' ? (
            <>
              <IconImage src={ChallengeWhite} />
              <Title opacity="1">Challenge</Title>
            </>
          ) : (
            <>
              <IconImage src={ChallengeGrey} />
              <Title>Challenge</Title>
            </>
          )}
        </RouteBox>

        <RouteBox
          onClick={() => {
            if (!tokenCookie) {
              sessionStorage.setItem('redirect_url', '/calendar');
              dispatch(userActions.showLoginModal(true));
            } else {
              history.push('/calendar');
            }
          }}
        >
          {path === '/calendar' ? (
            <>
              <IconImage src={CalendarWhite} />
              <Title opacity="1">Calendar</Title>
            </>
          ) : (
            <>
              <IconImage src={CalendarGrey} />
              <Title>Calendar</Title>
            </>
          )}
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
  height: 24px;
  min-width: 24px;
  min-height: 24px;
`;

const Title = styled.span`
  color: white;
  font-size: 9px;
  padding-top: 8px;
  opacity: ${(props) => (props.opacity ? props.opacity : '60%')};
  font-weight: 500;
`;
