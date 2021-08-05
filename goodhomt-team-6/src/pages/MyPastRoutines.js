import React, { useState } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import GoBackHeader from '../components/GoBackHeader';
import DropDown from '../components/DropDown';
import BookmarkLine from '../img/bookmark_line.svg';
import BookmarkSolid from '../img/bookmark_solid.svg';
import { FooterButton } from '../shared/Styles';

// 이전 목록 불러오기 페이지 컴포넌트
const MyPastRoutines = (props) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [selected, setSelected] = useState(false);

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
        {/* {routines &&
          routines
            .map((e) => ( */}
        <ExerciseItem
          // key={e.id}
          onClick={() => {
          }}
        >
          <TimeBox>
            <Time>30:00</Time>
          </TimeBox>
          <RoutineInfo>
            <RoutineName>요가 외3</RoutineName>
            <WorkoutDate>07.26</WorkoutDate>
          </RoutineInfo>
        </ExerciseItem>
        {/* ))} */}
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
  width: 100%;
  padding: 0px;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
  height: calc(100vh - 314px);
  overflow-x: scroll;
`;

const ExerciseItem = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 48px;
  border-bottom: 1px solid ${Color.lightGray};
  line-height: 48px;
  margin: 0px 1.5rem;
  padding: 32px 10px;
  font-size: 1rem;
  &:hover,
  &:active {
    background-color: #c4c4c4;
  }
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
