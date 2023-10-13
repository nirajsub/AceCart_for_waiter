import React from "react";
import { Link } from 'react-router-dom'

function MenuContainer({ link, icon, isHome, value }) {
  return (
    <li className={isHome ? `active` : ``}>
      {value && 
      <div className="absolute bg-red-600 p-1 h-[25px] w-[25px] flex justify-center font-medium ml-8 text-center text-white rounded-full "><span className="relative bottom-[0.8px]">{value}</span></div>
}
      <Link to={link}>
        <span className="icon">{icon}</span>
      </Link>
    </li>
  );
}

export default MenuContainer;
