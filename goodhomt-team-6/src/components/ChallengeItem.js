import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Color from '../shared/Color';
import { Button, Image } from '../shared/Styles';


const ChallengeItem = () => {
    const userName = useSelector((store) => store.user.user.nickname);
    const userImg = useSelector((store) => store.user.user.userImg);
    const getDate = moment().format('YYYY년MM월DD일 HH시:mm분');
    return ( 
            <Challenge>
                <UserWrapper>
                    <InfoBox>
                    <Image
                        width="40px"
                        height="40px"
                        margin="0px 15px 0px 0px"
                        src={userImg}
                    ></Image>
                        {userName && (
                            <UserInfo>
                                <Text>name</Text>
                                <DateBox><Today>{getDate}</Today></DateBox>
                            </UserInfo>
                    )}
                    </InfoBox>
                </UserWrapper>
                <ChallengeInfo>
                   <ChallengeData>
                        <DateBox>{getDate}</DateBox>
                    </ChallengeData>
                    <ChallengeTitle>
                        조깅 아니고 야깅
                    </ChallengeTitle>
                    <ChallengeDescription>
                         재밌는 챌린징빈다. 꼭 참여 부탁드립니다. 남녀노소 쉽게 할 수있는 챌린지입니다.        
                    </ChallengeDescription>
                </ChallengeInfo>
            </Challenge> 
    );
};

const Challenge = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${Color.white};
  margin-bottom: 1.5rem;
  -webkit-box-shadow: 5px 5px 9px -5px #000000; 
  box-shadow: 5px 5px 9px -5px #000000;
`;

const UserInfo = styled.div`
    display:flex;
    flex-direction: column;
`;

const ChallengeInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const ChallengeData = styled.span`
    color: ${Color.mainBlue};
`;

const ChallengeTitle = styled.span`
    color: ${Color.black};
    font-size: 1.5rem;
`;

const ChallengeDescription = styled.p`
    color: ${Color.navy};
    font-size: 0.5rem;
`;
const UserWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const Today = styled.span`
  font-size: 17px;
  margin: 0px;
`;
const Text = styled.span`
  font-size: 18px;
`;

const DateBox = styled.div``;



export default ChallengeItem;