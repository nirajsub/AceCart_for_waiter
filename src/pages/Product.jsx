import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStateValue } from "../Components/StateProvider";
import { actionType } from "../Components/reducer";
import { AddRounded, Check } from "@mui/icons-material";

const Product = () => {
  const params = useParams();
  const baseURL = "http://127.0.0.1:8000";
  const [productData, setProductData] = useState();
  const [addedToCart, setAddedToCart] = useState({});
  const [, dispatch] = useStateValue();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      const response = await axios.get(`${baseURL}/waiter/products/${params.id}`);
      if (response.status === 200) {
        console.log(response.data);
        setProductData(response.data);
      }
    };
    fetchProductData();
  }, [params.id]);

  const handleAddToCart = async (product) => {
    if (!addedToCart[product.id]) {
      setButtonDisabled(true);
      const formdata = new FormData();
      formdata.append("product", product.id);
      formdata.append("price", product.price);
      formdata.append("quantity", "1");
      formdata.append("product_name", product.name);
      await axios.post(`${baseURL}/waiter/takeorder/${params.id}`, formdata);
      console.log("posted");
      setAddedToCart({ ...addedToCart, [product.id]: true });
      dispatch({
        type: actionType.ADD_TO_CART,
        item: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.imgSrc,
        },
      });
      setTimeout(() => {
        setButtonDisabled(false);
      }, 1000);
    }
  };

  return (
    <div className="category-products">
      <table>
        <tbody>
          {productData?.length > 0 && productData.map((product) => (
            <tr key={product.id}>
              <td><img src={
                "https://www.foodandwine.com/thmb/6wTm7a0y87X97LK-ZMxe2787kI8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/different-types-of-tea-FT-BLOG0621-7c7fd231e66d4fea8ca9a47cad52ba79.jpg"
              }alt={product.name} /></td>
              <td> <h3 className="itemName">{product.name}</h3></td>
              <td>Rs. {product.price}</td>
              <td>
                {addedToCart[product.id] ? ( // render the tick icon if item has been added to cart
                 <i className="addToCart"><Check /></i> 
                ) : (
                  <i className="addToCart" onClick={() => handleAddToCart(product)}>
                    <AddRounded /> 
                  </i>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
