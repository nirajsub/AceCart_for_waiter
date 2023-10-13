import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Category = () => {
  const baseURL = "http://127.0.0.1:8000";
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      const response = await axios.get(`${baseURL}/store/category`);
      if (response.status === 200) {
        setCategoryData(response.data);
      }
    };
    fetchCategoryData();
  }, []);

  return (
    <div>
      <h3 className="category-header"><span className="border-category"> List of All Category</span></h3>
    <div className="category-container">
      {categoryData.map((category) => (
        <div key={category.id} className="category-card">
          <Link to={`/products/${category.id}`}>
            <img src={
                "https://www.foodandwine.com/thmb/6wTm7a0y87X97LK-ZMxe2787kI8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/different-types-of-tea-FT-BLOG0621-7c7fd231e66d4fea8ca9a47cad52ba79.jpg"
              }  alt={category.name} />
            <h3>{category.name}</h3>
          </Link>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Category;
