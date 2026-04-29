import React, { Component } from 'react';

export class Item extends Component {
  render() {
    console.log('Item:', this.props.addToOrder)
    // Защита от пустого объекта
    if (!this.props.item) return null;

    return (
      <div className='item'>
        <img src={"./img/" + this.props.item.img} alt={this.props.item.title}/>
        <h2>{this.props.item.title}</h2>
        <p className='desc'>{this.props.item.desc}</p>
        <b>{this.props.item.price}₽</b>
        <div 
            className='add-to-card' 
            onClick={() => this.props.addToOrder(this.props.item)}
        >
          В корзину
        </div>
      </div>
    );
  }
}

export default Item;