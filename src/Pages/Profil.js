import React, { useState, useRef, useEffect } from 'react';
import './Profil.css';
import { productsData } from '../data/products';

const Profil = ({ 
  user, 
  orders = [], 
  addToOrder, 
  onIncrease, 
  onDecrease, 
  updateGlobalUser, 
  onLogout, 
  onAuth, // Принимаем метод авторизации
  completedOrders = [],
  changeOrderStatus 
}) => {
  
  // === Состояния для формы входа ===
  const [authEmail, setAuthEmail] = useState('');
  const [authName, setAuthName] = useState('');
  
  // === Состояния личного кабинета ===
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(null);
  const fileInputRef = useRef(null);
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  // Синхронизируем локальные состояния с пропсом user при его изменении
  useEffect(() => {
    if (user) {
      setName(user.name || 'Другов Максим');
      setAvatar(user.avatar || null);
      setAddress(user.address || 'Москва, Проспект вернадского 52, этаж 5, кв 67');
      setPhone(user.phone || '+8-800-535-33-55');
    }
  }, [user]);

  // Модалка промокодов
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState('');
  const [availablePromos, setAvailablePromos] = useState([
    { code: 'BREVNO10', discount: '10%', description: 'На всё деревянное' },
    { code: 'PROMO2026', discount: '5%', description: 'Скидка на первый заказ' },
  ]);
  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // Обработчик отправки формы входа
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!authEmail.trim() || !authName.trim()) {
      alert("Пожалуйста, заполните имя и email для входа!");
      return;
    }
    
    // Передаем данные пользователя наверх в App.js
    if (onAuth) {
      onAuth({
        name: authName.trim(),
        email: authEmail.trim(),
        address: 'Москва, Проспект вернадского 52, этаж 5, кв 67', // значения по умолчанию
        phone: '+8-800-535-33-55',
        avatar: null
      });
    }
  };

  if (!user) {
    // ===== ОКНО ВХОДА В АККАУНТ (если пользователь разлогинен) =====
    return (
      <div className="profile-page">
        <div className="auth-container-box">
          <h2 className="auth-box-title">🚪 Вход в личный кабинет</h2>
          <p className="auth-box-subtitle">Введите данные, чтобы увидеть свою историю заказов</p>
          <form onSubmit={handleLoginSubmit} className="auth-form-elements">
            <div className="auth-input-group">
              <label>Ваше Имя</label>
              <input 
                type="text" 
                placeholder="Например, Другов Максим" 
                value={authName} 
                onChange={(e) => setAuthName(e.target.value)} 
                className="auth-input"
                required
              />
            </div>
            <div className="auth-input-group">
              <label>Email адреса (уникальный для аккаунта)</label>
              <input 
                type="email" 
                placeholder="example@mail.com" 
                value={authEmail} 
                onChange={(e) => setAuthEmail(e.target.value)} 
                className="auth-input"
                required
              />
            </div>
            <button type="submit" className="btn-auth-submit">Войти / Создать аккаунт</button>
          </form>
        </div>
      </div>
    );
  }

  // ===== ОСНОВНОЙ ИНТЕРФЕЙС ПРОФИЛЯ (если пользователь вошел) =====
  const favoriteItems = productsData.slice(0, 4);

  const totalOrdersSum = completedOrders.reduce((sum, order) => {
    return order.status !== 'Отменён' ? sum + order.price : sum; 
  }, 0);

  const lastThreeOrders = completedOrders.slice(0, 3);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const inputUpper = promoInput.toUpperCase();
    const foundPromo = availablePromos.find(p => p.code === inputUpper);
    if (foundPromo) {
      setPromoMessage(`✅ Промокод успешно применён! Скидка: ${foundPromo.discount}`);
    } else {
      setPromoMessage('❌ Неверный промокод');
    }
  };

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
    setAvailablePromos([promoObj, ...availablePromos]);
    setNewCode(''); setNewDiscount(''); setNewDesc('');
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
      updateGlobalUser({ name, avatar, address, phone, email: user.email, ...updatedFields });
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

  return (
    <div className="profile-page">
      <div className="profile-wrapper">

        {/* ===== ШАПКА ИНТЕРФЕЙСА ===== */}
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
              <span className="profile-user-status">Аккаунт: {user.email}</span>
            </div>
          </div>
          <div className="profile-header-actions">
            <button className="btn-header-action" onClick={() => setIsEditingName(!isEditingName)}>{isEditingName ? 'Отмена' : 'Изменить имя'}</button>
            {/* ИЗМЕНЕНО: Кнопка выхода */}
            <button className="btn-header-action btn-logout-style" onClick={onLogout}>Выйти из аккаунта</button>
          </div>
        </header>

        {/* ===== ЗАКАЗЫ + БЫСТРЫЕ ДЕЙСТВИЯ ===== */}
        <div className="profile-top-grid">
          <section className="profile-section orders-section">
            <h2 className="section-title"> Мои Заказы</h2>
            <div className="orders-list">
              
              {completedOrders.length === 0 ? (
                <p style={{ color: '#6c757d', padding: '15px 0', fontSize: '14px' }}>Вы еще не совершали покупок.</p>
              ) : (
                lastThreeOrders.map((order, i) => (
                  <div className="order-item" key={order.id || i}>
                    <span className="order-id">{order.id}</span>
                    <span className="order-details" title={order.items}>
                      {order.items.length > 30 ? order.items.slice(0, 30) + '...' : order.items} | {order.price}₽
                    </span>
                    
                    <div className="status-select-container">
                      <select 
                        value={order.status} 
                        onChange={(e) => changeOrderStatus && changeOrderStatus(order.id, e.target.value)}
                        className={`order-status status-${order.statusColor || 'orange'} interactive-status-select`}
                      >
                        <option value="В пути">⇄ В пути</option>
                        <option value="Доставлен">✓ Доставлен</option>
                        <option value="Отменён">✕ Отменён</option>
                      </select>
                    </div>
                  </div>
                ))
              )}
              
            </div>
            {completedOrders.length > 3 && (
              <button className="btn-see-all">Смотреть все ({completedOrders.length})</button>
            )}
          </section>

          <section className="profile-section quick-actions-section">
            <h2 className="section-title">Быстрые действия</h2>
            <div className="actions-list">
              <a className="btn-action" href="/ShoppingCard"><span>🛒</span> Корзина</a>
              <button className="btn-action" onClick={() => { setIsPromoModalOpen(true); setPromoMessage(''); setPromoInput(''); }}>
                <span>🎟️</span> Мои промокоды
              </button>
            </div>
          </section>
        </div>

        {/* ===== ИЗБРАННОЕ ===== */}
        <section className="profile-section favorites-section">
          <h2 className="section-title"> Избранное</h2>
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
              <div className="stat-row"><span className="stat-value">{completedOrders.length}</span><span className="stat-label">Заказов</span></div>
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
            <form onSubmit={handleAddPromo} className="add-promo-inline-form" style={{ display: 'flex', gap: '6px', marginBottom: '15px' }}>
              <input type="text" placeholder="Код" value={newCode} onChange={(e) => setNewCode(e.target.value)} style={{ flex: 1, padding: '6px 10px', fontSize: '13px', borderRadius: '8px', border: '1px solid #dee2e6' }} />
              <input type="text" placeholder="Скидка" value={newDiscount} onChange={(e) => setNewDiscount(e.target.value)} style={{ width: '90px', padding: '6px 10px', fontSize: '13px', borderRadius: '8px', border: '1px solid #dee2e6' }} />
              <input type="text" placeholder="Описание" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} style={{ flex: 1, padding: '6px 10px', fontSize: '13px', borderRadius: '8px', border: '1px solid #dee2e6' }} />
              <button type="submit" style={{ backgroundColor: '#2b7551', color: '#fff', border: 'none', borderRadius: '8px', padding: '0 12px', fontWeight: 'bold', cursor: 'pointer' }}>＋</button>
            </form>
            <form onSubmit={handleApplyPromo} className="promo-modal-form">
              <input type="text" placeholder="Проверить промокод..." value={promoInput} onChange={(e) => setPromoInput(e.target.value)} className="promo-modal-input" />
              <button type="submit" className="promo-modal-btn-apply">Применить</button>
            </form>
            {promoMessage && <p className="promo-modal-message">{promoMessage}</p>}
            <div className="promo-table-wrapper">
              <table className="promo-table">
                <thead><tr><th>Промокод</th><th>Скидка</th><th>Описание</th></tr></thead>
                <tbody>
                  {availablePromos.map((p, index) => (
                    <tr key={index} onClick={() => setPromoInput(p.code)} style={{cursor: 'pointer'}}>
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