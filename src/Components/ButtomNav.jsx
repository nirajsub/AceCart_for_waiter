import React, { useEffect, useState } from 'react'
import MenuContainer from './MenuContainer'
import {
    HomeRounded,
    Notifications,
    TableBarRounded,
  } from "@mui/icons-material"
import { useParams } from 'react-router-dom'
import useAxios from '../utils/useAxios'

const ButtomNav = () => {
  const params = useParams()
  const api = useAxios()
  const [orders, setOrders] = useState()
  const getOrders = async () => {
    const response = await api.get('/waiter/orders')
    setOrders(response.data)
  }
  console.log(orders?.length)
  useEffect(() => {
    getOrders()
  },[])
  return (
    <div className="leftMenu">
        <ul id="menu">
          <MenuContainer className= 'icon-nav' link= {'/'} icon = {<TableBarRounded />} />
          <MenuContainer className= 'icon-nav' link = {'/home/'+params.id} icon = {<HomeRounded />}  isHome/>
          <MenuContainer  className= 'icon-nav' value={orders?.length ? orders?.length : ""}  link = {'/orders'} icon = {<Notifications />}  />
          <div className="indicator"></div>
        </ul>
      </div>
  )
}

export default ButtomNav