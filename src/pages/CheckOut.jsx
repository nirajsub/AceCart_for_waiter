import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from '../utils/useAxios';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { ArrowBack } from '@mui/icons-material';

const CheckOut = () => {
  const params = useParams()
  const [showMessage, setShowMessage] = useState(false);
  const history = useNavigate();
  const api = useAxios()

  const handleCloseMessage = () => {
    setShowMessage(false);
  }

  const handleConfirmOrder = async () => {
    // Code to confirm order goes here
    setShowMessage(true);
    await api.post(`/waiter/checkout/${params.id}`).then(() => {
      history('/');
    })
  }

  const [addedData, setAddedData] = useState([])
  const [uniqueItems,setUniqueItems] = useState()
  const repetitiveIds = {};

  let getaddedData = async () => {
    let response = await api.get(`/waiter/checkout/${params.id}`)
    if(response.status === 200){
      setAddedData(response.data)
      setUniqueItems(response.data.filter((item) => {
        if (repetitiveIds[item.product]) {
          return false;
        } else {
          repetitiveIds[item.product] = true;
          return true;
        }
      }))
    }
  }

  const total = addedData.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);

  useEffect(() => {
    getaddedData()
  },[])


  return (
    <>
      <div className='order-checkout'>
        <div className="checkout-container">
          <div className='top-checkout'>
          <Link to={'/home/'+params.id}>
          <ArrowBack />
          </Link>
          </div>
          {uniqueItems?.length > 0 ? (
            <div className="table-container">
              <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Qty</th>
                  <th>Details</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {addedData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.product_name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.description}</td>
                    <td>Rs. {item.price}</td>
                  </tr>
                ))}
              </tbody>
              <tr>
                <th>Total</th>
                <th></th>
                <th></th>
                <th>Rs. {total}</th>
              </tr>
            </table>
            </div>
          ) : (
            <div className="empty-table">
              <p>No items added yet</p>
            </div>
          )}
          <div className="abcd"></div>
          <input onClick={handleConfirmOrder}  type="submit" value="Confirm Order" />
          {showMessage && (
            <div className="alert-box">
              <span className="close-btn" onClick={handleCloseMessage}>&times;</span>
              <p>Order Successful!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CheckOut;
