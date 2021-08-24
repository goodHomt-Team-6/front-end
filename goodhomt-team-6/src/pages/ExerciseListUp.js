import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import { Text, Button, FooterButton } from '../shared/Styles';
import CloseButton from '../img/close-button.svg';
import { history } from '../redux/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as exerciseActions } from '../redux/modules/exercise';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CloseIcon from '@material-ui/icons/Close';
import { List } from '@material-ui/core';
import Logger from '../shared/Logger';
import searchIcon from '../img/search-icon.svg';
import { Opacity } from '@material-ui/icons';
import Header from '../components/Header';
import Category from '../components/Category';

// 운동리스트 페이지 컴포넌트
const ExerciseListUp = (props) => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [clicked, isClicked] = useState(false);
  const [selected, isSelected] = useState(false);
  const [clickedCategoryItem, setCategoryItem] = useState(null);
  const selectedItems = useSelector((store) => store.exercise.selectedItems);
  const myExercise = useSelector(
    (store) => store.exercise.routine[0].myExercise,
  );
  const selectedWrapper = useRef(null);

  useEffect(() => {
    dispatch(exerciseActions.getExerciseAPI());
    selectedWrapper.current.scrollBy(500, 0);
  }, [selectedItems]);

  useEffect(() => {
    if (clickedCategoryItem !== null) {
      dispatch(exerciseActions.getExerciseTypeAPI(clickedCategoryItem));
    }
  }, [selectedItems]);

  useEffect(() => {
    if (myExercise && myExercise.length > 0) {
      isSelected(true);
      return;
    } else {
      isSelected(false);
      return;
    }
  }, [myExercise]);

  return (
    <>
      <ExerciseListCont>
        {/* 뒤로가기 */}
        <Header toMain message="Select" page="1/2" />

        {/* 선택한 운동 보여주기 */}
        {selectedItems && (
          <SelectedWrapper ref={selectedWrapper}>
            {selectedItems.map((e, i) => (
              <Selected key={i}>
                <ExerciseName>{e.exerciseName}</ExerciseName>
                <CloseBtn
                  src={CloseButton}
                  width="10"
                  onClick={() => {
                    dispatch(exerciseActions.removeSelectedItem(e));
                    dispatch(exerciseActions.removeExerciseType(e));
                  }}
                />
              </Selected>
            ))}
          </SelectedWrapper>
        )}

        {/* 운동 검색 및 카테고리 */}
        <Category selectedItems={selectedItems} />

        {/* 종목 추가하기 */}
        <FooterButtonWrapper>
          {selectedItems && selectedItems.length > 0 ? (
            <FooterButton onClick={() => history.push('/exercise/form')}>
              종목 추가하기
            </FooterButton>
          ) : (
            <FooterButton disabled>종목 추가하기</FooterButton>
          )}
        </FooterButtonWrapper>
      </ExerciseListCont>
    </>
  );
};

export default ExerciseListUp;

const ExerciseListCont = styled.div`
  background-color: #f7f7fa;
`;

const innerHeight = window.innerHeight - 177;

const SelectedWrapper = styled.div`
  height: auto;
  overflow-x: scroll;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
  white-space: nowrap;
  box-sizing: border-box;
  margin: 0px 16px 10px 16px;
  display: flex;
`;

const Selected = styled.div`
  font-size: 14px;
  border: 1px solid ${Color.mainBlue};
  height: 32px;
  display: flex;
  padding: 0 8px;
  color: black;
  line-height: 32px;
  border-radius: 16px;
  margin-right: 4px;
  background-color: #fff;
`;

const ExerciseName = styled.span`
  margin-right: 5px;
`;

const CloseBtn = styled.img`
  &:hover {
    cursor: pointer;
  }
`;

const FooterButtonWrapper = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
`;
