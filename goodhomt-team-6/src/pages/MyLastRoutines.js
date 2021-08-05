import React, { useState } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import GoBackHeader from '../components/GoBackHeader';
import DropDown from '../components/DropDown';
import BookmarkLine from '../img/bookmark_line.svg';

const MyLastRoutines = (props) => {

  return (
    <>
      <GoBackHeader>
        Main
      </GoBackHeader>

      <DropdownWrapper>
        <DropDown />
        <BookmarkImg
          src={BookmarkLine}
        />
      </DropdownWrapper>
    </>
  );
};

export default MyLastRoutines;

const DropdownWrapper = styled.div`
  margin: 0px 1.5rem;
  padding-bottom: 10px;
  border-bottom: 1px solid ${Color.clickedGray};
  display: flex;
  justify-content: space-between;
`;

const BookmarkImg = styled.img`
`;