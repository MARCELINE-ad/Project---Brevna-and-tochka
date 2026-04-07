import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header/>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
