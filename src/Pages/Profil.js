import React, { useState, useRef } from 'react';
import './Profil.css';

// ИМПОРТ: Подключаем твой реальный массив данных.
import { productsData } from '../data/products';

const Profil = ({ user, orders = [], addToOrder, onIncrease, onDecrease, updateGlobalUser, onLogout }) => {
  // === Состояния и логика ===
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(user?.name || 'Другов Артём');
  const [avatar, setAvatar] = useState(user?.avatar || null);
  const fileInputRef = useRef(null);
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [address, setAddress] = useState(user?.address || 'Москва, Проспект вернадского 52, этаж 5, кв 67');
  const [phone, setPhone] = useState(user?.phone || '+8-800-535-33-55');

  // Состояние для модального окна промокодов и текста ввода
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState('');

  // ИЗМЕНЕНИЕ: Список доступных промокодов переведен в состояние (useState) для динамического добавления
  const [availablePromos, setAvailablePromos] = useState([
    { code: 'BREVNO10', discount: '10%', description: 'На всё деревянное' },
    { code: 'PROMO2026', discount: '5%', description: 'Скидка на первый заказ' },
  ]);

  // Состояния для полей ввода нового промокода
  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // Локальная история заказов
  const [userOrders] = useState([
    { id: '#00000', items: '12 мешков цемента', price: 8888, status: 'Доставлен', statusColor: 'green', icon: '✓' },
    { id: '#01000', items: '12 мешков цемента', price: 6666, status: 'В пути', statusColor: 'orange', icon: '⇄' },
    { id: '#02000', items: '12 meшков цемента', price: 9999, status: 'Отменён', statusColor: 'red', icon: '✕' },
  ]);

  const favoriteItems = productsData.slice(0, 4);

  // Функция проверки промокода
  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    
    const inputUpper = promoInput.toUpperCase();
    // Ищем введенный промокод в нашем актуальном списке состояний
    const foundPromo = availablePromos.find(p => p.code === inputUpper);
    
    if (foundPromo) {
      setPromoMessage(`✅ Промокод успешно применён! Скидка: ${foundPromo.discount}`);
    } else {
      setPromoMessage('❌ Неверный промокод');
    }
  };

  // ФУНКЦИЯ ДЛЯ ВРУЧНОГО ДОБАВЛЕНИЯ ПРОМОКОДА
  const handleAddPromo = (e) => {
    e.preventDefault();
    
    if (!newCode.trim() || !newDiscount.trim()) {
      alert("Пожалуйста, заполните хотя бы 'Код' и 'Скидку'!");
      return;
    }

    const promoObj = {
      code: newCode.trim().toUpperCase(),
      discount: newDiscount.trim().includes('%') ? newDiscount.trim() : `${newDiscount.trim()}%`,
      description: newDesc.trim() || 'Без описания'
    };

    // Добавляем новый промокод в начало таблицы
    setAvailablePromos([promoObj, ...availablePromos]);

    // Очищаем поля ввода формы
    setNewCode('');
    setNewDiscount('');
    setNewDesc('');
  };

  const getItemInCart = (itemId) => {
    return orders.find(el => el.id === itemId) || null;
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
      triggerGlobalUpdate({ avatar: imageUrl });
    }
  };

  const triggerGlobalUpdate = (updatedFields) => {
    if (updateGlobalUser) {
      updateGlobalUser({ name, avatar, address, phone, ...updatedFields });
    }
  };

  const saveDetails = () => {
    setIsEditingDetails(false);
    triggerGlobalUpdate({ address, phone });
  };

  const saveName = () => {
    setIsEditingName(false);
    triggerGlobalUpdate({ name });
  };

  const totalOrdersSum = userOrders.reduce((sum, order) => {
    return order.status !== 'Отменён' ? sum + order.price : sum; 
  }, 0);

  return (
    <div className="profile-page">
      <div className="profile-wrapper">

        {/* ===== ШАПКА ===== */}
        <header className="profile-header">
          <div className="profile-user-info">
            <div className="profile-avatar" onClick={() => fileInputRef.current.click()}>
              {avatar ? <img src={avatar} alt="Аватар" /> : <span>{name ? name[0].toUpperCase() : 'U'}</span>}
              <input type="file" ref={fileInputRef} onChange={handleAvatarChange} accept="image/*" style={{ display: 'none' }} />
            </div>
            <div className="profile-user-details">
              {isEditingName ? (
                <div className="edit-name-inline">
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="auth-input style-profile-input" />
                  <button className="btn-save-small" onClick={saveName}>Сохранить</button>
                </div>
              ) : (
                <h1 className="profile-user-name">{name}</h1>
              )}
              <span className="profile-user-status">Активная сессия</span>
            </div>
          </div>
          <div className="profile-header-actions">
            <button className="btn-header-action" onClick={() => setIsEditingName(!isEditingName)}>{isEditingName ? 'Отмена' : 'Изменить имя'}</button>
            <button className="btn-header-action" onClick={onLogout}>Очистить данные</button>
          </div>
        </header>

        {/* ===== ЗАКАЗЫ + БЫСТРЫЕ ДЕЙСТВИЯ ===== */}
        <div className="profile-top-grid">
          <section className="profile-section orders-section">
            <h2 className="section-title"><span className="section-title-icon">💳</span> Мои Заказы</h2>
            <div className="orders-list">
              {userOrders.map((order, i) => (
                <div className="order-item" key={order.id || i}>
                  <span className="order-id">{order.id}</span>
                  <span className="order-details">{order.items} | {order.price}₽ | {order.status}</span>
                  <span className={`order-status status-${order.statusColor}`}>{order.icon} {order.status}</span>
                </div>
              ))}
            </div>
            <button className="btn-see-all">Смотреть все</button>
          </section>

          <section className="profile-section quick-actions-section">
            <h2 className="section-title">Быстрые действия</h2>
            <div className="actions-list">
              <a className="btn-action" href="/ShoppingCard"><span>🛒</span> Корзина</a>
              
              {/* НАЖАТИЕ СЮДА ОТКРЫВАЕТ МОДАЛКУ */}
              <button className="btn-action" onClick={() => { setIsPromoModalOpen(true); setPromoMessage(''); setPromoInput(''); }}>
                <span>🎟️</span> Мои промокоды
              </button>
            </div>
          </section>
        </div>

        {/* ===== ИЗБРАННОЕ ===== */}
        <section className="profile-section favorites-section">
          <h2 className="section-title">
            <span className="section-title-icon">🔖</span> Избранное
          </h2>
          <div className="favorites-grid">
            {favoriteItems.map(item => {
              const cartItem = getItemInCart(item.id);

              return (
                <div className="catalog-item-card" key={item.id}>
                  <div className="catalog-item-img-placeholder">
                    <img src={"/img/" + item.img} alt={item.title} />
                  </div>
                  <div className="catalog-item-details">
                    <h3 className="catalog-item-title">{item.title}</h3>
                    <p className="catalog-item-desc">{item.desc}</p>
                    <div className="catalog-item-bottom">
                      <span className="catalog-item-price">{item.price} ₽</span>
                      {cartItem ? (
                        <div className="product-controls catalog-controls">
                          <button onClick={() => onDecrease(item.id)}>-</button>
                          <span>{cartItem.quantity || 1}</span>
                          <button onClick={() => onIncrease(item.id)}>+</button>
                        </div>
                      ) : (
                        <button className="catalog-btn-to-cart" onClick={() => addToOrder(item)}>В корзину</button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ===== ЛИЧНЫЕ ДАННЫЕ ===== */}
        <section className="profile-section personal-data-section">
          <h2 className="section-title"><span className="section-title-icon">📁</span> Личные данные</h2>
          <div className="personal-data-grid">
            <div className="data-card address-card">
              <p className="data-card-title">🏠 Адрес доставки</p>
              {isEditingDetails ? (
                <div className="edit-details-form">
                  <input type="text" value={address} placeholder="Адрес доставки" onChange={(e) => setAddress(e.target.value)} className="auth-input" />
                  <input type="text" value={phone} placeholder="Телефон" onChange={(e) => setPhone(e.target.value)} className="auth-input" />
                  <button className="btn-save-small" onClick={saveDetails}>Сохранить</button>
                </div>
              ) : (
                <><p>{address || 'Адрес не указан'}</p><p>{phone || 'Телефон не указан'}</p><button className="btn-change" onClick={() => setIsEditingDetails(true)}>Изменить</button></>
              )}
            </div>
            <div className="data-card activity-card">
              <p className="data-card-title">⏱ Ваша активность</p>
              <div className="stat-row"><span className="stat-value">{userOrders.length}</span><span className="stat-label">Заказов</span></div>
              <div className="stat-sum-row"><span className="stat-sum-value">{totalOrdersSum.toLocaleString()}₽</span><span className="stat-label">Сумма</span></div>
              <p className="fav-cat-row">Любимая категория: <span>Инструменты</span></p>
            </div>
          </div>
        </section>

      </div>

      {/* ===== ВСПЛЫВАЮЩЕЕ ОКОШКО ПРОМОКОДОВ ===== */}
      {isPromoModalOpen && (
        <div className="promo-modal-overlay" onClick={() => setIsPromoModalOpen(false)}>
          <div className="promo-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="promo-modal-header">
              <h3>🎟️ Управление промокодами</h3>
              <button className="btn-close-modal" onClick={() => setIsPromoModalOpen(false)}>✕</button>
            </div>
            
            {/* Форма добавления нового промокода вручную */}
            <form onSubmit={handleAddPromo} className="add-promo-inline-form" style={{ display: 'flex', gap: '6px', marginBottom: '15px' }}>
              <input 
                type="text" 
                placeholder="Код (напр. DOSKA15)" 
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                style={{ flex: 1, padding: '6px 10px', fontSize: '13px', borderRadius: '8px', border: '1px solid #dee2e6' }}
              />
              
              
              <button type="submit" style={{ backgroundColor: '#2b7551', color: '#fff', border: 'none', borderRadius: '8px', padding: '0 12px', fontWeight: 'bold', cursor: 'pointer' }}>＋</button>
            </form>

            {/* Форма проверки/применения промокода */}
            <form onSubmit={handleApplyPromo} className="promo-modal-form">
              <input 
                type="text" 
                placeholder="Проверить промокод..." 
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                className="promo-modal-input"
              />
              <button type="submit" className="promo-modal-btn-apply">Применить</button>
            </form>

            {promoMessage && <p className="promo-modal-message">{promoMessage}</p>}

            {/* Табличка со списком купонов */}
            <div className="promo-table-wrapper">
              <p className="promo-table-title">Доступные купоны (нажмите на строку для проверки):</p>
              <table className="promo-table">
                <thead>
                  <tr>
                    <th>Промокод</th>
                    <th>Скидка</th>
                    <th>Описание</th>
                  </tr>
                </thead>
                <tbody>
                  {availablePromos.map((p, index) => (
                    <tr key={index} onClick={() => setPromoInput(p.code)} style={{cursor: 'pointer'}} title="Нажмите для ввода">
                      <td className="promo-code-cell"><code>{p.code}</code></td>
                      <td className="promo-discount-cell">{p.discount}</td>
                      <td>{p.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Profil;