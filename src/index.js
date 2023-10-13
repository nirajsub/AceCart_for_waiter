import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import './App.css'
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CheckOut from "./pages/CheckOut";
import Kitchen from "./pages/Kitchen";
import Login from "./pages/Login";
import Description from './pages/Description'
import { AuthProvider } from "./context/AuthContext";
import Profile from "./pages/Profile";
import Order from "./pages/Order";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Logout from "./Components/Logout";
import RecentOrder from "./pages/RecentOrder";


ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
    <AuthProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/orders' element={<Order />} />
          <Route path='/recentorder' element={<RecentOrder />} />
          <Route path='/home/:id/*' element={<App />} />
          <Route path='description/:quan/:ids/:table' element={<Description />} />
          {/* <Route path='/*' element={<App />} /> */}
          <Route path='/category' element={<Category />} />
          <Route path='/products/:id' element={<Product />} />
          <Route path='/checkout/:id' element={<CheckOut />} />
          <Route path='/kitchen' element={<Kitchen />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/logout' element={<Logout />} />

        </Routes>
    </AuthProvider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
