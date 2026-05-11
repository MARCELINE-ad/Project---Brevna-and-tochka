import React, { Component } from 'react';
import Item from './Item.js';

export class Items extends Component {
  render() {
    // Деструктурируем все нужные пропсы для удобства
    const { items, addToOrder, orders, onIncrease, onDecrease } = this.props;

    return (
        <main>
            {items.map(el => (
              <Item 
                key={el.id} 
                item={el} 
                addToOrder={addToOrder} 
                orders={orders}          // ПЕРЕДАЕМ КОРЗИНУ
                onIncrease={onIncrease}  // ПЕРЕДАЕМ ПЛЮС
                onDecrease={onDecrease}  // ПЕРЕДАЕМ МИНУС
              />
            ))}
        </main>
    );
  }
}

export default Items;
