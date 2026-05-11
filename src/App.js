import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Catalog from "./Pages/Catalog"; 
import ShoppingCard from "./Pages/ShoppingCard"; 
import Profil from "./Pages/Profil"; 
import HomePages from "./Pages/HomePages";
import FullItem from "./Pages/FullItem"; 
import NonPages404 from "./Pages/NonPages404";
import { productsData } from "./data/products"; 

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
      allItems: productsData, 
      currentItems: productsData, 
      currentPage: 1,
      itemsPerPage: 6,
      user: JSON.parse(localStorage.getItem('currentUser')) || null 
    }
    this.addToOrder = this.addToOrder.bind(this)
    this.chooseCategory = this.chooseCategory.bind(this)
    this.applyFilters = this.applyFilters.bind(this)
    this.deleteOrder = this.deleteOrder.bind(this)
    this.paginate = this.paginate.bind(this)
    this.increaseQuantity = this.increaseQuantity.bind(this)
    this.decreaseQuantity = this.decreaseQuantity.bind(this)
    this.handleAuth = this.handleAuth.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleSearch = this.handleSearch.bind(this) 
  }

  // --- ЛОГИКА ПОИСКА ---
  handleSearch(query) {
    if (!query.trim()) {
      this.setState({ currentItems: this.state.allItems, currentPage: 1 });
      return this.state.allItems;
    }

    const filtered = this.state.allItems.filter(el => 
      el.title.toLowerCase().includes(query.toLowerCase())
    );

    this.setState({ currentItems: filtered, currentPage: 1 });
    return filtered; 
  }

  // --- ЛОГИКА АВТОРИЗАЦИИ ---
  handleAuth(userData) {
    this.setState({ user: userData })
    localStorage.setItem('currentUser', JSON.stringify(userData))
  }

  handleLogout() {
    this.setState({ user: null })
    localStorage.removeItem('currentUser')
  }

  // --- ЛОГИКА КАТАЛОГА ---
  paginate(pageNumber) {
    this.setState({ currentPage: pageNumber })
    window.scrollTo(0, 0)
  }

  chooseCategory(category) {
    let filtered = this.state.allItems
    if (category !== 'all') {
      filtered = this.state.allItems.filter(el => el.category === category)
    }
    this.setState({ currentItems: filtered, currentPage: 1 })
  }

  applyFilters(filters) {
    let filtered = this.state.allItems;
    if (filters.inStock) filtered = filtered.filter(el => el.inStock === true);
    if (filters.isNew) filtered = filtered.filter(el => el.isNew === true);
    const min = parseFloat(filters.minPrice) || 0;
    const max = parseFloat(filters.maxPrice) || Infinity;
    filtered = filtered.filter(el => el.price >= min && el.price <= max);
    this.setState({ currentItems: filtered, currentPage: 1 });
  }

  // --- ЛОГИКА КОРЗИНЫ ---
  addToOrder(item) {
    let isInArray = false
    const newOrders = this.state.orders.map(el => {
      if (el.id === item.id) {
        isInArray = true
        return { ...el, quantity: (el.quantity || 1) + 1 }
      }
      return el
    })
    if (isInArray) {
      this.setState({ orders: newOrders })
    } else {
      this.setState({ orders: [...this.state.orders, { ...item, quantity: 1 }] })
    }
  }

  increaseQuantity(id) {
    this.setState({
      orders: this.state.orders.map(el => 
        el.id === id ? { ...el, quantity: el.quantity + 1 } : el
      )
    })
  }

  // ОБНОВЛЕННЫЙ МЕТОД: УДАЛЯЕТ ТОВАР ПРИ quantity = 1
  decreaseQuantity(id) {
    const itemInOrder = this.state.orders.find(el => el.id === id);

    if (itemInOrder && itemInOrder.quantity > 1) {
      this.setState({
        orders: this.state.orders.map(el =>
          el.id === id ? { ...el, quantity: el.quantity - 1 } : el
        )
      });
    } else {
      // Если осталась 1 шт — удаляем товар совсем
      this.deleteOrder(id);
    }
  }

  deleteOrder(id) {
    this.setState({ orders: this.state.orders.filter(el => el.id !== id) })
  }

  render() {
    const indexOfLastItem = this.state.currentPage * this.state.itemsPerPage
    const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage
    const currentItemsPage = this.state.currentItems.slice(indexOfFirstItem, indexOfLastItem)
    const totalCount = this.state.orders.reduce((sum, el) => sum + (el.quantity || 1), 0)

    return (
      <BrowserRouter>
        <div className="wrapper">
          <Header ordersCount={totalCount} user={this.state.user} onSearch={this.handleSearch} />
          
          <Routes>
            <Route path="/" element={
              <HomePages 
                items={this.state.allItems} 
                orders={this.state.orders}
                onIncrease={this.increaseQuantity}
                onDecrease={this.decreaseQuantity}
                onChoose={this.chooseCategory} 
                addToOrder={this.addToOrder} 
              />
            } />

            <Route path="/catalog" element={
              <Catalog 
                items={currentItemsPage} 
                orders={this.state.orders}
                onIncrease={this.increaseQuantity}
                onDecrease={this.decreaseQuantity}
                totalItems={this.state.currentItems.length}
                itemsPerPage={this.state.itemsPerPage}
                currentPage={this.state.currentPage}
                paginate={this.paginate}
                onChoose={this.chooseCategory} 
                applyFilters={this.applyFilters} 
                addToOrder={this.addToOrder} 
              /> 
            } />

            <Route path="/product/:id" element={
              <FullItem 
                items={this.state.allItems} 
                orders={this.state.orders}
                onIncrease={this.increaseQuantity}
                onDecrease={this.decreaseQuantity}
                addToOrder={this.addToOrder} 
              />
            } />

            <Route path="/ShoppingCard" element={
              <ShoppingCard 
                orders={this.state.orders} 
                onDelete={this.deleteOrder}
                onIncrease={this.increaseQuantity}
                onDecrease={this.decreaseQuantity}
                onClear={() => this.setState({ orders: [] })}
              />
            } />

            <Route path="/Profil" element={
              <Profil 
                user={this.state.user} 
                onAuth={this.handleAuth} 
                onLogout={this.handleLogout} 
              />
            } />

            <Route path="*" element={<NonPages404 />} />
          </Routes>
          
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
