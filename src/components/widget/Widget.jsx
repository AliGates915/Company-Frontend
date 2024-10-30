/* eslint-disable react/react-in-jsx-scope */
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Widget = ({ type }) => {
  const [dataCount, setDataCount] = useState(0);
  let data;

  // Fetch data based on type
  useEffect(() => {
    const fetchData = async () => {
      let response;
      try {
        switch (type) {
          case "user":
            response = await fetch("/api/users");
            break;
          case "hotels":
            response = await fetch("/api/hotels");
            break;
          case "rooms":
            response = await fetch("/api/rooms");
            break;
          default:
            return;
        }
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const result = await response.json();
        setDataCount(result.length);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [type]);

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        link: "See all users",
        route: "/users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "hotels":
      data = {
        title: "HOTELS",
        link: "View all hotels",
        route: "/hotels",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "rooms":
      data = {
        title: "ROOMS",
        link: "View all rooms",
        route: "/rooms",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(0, 128, 0, 0.2)",
              color: "green",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data?.title}</span>
        <span className="counter">{dataCount}</span>
        <Link to={data?.route}>
          <span className="link">{data?.link}</span>
        </Link>
      </div>
      <div className="right">{data?.icon}</div>
    </div>
  );
};

export default Widget;
