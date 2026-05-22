import React, { Component } from 'react';
import './ShoppingCard.css';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

export default class ShoppingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: props.user?.name ? props.user.name.split(' ')[0] : '', 
      lastName: props.user?.name ? props.user.name.split(' ').slice(1).join(' ') : '', 
      email: props.user?.email || '', 
      phone: props.user?.phone || '', 
      address: props.user?.address || '', 
      comment: '',
      // НОВЫЕ ПОЛЯ СТЕЙТА ДЛЯ ПРОМОКОДОВ
      promoInput: '',
      appliedDiscount: 0, // Процент скидки (например, 10 означает 10%)
      promoError: '',
      promoSuccess: ''
    };
  }

  componentDidMount() {
    this.fillFormFromProps();
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.user) !== JSON.stringify(this.props.user)) {
      this.fillFormFromProps();
    }
  }

  fillFormFromProps = () => {
    const { user } = this.props;
    if (user) {
      const nameParts = user.name ? user.name.trim().split(' ') : [];
      this.setState({
        firstName: nameParts[0] || 'Артём',
        lastName: nameParts.slice(1).join(' ') || 'Другов',
        email: user.email || 'artem21drugov@gmail.com',
        phone: user.phone || '+992 37 567 23 86',
        address: user.address || 'Москва, Проспект вернадского 52, этаж 5, кв 67',
      });
    }
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  // ФУНКЦИЯ ПРОВЕРКИ И АКТИВАЦИИ КУПОНА
  handleApplyPromo = (e) => {
    e.preventDefault();
    const cleanCode = this.state.promoInput.trim().toUpperCase();
    
    if (!cleanCode) return;

    if (cleanCode === 'BREVNO10') {
      this.setState({
        appliedDiscount: 10,
        promoSuccess: 'Промокод BREVNO10 (10%) применен!',
        promoError: ''
      });
    } else if (cleanCode === 'PROMO2026') {
      this.setState({
        appliedDiscount: 5,
        promoSuccess: 'Промокод PROMO2026 (5%) применен!',
        promoError: ''
      });
    } else {
      this.setState({
        promoError: 'Неверный промокод',
        promoSuccess: ''
      });
    }
  }

  // ОТПРАВКА НА ПОЧТУ ЧЕРЕЗ WEB3FORMS (С учетом скидки)
  sendEmail = (totalPrice, discountAmount) => {
    const accessKey = "fbaf175e-a86f-4f75-b835-9256687f1126"; 

    const itemsList = this.props.orders.map(item => 
        `- ${item.title} (${item.quantity || 1} шт.)`
    ).join('\n');

    let message = `Новый заказ!\n\nТовары:\n${itemsList}\n\n`;
    if (this.state.appliedDiscount > 0) {
      message += `Скидка по промокоду: ${this.state.appliedDiscount}% (-${discountAmount} ₽)\n`;
    }
    message += `Итого с учетом доставки: ${totalPrice} ₽\n\nДанные клиента:\nИмя: ${this.state.firstName} ${this.state.lastName}\nEmail: ${this.state.email}\nТелефон: ${this.state.phone}\nАдрес: ${this.state.address}\nКомментарий: ${this.state.comment}`;

    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            access_key: accessKey,
            subject: `Заказ от ${this.state.firstName}`,
            from_name: "Магазин стройматериалов",
            message: message
        })
    })
    .then(res => res.json())
    .then(data => console.log("Ответ от почты:", data))
    .catch(err => console.error("Ошибка почты:", err));
  }

  generatePDF = () => {
    const input = document.querySelector('.cart-left');
    if (!input) return;

    const goodsPrice = this.props.orders.reduce((sum, el) => sum + (Number(el.price) * (el.quantity || 1)), 0);
    const deliveryPrice = this.props.orders.length > 0 ? 124 : 0;
    const discountAmount = Math.round((goodsPrice * this.state.appliedDiscount) / 100);
    const totalPrice = Math.max(0, goodsPrice - discountAmount + deliveryPrice);

    // ОТПРАВЛЯЕМ НА ПОЧТУ С УЧЕТОМ СКИДКИ
    this.sendEmail(totalPrice, discountAmount);

    alert("Заказ оформляется, подождите несколько секунд...");

    html2canvas(input, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
      windowWidth: 1200,
      
      onclone: (clonedDoc) => {
        const controls = clonedDoc.querySelectorAll('.product-controls, .btn-remove, button, .pdf-hide');
        controls.forEach(c => c.style.display = 'none');

        const el = clonedDoc.querySelector('.cart-left');
        el.style.width = "800px";
        el.style.padding = "40px";
        el.style.background = "#ffffff";

        // ПРАВИМ ИНПУТЫ ДЛЯ PDF
        const inputs = clonedDoc.querySelectorAll('input, textarea');
        inputs.forEach(input => {
          input.style.border = "none";
          input.style.background = "#f1f1f1";
          input.style.borderRadius = "8px"; 
          input.style.padding = "0 15px";    
          input.style.fontSize = "14px";
          input.style.height = "45px";        
          input.style.lineHeight = "45px";    
          input.style.width = "100%";
          input.style.boxSizing = "border-box";
          input.style.color = "#333";         
        });

        const textareas = clonedDoc.querySelectorAll('textarea');
        textareas.forEach(t => {
          t.style.height = "80px";
          t.style.lineHeight = "1.5";
          t.style.padding = "10px 15px";
        });
      }

    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 15, pdfWidth, imgHeight);
      pdf.save(`Order_${this.state.firstName || 'Client'}.pdf`);
      alert("Успешно! Заказ отправлен на почту и PDF скачан.");
    });
  }

  render() {
    const orders = this.props.orders || [];
    const goodsPrice = orders.reduce((sum, el) => sum + (Number(el.price) * (el.quantity || 1)), 0);
    const deliveryPrice = orders.length > 0 ? 124 : 0;
    
    // МАТЕМАТИКА СКИДКИ
    const discountAmount = Math.round((goodsPrice * this.state.appliedDiscount) / 100);
    const totalPrice = Math.max(0, goodsPrice - discountAmount + deliveryPrice);

    return (
      <div className='cart-container'>
        <div className='cart-header'>
          <h1>Корзина</h1>
          <button className='btn-clear' onClick={this.props.onClear}>Очистить корзину</button>
        </div>

        <div className='cart-layout'>
          <div className='cart-left'>
            <div className='cart-section items-list'>
              <h2 className='pdf-only-title'>Заказ клиента</h2>
              {orders.map(el => (
                <div key={el.id} className='cart-product-card'>
                  <img src={"/img/" + el.img} alt={el.title} />
                  <div className='product-info'>
                    <h3>{el.title}</h3>
                    <p className='product-desc'>{el.desc}</p>
                    <p className="pdf-quantity">Количество: {el.quantity || 1} шт.</p>
                  </div>
                  <div className='product-price'>{Number(el.price) * (el.quantity || 1)} ₽</div>
                  <div className='product-controls'>
                      <button onClick={() => this.props.onDecrease(el.id)}>-</button>
                      <span>{el.quantity || 1}</span>
                      <button onClick={() => this.props.onIncrease(el.id)}>+</button>
                  </div>
                  <button className='btn-remove' onClick={() => this.props.onDelete(el.id)}>х</button>
                </div>
              ))}
            </div>

            <div className='cart-section person-info'>
              <h2>2. Персональная информация</h2>
              <div className='input-grid'>
                <div className='input-field'>
                  <label>Имя</label>
                  <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleInput} />
                </div>
                <div className='input-field'>
                  <label>Фамилия</label>
                  <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleInput} />
                </div>
                <div className='input-field'>
                  <label>E-Mail</label>
                  <input type="email" name="email" value={this.state.email} onChange={this.handleInput} />
                </div>
                <div className='input-field'>
                  <label>Телефон</label>
                  <input type="text" name="phone" value={this.state.phone} onChange={this.handleInput} />
                </div>
              </div>
            </div>

            <div className='cart-section address-info'>
              <h2>3. Адрес доставки</h2>
              <div className='input-field full-width'>
                <label>Адрес</label>
                <input type="text" name="address" value={this.state.address} onChange={this.handleInput} />
              </div>
              <div className='input-field full-width'>
                <label>Комментарий</label>
                <textarea name="comment" value={this.state.comment} onChange={this.handleInput}></textarea>
              </div>
            </div>

            {/* Отображение скидки прямо в блоке генерации PDF */}
            <div className="pdf-footer-total">
                {this.state.appliedDiscount > 0 && (
                  <h4 style={{color: '#2b7551', margin: '0 0 5px 0'}}>Скидка купона ({this.state.appliedDiscount}%): -{discountAmount} ₽</h4>
                )}
                <h3>Итого к оплате: {totalPrice} ₽</h3>
            </div>
          </div>

          <aside className='cart-right'>
            {/* БЛОК ИТОГОВ */}
            <div className='summary-card'>
              <div className='summary-total'>
                <span>Итого:</span>
                <span className='total-price'>{totalPrice} ₽</span>
              </div>
              <div className='summary-row'>
                <span>Товары:</span>
                <span>{goodsPrice} ₽</span>
              </div>
              
              {/* СТРОЧКА ПРОМОКОДА (Появляется в чеке при активации) */}
              {this.state.appliedDiscount > 0 && (
                <div className='summary-row promo-row-highlight'>
                  <span>Промокод ({this.state.appliedDiscount}%):</span>
                  <span>-{discountAmount} ₽</span>
                </div>
              )}

              <div className='summary-row'>
                <span>Доставка:</span>
                <span>{deliveryPrice} ₽</span>
              </div>
              <button className='btn-checkout' disabled={orders.length === 0} onClick={this.generatePDF}>
                Заказать и скачать PDF
              </button>
            </div>

            {/* ФОРМА ДЛЯ ВВОДА КУПОНА */}
            <div className='summary-card promo-input-card'>
              <h3>Применить промокод</h3>
              <form onSubmit={this.handleApplyPromo} className='cart-promo-form'>
                <input 
                  type="text" 
                  name="promoInput"
                  placeholder="Введите промокод..." 
                  value={this.state.promoInput}
                  onChange={this.handleInput}
                  className='cart-promo-input'
                />
                <button type="submit" className='cart-promo-btn'>ОК</button>
              </form>
              {this.state.promoError && <p className='promo-status-msg error'>{this.state.promoError}</p>}
              {this.state.promoSuccess && <p className='promo-status-msg success'>{this.state.promoSuccess}</p>}
            </div>
          </aside>
        </div>
      </div>
    );
  }
}