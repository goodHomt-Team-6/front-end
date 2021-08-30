import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import DropDown from '../components/DropDown';
import BookmarkLine from '../img/bookmark_line.svg';
import BookmarkSolid from '../img/bookmark_solid.svg';
import { FooterButton, Text } from '../shared/Styles';
import { actionCreators as exerciseActions } from '../redux/modules/exercise';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import logger from '../shared/Logger';
import { history } from '../redux/configureStore';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MoreBtn from '../img/more_button.svg';
import '../components/RoutineItem.css';
import Header from '../components/Header';
import ratingGood from '../img/rating_good.svg';
import ratingBad from '../img/rating_bad.svg';
import ratingSoso from '../img/rating_soso.svg';

// 이전 목록 불러오기 페이지 컴포넌트
const MyPastRoutines = (props) => {
  const dispatch = useDispatch();
  const [bookmarked, setBookmarked] = useState(false);
  // 선택한거 리덕스에 넣기 위한 작업
  const [clicked, setClicked] = useState([]);
  const [completed, isCompleted] = useState(true);

  const myRoutines = useSelector((store) => store.exercise.routine);
  const selectPeriod = useSelector((store) => store.exercise.selectPeriod);
  const selectedPrevItem = useSelector(
    (store) => store.exercise.selectedPrevItem,
  );

  useEffect(() => {
    dispatch(exerciseActions.getAllRoutineAPI());
    dispatch(exerciseActions.getSelectedPrevItem);
  }, []);

  useEffect(() => {
    if (myRoutines && myRoutines.length > 0) {
      dispatch(exerciseActions.getMyRoutine());
    }
  }, [selectPeriod]);

  useEffect(() => {
    dispatch(exerciseActions.getSelectedPrevItem);
  }, [selectedPrevItem]);

  const ClickedBookmark = () => {
    setBookmarked(true);
    dispatch(exerciseActions.getBookmarkRoutineAPI());
  };

  const unClickedBookmark = () => {
    setBookmarked(false);
    dispatch(exerciseActions.getAllRoutineAPI());
  };

  return (
    <>
      <Header toMain message="Main"></Header>

      {/* 드롭다운 박스 */}
      <DropdownWrapper>
        <DivBox>
          <DropDown />
          <MoreIcon src={MoreBtn} />
        </DivBox>
        {/* 북마크 */}
        {bookmarked ? (
          <BookmarkImg onClick={unClickedBookmark} src={BookmarkSolid} />
        ) : (
          <BookmarkImg onClick={ClickedBookmark} src={BookmarkLine} />
        )}
      </DropdownWrapper>

      {/* 나의 지난 루틴 목록 */}
      <CategoryList>
        {myRoutines && myRoutines.length > 0
          ? myRoutines.map((routine, idx) => (
            <div key={idx}>
              <RadioInput
                id={routine.createdAt}
                className="opacity"
                type="radio"
                name={'inputButton'}
                value={routine.id}
                onChange={(e) => {
                  const { value } = e.target;
                  const selected = myRoutines.filter((m) => m.id == value);
                  const toObject = selected[0];
                  setClicked(toObject);
                }}
              />
              <RadioBox
                htmlFor={routine.createdAt}
                className="list"
                value={routine.id}
              >
                <TodayExerciseWrapper>
                  {routine.isCompleted === false && (
                    <TimeBox>
                      <Text lineHeight="1" fontSize="0.9em" type="contents">
                        운동 전
                      </Text>
                    </TimeBox>
                  )}
                  {routine.isCompleted === true &&
                    routine.rating === 'soso' && (
                      <TimeBox
                        src={ratingSoso}
                        completed={completed}
                      ></TimeBox>
                    )}
                  {routine.isCompleted === true &&
                    routine.rating === 'bad' && (
                      <TimeBox
                        src={ratingBad}
                        completed={completed}
                      ></TimeBox>
                    )}
                  {routine.isCompleted === true &&
                    routine.rating === 'good' && (
                      <TimeBox
                        src={ratingGood}
                        completed={completed}
                      ></TimeBox>
                    )}
                </TodayExerciseWrapper>

                {myRoutines && (
                  <RoutineInfo>
                    <InfoBox>
                      {routine.isBookmarked && (
                        <BookmarkIcon src={BookmarkSolid}></BookmarkIcon>
                      )}
                      <RoutineName>{routine.routineName}</RoutineName>
                    </InfoBox>
                    <InfoTimeBox>
                      {routine.createdAt && (
                        <WorkoutDate>
                          {routine.createdAt.substring(5, 7)}.
                          {routine.createdAt.substring(8, 10)}
                        </WorkoutDate>
                      )}
                      <WorkoutDate>
                        {Math.floor(routine.routineTime / 60) < 10 ? (
                          <Time>{'0' + Math.floor(routine.routineTime / 60)}:</Time>
                        ) : (
                          <Time>{Math.floor(routine.routineTime / 60)}:</Time>
                        )}
                        {routine.routineTime % 60 < 10 ? (
                          <Time>{'0' + (routine.routineTime % 60)}</Time>
                        ) : (
                          <Time>{routine.routineTime % 60}</Time>
                        )}
                      </WorkoutDate>
                    </InfoTimeBox>
                  </RoutineInfo>
                )}
              </RadioBox>
            </div>
          ))
          : null}
      </CategoryList>

      {/* 불러오기 버튼 */}
      <FooterButtonWrapper>
        {clicked.length !== 0 ? (
          <FooterButton
            onClick={() => {
              dispatch(exerciseActions.addSelectedPrevItem(clicked));
              history.push('/routinedetail');
            }}
          >
            불러오기
          </FooterButton>
        ) : (
          <FooterButton disabled>불러오기</FooterButton>
        )}
      </FooterButtonWrapper>
    </>
  );
};

export default MyPastRoutines;

const DropdownWrapper = styled.div`
  padding: 0px 1.5rem;
  padding-bottom: 10px;
  border-bottom: 1px solid ${Color.clickedGray};
  display: flex;
  justify-content: space-between;
  background-color: ${Color.bgIvory};
`;

const BookmarkImg = styled.img`
  cursor: pointer;
`;

const FooterButtonWrapper = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
`;

const innerHeight = window.innerHeight - 180;

const CategoryList = styled.ul`
  padding: 0px;
  margin: 0px;
  list-style: none;
  box-sizing: border-box;
  height: ${innerHeight}px;
  overflow-y: scroll;
  background-color: ${Color.bgIvory};
`;

const RadioBox = styled.label`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 48px;
  border-bottom: 1px solid ${Color.lightGray};
  line-height: 48px;
  margin: 0px;
  padding: 32px 1.5rem;
  font-size: 1rem;
  &:hover,
  &:active {
    background-color: rgba(74, 64, 255, 0.15);
    cursor: pointer;
  }
`;

const RadioInput = styled.input`
  /* display: none; */
`;

const TimeBox = styled.div`
  background-color: black;
  width: 72px;
  height: 44px;
  border-radius: 22px;
  color: white;
  margin-right: 30px;
  display: flex;
  justify-content: center;
  align-content: center;
  background-image: url('${(props) => props.src}');
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
`;

const Time = styled.span`
  /* line-height: 45px; */
  font-size: 14px;
`;

const RoutineInfo = styled.div`
  display: flex;
  flex-direction: column;
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

const GoBackButton = styled.div`
  display: flex;
  width: auto;
  justify-content: flex-start;
  padding: 25px;
  /* width: 100%; */
  box-sizing: border-box;
  align-items: baseline;
  background-color: ${Color.bgIvory};
`;

const RoutineText = styled.h2`
  margin: 0px 5px 0px 0px;
  font-size: 24px;
`;

const BookmarkIcon = styled.img`
  width: 17px;
  margin-right: 3px;
`;

const InfoBox = styled.div`
  display: flex;
`;

const MoreIcon = styled.img``;

const DivBox = styled.div`
  display: flex;
`;

const TodayExerciseWrapper = styled.div`
`;

const InfoTimeBox = styled.div`
  margin: 0px;
  padding: 0px;
  display: flex;
`;
