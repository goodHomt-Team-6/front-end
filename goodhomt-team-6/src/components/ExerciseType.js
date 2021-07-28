import React from 'react';
import styled from 'styled-components';
import { Button } from "../shared/Styles";
import CloseButton from "../img/close-button.svg";
import { useSelector, useDispatch } from "react-redux";



// 운동타입 컴포넌트
const ExerciseType = (props) => {
  const exerciseList = useSelector((store) => store.exercise.exercise);
  const { selected, setSelected, searchInput } = props;
  console.log(exerciseList);

  return (
    <>
      <TypeContainer>
        <TypeWrapper>
          <MenuList>
            {/* <Menu>
              {exerciseList.menu}
              <CalText>1접시{exerciseList.cal}kcal</CalText>
              <MenuButton onClick={() => {
                console.log("메뉴 추가 클릭");
              }}>추가</MenuButton>
            </Menu> */}

            {exerciseList.filter(e => e.menu.includes(searchInput)).map((e, i) =>
              <Menu key={i}>
                {e.menu}
                <CalText>1접시{e.cal}kcal</CalText>
                <MenuButton onClick={() => {
                  console.log("메뉴 추가 클릭");
                  const count = (selected[e.menu] || { count: 0 }).count;
                  setSelected({
                    ...selected,
                    [e.menu]: {
                      count: count + 1,
                      cal: e.cal,
                    },
                  });
                }}>추가</MenuButton>
              </Menu>
            )}
          </MenuList>


        </TypeWrapper>
        <Button></Button>
      </TypeContainer>
    </>
  );
};

export default ExerciseType;

const TypeContainer = styled.div`

`;

const TypeWrapper = styled.div`

`;

const MenuList = styled.ul`
  padding: 0 16px;
  padding-bottom: 16px;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
`;

const Menu = styled.li`
  position: relative;
  height: 48px;
  border-bottom: 1px solid #465678;
  line-height: 48px;
  padding-left: 16px;
  font-weight: bold;
  color: #465678;
`;

const CalText = styled.span`
  font-size: 9px;
  color: #465678;
  line-height: 48px;
`;

const MenuButton = styled.button`
  position: absolute;
  width: 32px;
  height: 16px;
  font-size: 10px;
  line-height: 16px;
  background-color: #465678;
  border: none;
  border-radius: 8px;
  top: 20px;
  padding: 0;
  right: 0;
  color: white;
`;

const SelectedWrapper = styled.div`
  height: 44px;
  overflow: scroll;
  white-space: nowrap;
  box-sizing: border - box;
  margin: 0 16px;
  padding-top: 4px;
`;

const Selected = styled.div`
  font-size: 14px;
  border: 1px solid #465678;
  height: 32px;
  display: inline-block;
  padding: 0 8px;
  color: #555;
  line-height: 32px;
  border-radius: 16px;
  margin-right: 16px;
  position: relative;
`;

const CloseBtn = styled.img`
  position: absolute;
  top: -4px;
  right: -6px;
`;
