import React, { useEffect, useState } from "react";
import { useStateValue } from "../Components/StateProvider";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import MenuCard from "../Components/MenuCard";
import ItemCard from "../Components/ItemCard";
import SubMenuContainer from "../Components/SubMenuContainer";
import CartItem from "../Components/CartItem";
import useAxios from "../utils/useAxios";
import Header from "../Components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const params = useParams();
  const [categoryData, setCategoryData] = useState([]);
  const [product, setProduct] = useState();
  const [isMainData, setMainData] = useState([]);
  const [addedData, setAddedData] = useState([]);
  const [orderId, setOrderId] = useState([]);
  const [noti, setNoti] = useState([]);
  const api = useAxios();

  const find = (data) => {
    return data.filter((item) => item.name.toUpperCase().includes(search));
  };

  let getNotes = async () => {
    let response = await api.get("/store/category");
    if (response.status === 200) {
      setCategoryData(response.data);
    }
  };

  const getNoti = async (ItemId) => {
    try {
      const response = await api.get("/waiter/order_notification");
      const notifications = response.data;
      setNoti(notifications);

      notifications.forEach((notification) => {
        toast.info(
          `${notification.quantity} ${notification.product_name} at Table ${notification.table_no.table_no} is ready`,
          {
            autoClose: false,
            onClose: () => {
              api.put(`/waiter/order_viewed/${ItemId}`);
            },
          }
        );
      });
    } catch (error) {
      console.error("Error fetching notifications: ", error);
    }
  };

  let getProduct = async () => {
    let response = await api.get("/store/product");
    if (response.status === 200) {
      setProduct(response.data);
      setMainData(response.data);
    }
  };

  let createOrder = async () => {
    let responses = await api.get(`/waiter/takeorder/${params.id}`);
    if (responses.status === 200) {
      setOrderId(responses.data);
    }
  };

  let getaddedData = async () => {
    let response = await api.get(`/waiter/checkout/${params.id}`);
    if (response.status === 200) {
      setAddedData(response.data);
      setUniqueItems(
        response.data.filter((item) => {
          if (repetitiveIds[item.product]) {
            return false;
          } else {
            repetitiveIds[item.product] = true;
            return true;
          }
        })
      );
    }
  };

  const totalPrice = addedData.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);

  const repetitiveIds = {};
  const [uniqueItems, setUniqueItems] = useState();

  useEffect(() => {
    const menuLi = document?.querySelectorAll("#menu li");

    const setMenuActive = (event) => {
      menuLi.forEach((n) => n.classList.remove("active"));
      event.target.classList.add("active");
    };

    menuLi.forEach((n) => n.addEventListener("click", setMenuActive));

    // menu Card active class changer
    const menuCard = document
      ?.querySelector(".rowContainer")
      ?.querySelectorAll(".rowMenuCard");

    const setMenuCardActive = (event) => {
      menuCard.forEach((n) => n.classList.remove("active"));
      event.target.classList.add("active");
    };

    menuCard?.forEach((n) => n.addEventListener("click", setMenuCardActive));
  }, [isMainData]);

  const setData = (itemId) => {
    if (itemId == 0) {
      setMainData(product);
      return;
    }
    setMainData(product.filter((element) => element.category == itemId));
  };

  useEffect(() => {
    // const toggleIcon = document.querySelector(".toggleMenu");
    // toggleIcon.addEventListener("click", () => {
    //   document.querySelector(".rightMenu").classList.toggle("active");
    // });
    createOrder();
    getNotes();
    getProduct();
    getNoti();
  }, []);

  useEffect(() => {
    getaddedData();
  }, []);

  const [search, setSearch] = useState("");
  const getSearch = (name) => {
    setSearch(name);
  };

  return (
    <>
      <Header getSearch={getSearch} />
      <main>
        {search ? (
          <div className="mainContainer">
            <div className="dishContainer">
              <div className="dishItemContainer">
                {product &&
                  find(product).map((data) => (
                    <ItemCard
                      key={data.id}
                      itemId={data.id}
                      imgSrc={"http://acecartapi.vipsnepal.com/" + data.image}
                      name={data.name}
                      price={data.price}
                      getdata={() => getaddedData()}
                      uniqueItems={uniqueItems}
                      params={params.id}
                    />
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mainContainer">
            <div className="dishContainer">
              <div className="menuCard">
                <SubMenuContainer />
              </div>

              <div className="rowContainer">
                <div onClick={() => setData("0")}>
                  <MenuCard
                    imgSrc="https://th.bing.com/th/id/OIP.hQXg8ypkW6aXZsGVidJ4KgHaE8?w=224&h=180&c=7&r=0&o=5&pid=1.7"
                    name="All"
                    isActive
                  />
                </div>
                {categoryData &&
                  categoryData.map((data) => (
                    <div key={data.id} onClick={() => setData(data.id)}>
                      <MenuCard
                        imgSrc={"http://acecartapi.vipsnepal.com/" + data.image}
                        name={data.name}
                        // isActive={data.id == "1" ? true : false}
                      />
                    </div>
                  ))}
              </div>
              <div className="dishItemContainer">
                {isMainData &&
                  isMainData?.map((data) => (
                    <ItemCard
                      key={data.id}
                      itemId={data.id}
                      imgSrc={"http://acecartapi.vipsnepal.com/" + data.image}
                      name={data.name}
                      price={data.price}
                      getdata={() => getaddedData()}
                      uniqueItems={uniqueItems}
                      params={params.id}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}

        <div className="rightMenu">
          {!addedData ? (
            <div className="addSomeItem">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/food-delivery-37c59.appspot.com/o/Images%2FemptyCart.png?alt=media&token=50b733d4-cdd9-4025-bffe-8efa4066ca24"
                alt=""
                className="emptyCart"
              />
            </div>
          ) : (
            <div className="cartCheckOutContianer">
              <div className="cartContainer">
                <h3>Items In Cart</h3>
                <div className="cartItems">
                  {addedData &&
                    uniqueItems?.map((data) => (
                      <CartItem
                        key={data.id}
                        itemId={data.id}
                        name={data.product_name}
                        quantity={data.quantity}
                        imgSrc={
                          product?.filter(
                            (element) => element.id == data.product
                          )[0]?.image
                        }
                        qty={"4"}
                        price={data.price}
                        getdata={() => getaddedData()}
                        table={params.id}
                      />
                    ))}
                </div>
              </div>
              <div className="totalSection">
                <h3>Total</h3>
                <p>
                  <span>Rs. </span> {totalPrice}
                </p>
              </div>

              <Link to={"/checkout/" + params.id}>
                <button className="button-order " type="submit">
                  Order Summarys
                </button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <ToastContainer />
      <ToastContainer />
    </>
  );
};

export default Home;
