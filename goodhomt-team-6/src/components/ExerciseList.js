import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from "../shared/Styles";
import CloseButton from "../img/close-button.svg";

// 운동리스트 컴포넌트
const SelectExercise = (props) => {
  const [searchInput, setSerachInput] = useState('');
  const [selected, setSelected] = useState({});

  const menu = [
    { menu: "토마토 스파게티", cal: 140 },
    { menu: "미트소스를 곁들인 스파게티", cal: 140 },
    { menu: "까르보나라 스파게티", cal: 140 },
    { menu: "스파게티면", cal: 140 },
    { menu: "크림스파게티", cal: 140 },
    { menu: "알리오 올리오", cal: 140 },
    { menu: "봉골레 스파게티", cal: 140 },
    { menu: "치즈크림 스파게티", cal: 140 },
    { menu: "치즈", cal: 140 },
    { menu: "날치알새우 스파게티", cal: 140 },
    { menu: "로제크림스파게티", cal: 140 },
  ];

  const formatter = Intl.NumberFormat('ko-KR');

  return (
    <>
      <ListHeader>
        <SearchInputWrapper>
          <SearchInput
            value={searchInput}
            onChange={e => setSerachInput(e.target.value)}
          />
        </SearchInputWrapper>
      </ListHeader>

      {Object.keys(selected).length > 0 ?
        <SelectedWrapper>
          {Object.entries(selected).map(([name, value], i) =>
            <Selected key={i}>
              {name} {value.count} {formatter.format(value.count * value.cal)} kcal
              <CloseBtn src={CloseButton}
                onClick={() => setSelected(
                  Object.keys(selected).reduce((object, key) => {
                    if (key !== name) {
                      object[key] = selected[key];
                    } else {
                      const ncount = selected[key].count - 1;
                      if (ncount > 0)
                        object[key] = {
                          ...selected[key],
                          count: ncount
                        };
                    }
                    return object;
                  }, {}))
                }
              />

            </Selected>
          )}
        </SelectedWrapper>
        : null
      }
      <MenuList>
        {menu.filter(e => e.menu.includes(searchInput)).map((e, i) =>
          <Menu key={i}> {e.menu}
            <CalText>1접시{e.cal}kcal</CalText>
            <MenuButton onClick={() => {
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

      <SaveButtonWrapper>
        <SaveButton onClick={() => {
          localStorage.setItem('breakfast', JSON.stringify(selected));
          props.history.push('/');
        }}>저장하기</SaveButton>
      </SaveButtonWrapper>
    </>
  );
};

export default SelectExercise;

const ListHeader = styled.div`
  border-bottom: 1px solid #246567;
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  color: #465678;
  text-align: center;
  font-weight: bold;
`;

const SearchInputWrapper = styled.div`
  box-sizing: border-box;
  padding: 16px;
  width: 100%;
`;

const SearchInput = styled.input`
  font-size: 15px;
  box-sizing: border - box;
  padding: 14px 18px;
  border-radius: 4px;
  width: 100%;
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

const SaveButton = styled.button` 
  background-color: #465678;
  display: block;
  height: 64px;
  width: 100%;
  border-radius: 32px;
  border: none;
  font-size: 20px;
  color: white;
  font-weight: bold;
`;

const SaveButtonWrapper = styled.div`
  bottom: 0;
  left: 16px;
  right: 16px;
  position: absolute;
`;
