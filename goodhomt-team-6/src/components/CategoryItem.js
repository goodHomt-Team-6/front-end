import React, { useCallback } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
const CategoryItem = ({ isChecked, handle, name }) => {
    const handleClick = useCallback(() => {
        handle();
    }, []);
    return (
    <>
        {isChecked ?
        (<ClickedItem onClick={()=>handleClick()}>
                    {name}
        </ClickedItem>
        )
        :(<NotClickedItem onClick={()=>handleClick()}>
                    {name}
        </NotClickedItem>
        )}
    </>        
    );
    
};


const ClickedItem = styled.li`
  list-style: none;
  padding-bottom: 15px;
  width: 50%;
  text-align: center;
  font-size: 1.2rem;
  opacity: 100%;
  color: ${Color.black};
  &:hover,
  &:active {
    cursor: pointer;
  }
  border-bottom: 4px solid ${Color.black};
`;

const NotClickedItem = styled.li`
  list-style: none;
  padding-bottom: 15px;
  width: 50%;
  text-align: center;
  font-size: 1.2rem;
  opacity: 54%;
  color: ${Color.lightGray};
  &:hover,
  &:active {
    cursor: pointer;
  }
  border-bottom: 4px solid ${Color.lightGray};
`;
export default CategoryItem;