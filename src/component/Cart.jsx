import React from 'react';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import './Cart.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserCntxt';


export default function Cart({cartCount,setCartCount,showOffcanvas,setShowOffcanvas,show, setShow,user,cart,setCart}) {
      const { userRole } = useUser();
      const navigate = useNavigate();

      const handleCartIconClick = () => { 
        setShowOffcanvas(!showOffcanvas);
        setShow(true);
      };

      function showCart ()
      {
        setShow(false);
      }

      function handleCheckout ()
      {
        if(cart.info.length>0){
          setShow(false); 
          navigate('/payment', { state: { orderedProducts: cart.info } });
        }
        else
        {
          alert('Your cart is empty')
        }
      }
      
      function handleCartDelete(id)
      {
        axios.post('http://localhost:5000/cart1',{user,id})
        .then(res => {
          setCart({info:res.data.reslt});
          if(res.data.result1[0].cartitems!=null)
          {
            setCartCount(res.data.result1[0].cartitems);
          }
          else{
            setCartCount(0);
          }
        })
      .catch(err => console.log(err));
      }
      
  return (
    <>
    {userRole ==='customer'?(<div>
      <div className="scroll-to-top">
      <FaShoppingCart className="cart-icon" onClick={handleCartIconClick} />
      {cartCount >= 0 && <span className="cart-count">{cartCount}</span>}
      </div>
      <div className={`offcanvas ${show ? 'show' : ''}`}>
        <div className='head' style={{ textAlign: 'center',height :'70px' }}><h1>Your Cart</h1></div>
        
      <ul className="cart-list">
          {cart.info && cart.info.length > 0 ?
          cart.info.map((item) => (
            <li className="cart-item" key={`${item.id}-${item.name}`}>
              <div className="item-details">
                <img src={require('../image/'+item.img_url)} alt='product' width={"30px"} height={"30px"}/>
                <p className="item-name">{item.name}</p>
                <p className="item-quantity">Cost: {item.product_count}X{item.base_price}={item.product_count*item.base_price}</p>
              </div>
              <div className="delete-icon" onClick={()=>handleCartDelete(item.id)}>
                <FaTrash/>
              </div>
            </li>
          )):(<b>Your Shopping Cart Is Empty!!!</b>)}
        </ul>
        <div className="checkout-button-container">
                <button className="checkout-button" onClick={handleCheckout}>
                    Checkout
                </button>
            </div>
      <button className="offcanvas-close" onClick={showCart}>
        &times;
      </button>
    </div>
    
    </div>):(<></>)}
    </>
  )
}
