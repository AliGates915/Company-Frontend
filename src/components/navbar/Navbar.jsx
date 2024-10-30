/* eslint-disable react/react-in-jsx-scope */
import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext);
  console.log("Username", user)

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
         
          <div className="item">
            {user?user.username :(
              <p>Admin</p>
            )}
          </div>
          <div className="">
            <img
             src={user?.img ? user.img : "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
            alt="" className='mt-[1px] rounded-full w-11 h-11 object-cover'
            size={25}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
