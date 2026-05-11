import React, { useState } from "react" // Добавили useState
import { FaShoppingCart, FaRegUser } from "react-icons/fa"; 
import { Link, useNavigate } from "react-router-dom";

export default function Header(props) {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]); // Состояние для подсказок

  const displayCount = props.ordersCount > 99 ? '99+' : props.ordersCount;

  // Обработка ввода
  const handleInputChange = (e) => {
    const query = e.target.value;
    const results = props.onSearch(query); // Вызываем поиск из App.js
    
    // Показываем подсказки, если введено больше 1 символа
    if (query.length > 1) {
      setSuggestions(results.slice(0, 5)); // Берем только первые 5 для красоты
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const query = e.target.value;
      const results = props.onSearch(query);
      setSuggestions([]); // Скрываем список при поиске

      if (results && results.length === 1) {
        navigate(`/product/${results[0].id}`);
      } else {
        navigate('/catalog');
      }
    }
  };

  return (
    <header>
      <div className="nav">
          <Link className="brand_logo" to="/"/>
          <Link className="brand_text" to="/catalog">
              <span className='brand_title'>Бревна и точка</span>
              <span className='brand_subtitle'>Надежней уже некуда</span>
          </Link>

          {/* Обертка для позиционирования списка */}
          <div className="search_wrapper">
            <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
              <span className="search_icon"></span>
              <input 
                className="search_input" 
                type="search" 
                placeholder="Найди своё бревно"
                onChange={handleInputChange} 
                onKeyDown={handleKeyDown}
                // Скрываем список, если ушли из инпута (с задержкой, чтобы клик сработал)
                onBlur={() => setTimeout(() => setSuggestions([]), 200)}
              />
            </form>

            {/* ВЫПАДАЮЩИЙ СПИСОК */}
            {suggestions.length > 0 && (
              <ul className="search_suggestions">
                {suggestions.map(item => (
                  <li key={item.id} onClick={() => navigate(`/product/${item.id}`)}>
                    <img src={"./img/" + item.img} alt="" />
                    <div className="suggestion_info">
                        <span className="suggestion_title">{item.title}</span>
                        <span className="suggestion_price">{item.price} ₽</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="nav_active">
            <Link className="btn btn_outline" to="/Profil">
               <FaRegUser/> {props.user ? props.user.name : 'Профиль'}
            </Link>

            <Link className="btn btn_squre" to="/ShoppingCard" style={{ position: 'relative' }}>
              <FaShoppingCart/>
              {props.ordersCount > 0 && (
                <span className="cart-count">
                  {displayCount}
                </span>
              )}
            </Link>
          </div>
      </div>
      <hr/>
    </header>
  )
}
