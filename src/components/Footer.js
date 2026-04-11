import React from "react"
import {Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
        <div className="footer">
          <Link to='*'>
              <span className='super1'>Контакты</span>
              <span className='block1'>г.Москва, ул.Вернадского 78<br/> +7 (000) 000-00-00<br/> info@brevna-i-tochka.ru</span>
          </Link>

          <Link to="*">
            <div className="MAX"></div>
            <div className="VK"></div>
          </Link>

          <Link to="*">
            <span className="super3">Информация</span>
            <span className="block3">© 2026 Бревна и точка.<br/>Все права защищены.<br/>Политика конфиденциальности</span>
          </Link>


        </div>
    </footer>
  )
}
