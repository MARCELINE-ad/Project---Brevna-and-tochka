import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Item extends Component {
  render() {
    const { item, addToOrder, orders, onIncrease, onDecrease } = this.props;

    // Защита от пустого объекта
    if (!item) return null;

    // Находим этот товар в корзине, чтобы узнать количество
    const orderItem = orders ? orders.find(el => el.id === item.id) : null;
    const quantity = orderItem ? orderItem.quantity : 0;

    return (
      <div className='item'>
        <Link to={`/product/${item.id}`} className="item-link">
          <img src={"./img/" + item.img} alt={item.title}/>
          <h2>{item.title}</h2>
        </Link>
        
        <p className='desc'>{item.desc}</p>
        <b>{item.price}₽</b>

        {/* Умная кнопка: если товар в корзине, показываем управление количеством */}
        {quantity > 0 ? (
          <div className='item-controls'>
            <button className="ctrl-btn" onClick={() => onDecrease(item.id)}>-</button>
            <span className="ctrl-num">{quantity}</span>
            <button className="ctrl-btn" onClick={() => onIncrease(item.id)}>+</button>
          </div>
        ) : (
          <div 
              className='add-to-card' 
              onClick={() => addToOrder(item)}
          >
            В корзину
          </div>
        )}
      </div>
    );
  }
}

export default Item;
