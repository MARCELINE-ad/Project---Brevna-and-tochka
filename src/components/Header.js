import React from "react"

export default function Header() {
  return (
    <header>
      <div className="nav">
          <div className="brand_logo"/>
          <a className="brand_text">
              <span className='brand_title'>Бревна и точка</span>
              <span className='brand_subtitle'>Надежней уже некуда</span>
          </a>

          <form className="search"  role="search">
            <span className="search_icon"></span>
            <input className="search_input" type="search" placeholder="Найди своё бревно"/>
          </form>

          <div className="nav_active">
            <button className="btn btn_outline" type="button">
               👤Профиль
            </button>

            <button className="btn btn_squre" type="button">
              🧺
            </button>

          </div>
      </div>
      <hr/>
    </header>
  )
}
