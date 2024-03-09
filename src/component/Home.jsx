import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import {useNavigate} from 'react-router-dom';
import { useUser } from './UserCntxt';
import StarRating from './Assets/StarRating';

export default function Home() {
  const navigate = useNavigate();
  const {userRole}= useUser();
  const [data, setData] = useState({
    info: []
  });
  const [disProducts, setdisProducts] = useState([]);
  const [upProducts, setupProducts] = useState([]);

  useEffect(() => {
    fetchData();
   }, []);

  console.log(1.4,data);

  function fetchData() {
    axios.get('http://localhost:5000/')
      .then(res => {
        console.log(res);
        const updatedData={info:res.data.result1};
        setData(updatedData);
        console.log(1.2,updatedData);
        console.log(1.1,data);
        setdisProducts(res.data.result3);
        console.log(1.3,disProducts);
        setupProducts(res.data.result4);
      })
      .catch(err => console.log(err));
      console.log(data);
  }

  function showDetails(item) {
    navigate(`/showdetails?itemId=${item.id}`);
}


  return (
    <div>
      <div>
        <div style ={{marginBottom: '50px',marginTop:'50px'}}>
      {userRole==='admin'?(
            <div className='Head'>
            <h4>Welcome Admin</h4>
            <h6>Check & Manage Your  Products!</h6>
          </div>
          
          ):(
              <div className='Head'>
            <h2>Welcome</h2>
            <h4>Check & Get Your Desired Products!</h4>
          </div>
          )}</div>

          <div className="moving-text-container" style = {{marginBottom : '50px'}}>
          <div className="moving-text"><h5>Welcome to GetUrTech! The best place to check out and buy your desired tech gadgets!</h5></div>
          </div>

        <div style = {{marginBottom : '50px'}}>
          <h3 style ={{marginLeft: '30px'}}><b style = {{color:'indigo'}}>Featured Products</b> </h3>

        <div className = 'Products1'>
            {console.log("data ",data.info)}
          {data.info.length > 0 ? (
            data.info.map(item => (
              <div className = 'Product1' key={`${item.id}-${item.name}+${item.img_url}`}>
                    
                <img src = {require('../image/'+item.img_url)} alt = "ProductImage" style = {{width: '200px',height:'150px'}}/>
                <StarRating rating={item.rating} />
                <div className='Description1'>
              <p><b> {item.name} </b></p>
              {
                item.discount > 0 ?(<p><b style={{ color: 'red' }}><del>&#2547;{item.base_price}</del><b>{' '}</b>&#2547;{item.base_price-(item.base_price*(item.DISCOUNT/100))}</b></p>):(<p><b style={{ color: 'red' }}>&#2547;{item.base_price}</b></p>)
              }
                <button type="button" className="btn btn-outline-info" onClick={() => showDetails(item)}>Product Details</button>               
                </div>
              </div>
            ))
           ) : (
            'Loading...'
          )}</div>
          </div>
        
          <div style = {{marginBottom : '50px'}}>
        <h3 className="discounted-products" style ={{marginLeft: '30px'}}><b style = {{color:'indigo', fontSize:'30px'}}>Discounted Products </b></h3>

        <div className = 'Products1'>

          {disProducts.length > 0 ? (
          
            disProducts.map(item => (
              <div className = 'Product1' key={`${item.id}-${item.name}+${item.img_url}`}>
                    
                <img src = {require('../image/'+item.img_url)} alt = "ProductImage" style = {{width: '200px',height:'150px'}}/>
                <StarRating rating={item.rating} />
                <div className='Description1'>
              <p><b> {item.name} </b></p>
              {
                item.discount > 0 ?(<p><b style={{ color: 'red' }}><del>&#2547;{item.base_price}</del><b>{' '}</b>&#2547;{item.base_price-(item.base_price*(item.discount/100))}</b></p>):(<p><b style={{ color: 'red' }}>&#2547;{item.base_price}</b></p>)
              }
                
                <button type="button" className="btn btn-outline-info" onClick={() => showDetails(item)}>Product Details</button>               
                </div>
              </div>
            ))
          ) : (
            'Loading...'
          )}</div>
          </div>


          <div style = {{marginBottom : '50px'}}>
        <h3 style ={{marginLeft: '30px'}}><b style = {{color:'indigo'}}>Upcoming Products </b></h3>

        <div className = 'Products1'>

          {upProducts.length > 0 ? (
          
            upProducts.map(item => (
              <div className = 'Product1' key={`${item.id}-${item.name}+${item.img_url}`}>
                    
                <img src = {require('../image/'+item.img_url)} alt = "ProductImage" style = {{width: '200px',height:'150px'}}/>
                <StarRating rating={item.rating} />
                <div className='Description1'>
              <p><b> {item.name} </b></p>
              {
                item.discount > 0 ?(<p><b style={{ color: 'red' }}><del>&#2547;{item.base_price}</del><b>{' '}</b>&#2547;{item.base_price-(item.base_price*(item.DISCOUNT/100))}</b></p>):(<p><b style={{ color: 'red' }}>&#2547;{item.base_price}</b></p>)
              }
                <button type="button" className="btn btn-outline-info" onClick={() => showDetails(item)}>Product Details</button>
                           
                </div>
              </div>
            ))
          ) : (
            'Loading...'
          )}</div>
          </div>


      </div>


     

    </div>
  )
}
