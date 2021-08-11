import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import {  Image } from '../shared/Styles';
import { history } from '../redux/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as exerciseActions } from '../redux/modules/exercise';
import CategoryItem from '../components/CategoryItem';
import ChallengeItem from '../components/ChallengeItem';



const Community = () => {
    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState('');
    const [peedClicked, setPeedClicked] = useState(true);
    const [challengeClicked, setChallengeClicked] = useState(false);

    const exerciseAll = useSelector((store) => store.exercise.exercise);
    const userImg = useSelector((store) => store.user.user.userImg);

  const peedClick = useCallback(() => {
      setPeedClicked(true);
      setChallengeClicked(false);
  },[]);
  const challengeClick = useCallback(() => {
      setPeedClicked(false);
      setChallengeClicked(true);
  },[]);
    return (
        <Container>
            <Wrapper>
                <InboxWrapper>
                <UserWrapper>
                    <InfoBox>
                    <Image
                        width="40px"
                        height="40px"
                        margin="0px 15px 0px 0px"
                        src={userImg}
                    ></Image>
                        <Text>
                        Community
                        </Text>
                    </InfoBox>
                </UserWrapper>

                <Category>
                <CategoryItem
                  isChecked={peedClicked}
                  handle={peedClick}
                  name={"Peed"}
                />
                <CategoryItem
                  isChecked={challengeClicked}
                  handle={challengeClick}
                  name={"Challenge"}
              />
              </Category>
            {peedClicked ? (
               //Peed
                <CategoryList>
                  
                </CategoryList>
            ) : (
                // Challenge
                <CategoryList>
                {[1,2,3,4,]
                    .map((e, i) => (
                    <ChallengeItem />
                                          
                    ))}
                </CategoryList>
            )}
        </InboxWrapper>
      </Wrapper>            
    </Container>
    );
};
const Container = styled.div`
  background-color: #f7f7fa;
  overflow: scroll;
`;

const Wrapper = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  overflow: scroll;
`;

const InboxWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const UserWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Text = styled.h2`
  margin: 0px 5px 0px 0px;
  font-size: 24px;
`;

const CategoryList = styled.ul`
  width: 100%;
  padding: 0px;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
  height: calc(100vh - 314px);
  background-color: #F7F7FA;
`;

const Category = styled.ul`
  display: flex;
  justify-content: center;
  width:100%;
  padding: 0px;
  list-style: none;
`;

export default Community;