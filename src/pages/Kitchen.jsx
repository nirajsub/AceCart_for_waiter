import { useState } from 'react';

function Kitchen() {
  const [orders, setOrders] = useState([
    { id: 1, status: 'new', items: [
      { name: 'Mo:Mo', quantity: 3, details: 'With extra Jhol' },
      { name: 'Chowmein', quantity: 2, details: 'Spicy' },
    ]},
    { id: 2, status: 'new', items: [
      { name: 'Fried Rice', quantity: 2, details: 'Veg' },
      { name: 'Coke', quantity: 1, details: '' },
    ]},
    { id: 3, status: 'new', items: [
      { name: 'Pizza', quantity: 1, details: 'Extra cheese' },
      { name: 'Fried Rice', quantity: 2, details: 'Veg' },
      { name: 'Fried Rice', quantity: 2, details: 'Veg' },
    ]}
  ]);

  const handleServeClick = (orderId) => {
    setOrders(prevOrders => prevOrders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: 'Cooking.....' };
      }
      return order;
    }));
  };

  return (
    <div className="order-page">
      <div className="orders">
        {orders.map(order => (
          <div key={order.id} className={`order order-${order.status}`}>
                      <div className="order-header">
              <h2>Order From Table {order.id} By Waiter</h2>
            </div>
          <div className="order-status">{order.status}</div> 

            <table className="order-items">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='served-div'>
            {order.status === 'new' && (
              <label className="switch">
                <input type="checkbox" onClick={() => handleServeClick(order.id)} />
                <span className="slider"></span> 
              </label>
            )}
            <p>Accept</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Kitchen;
