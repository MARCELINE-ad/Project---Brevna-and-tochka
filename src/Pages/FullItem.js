import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './FullItem.css';

const FullItem = ({ items, addToOrder }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const item = items.find(el => el.id === parseInt(id));

    if (!item) return <div className="container"><h2>Товар не найден</h2></div>;

    return (
        <div className="product-page">
            {/* Хлебные крошки */}
            <div className="breadcrumbs" onClick={() => navigate(-1)}>
                Главная / {item.category} / {item.title}
            </div>

            <div className="product-main">
                {/* Левая часть: Фотографии */}
                <div className="product-images">
                    <div className="thumbnails">
                        <img src={"/img/" + item.img} alt="thumb" className="active" />
                        {/* Если будут доп. фото, они пойдут сюда */}
                    </div>
                    <div className="main-image">
                        <img src={"/img/" + item.img} alt={item.title} />
                    </div>
                </div>

                {/* Правая часть: Цена и Кнопка */}
                <div className="product-buy-card">
                    <div className="buy-card-content">
                        <p className="article">Арт: {item.id}2745</p>
                        <h1>{item.title}</h1>
                        <div className="rating">★★★★★ <span>(454 отзыва)</span></div>
                        
                        <div className="price-block">
                            <span className="current-price">{item.price} ₽/шт.</span>
                        </div>

                        <button className="btn-main-add" onClick={() => addToOrder(item)}>
                            В корзину
                        </button>

                        <div className="delivery-info">
                            <p> В наличии в 15 магазинах</p>
                            <p> Доставим завтра — <b>бесплатно</b></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Описание товара снизу */}
            <div className="product-description">
                <h2>Описание</h2>
                <p>{item.desc}</p>
            </div>
        </div>
    );
};

export default FullItem;
