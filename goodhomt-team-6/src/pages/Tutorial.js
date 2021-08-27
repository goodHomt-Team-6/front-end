import React from 'react';
import styled from 'styled-components';
import { Image } from '../shared/Styles';
import Tutorial1 from '../img/tutorial1.jpg';
import Tutorial2 from '../img/tutorial2.jpg';
import Tutorial3 from '../img/tutorial3.jpg';
import TutorialStart from '../img/tutorial_start.svg';
import { actionCreators as userAction } from '../redux/modules/user';
import { actionCreators as exerciseActions } from '../redux/modules/exercise';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Tutorial.css';
import { history } from '../redux/configureStore';

// setTutorialAPI,
const Tutorial = (props) => {
  const dispatch = useDispatch();
  const innerHeight = window.innerHeight;

  return (
    <React.Fragment>
      <Swiper pagination={true} className="mySwiper">
        <SwiperSlide>
          <ImageCont src={Tutorial1} />
        </SwiperSlide>
        <SwiperSlide>
          <ImageCont src={Tutorial2} />
        </SwiperSlide>
        <SwiperSlide>
          <ImageCont src={Tutorial3} />
          <StartCont
            onClick={() => {
              dispatch(userAction.setTutorialAPI());
              // /exercise로 갈때는 initializeRoutine 로직이 들어있어서 첫 로그인 하면서 이동할때도 적용
              if (sessionStorage.getItem('redirect_url') === '/exercise') {
                dispatch(exerciseActions.initializeRoutine());
              }
              // 이전 페이지로 push 해줘야함
              history.push(sessionStorage.getItem('redirect_url'));
              sessionStorage.removeItem('redirect_url');
            }}
          >
            <Image
              src={TutorialStart}
              width="95px"
              height="44px"
              borderRadius="0"
            />
          </StartCont>
        </SwiperSlide>
      </Swiper>
    </React.Fragment>
  );
};

export default Tutorial;

const StartCont = styled.div`
  position: fixed;
  bottom: 45px;
  right: calc(-200vw + 5px);
  z-index: 9999;
`;

const ImageCont = styled.img`
  width: 100vw;
  height: ${innerHeight}px;
`;
