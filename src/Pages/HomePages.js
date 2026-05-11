import React, { Component } from 'react'
import Slider from 'react-slick'
import Items from '../components/Items'
import FastFilter from '../components/FastFilter'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import addblock from '../img/addblock.PNG'
import addblock2 from '../img/addblock2.PNG'
import addblock3 from '../img/addblock3.PNG'
import Arrow from '../img/Arrow.png'
import BonusAd from '../img/BonusAd.png'
import BonusWheel from '../img/BonusWheel.png'
import CityRunner from '../img/CityRunner.png'
import TowerBuilder from '../img/TowerBuilder.png'

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
            prevArrow: <PrevArrow />,
            nextArrow: <NextArrow />,
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            arrows: true,
        }

        return (
            <div className="WelcomeAd">
                {/* Слайдер */}
                <Slider {...settings}>
                    <div className="slide"><img src={addblock} alt="Banner 1" /></div>
                    <div className="slide"><img src={addblock2} alt="Banner 2" /></div>
                    <div className="slide"><img src={addblock3} alt="Banner 3" /></div>
                </Slider>

                {/* Сетка баннеров */}
                <div className="promo-grid">
                    <div className="BonusAd" onClick={() => window.open('https://youtube.com', '_blank')}>
                        <img src={BonusAd} alt="Bonus Ad" />
                    </div>
                    <div className="BonusWheel" onClick={() => window.open('https://youtube.com', '_blank')}>
                        <img src={BonusWheel} alt="Bonus Wheel" />
                    </div>
                    <div className="CityRunner" onClick={() => window.location.href = '/MiniGame/runner.html'}>
                        <img src={CityRunner} alt="City Runner" />
                    </div>
                    <div className="TowerBuilder" onClick={() => window.location.href = '/MiniGame/tower.html'}>
                        <img src={TowerBuilder} alt="Tower Builder" />
                    </div>
                </div>

                {/* Блок товаров на главной */}
                <div className="home-catalog">
                    <FastFilter onChoose={this.props.onChoose} />

                    <Items
                        items={this.props.items.slice(0, 3)} 
                        addToOrder={this.props.addToOrder} 
                        // ПЕРЕДАЕМ НОВЫЕ ПРОПСЫ
                        orders={this.props.orders}
                        onIncrease={this.props.onIncrease}
                        onDecrease={this.props.onDecrease}
                    />
                </div>
            </div>
        )
    }
}
