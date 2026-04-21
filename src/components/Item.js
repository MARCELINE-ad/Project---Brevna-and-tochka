import React, { Component } from 'react'

export class Item extends Component {
  render() {
    return (
      <div className = 'item'>
        <img src={"./img/" + this.props.item.img} alt=''/>
        <h2>{this.props.item.title}</h2>
        <p className='desc'>{this.props.item.desc}</p>
        <b>{this.props.item.price}₽</b>
        <div className='add-to-card'>В корзину</div>
      </div>
    )
  }
}

export default Item