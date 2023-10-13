import { ChevronRightRounded } from "@mui/icons-material";
import React from "react";
import { Link } from 'react-router-dom'

function SubMenuContainer() {
  return (
    <div className="subMenuContianer">
      <h3>Menu Category</h3>
      {/* <div className="viewAll">
        <p>View All</p>
        <Link to="/category"><i>
          <ChevronRightRounded /></i>
          </Link>
      </div> */}
    </div>
  );
}

export default SubMenuContainer;
