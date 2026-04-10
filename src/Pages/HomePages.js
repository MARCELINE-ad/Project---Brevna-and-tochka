import React, { Component } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import addblock from '../img/addblock.svg'
import addblock2 from '../img/addblock2.svg'
import addblock3 from '../img/addblock3.svg'
import Arrow from '../img/Arrow.png'

  const PrevArrow = ({ onClick }) => (
    <button className="custom-prev" onClick={onClick}>
      <img src={Arrow} alt="prev" />
    </button>
);
  const NextArrow = ({ onClick }) => (
    <button className="custom-next" onClick={onClick}>
      <img src={Arrow} alt="next" style={{ transform: 'scaleX(-1)' }} />
    </button>
);

export default class HomePages extends Component {
  render() {
        const settings = {
      prevArrow: <PrevArrow />, // кастом стрелки
      nextArrow: <NextArrow />, // кастом стрелки
      dots: true,        // точки внизу
      infinite: true,    // зацикленный
      speed: 500,        // скорость анимации в мс
      slidesToShow: 1,   // показывать 1 слайд
      slidesToScroll: 1, // листать по 1
      autoplay: true,    // автопрокрутка
      autoplaySpeed: 3000, // автопрокрутка каждые 3 секунды
      arrows: true, //cтрелочки
        }
    return (
  <div className="WelcomeAd">
    <Slider {...settings}>
      <div className="slide">
        <img src={addblock} alt="Banner 1" />
      </div>
      <div className="slide">
        <img src={addblock2} alt="Banner 2" />
      </div>
      <div className="slide">
        <img src={addblock3} alt="Banner 3" />
      </div>
    </Slider>
  </div>
)
  }
}
