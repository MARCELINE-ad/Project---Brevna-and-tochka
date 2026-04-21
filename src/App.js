import React from "react"
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter } from 'react-router-dom';

class App extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <div className="wrapper">
          <Header/>
          <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
