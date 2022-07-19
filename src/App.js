import './App.css';
import Navbar from './components/navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import ItemListContainer from './components/itemListContainer/ItemListContainer';
import ItemDetailContainer from './components/itemDetailContainer/ItemDetailContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './components/cart/cart';
import CartContext from './store/CartContext';
import { useEffect, useState } from 'react';

function App() {

  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const addItem = (item, quantity) => {
    const index = cart.findIndex(product => product.id == item.id);   
    if(index == -1){
      cart.push({...item, quantity})
    }
    else{
      const newCart = cart;
      newCart[index].quantity += quantity; 
      setCart(newCart);
    }
  }

  const removeItem = (itemId, cant) => {
    const index = cart.findIndex(product => product.id == itemId);   
    if(index != -1){
      const newCart = cart;
      if(cart[index].quantity == 1){
        newCart.splice(index,1);
      }
      else{
        newCart[index].quantity -= cant;
      }
      setCart(newCart);
      
    }
  }

  const clear = () => {
    setCart([]);
  }

  const isInCart = (itemId) => {
    const index = cart.findIndex(product => product.id == itemId);
    if(index == -1){
      return false;
    }
    else{
      return true;
    }
  }

  useEffect(()=>{
    const cant = cart.reduce((acc, item) => {
      return acc += item.quantity;
    },0)
    setCartCount(cant);
    },[cart])

  return (
    <div className="App">
      <CartContext.Provider value={{cart, addItem, removeItem, clear, isInCart, cartCount}}>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route exact path='/category/:id' element={<ItemListContainer/>} />
            <Route exact path='/item/:id' element={<ItemDetailContainer/>} />
            <Route exact path='/cart' element={<Cart/>} />
            <Route exact path='/' element={<ItemListContainer/>} />
          </Routes>
        </BrowserRouter>
      </CartContext.Provider>
    </div>
  );
}

export default App;
