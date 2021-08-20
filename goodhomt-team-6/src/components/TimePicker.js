import React from 'react';
import ReactDOM from 'react-dom';
import Slider from 'react-slick';
import { actionCreators as exerciseCreator } from '../redux/modules/exercise';

import '../../node_modules/slick-carousel/slick/slick.css';
import '../../node_modules/slick-carousel/slick/slick-theme.css';
import './TimePicker.css';
import { useDispatch, connect } from 'react-redux';
import logger from '../shared/Logger';

const minutes = () => {
  var times = [];
  for (var i = 0; i < 11; i++) {
    times.push(('0' + i).slice(-2));
  }
  return times;
};

const seconds = () => {
  var times = [];
  for (var i = 0; i < 6; i++) {
    times.push(('0' + i * 10).slice(-2));
  }
  return times;
};

const mapStateToProps = (state) => ({
  myExercise: state.exercise.routine[0].myExercise,
});

const mapDispatchToProps = (dispatch) => ({
  updateTime: (time, idxes) => {
    dispatch(exerciseCreator.updateTime(time, idxes));
  },
});

class SimpleSlider extends React.Component {
  constructor(props) {
    super(props);
    this.slide1 = this.slide1.bind(this);
    this.slide2 = this.slide2.bind(this);
    this.silder1 = null;
    this.slider2 = null;
    this.minutes = minutes();
    this.seconds = seconds();

    window.addEventListener('wheel', (e) => {
      if (this.slider1) {
        this.slide1(e);
      }
      if (this.slider2) {
        this.slide2(e);
      }
    });
  }

  slide1(y) {
    if (y.target.closest('.slider1')) {
      y.wheelDelta < 0 ? this.slider1.slickNext() : this.slider1.slickPrev();
    }
  }

  slide2(y) {
    if (y.target.closest('.slider2')) {
      y.wheelDelta < 0 ? this.slider2.slickNext() : this.slider2.slickPrev();
    }
  }

  // 이미 시간이 적용되어있을때 다시 editor를 열면 리덕스의 값으로 default 설정해두기
  componentDidMount() {
    if (
      this.props.myExercise[this.props.idxes.listIdx].set[
        this.props.idxes.setIdx
      ].minutes != 0
    ) {
      this.slider1.slickGoTo(
        this.props.myExercise[this.props.idxes.listIdx].set[
          this.props.idxes.setIdx
        ].minutes,
        true,
      );
    }
    if (
      this.props.myExercise[this.props.idxes.listIdx].set[
        this.props.idxes.setIdx
      ].seconds != 0
    ) {
      this.slider2.slickGoTo(
        this.props.myExercise[this.props.idxes.listIdx].set[
          this.props.idxes.setIdx
        ].seconds / 10,
        true,
      );
    }
  }

  render() {
    const settings = {
      centerMode: true,
      infinite: true,
      slidesToShow: 1,
      speed: 300,
      slidesToScroll: 1,
      vertical: true,
      verticalSwiping: true,
      swipeToSlide: true,
      arrows: false,
      adaptiveHeight: false,
    };

    return (
      <div className="container">
        <Slider
          {...settings}
          afterChange={(minutes) => {
            this.props.updateTime({ minutes: minutes }, this.props.idxes);
          }}
          className="slider-entity minutes slider1"
          ref={(slider) => (this.slider1 = slider)}
        >
          {this.minutes.map((minutes) => (
            <div key={minutes}>{minutes}</div>
          ))}
        </Slider>
        <Slider
          {...settings}
          afterChange={(seconds) => {
            this.props.updateTime({ seconds: 10 * seconds }, this.props.idxes);
          }}
          className="slider-entity seconds slider2"
          ref={(slider) => (this.slider2 = slider)}
        >
          {this.seconds.map((seconds) => (
            <div key={seconds}>{seconds}</div>
          ))}
        </Slider>
        <div className="mask">
          <div className="mask-item">
            <span>분</span>
          </div>
          <div className="mask-item">
            <span>초</span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleSlider);
