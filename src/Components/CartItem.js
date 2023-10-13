import { AddRounded, RemoveRounded } from "@mui/icons-material";
import EditRounded from '@mui/icons-material/EditRounded';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxios from "../utils/useAxios";

function CartItem({ itemId, name, imgSrc, price, quantity, getdata, table }) {
  const [qty, setQty] = useState(quantity);
  const [itemPrice, setItemPrice] = useState(price);
  const api = useAxios()

  useEffect(() => {
    setItemPrice(parseInt(qty) * parseFloat(price))
  }, [qty]);

  const updateQty = (action, id) => {
    if (action == "add") {
      const formdata = new FormData()
      formdata.append('quantity',qty + 1)
      api.put(`/waiter/editwaiterorder/${id}`,formdata).then(() => {
        setQty(qty + 1);
        getdata()
      })
    } else {
      // initial state value is one so you need to check if 1 then remove it
      if (qty == 1) {
        api.delete(`/waiter/editwaiterorder/${id}`).then(() => {
          localStorage.removeItem(`description/${id}`)
          getdata()
        })
      } else {
        const formdata = new FormData()
      formdata.append('quantity',qty - 1)
      api.put(`/waiter/editwaiterorder/${id}`,formdata).then(() => {
        setQty(qty - 1);
        getdata()
      })
      }
    }
  };

  return (
    <div className="cartItem" id={itemId}>
      <div className="imgBox">
        <img src={'http://acecartapi.vipsnepal.com/'+imgSrc} alt="" />
      </div>
      <div className="itemSection">
        <h3 className="itemName">{name}</h3>
        <div className="itemQuantity">
          <span>x {qty}</span>
          <div className="quantity">
            <Link to={`/description/${qty}/${itemId}/${table}`}> <EditRounded className="des-icon " /> </Link>
            <RemoveRounded
              className="itemRemove"
              onClick={() => updateQty("remove", itemId)}
            />
            <AddRounded
              className="itemAdd"
              onClick={() => updateQty("add", itemId)}
            />
          </div>
        </div>
      </div>
      <p className="itemPrice">
        <span className="dolorSign">Rs.</span>{" "}
        <span className="itemPriceValue">{itemPrice}</span>
      </p>
    </div>
  );
}

export default CartItem;