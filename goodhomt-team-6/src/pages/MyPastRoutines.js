import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import GoBackHeader from '../components/GoBackHeader';
import DropDown from '../components/DropDown';
import BookmarkLine from '../img/bookmark_line.svg';
import BookmarkSolid from '../img/bookmark_solid.svg';
import { FooterButton } from '../shared/Styles';
import RoutineItem from '../components/RoutineItem';
import { actionCreators as exerciseActions } from '../redux/modules/exercise';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import logger from '../shared/Logger';
import { history } from '../redux/configureStore';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

// 이전 목록 불러오기 페이지 컴포넌트
const MyPastRoutines = (props) => {
  const dispatch = useDispatch();
  const [bookmarked, setBookmarked] = useState(false);
  // 선택한거 리덕스에 넣기 위한 작업
  const [clicked, setClicked] = useState([]);

  const myRoutines = useSelector((store) => store.exercise.routine);
  const selectPeriod = useSelector((store) => store.exercise.selectPeriod);
  const selectedPrevItem = useSelector((store) => store.exercise.selectedPrevItem);

  useEffect(() => {
    dispatch(exerciseActions.getAllRoutineAPI());
    dispatch(exerciseActions.getSelectedPrevItem);
  }, []);

  useEffect(() => {
    dispatch(exerciseActions.getSelectedPrevItem);
  }, [selectedPrevItem]);

  useEffect(() => {
    if (selectPeriod === "전체 기간") {
      dispatch(exerciseActions.getAllRoutineAPI());
      // return;
    }
    if (selectPeriod === "하루 전") {
      dispatch(exerciseActions.getDayAgoRoutineAPI());
      // return;
    }
    if (selectPeriod === "일주일 전") {
      dispatch(exerciseActions.getWeekAgoRoutineAPI());
      // return;
    }
    if (selectPeriod === "한달 전") {
      dispatch(exerciseActions.getMonthAgoRoutineAPI());
      // return;
    }
  }, [selectPeriod]);

  const ClickedBookmark = () => {
    setBookmarked(true);
    dispatch(exerciseActions.getBookmarkRoutineAPI());
  };

  const unClickedBookmark = () => {
    setBookmarked(false);
  };

  return (
    <>
      <GoBackButton
        onClick={() => {
          history.replace('/');
        }}
      >
        <ArrowBackIosIcon style={{ width: '16px', height: '16px' }} />
        <RoutineText>Main</RoutineText>
      </GoBackButton>

      {/* 드롭다운 박스 */}
      <DropdownWrapper>
        <DropDown />

        {/* 북마크 */}
        {bookmarked ?
          <BookmarkImg
            onClick={unClickedBookmark}
            src={BookmarkSolid}
          />
          : <BookmarkImg
            onClick={ClickedBookmark}
            src={BookmarkLine}
          />
        }
      </DropdownWrapper>

      {/* 나의 지난 루틴 목록 */}
      <CategoryList>
        {myRoutines && myRoutines.length > 0 ?
          myRoutines.map((routine, idx) => (
            <div key={idx} {...routine}>
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
              // onClick={() => {
              //   const selected = myRoutines.filter((m) => m.id == routine.id);
              // }}
              >
                <TimeBox>
                  <Time>30:00</Time>
                </TimeBox>
                {myRoutines &&
                  <RoutineInfo>
                    <RoutineName>{routine.routineName}</RoutineName>
                    {routine.createdAt &&
                      <WorkoutDate>{routine.createdAt.substring(0, 10)}</WorkoutDate>
                    }
                  </RoutineInfo>
                }
              </RadioBox>
            </div>
          )) : null
        }
      </CategoryList>

      {/* 불러오기 버튼 */}
      <FooterButtonWrapper>
        {clicked.length !== 0 ? (
          <FooterButton
            onClick={() => {
              dispatch(exerciseActions.addSelectedPrevItem(clicked));
              history.push('/routinedetail');
            }}>
            불러오기
          </FooterButton>
        ) : (
          <FooterButton
            disabled>
            불러오기
          </FooterButton>
        )}
      </FooterButtonWrapper>
    </>
  );
};

export default MyPastRoutines;

const DropdownWrapper = styled.div`
  margin: 0px 1.5rem;
  padding-bottom: 10px;
  border-bottom: 1px solid ${Color.clickedGray};
  display: flex;
  justify-content: space-between;
`;

const BookmarkImg = styled.img`
  cursor: pointer;
`;

const FooterButtonWrapper = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
`;

const CategoryList = styled.ul`
  padding: 0px;
  margin: 0px;
  list-style: none;
  box-sizing: border-box;
  height: calc(100vh - 199px);
  overflow-y: scroll;
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
    background-color: #c4c4c4;
    cursor: pointer;
  }
`;

const RadioInput = styled.input`
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
`;

const Time = styled.span`
  line-height: 45px;
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
`;

const GoBackButton = styled.div`
  display: flex;
  margin: 25px;
  /* width: 100%; */
  box-sizing: border-box;
  align-items: baseline;
`;

const RoutineText = styled.h2`
  margin: 0px 5px 0px 0px;
  font-size: 24px;
`;