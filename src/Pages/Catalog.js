import React, { Component } from 'react'
import './Catalog.css';
import { LuArrowUpDown } from "react-icons/lu";
import {Link } from "react-router-dom";

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
                    <div>
                      <div className=''>Ещё ▼ </div>
                    </div>
                </div>

                <div className='sorting'>
                    <div>
                        <LuArrowUpDown />Сортировка: рейтингу
                    </div>
                </div>
            </div>

            <div className='всё вместе'>
                <div className='фильтр'></div>
                <div className='блоки товаров'></div>
            </div>


        </div>
      </>
    )
  }
}
