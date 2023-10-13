import React, { useState } from "react";
import { useEffect } from "react";
import useAxios from "../utils/useAxios";

function ItemCard({ itemId, imgSrc, name, price, ratings, getdata,uniqueItems,params }) {
    const [myArray, setMyArray] = useState([])
    const [checkoutData,setCheckoutData] = useState()
    const api = useAxios()
    let getaddedData = async () => {
      let response = await api.get(`/waiter/checkout/${params}`)
      setCheckoutData(response.data)
    }
    useEffect(() => {
      getaddedData()
    },[uniqueItems])

    const dataAdd = async (itemId,price) => {
      const newArray = [...myArray];
      newArray[itemId] = true
      setMyArray(newArray);
        let found = checkoutData?.some((data) => data.product === itemId);
         if(!found) {
          const formdata = new FormData()
          formdata.append('product',itemId)
          formdata.append('price',price)
          formdata.append('quantity','1')
          formdata.append('product_name',name)
          const button = document.querySelector(".add-to-cart");
          button.disabled = true;
          api.post(`/waiter/takeorder/${params}`, formdata).then(() => {
            getaddedData()
            getdata()
            setTimeout(() => {
              button.disabled = false;
            },1000)
          })
         }   
    }

  return (
   
    <div className="card">
    <div className="card-image">
      <img src={imgSrc} alt={name} />
    </div>
    <div className="card-info">
      <h2>{name}</h2>
      <p>Rs. {price}</p>
    </div>
    <div className="card-action">
       <button className="add-to-cart" 
              onClick={() => dataAdd(itemId,price)}
        >
          {checkoutData?.some((data) => data.product === itemId) ? "Added" : "Add"}
    </button>
       </div>
  </div>
  );
}

export default ItemCard;
