import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import StarRating from './Assets/StarRating';
import './Home.css';

const SearchedProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialKey = queryParams.get('key');

  const [key, setKey] = useState(initialKey);
  const [data, setData] = useState({
    info: []
  });

  useEffect(() => {
    fetchData();
  }, [key]);

  function fetchData() {
    axios.post('http://localhost:5000/searchedproducts', { key })
      .then(res => {
        setData({ info: res.data });
        console.log(data);
      })
      .catch(err => console.log(err));
  }

  function showDetails(item) {
    navigate(`/showdetails?itemid=${item.id}`);
  }

  // Update key when location changes
  useEffect(() => {
    setKey(queryParams.get('key'));
  }, [location.search]);

  return (
    <div>
      <div>
        <h2>Showing results for : {key}</h2>
      </div>
      <div className='Products1'>
        {data.info.length > 0 ? (
          data.info.map(item => (
            <div className='Product1' key={item.id}>
              <img src={require('../image/' + item.img_url)} alt="ProductImage" style={{ width: '200px', height: '150px' }} />
              <StarRating rating={item.rating} />
              <div className='Description1'>
                <p><b>{item.name} </b></p>
              {
                item.discount > 0 ?(<p><b style={{ color: 'red' }}><del>&#2547;{item.base_price}</del><b>{' '}</b>&#2547;{item.base_price-(item.base_price*(item.discount/100))}</b></p>):(<p><b style={{ color: 'red' }}>&#2547;{item.base_price}</b></p>)
              }
                <button type="button" className="btn btn-outline-info" onClick={() => showDetails(item)}>Product Details</button>
              </div>
            </div>
          ))
        ) : (
            'Loading...'
          )}
      </div>
    </div>
  );
};

export default SearchedProducts;



