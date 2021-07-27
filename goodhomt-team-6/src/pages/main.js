import React from 'react';
import styled from 'styled-components';
import { Button, Image } from "../shared/Styles";
import plusButton from '../img/plus-button.svg';

import UserProfile from "../components/UserProfile";
import RegisterExercise from "../components/RegisterExercise";
import ImportExercise from "../components/ImportExercise";

// 메인 페이지 컴포넌트
const Main = (props) => {
  const onMealButtonClick = () => {
    props.history.push('/exercise');
  };
  const breakfast = JSON.parse(localStorage.getItem('breakfast') || 'null');


  return (
    <Wrapper>
      <UserProfile />
      <div className="button prev">&lt;</div>
      <div className="date">Aug 5</div>
      <div className="button next">&gt;</div>
      <RegisterExercise />
      <ImportExercise />

      <div className="meal-button" onClick={() => {
        if (breakfast == null) onMealButtonClick();
      }}>
        {breakfast ?
          <div className="meal-menu">
            {Object.entries(breakfast).map(([name, value], i) =>
              <div key={i} className="meal-menu-entry">{name}{value.count}</div>
            )}
          </div>

          : <img src={plusButton} className="meal-add-img" width="78" />
        }
        <div className="meal-text">아침</div>
      </div>


      <div className="meal-button" onClick={onMealButtonClick}>
        <img src={plusButton} className="meal-add-img" width="78" />
        <div className="meal-text">점심</div>
      </div>


      <div className="meal-button" onClick={onMealButtonClick}>
        <img src={plusButton} className="meal-add-img" width="78" />
        <div className="meal-text">저녁</div>
      </div>


      <div className="meal-button" onClick={onMealButtonClick}>
        <img src={plusButton} className="meal-add-img" width="78" />
        <div className="meal-text">간식</div>
      </div>

    </Wrapper>
  );
};

export default Main;

const Wrapper = styled.div`
  padding: 1.5rem;
`;
