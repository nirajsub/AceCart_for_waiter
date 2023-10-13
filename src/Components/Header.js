import {
  BarChart,
  SearchRounded,
  ShoppingCartRounded,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";

function Header({getSearch}) {
  const [search, setSearch] = useState('')

  const cartClick = () =>{
    document.getElementsByClassName("rightMenu")[0].classList.toggle("active");
  }
  

  useEffect(() => {
    getSearch(search)
  },[search])

  return (
    <header>


      <div className="inputBox">
        <SearchRounded className="searchIcon" />
        <input type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value.toUpperCase())} />
      </div>

      <div className="toggleMenu" onClick={cartClick} >
        <ShoppingCartRounded className="toggleIcon" />
      </div>
    </header>
  );
}

export default Header;
