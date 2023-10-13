import { AddRounded, Favorite,FavoriteBorder, StarRounded } from "@mui/icons-material";
import React, { useState } from "react";
import { actionType } from "../Components/reducer";
import { useStateValue } from "../Components/StateProvider";
import { Items } from "../Components/Data";
import { useEffect } from "react";

let cartData = [];

function Special() {
  const [{}, dispatch] = useStateValue();
  const [isCart, setCart] = useState(null);
  useEffect(() => {
    if (isCart) {
      cartData.push(isCart);
      dispatch({
        type: actionType.SET_CART,
        cart: cartData,
      });
    }
  }, [isCart]);



  return (

    <div className="offer">
        {
            Items.map((menu) => (
                <div className="itemCard">

                <div className="imgBox">
                  <img src={menu.imgSrc} alt="" className="itemImg" />
                </div>
          
                <div className="itemContent">
                  <h3 className="itemName">{menu.name}</h3>
                  <div className="bottom">
                    <div className="ratings">
                      <h3 className="price">
                        <span>Rs </span>
                        {menu.price}
                      </h3>
                    </div>
                    <i className="addToCart">
                      <AddRounded />
                    </i>
                  </div>
                </div>
              </div> 
            ))
        }
   

    </div>
  );
}

export default Special;
