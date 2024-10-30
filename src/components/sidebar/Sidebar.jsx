/* eslint-disable react/react-in-jsx-scope */ 
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">AdminBoard</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/hotels" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Hotels</span>
            </li>
          </Link>
          <Link to="/rooms" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Rooms</span>
            </li>
          </Link>
          
          <p className="title">SERVICE</p>
          <Link to="/info" style={{ textDecoration: "none" }}>
          <li>
            <InsertChartIcon className="icon" />
            <span>Company Info</span>
          </li>
          </Link>
          <Link to="/head" style={{ textDecoration: "none" }}>
          <li>
            <InsertChartIcon className="icon" />
            <span>Main Heads</span>
          </li>
          </Link>
          
          <Link to="/sub-head" style={{ textDecoration: "none" }}>
          <li>
            <InsertChartIcon className="icon" />
            <span>Account Sub Head
            </span>
          </li>
          </Link>
          <Link to="/account-head" style={{ textDecoration: "none" }}>
          <li>
            <InsertChartIcon className="icon" />
            <span>Account Heads </span>
          </li>
          </Link>
          <Link to="/item-balance" style={{ textDecoration: "none" }}>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Item Opening Balance</span>
          </li>
          </Link>
          <Link to="/voucher" style={{ textDecoration: "none" }}>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Journal Voucher</span>
          </li>
          </Link>
          <Link to="/customize-package" style={{ textDecoration: "none" }}>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Customize Package</span>
          </li>
          </Link>
          <p className="title">FLIGHT</p>
          
          <Link to='/book-flight' style={{ textDecoration: "none" }}>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>Book Flight</span>
          </li>
          </Link>
          
          <p className="title">Amount Information</p>
          <Link to='/receivable-info' style={{ textDecoration: "none" }}>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Amount Receivable</span>
          </li>
          </Link>
          <Link to='/payable-info' style={{ textDecoration: "none" }}>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Amount Payable</span>
          </li>
          </Link>
          <Link to='/ledger'style={{ textDecoration: "none" }}>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Customer Ledger</span>
          </li>
          </Link>
          <Link to='/voucher'style={{ textDecoration: "none" }}>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Purchaser Voucher</span>
          </li>
          </Link>
          <Link to='/login'style={{ textDecoration: "none" }}>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;