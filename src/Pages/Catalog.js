import React, { Component } from 'react';
import './Catalog.css';
import Dropdown from '../components/Dropdown/Dropdown';
import DropdownFilter from '../components/Dropdown/DropdownFilter';
import Items from '../components/Items';

const moreItems = [
    { label: 'Электрика', Link: '/electrica' },
    { label: 'Сантехника', Link: '/santechnika' },
    { label: 'Обои', Link: '/oboi' },
    { label: 'Краски', Link: '/kraski' },
    { label: 'Инструменты', Link: '/instrumenty' }
];

export default class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Здесь оставляем ТОЛЬКО список товаров
      items: [
      { 
        id: 1, 
        title: "Террасная Доска", 
        img: "terra1.svg",
        desc: "Цвет Темный орех 3000x150x24 мм двусторонняя вельвет/структура дерева 0.45 м²", 
        categoty: "workmaterial", price: "55990",
      }, 

      { id: 2, 
        title: "Террасная Доска", 
        img: "terra2.svg", 
        desc: "ДПК Decking цвет Дымчатый дуб 3000x150x24 мм двусторонняя вельвет/структура дерева 0.45 м²", 
        categoty: "workmaterial", price: "55990", 
      }, 
      { id: 3, 
        title: "Террасная Доска", 
        img: "terra3.svg", 
        desc: "Цвет Темный орех 3000x150x24 мм двусторонняя вельвет/структура дерева 0.45 м²", 
        categoty: "workmaterial", 
        price: "55990", 
      }, 
      { id: 4, 
        title: "Террасная Доска", 
        img: "terra4.svg", 
        desc: "Цвет Темный орех 3000x150x24 мм двусторонняя вельвет/структура дерева 0.45 м²", 
        categoty: "workmaterial", 
        price: "55990", 
      }, 
      { id: 5, 
        title: "Террасная Доска", 
        img: "terra5.svg", 
        desc: "Цвет Темный орех 3000x150x24 мм двусторонняя вельвет/структура дерева 0.45 м²", 
        categoty: "workmaterial", 
        price: "55990", 
      }, { id: 6, 
        title: "Террасная Доска", 
        img: "terra6.svg", 
        desc: "Цвет Темный орех 3000x150x24 мм двусторонняя вельвет/структура дерева 0.45 м²", 
        categoty: "workmaterial", 
        price: "55990", 
      }
      ]
    };
  }

  render() {
    console.log('Catalog:', this.props.addToOrder)
    return (
      <div className='wrappercat'>
          <div className='allproduct'>Все товары</div>

          <div className='topbars'>
              <div className="categories">
                    <span className='product'>Все</span>
                    <span className='product'>Для дома</span>
                    <span className='product'>Декор</span>
                    <span className='product'>Кровля</span>
                    <span className='product'>Инструменты</span>
                    <span>Стройматериалы</span>
                  <Dropdown buttonText="Ещё" items={moreItems} />
              </div>

              <div className='sorting'>
                  <DropdownFilter buttonText="Сортировка:" items={moreItems}/>
              </div>
          </div>

          <div className='fproduct'>
              <aside className='ffilter'>
                <span>Фильтрация</span>
                {/* Сюда позже добавишь логику фильтров */}
              </aside>

              
              <Items items={this.state.items} addToOrder={this.props.addToOrder || (() => console.log('Ошибка: функция не дошла до Каталога'))} />
          </div>
      </div>
    );
  }
}