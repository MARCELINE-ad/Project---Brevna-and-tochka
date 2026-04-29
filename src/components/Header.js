import React from "react"
import { FaShoppingCart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";


export default function Header() {
  return (
    <header>
      <div className="nav">
          <Link className="brand_logo" to="/"/>
          <Link className="brand_text" to="catalog">
              <span className='brand_title'>Бревна и точка</span>
              <span className='brand_subtitle'>Надежней уже некуда</span>
          </Link>

          <form className="search"  role="search">
            <span className="search_icon"></span>
            <input className="search_input" type="search" placeholder="Найди своё бревно"/>
          </form>

          <div className="nav_active">
            <Link className="btn btn_outline" type="button" to="/Profils">
               <FaRegUser/> Профиль
            </Link>

            <Link className="btn btn_squre" type="button" to="/ShoppingCards">
              <FaShoppingCart/>
            </Link>

          </div>
          
      </div>
      <hr/>


    </header>
  )
}
