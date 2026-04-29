import React, { Component } from 'react';
import './ShoppingCard.css';

export default class ShoppingCard extends Component {
  render() {
    const orders = this.props.orders || [];
    const goodsPrice = orders.reduce((sum, el) => sum + Number(el.price), 0);
    const deliveryPrice = orders.length > 0 ? 124 : 0; // Пример стоимости доставки
    const totalPrice = goodsPrice + deliveryPrice;

    return (
      <div className='cart-container'>
        <div className='cart-header'>
          <h1>Корзина</h1>
          <button className='btn-clear'>Очистить корзину</button>
        </div>

        <div className='cart-layout'>
          
          <div className='cart-left'>
            
            {/* Блок 1: Список товаров */}
            <div className='cart-section items-list'>
              {orders.length > 0 ? (
                orders.map(el => (
                  <div key={el.id} className='cart-product-card'>
                    <img src={"./img/" + el.img} alt={el.title} />
                    <div className='product-info'>
                      <h3>{el.title}</h3>
                      <p className='product-desc'>{el.desc}</p>
                    </div>
                    <div className='product-price'>{el.price} ₽</div>
                    <div className='product-controls'>
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
                    </div>
                    <button className='btn-remove'>х</button>
                  </div>
                ))
              ) : (
                <p className='empty-text'>В корзине пока нет товаров</p>
              )}
            </div>

           
            <div className='cart-section person-info'>
              <h2>2. Персональная информация</h2>
              <div className='input-grid'>
                <div className='input-field'>
                  <label>Имя</label>
                  <input type="text" placeholder="Васи" />
                </div>
                <div className='input-field error'>
                  <label>Фамилия</label>
                  <input type="text" />
                  <span className='error-msg'>Введите вашу фамилию</span>
                </div>
                <div className='input-field'>
                  <label>E-Mail</label>
                  <input type="email" placeholder="vasya@pupkin.ru" />
                </div>
                <div className='input-field'>
                  <label>Телефон</label>
                  <input type="text" placeholder="+7 999 100-20-20" />
                </div>
              </div>
            </div>

           
            <div className='cart-section address-info'>
              <h2>3. Адрес доставки</h2>
              <div className='input-field full-width'>
                <label>Введите адрес</label>
                <input type="text" placeholder="Москва, ул. Мира 12" />
              </div>
              <div className='input-field full-width'>
                <label>Комментарий к заказу</label>
                <textarea placeholder="Укажите тут дополнительные подробности для курьера"></textarea>
              </div>
            </div>
          </div>

          {/* Правая колонка (Итого) */}
          <aside className='cart-right'>
            <div className='summary-card'>
              <div className='summary-total'>
                <span>Итого:</span>
                <span className='total-price'>{totalPrice} ₽</span>
              </div>
              <div className='summary-row'>
                <span>Стоимость товаров:</span>
                <span>{goodsPrice} ₽</span>
              </div>
              <div className='summary-row'>
                <span>Доставка:</span>
                <span>{deliveryPrice} ₽</span>
              </div>
              <div className='promo-link'>У меня есть промокод</div>
              <button className='btn-checkout'>Перейти к оплате</button>
            </div>
          </aside>
        </div>
      </div>
    );
  }
}