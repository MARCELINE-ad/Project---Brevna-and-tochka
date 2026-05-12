import React, { useState } from 'react';
import './Profil.css';

const Profil = ({ user, onAuth, onLogout }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const mockOrders = [
    { id: '#00000', details: '12 мешков цемета  |  8888₽  |  Доставлен', status: 'Доставлен', statusColor: 'green', icon: '✓' },
    { id: '#01000', details: '12 мешков цемета  |  6666₽  |  В пути',    status: 'В пути',    statusColor: 'orange', icon: '⇄' },
    { id: '#02000', details: '12 мешков цемета  |  9999₽  |  Отменён',   status: 'Отменён',   statusColor: 'red',    icon: '✕' },
  ];

  const mockFavorites = [
    {
      id: 1,
      name: 'Террасная доска',
      desc: 'Цвет Тёмный орех 3000х150х24 мм двусторонняя вельвет/структура дерева 0.45 м²',
      price: 'от 1488 ₽',
      img: 'board-placeholder.png',
    },
    {
      id: 2,
      name: 'Кирпич',
      desc: 'облицовочный красный гладкий 250х120х88 мм 1.4 НФ Воротынский М150',
      price: 'от 42 ₽',
      img: 'brick-placeholder.png',
    },
    {
      id: 3,
      name: 'Дрель-шуруповерт',
      desc: 'Дрель-шуруповерт аккумуляторная Makita DF333DAX13, 12 В Li-Ion 2x2 Ач',
      price: 'от 6767 ₽',
      img: 'drill-placeholder.png',
    },
  ];

  const quickActions = [
    { label: 'Повторить заказ', icon: '🔄' },
    { label: 'Корзина',         icon: '🛒' },
    { label: 'Мои промокоды',   icon: '🏷️' },
    { label: 'Просмотренные',   icon: '✓' },
  ];

  if (user) {
    return (
      <div className="profile-page">
        <div className="profile-wrapper">

          {/* ===== ШАПКА ===== */}
          <header className="profile-header">
            <div className="profile-user-info">
              <div className="profile-avatar">
                {user.avatar
                  ? <img src={user.avatar} alt="Аватар" />
                  : <span>{user.name ? user.name[0].toLowerCase() : 'u'}</span>
                }
              </div>
              <div className="profile-user-details">
                <h1 className="profile-user-name">{user.name || 'Хамидов Дамир'}</h1>
                <span className="profile-user-status">✓ Активная сессия</span>
              </div>
            </div>
            <div className="profile-header-actions">
              <button className="btn-header-action">Изменить имя</button>
              <button className="btn-header-action">Очистить данные</button>
            </div>
          </header>

          {/* ===== ЗАКАЗЫ + БЫСТРЫЕ ДЕЙСТВИЯ ===== */}
          <div className="profile-top-grid">

            <section className="profile-section orders-section">
              <h2 className="section-title">
                <span className="section-title-icon">💳</span> Мои Заказы
              </h2>
              <div className="orders-list">
                {mockOrders.map((order, i) => (
                  <div className="order-item" key={i}>
                    <span className="order-id">{order.id}</span>
                    <span className="order-details">{order.details}</span>
                    <span className={`order-status status-${order.statusColor}`}>
                      {order.icon} {order.status}
                    </span>
                  </div>
                ))}
              </div>
              <button className="btn-see-all">Смотреть все</button>
            </section>

            <section className="profile-section quick-actions-section">
              <h2 className="section-title">Быстрые действия</h2>
              <div className="actions-list">
                {quickActions.map((a, i) => (
                  <button className="btn-action" key={i}>
                    <span>{a.icon}</span> {a.label}
                  </button>
                ))}
              </div>
            </section>

          </div>

          {/* ===== ИЗБРАННОЕ ===== */}
          <section className="profile-section favorites-section">
            <h2 className="section-title">
              <span className="section-title-icon">🔖</span> Избранное
            </h2>
            <div className="favorites-grid">
              {mockFavorites.map(item => (
                <article className="favorite-card" key={item.id}>
                  <div className="favorite-img-wrapper">
                    <img src={item.img} alt={item.name} />
                  </div>
                  <div className="favorite-info">
                    <h3 className="favorite-name">{item.name}</h3>
                    <p className="favorite-desc">{item.desc}</p>
                    <div className="favorite-bottom">
                      <span className="favorite-price">{item.price}</span>
                      <div className="favorite-actions">
                        <button className="icon-btn" title="Сохранить">🔖</button>
                        <button className="btn-to-cart">В корзину</button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ===== ЛИЧНЫЕ ДАННЫЕ ===== */}
          <section className="profile-section personal-data-section">
            <h2 className="section-title">
              <span className="section-title-icon">📁</span> Личные данные
            </h2>
            <div className="personal-data-grid">

              <div className="data-card address-card">
                <p className="data-card-title">🏠 Адрес доставки</p>
                <p>Таджикистан,г.Душанбе,ул.Лохути д.67 кв.228</p>
                <p>+992 37 567 23 86</p>
                <button className="btn-change">Изменить</button>
              </div>

              <div className="data-card activity-card">
                <p className="data-card-title">⏱ Ваша активность</p>
                <div className="stat-row">
                  <span className="stat-value">12</span>
                  <span className="stat-label">Заказов</span>
                </div>
                <div className="stat-sum-row">
                  <span className="stat-sum-value">36 789₽</span>
                  <span className="stat-sum-label">Сумма</span>
                </div>
                <p className="fav-cat-row">Любимая категория: <span>Инструменты</span></p>
              </div>

            </div>
          </section>

        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
        <form onSubmit={(e) => { e.preventDefault(); onAuth({ name, email }); }}>
          {!isLogin && (
            <input type="text" placeholder="Имя" required
              onChange={e => setName(e.target.value)} className="auth-input" />
          )}
          <input type="email" placeholder="Email" required
            onChange={e => setEmail(e.target.value)} className="auth-input" />
          <input type="password" placeholder="Пароль" required className="auth-input" />
          <button type="submit" className="btn-primary">
            {isLogin ? 'Войти' : 'Создать аккаунт'}
          </button>
        </form>
        <p className="toggle-auth" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Нет аккаунта? Регистрация' : 'Уже есть аккаунт? Войти'}
        </p>
      </div>
    </div>
  );
};

export default Profil;