import { useEffect, useState } from 'react';
import useAxios from '../utils/useAxios';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Order() {
  const [orders, setOrders] = useState()
  const [itemList, setItemList] = useState([])
  const navigate = useNavigate()
  const [change, setChange] = useState(false)

  const [orderIdvalue, setOrderIdvalue] = useState({
    'id':'',
    'table':''
  });

  const api = useAxios()
  const [tableData, setTableData] = useState()
  const getTable = async () => {
    const response = await api.get(`/store/tableno`)
    setTableData(response.data)
  }

  useEffect(() => {
    getTable()
  }, [])

  const getOrders = async () => {
    const response = await api.get('/waiter/orders')
    const readyToCook = response.data
    setOrders(response.data)
    const itemListArray = []
    for (const item of readyToCook) {
      const responses = await api.get(`/store/orderitem/${item.id}`)
      itemListArray.push(...responses.data)
    }
    setItemList(itemListArray)
  }

  const handleServeClick = (orderId,table) => {
    setChange(false)
    api.post(`/waiter/orders/${orderId}`).then(() => {
      console.log('ss')
      setOrderIdvalue({
        'id':orderId,
        'table':table
      })
      setChange(true)
      setTimeout(() => {
        setChange(false)
      },5000)
    })
  }

  const handleUnServeClick = (orderId) => {
    api.post(`/waiter/orders/${orderId}`).then(() => {
      setChange(false)
      setOrderIdvalue()
    })
  };

  const handleCloseMessage = () => {
    setChange(false)
  }

  useEffect(() => {
    getOrders()
  }, [change])



  return (
    <>
      {change &&
        <div className="alert-box-login">
          <span className="close-btn" onClick={handleCloseMessage}>&times;</span>
          <p>Table {orderIdvalue.table} Served</p> 
          <button className='button-undos' onClick={() => handleUnServeClick(orderIdvalue.id)}>Undo</button>
        </div>
      }
      <div className="order-page">
        <div className='goback'>
          <button className='back-order' onClick={() => { navigate(-1) }}>
            <ArrowBackIcon />
          </button>
        </div>
        <div className='recent-orders'>
          <Link to='/recentorder'>
            <button className='button-order'>
              Recent Order
            </button>
          </Link>
        </div>
        <div className="orders">
          {orders?.map((order) => (
            <div key={order.id} className={`order order-new`} >
              <div className="order-header">
                <h2>Order From Table - {order.table_no}</h2>
              </div>
              {/* <div className="order-status">Ready To serve</div>  */}
              <h2 className='orderhead'>Order - {order.id}</h2>
              <table className="order-items" >
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {itemList?.filter(filt => filt.order === order.id).map(item => (
                    <tr key={item.id}>
                      <td>{item.product_name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className='served-div'>
                {/* {order.status === 'Ready To Serve' && ( */}
                <label className="switch" style={{ 'marginBottom': '0' }}>
                  <input type="checkbox" onClick={() => handleServeClick(order.id,order.table_no)} />
                  <span className="slider"></span>
                </label>
                {/* )} */}
                <p className='foodserved'>Served</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}


export default Order;
