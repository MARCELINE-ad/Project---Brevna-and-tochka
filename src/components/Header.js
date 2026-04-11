import React from "react"
import { FaShoppingCart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { Route, Routes, Link } from "react-router-dom";

import Profil from "../Pages/Profil";
import ShoppingCard from "../Pages/ShoppingCard";
import NonPages404 from "../Pages/NonPages404";
import HomePages from "../Pages/HomePages";
import Catalog from "../Pages/Catalog";

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

      <Routes>
        <Route path="/catalog" element={<Catalog/>}/>
        <Route path="/" element={<HomePages/>}/>
        <Route path="/Profils" element={<Profil/>}/>
        <Route path="/ShoppingCards" element={<ShoppingCard/>}/>
        <Route path="*" element={<NonPages404/>}/>
      </Routes>

    </header>
  )
}
