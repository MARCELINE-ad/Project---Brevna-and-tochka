import React, { Component } from 'react'
import './Catalog.css';
import {Link } from "react-router-dom";
import Dropdown from '../components/Dropdown/Dropdown';
import DropdownFilter from '../components/Dropdown/DropdownFilter';
import Items from '../components/Items'

const moreItems = [
    { label: 'Электрика', Link: '/electrica' },
    { label: 'Сантехника', Link: '/santechnika' },
    { label: 'Обои', Link: '/oboi' },
    { label: 'Краски', Link: '/kraski' },
    { label: 'Инструменты', Link: '/instrumenty' }
  ];

export default class Catalog extends Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [
        {
          id: 1,
          title: "Террасная Доска", 
          img: "terra1.svg",
          desc: "Цвет Темный орех 3000x150x24 мм двусторонняя вельвет/структура дерева 0.45 м²",  
          categoty: "workmaterial",
          price: "55990",
        },
         {
          id: 2,
          title: "Террасная Доска", 
          img: "terra2.svg",
          desc: "ДПК Decking цвет Дымчатый дуб 3000x150x24 мм двусторонняя вельвет/структура дерева 0.45 м²",  
          categoty: "workmaterial",
          price: "55990",
        },
         {
          id: 3,
          title: "Террасная Доска", 
          img: "terra3.svg",
          desc: "Цвет Темный орех 3000x150x24 мм двусторонняя вельвет/структура дерева 0.45 м²",  
          categoty: "workmaterial",
          price: "55990",
        },
         {
          id: 4,
          title: "Террасная Доска", 
          img: "terra4.svg",
          desc: "Цвет Темный орех 3000x150x24 мм двусторонняя вельвет/структура дерева 0.45 м²",  
          categoty: "workmaterial",
          price: "55990",
        },
         {
          id: 5,
          title: "Террасная Доска", 
          img: "terra5.svg",
          desc: "Цвет Темный орех 3000x150x24 мм двусторонняя вельвет/структура дерева 0.45 м²",  
          categoty: "workmaterial",
          price: "55990",
        },
         {
          id: 6,
          title: "Террасная Доска", 
          img: "terra6.svg",
          desc: "Цвет Темный орех 3000x150x24 мм двусторонняя вельвет/структура дерева 0.45 м²",  
          categoty: "workmaterial",
          price: "55990",
        },
      ]
    }
  }



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

                <Items items= {this.state.items}/>

            </div>


        </div>
      </>
    )
  }
}
