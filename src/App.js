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
    
    // 1. Определяем, есть ли вошедший пользователь
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    
    // 2. Если пользователь есть, загружаем данные СТРОГО для его email
    let userOrders = [];
    if (currentUser && currentUser.email) {
      userOrders = JSON.parse(localStorage.getItem(`orders_${currentUser.email}`)) || [];
      
      // ИЩЕМ СОХРАНЕННУЮ АВАТАРКУ ДЛЯ ЭТОГО EMAIL
      const savedAvatar = localStorage.getItem(`avatar_${currentUser.email}`);
      if (savedAvatar) {
        currentUser.avatar = savedAvatar;
      }
    }

    this.state = {
      orders: [],
      allItems: productsData, 
      currentItems: productsData, 
      currentPage: 1,
      itemsPerPage: 6,
      user: currentUser,
      completedOrders: userOrders,
      bonusPoints: parseInt(localStorage.getItem('brevna_bonus') || '0')
    }

    this.addToOrder = this.addToOrder.bind(this)
    this.deleteOrder = this.deleteOrder.bind(this)
    this.increaseQuantity = this.increaseQuantity.bind(this)
    this.decreaseQuantity = this.decreaseQuantity.bind(this)
    this.handleAuth = this.handleAuth.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleSearch = this.handleSearch.bind(this) 
    this.updateGlobalUser = this.updateGlobalUser.bind(this)
    this.addOrderToHistory = this.addOrderToHistory.bind(this) 
    this.changeOrderStatus = this.changeOrderStatus.bind(this)
    this.handleStorageChange = this.handleStorageChange.bind(this)
  }

  componentDidMount() {
    window.addEventListener('storage', this.handleStorageChange);
    // Polling каждые 2 секунды — на случай если игра открыта в той же вкладке
    this.bonusInterval = setInterval(() => {
      const current = parseInt(localStorage.getItem('brevna_bonus') || '0');
      if (current !== this.state.bonusPoints) {
        this.setState({ bonusPoints: current });
      }
    }, 2000);
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.handleStorageChange);
    clearInterval(this.bonusInterval);
  }

  handleStorageChange(e) {
    if (e.key === 'brevna_bonus') {
      this.setState({ bonusPoints: parseInt(e.newValue || '0') });
    }
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

  // --- ЛОГИКА АВТОРИЗАЦИИ И ПЕРЕКЛЮЧЕНИЯ АККАУНТОВ ---
  handleAuth(userData) {
    // Подтягиваем историю заказов для email этого пользователя
    const savedOrders = JSON.parse(localStorage.getItem(`orders_${userData.email}`)) || [];
    
    // ПОДТЯГИВАЕМ АВАТАРКУ ДЛЯ ЭТОГО EMAIL (если она была сохранена ранее)
    const savedAvatar = localStorage.getItem(`avatar_${userData.email}`);
    if (savedAvatar) {
      userData.avatar = savedAvatar;
    }
    
    this.setState({ 
      user: userData,
      completedOrders: savedOrders
    });
    
    localStorage.setItem('currentUser', JSON.stringify(userData));
  }

  handleLogout() {
    this.setState({ 
      user: null, 
      completedOrders: [] 
    });
    localStorage.removeItem('currentUser');
  }

  // Динамическое обновление данных профиля (имя, адрес, аватарка, телефон)
  updateGlobalUser(updatedData) {
    this.setState(prevState => {
      const newUser = { ...prevState.user, ...updatedData };
      
      // ЕСЛИ ИЗМЕНИЛАСЬ АВАТАРКА — сохраняем её в localStorage отдельно для этого email
      if (updatedData.avatar && prevState.user && prevState.user.email) {
        localStorage.setItem(`avatar_${prevState.user.email}`, updatedData.avatar);
      }
      
      localStorage.setItem('currentUser', JSON.stringify(newUser)); 
      return { user: newUser };
    });
  }

  // --- ИСТОРИЯ ЗАКАЗОВ ---
  addOrderToHistory(cartItems, totalPrice) {
    if (!this.state.user) {
      alert("Для совершения покупок необходимо войти в аккаунт!");
      return;
    }

    const newOrder = {
      id: `#${Math.floor(10000 + Math.random() * 90000)}`, 
      items: cartItems.map(item => `${item.title} (x${item.quantity || 1})`).join(', '),
      price: totalPrice,
      status: 'В пути',
      statusColor: 'orange',
      icon: '⇄'
    };

    this.setState(prevState => {
      const updatedHistory = [newOrder, ...prevState.completedOrders];
      localStorage.setItem(`orders_${prevState.user.email}`, JSON.stringify(updatedHistory)); 
      return { completedOrders: updatedHistory };
    });
  }

  changeOrderStatus(orderId, newStatus) {
    let statusColor = 'orange';
    let icon = '⇄';

    if (newStatus === 'Доставлен') {
      statusColor = 'green';
      icon = '✓';
    } else if (newStatus === 'Отменён') {
      statusColor = 'red';
      icon = '✕';
    }

    this.setState(prevState => {
      const updatedOrders = prevState.completedOrders.map(order => {
        if (order.id === orderId) {
          return { ...order, status: newStatus, statusColor, icon };
        }
        return order;
      });

      if (prevState.user) {
        localStorage.setItem(`orders_${prevState.user.email}`, JSON.stringify(updatedOrders));
      }
      return { completedOrders: updatedOrders };
    });
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

  decreaseQuantity(id) {
    const itemInOrder = this.state.orders.find(el => el.id === id);
    if (itemInOrder && itemInOrder.quantity > 1) {
      this.setState({
        orders: this.state.orders.map(el =>
          el.id === id ? { ...el, quantity: el.quantity - 1 } : el
        )
      });
    } else {
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
                points={this.state.bonusPoints}
                onChoose={(category) => {
                  let filtered = this.state.allItems;
                  if (category !== 'all') {
                    filtered = this.state.allItems.filter(el => el.category === category);
                  }
                  this.setState({ currentItems: filtered, currentPage: 1 });
                }} 
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
                paginate={(pageNumber) => {
                  this.setState({ currentPage: pageNumber });
                  window.scrollTo(0, 0);
                }}
                onChoose={(category) => {
                  let filtered = this.state.allItems;
                  if (category !== 'all') {
                    filtered = this.state.allItems.filter(el => el.category === category);
                  }
                  this.setState({ currentItems: filtered, currentPage: 1 });
                }} 
                applyFilters={(filters) => {
                  let filtered = this.state.allItems;
                  if (filters.inStock) filtered = filtered.filter(el => el.inStock === true);
                  if (filters.isNew) filtered = filtered.filter(el => el.isNew === true);
                  const min = parseFloat(filters.minPrice) || 0;
                  const max = parseFloat(filters.maxPrice) || Infinity;
                  filtered = filtered.filter(el => el.price >= min && el.price <= max);
                  this.setState({ currentItems: filtered, currentPage: 1 });
                }} 
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
                user={this.state.user}
                onDelete={this.deleteOrder}
                onIncrease={this.increaseQuantity}
                onDecrease={this.decreaseQuantity}
                onClear={() => this.setState({ orders: [] })}
                addOrderToHistory={this.addOrderToHistory}
              />
            } />

            <Route path="/Profil" element={
              <Profil 
                user={this.state.user} 
                items={this.state.allItems}
                orders={this.state.orders} 
                completedOrders={this.state.completedOrders}
                addToOrder={this.addToOrder} 
                onIncrease={this.increaseQuantity} 
                onDecrease={this.decreaseQuantity} 
                onAuth={this.handleAuth} 
                onLogout={this.handleLogout} 
                updateGlobalUser={this.updateGlobalUser} 
                changeOrderStatus={this.changeOrderStatus} 
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