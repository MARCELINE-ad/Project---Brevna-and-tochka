import React, { Component } from 'react';
import './Catalog.css';
import Items from '../components/Items';
import FastFilter from '../components/FastFilter';

export default class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inStock: true,
      isNew: false,
      minPrice: 0,
      maxPrice: 1950
    };
  }

  handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    this.setState({
      [name]: type === 'checkbox' ? checked : value
    });
  }

  render() {
    // Добавляем orders, onIncrease и onDecrease в деструктуризацию
    const { 
      items, 
      addToOrder, 
      totalItems, 
      itemsPerPage, 
      paginate, 
      currentPage,
      orders,        // <--- Принимаем корзину
      onIncrease,    // <--- Принимаем функцию плюс
      onDecrease     // <--- Принимаем функцию минус
    } = this.props;

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className='wrappercat'>
        <div className='allproduct'>Все товары</div>
        
        <div className="topbars">
          <FastFilter onChoose={this.props.onChoose} />
        </div>

        <div className='fproduct'>
          <aside className='ffilter'>
            <h3>Фильтрация</h3>
            
            <div className="filter-group">
              <label>
                <input 
                  type="checkbox" 
                  name="inStock" 
                  checked={this.state.inStock} 
                  onChange={this.handleFilterChange} 
                />
                В наличии
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="isNew" 
                  checked={this.state.isNew} 
                  onChange={this.handleFilterChange} 
                />
                Новинки
              </label>
            </div>

            <div className="price-filter">
              <p>Цена от и до:</p>
              <div className="price-inputs">
                <input 
                  type="number" 
                  name="minPrice" 
                  placeholder="0" 
                  value={this.state.minPrice}
                  onChange={this.handleFilterChange}
                />
                <input 
                  type="number" 
                  name="maxPrice" 
                  placeholder="1950" 
                  value={this.state.maxPrice}
                  onChange={this.handleFilterChange}
                />
              </div>
            </div>

            <button className="apply-btn" onClick={() => {
              this.props.applyFilters(this.state);
            }}>
                Применить
            </button>
          </aside>
          
          <div className="product">
            <Items 
              items={items} 
              addToOrder={addToOrder}
              orders={orders}          // <--- Передаем в Items
              onIncrease={onIncrease}  // <--- Передаем в Items
              onDecrease={onDecrease}  // <--- Передаем в Items
            />

            {pageNumbers.length > 1 && (
              <div className='pagination'>
                {pageNumbers.map(number => (
                  <button 
                    key={number} 
                    onClick={() => paginate(number)}
                    className={currentPage === number ? 'active-page' : ''}
                  >
                    {number}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
