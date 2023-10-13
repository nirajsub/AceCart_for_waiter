import React, { useEffect, useState } from 'react'
import useAxios from '../utils/useAxios'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const RecentOrder = () => {
    const [recent, setRecent] = useState([])
    const [items, setItems] = useState()
    const navigate = useNavigate()
    const api = useAxios()
    const getRecent = async () => {
        await api.get('/waiter/waiterorder').then((res) => {
            const data = res.data;
            const lastItem = data[data.length - 1];
            setRecent(lastItem)
            lastItem && api.get(`/store/orderitem/${lastItem.id}`).then((resp) => {
                setItems(resp.data)
            })

        })
    }

    const setUndo = () => {
        const orderNo = recent.id
        api.post(`/waiter/removeconfirm/${orderNo}`).then(() => {
            navigate(`/home/${recent.table_no}`)
        })
    }
    useEffect(() => {
        getRecent()
    }, [])
    return (
        <div style={{'marginTop':'80px'}}>
            <div className='goback'>
                <button className='back-order' onClick={() => { navigate(-1) }}>
                    <ArrowBackIcon />
                </button>
            </div>
            {recent ? 
            <div className='order order-new'>
            <div className="order-header " style={{'justifyContent':'space-between'}}>
                <h2>Order - {recent?.id}</h2>
                <button className='button-undo' onClick={setUndo}>Undo</button>
            </div>
            <table className="order-items" >
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {items?.map(item => (
                        <tr key={item.id}>
                            <td>{item.product_name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div> 
        :
        <h3 className='norecent'>No recently added Data found</h3>
        }
            
        </div>
    )
}

export default RecentOrder