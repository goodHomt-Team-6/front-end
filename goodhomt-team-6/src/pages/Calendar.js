import React, { useEffect, useState } from 'react';
import { Image, Grid, Button, Text } from '../shared/Styles';
import moment from 'moment';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as calendarActions } from '../redux/modules/calendar';
import { actionCreators as challengeActions } from '../redux/modules/challenge';
import { actionCreators as exerciseActions } from '../redux/modules/exercise';
import logger from '../shared/Logger';
import Prev from '../img/prev_button.svg';
import Next from '../img/next_button.svg';
import NavBar from '../components/NavBar';

/**
 * 달력 만들기 순서
 *  - 이번달이 몇 주가 필요한 지 "주"수 구하기
 *  - 주수만큼 map 돌리기
 *  - map 돌리면서 안에 날짜 넣어주기!
 *  - +) 일정도 같이 넣어주면 good!
 */
const Calendar = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(challengeActions.getMyChallengesAPI());
    dispatch(exerciseActions.getAllRoutineAPI());
  }, []);

  const myChallenges = useSelector((state) => state.challenge.myChallenges);
  const routines = useSelector((state) => state.exercise.routine);

  const today = useSelector((state) => state.calendar.today);
  const setMonth = (value) => {
    dispatch(calendarActions.setMonth(value));
  };
  const _changeMonth = setMonth;

  // 이번달의 시작 주, 끝 주를 구함.
  const start_week = moment(today).startOf('month').week();
  const end_week = moment(today).endOf('month').week();

  // 달력에 넣을 주수 배열 길이를 구함.
  // 마지막 주가 다음 해 1주일 수 있음. (시작 주보다 끝 주가 숫자가 작을 수 있다!)
  const week_num =
    (start_week > end_week ? 53 - start_week : end_week - start_week) + 1;

  // 주수 길이의 배열을 만들고,
  const _week_arr = Array.from({ length: week_num }, (v, i) => start_week + i);

  // 주마다 7개씩 날짜를 넣어주면 끝!
  const week_arr = _week_arr.map((week_index) => {
    return (
      <Grid
        key={`${moment(today).format('MM')}_week_${week_index}`}
        margin="4px auto"
        flex_direction="row"
      >
        {/*한 주는 7일이니, 주에 7개씩 날짜 칸을 넣어준다. */}
        {Array.from({ length: 7 }, (v, i) => i).map((day_index) => {
          let _day = today
            .clone()
            .startOf('year')
            .week(week_index)
            .startOf('week')
            .add(day_index, 'day');

          const is_today =
            moment().format('YYYY-MM-DD') === _day.format('YYYY-MM-DD');

          // routines에 해당 일 일정이 있으면 일정을 list에 넣어주자!
          const _routineList = routines.filter((routine, idx) => {
            return routine.createdAt?.startsWith(_day.format('YYYY-MM-DD'));
          });
          const _challengeList = myChallenges.filter((challenge, idx) => {
            return (
              challenge.Challenge.challengeDateTime?.startsWith(
                _day.format('YYYYMMDD'),
              ) && challenge.Challenge.isCompleted
            );
          });

          const routineList = _routineList.map((_l, idx) => {
            // 일정을 뿌려줌!
            return (
              <Grid
                bg="rgba(74, 64, 255, 0.3)"
                height="50%"
                key={`${_l.id}`}
                onClick={() => {}}
                width="50%"
                style={{ position: 'absolute', top: '22%', left: '12%' }}
              ></Grid>
            );
          });
          const challengeList = _challengeList.map((_l, idx) => {
            // 일정을 뿌려줌!
            return (
              <Grid
                bg="rgba(0, 0, 0, 0.3)"
                height="50%"
                key={`${_l.id}`}
                onClick={() => {}}
                width="50%"
                style={{ position: 'absolute', top: '22%', left: '12%' }}
              ></Grid>
            );
          });

          return (
            <Grid
              margin="0px 2px"
              key={`${moment(today).format(
                'MM',
              )}_week_${week_index}_day_${day_index}`}
              flex_direction="column"
              bg={is_today ? '#F7F7FA' : '#ffffff'}
              justify_contents="center"
              style={{ position: 'relative' }}
            >
              {_day.format('MM') === moment(today).format('MM') && (
                <React.Fragment>
                  <Text type="label" color="rgba(0,0,0, 0.6)" fontSize="14px">
                    {_day.format('DD')}
                  </Text>
                  <React.Fragment>
                    {_routineList && routineList}
                    {_challengeList && challengeList}
                  </React.Fragment>
                </React.Fragment>
              )}
            </Grid>
          );
        })}
      </Grid>
    );
  });

  const dow = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((_d) => {
    return (
      <Grid
        margin="4px 2px"
        width="100%"
        flex_direction="column"
        bg="#F7F7FA"
        height="auto"
        key={`${moment(today).format('MM')}_week_${_d}`}
      >
        <Text bold type="label" color="#000" fontWeight="bold">
          {_d}
        </Text>
      </Grid>
    );
  });

  return (
    <React.Fragment>
      <Text
        type="contents"
        padding="24px 0 24px 24px"
        fontSize="18px"
        textAlign="left"
        fontWeight="bold"
        margin="0"
        bgColor="#F7F7FA"
      >
        Calendar
      </Text>
      <Grid flex_direction="column" width="100vw" height="50vh" margin="auto">
        <Grid justify_contents="center" align="baseline" bg="#F7F7FA">
          <Button
            margin="0 30px 0 0"
            bgColor="#F7F7FA"
            alignSelf="center"
            _onClick={() => {
              _changeMonth(-1);
            }}
          >
            <Image src={Prev} width="5px" height="10px" borderRadius="0" />
          </Button>
          <Text type="contents" margin="0" fontSize="30px" fontWeight="bold">
            {moment(today).format('MM')}
          </Text>
          <Text
            type="contents"
            margin="0 0 0 5px"
            fontSize="14px"
            fontWeight="600"
          >
            {moment(today).format('YYYY')}
          </Text>
          <Button
            margin="0 0 0 30px"
            bgColor="#F7F7FA"
            alignSelf="center"
            _onClick={() => {
              _changeMonth(1);
            }}
          >
            <Image src={Next} width="5px" height="10px" borderRadius="0" />
          </Button>
        </Grid>
        <Grid height="auto" font_size="4" bg="#F7F7FA">
          {dow}
        </Grid>
        {week_arr}
      </Grid>
      {/* 고정 하단바 */}
      <NavBarWrapper>
        <NavBar />
      </NavBarWrapper>
    </React.Fragment>
  );
};

export default Calendar;

const NavBarWrapper = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100vw;
`;
