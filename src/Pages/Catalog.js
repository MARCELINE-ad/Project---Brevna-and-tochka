import React, { Component } from 'react'
import './Catalog.css';
import {Link } from "react-router-dom";
import Dropdown from '../components/Dropdown/Dropdown';
import DropdownFilter from '../components/Dropdown/DropdownFilter';


const moreItems = [
    { label: 'Электрика', Link: '/electrica' },
    { label: 'Сантехника', Link: '/santechnika' },
    { label: 'Обои', Link: '/oboi' },
    { label: 'Краски', Link: '/kraski' },
    { label: 'Инструменты', Link: '/instrumenty' }
  ];

export default class Catalog extends Component {
  render() {
    return (
      <>
        
        <div className='wrappercat'>
            <div className='allproduct'>Все товары</div>

            <div className='topbars'>
                <div class="categories">
                    <Link to='' className='product'>Все</Link>
                    <Link to='' className='product'>Для дома</Link>
                    <Link to='' className='product'>Декор</Link>
                    <Link to='' className='product'>Кровля</Link>
                    <Link to='' className='product'>Инструменты</Link>
                    <Link to='' className='product'>Стройматериалы</Link>
                    
                    <Dropdown buttonText="Ещё" items={moreItems} />
                </div>

                <div className='sorting'>
                    <div>
                        <DropdownFilter buttonText="Сортировка:" items={moreItems}/>
                    </div>
                </div>
            </div>



            <div className='fproduct'>
                <div className='ffilter'>
                  <span>Фильтрация</span>
                </div>
                <div className='блоки товаров'></div>
            </div>


        </div>
      </>
    )
  }
}
