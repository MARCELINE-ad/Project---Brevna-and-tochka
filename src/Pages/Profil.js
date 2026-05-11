import React, { useState } from 'react';
import './Profil.css';

const Profil = ({ user, onAuth, onLogout }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (user) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h1>Мой профиль</h1>
          <div className="avatar-circle">{user.name[0]}</div>
          <p>Добро пожаловать, <b>{user.name}</b>!</p>
          <p>Ваш Email: {user.email}</p>
          <button className="btn-logout" onClick={onLogout}>Выйти</button>
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
            <input type="text" placeholder="Имя" required onChange={e => setName(e.target.value)} />
          )}
          <input type="email" placeholder="Email" required onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Пароль" required />
          <button type="submit" className="btn-auth">
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
