import React from 'react';
import { useLocation } from 'react-router-dom';
import './CompareTwoProducts.css';
import StarRating from './Assets/StarRating';

function CompareTwoProduct(props) {
  const location = useLocation();
  const resultTable = location.state.resultTable;
  console.log("resultTable ",resultTable);
  const p1 = location.state.p1;
  console.log("p1 ", p1);
  const p2 = location.state.p2;
  console.log("p2 ",p2);
  const product = location.state.product;
  console.log("product ",product);

  const attributeValues = {};

  resultTable.forEach((item) => {
    console.log("item ",item);
    const { attr_name, attr_value, product_id } = item;

    if (!attributeValues[attr_name]) {
      attributeValues[attr_name] = { Product1: '~', Product2: '~' };
    }

    if (product_id === p1) {
      attributeValues[attr_name].Product1 = attr_value;
    } else if (product_id === p2) {
      attributeValues[attr_name].Product2 = attr_value;
    }
  });

  const attributes = Object.keys(attributeValues);
  console.log(product);
  return (
    <div>
      <h1>Product Comparison</h1>
      <table>
        <thead>
          <tr>
            <th> </th>
            <th className="product1"><div><img src={require('../image/'+product[0].img_url)} alt='product1' width={'150px'} height={'150px'}/><br/>
            <p>{product[0].name}</p><p><b style={{ color: 'red' }}>&#2547;{product[0].base_price}</b></p><p><StarRating rating={product[0].rating} /></p></div></th>
            <th className="product2"><div><img src={require('../image/'+product[1].img_url)} alt='product2' width={'150px'} height={'150px'}/><br/>
            <p>{product[1].name}</p><p><b style={{ color: 'red' }}>&#2547;{product[1].base_price}</b></p><p><StarRating rating={product[1].rating} /></p></div></th>
          </tr>
        </thead>
        <tbody>
          {attributes
          .filter((atr)=>(atr!=='name'))
          .map((attribute) => ( 
            <tr key={attribute}>
              <td className="attr"><b>{attribute}</b></td>
              <td className="product1">{attributeValues[attribute].Product1}</td>
              <td className="product2">{attributeValues[attribute].Product2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CompareTwoProduct;
