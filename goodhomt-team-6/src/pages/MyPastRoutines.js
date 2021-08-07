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

const cookies = new Cookies();

// 이전 목록 불러오기 페이지 컴포넌트
const MyPastRoutines = (props) => {
  const dispatch = useDispatch();
  const [bookmarked, setBookmarked] = useState(false);
  const [selected, setSelected] = useState(false);

  const myRoutines = useSelector((store) => store.exercise.routine);
  const selectPeriod = useSelector((store) => store.exercise.selectPeriod);

  useEffect(() => {
    dispatch(exerciseActions.getAllRoutineAPI());
  }, []);

  useEffect(() => {
    if (selectPeriod === "전체 기간") {
      dispatch(exerciseActions.getAllRoutineAPI());
      return;
    }
    if (selectPeriod === "하루 전") {
      dispatch(exerciseActions.getDayAgoRoutineAPI());
      return;
    }
    if (selectPeriod === "일주일 전") {
      dispatch(exerciseActions.getWeekAgoRoutineAPI());
      return;
    }
    if (selectPeriod === "한달 전") {
      dispatch(exerciseActions.getMonthAgoRoutineAPI());
      return;
    }
  }, [selectPeriod]);


  const ClickedBookmark = () => {
    setBookmarked(true);
  };

  const unClickedBookmark = () => {
    setBookmarked(false);
  };

  return (
    <>
      <GoBackHeader>
        Main
      </GoBackHeader>

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
            <RoutineItem key={idx} {...routine} />
          )) : null
        }
      </CategoryList>

      {/* 불러오기 버튼 */}
      <FooterButtonWrapper>
        {selected ? (
          <FooterButton
            onClick={() =>
              history.push('/')}
          >불러오기
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
  height: calc(100vh - 314px);
  overflow-x: scroll;
`;
