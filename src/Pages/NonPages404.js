import React, { Component } from 'react'
import './NonPages404.css';
import img404 from '../img/img404.svg';


export default class NonPages404 extends Component {
  render() {
    return (
      <div className='BLOCK'>

        <div className='blockvblocke'>
            <div className='supertit'>
                <span>Страница не найдена</span>
            </div>
            <div className='subtit'>
                <span>Проверьте корректность введённого адреса или повторите попытку позже</span>
            </div>

            <div className='allbtn'>
                <a className="btn btn_outline" href='/'>На главную</a>
                <div className='btn btn_outline'>Обновить</div>
            </div>

        </div>
          <img src={img404} alt="Иллюстрация ошибки 404" />
        <div>
            
        </div>
      </div>

        

    )
  }
}
