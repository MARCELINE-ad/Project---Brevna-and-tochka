import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Catalog from "./Pages/Catalog"; 
import ShoppingCard from "./Pages/ShoppingCard"; 
import Profil from "./Pages/Profil"; // Импортируем остальные страницы
import HomePages from "./Pages/HomePages";
import NonPages404 from "./Pages/NonPages404";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [] 
    }
    this.addToOrder = this.addToOrder.bind(this)
  }

  addToOrder(item) {
    let isInArray = false
    this.state.orders.forEach(el => {
      if(el.id === item.id) isInArray = true
    })
    
    if(!isInArray) {
      this.setState({ orders: [...this.state.orders, item] })
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="wrapper">
          {/* Header всегда виден, данные корзины передаем сюда */}
          <Header orders={this.state.orders} /> 
          
          <Routes>
            {/* Главная страница */}
            <Route path="/" element={<HomePages />} />

            {/* Каталог товаров */}
            <Route path="/catalog" element={
              <Catalog addToOrder={this.addToOrder} /> 
            } />

            {/* Корзина (ShoppingCards) */}
            <Route path="/ShoppingCards" element={
              <ShoppingCard orders={this.state.orders} />
            } />

            {/* Профиль */}
            <Route path="/Profils" element={<Profil />} />

            {/* Страница 404 (если адрес не найден) */}
            <Route path="*" element={<NonPages404 />} />
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;