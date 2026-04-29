import React, { Component } from 'react';
import Item from './Item.js';

export class Items extends Component {
  render() {
    console.log('Items:', this.props.addToOrder)
    return (
        <main>
            {this.props.items.map(el => (
              <Item 
                key={el.id} 
                item={el} 
                addToOrder={this.props.addToOrder} // ПРОВЕРЬ: имя должно быть именно таким!
              />
            ))}
        </main>
    );
  }
}

export default Items;