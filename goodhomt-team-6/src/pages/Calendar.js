import React, { useEffect, useState } from 'react';
import { history } from '../redux/configureStore';
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
import BadRating from '../img/clicked_bad_rating.svg';
import GoodRating from '../img/clicked_good_rating.svg';
import NormalRating from '../img/clicked_normal_rating.svg';

/**
 * 달력 만들기 순서
 *  - 이번달이 몇 주가 필요한 지 "주"수 구하기
 *  - 주수만큼 map 돌리기
 *  - map 돌리면서 안에 날짜 넣어주기!
 *  - +) 일정도 같이 넣어주기
 */
const Calendar = (props) => {
  const dispatch = useDispatch();
  const [selectedList, setSelectedList] = useState(null);
  const is_login = useSelector((store) => store.user?.is_login);

  useEffect(() => {
    if (is_login) {
      dispatch(challengeActions.getMyChallengesAPI('all'));
      dispatch(exerciseActions.getAllRoutineAPI());
    }
  }, []);
  useEffect(() => {
    if (is_login) {
      dispatch(challengeActions.getMyChallengesAPI('all'));
      dispatch(exerciseActions.getAllRoutineAPI());
    }
  }, [is_login]);

  const routines = useSelector((state) => state.exercise.routine);
  const allMyChallenges = useSelector(
    (state) => state.challenge.allMyChallenges,
  );

  // 여기서 today는 처음엔 진짜 '오늘 날짜'로 들어가지만, setMonth를 통해 월을 이동할수 있음.
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

  // 이번 월에 몇번째 주가 들어가는지 배열로 만듦,
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
            // today 본래 값이 변형되지 않도록 clone 메서드 이용
            .clone()
            .startOf('year')
            .week(week_index)
            .startOf('week')
            .add(day_index, 'day');

          const is_today =
            moment().format('YYYY-MM-DD') === _day.format('YYYY-MM-DD');

          // routines에 해당 일 일정이 있으면 일정을 list에 넣어주자!
          const _routineList = routines.filter((routine, idx) => {
            return (
              routine.createdAt?.startsWith(_day.format('YYYY-MM-DD')) &&
              routine.isCompleted
            );
          });
          const _challengeList = allMyChallenges.filter((challenge, idx) => {
            return challenge.Challenge.challengeDateTime?.startsWith(
              _day.format('YYYYMMDD'),
            );
          });
          const _totalList = _routineList.concat(_challengeList);

          const totalList = _totalList.map((_l, idx) => {
            // 일정을 뿌려줌!
            if (_l?.routineName) {
              return (
                <Grid
                  bg="rgba(74, 64, 255, 0.3)"
                  height="50%"
                  key={`${_l.id}`}
                  id={_l.id}
                  onClick={() => {
                    setSelectedList(_totalList);
                  }}
                  width="50%"
                  style={{
                    position: 'absolute',
                    top: '22%',
                    left: '12%',
                    zIndex: '1',
                  }}
                ></Grid>
              );
            } else if (_l?.challengeId) {
              return (
                <Grid
                  bg="rgba(0, 0, 0, 0.3)"
                  height="50%"
                  key={`${_l.id}`}
                  id={_l.id}
                  onClick={() => {
                    setSelectedList(_totalList);
                  }}
                  width="50%"
                  style={{
                    position: 'absolute',
                    top: '22%',
                    left: '12%',
                    zIndex: '1',
                  }}
                ></Grid>
              );
            }
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
                  <Text
                    type="label"
                    color="rgba(0,0,0, 0.6)"
                    fontSize="14px"
                    style={{ fontFamily: 'sans-serif' }}
                  >
                    {_day.format('DD')}
                  </Text>
                  <React.Fragment>
                    {(_routineList || _challengeList) && totalList}
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
      <Grid flex_direction="column" width="100vw" height="45vh" margin="auto">
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

      {/* 클릭한 루틴, 챌린지 */}
      {selectedList &&
        selectedList.map((l, idx) =>
          l?.routineName ? (
            <TodayExerciseWrapper
              onClick={() => {
                dispatch(exerciseActions.addSelectedPrevItem(l));
                history.push('/routinedetail');
              }}
            >
              <RoutineInfo>
                <RunningTime>
                  {l && Math.floor(l?.routineTime / 60) < 10
                    ? `0${Math.floor(l?.routineTime / 60)}:`
                    : Math.floor(l?.routineTime / 60)`:`}
                  {l && l?.routineTime < 10
                    ? `0${l?.routineTime % 60}`
                    : l?.routineTime % 60}
                </RunningTime>

                <RoutineBox>
                  <RoutineName>{l?.routineName}</RoutineName>
                  <WorkoutDate>
                    {l.createdAt.slice(5, 10).replace(/-/gi, '.')}
                  </WorkoutDate>
                </RoutineBox>
              </RoutineInfo>
              {l?.rating === 'soso' && (
                <RatingCont src={NormalRating}></RatingCont>
              )}
              {l?.rating === 'bad' && <RatingCont src={BadRating}></RatingCont>}
              {(l?.rating === 'good' || l?.rating === null) && (
                <RatingCont src={GoodRating}></RatingCont>
              )}
            </TodayExerciseWrapper>
          ) : (
            <TodayExerciseWrapper
              onClick={() => {
                dispatch(
                  challengeActions.getMyChallengesAPI(
                    'calendar',
                    allMyChallenges.indexOf(l),
                  ),
                );
              }}
            >
              <RoutineInfo>
                <RunningTime>
                  {l && Math.floor(l?.challengeTime / 60) < 10
                    ? `0${Math.floor(l?.challengeTime / 60)}:`
                    : Math.floor(l?.challengeTime / 60)`:`}
                  {l && l?.challengeTime < 10
                    ? `0${l?.challengeTime % 60}`
                    : l?.challengeTime % 60}
                </RunningTime>

                <RoutineBox>
                  <RoutineName>{l?.Challenge.challengeName}</RoutineName>
                  <WorkoutDate>
                    {`${l?.Challenge?.challengeDateTime.slice(
                      4,
                      6,
                    )}.${l?.Challenge?.challengeDateTime.slice(6, 8)}`}
                  </WorkoutDate>
                </RoutineBox>
              </RoutineInfo>
              {l?.rating === 'soso' && (
                <RatingCont src={NormalRating}></RatingCont>
              )}
              {l?.rating === 'bad' && <RatingCont src={BadRating}></RatingCont>}
              {(l?.rating === 'good' || l?.rating === null) && (
                <RatingCont src={GoodRating}></RatingCont>
              )}
            </TodayExerciseWrapper>
          ),
        )}

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

const TodayExerciseWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  border-top: 1px solid rgba(0, 0, 0, 0.18);
  border-bottom: 1px solid rgba(0, 0, 0, 0.18);
  line-height: 48px;
  margin: 0px;
  padding: 28px 0px;
  font-size: 1rem;
  &:hover,
  &:active {
    cursor: pointer;
  }
`;

const RoutineInfo = styled.div`
  display: flex;
  padding-left: 20px;
`;

const RatingCont = styled.img`
  width: 40px;
  margin-right: 20px;
`;

const RoutineBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const RoutineName = styled.span`
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
`;

const WorkoutDate = styled.span`
  font-size: 14px;
  line-height: 24px;
  margin-right: 8px;
`;

const RunningTime = styled.div`
  width: 82px;
  height: 44px;
  border-radius: 22px;
  background-color: #000;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;
