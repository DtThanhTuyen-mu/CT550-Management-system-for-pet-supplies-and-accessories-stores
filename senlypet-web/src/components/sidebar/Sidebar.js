import React, { useContext, useEffect, useState } from "react";
import "./sidebar.scss";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import StoreIcon from "@mui/icons-material/Store";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import TodayIcon from "@mui/icons-material/Today";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [count, setCount] = useState(null);
  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/admin/login");
    //   const jsonToken = localStorage.getItem('tokenAdmin')
    //   console.log('json token: ', jsonToken);
    //   const json = localStorage.getItem('infoAdmin')
    //   const valuejson = JSON.parse(json);
    //   console.log('Json info; ', valuejson)
  };

  useEffect(() => {
    // localStorage.setItem("page", JSON.stringify(count));
    let jsonToken = localStorage.getItem("page");
    if (jsonToken === null) {
      jsonToken = 0;
    }
    setCount(jsonToken);
  }, []);

  const onTab = (tab) => {
    console.log("Tab: ", tab);
    localStorage.setItem("page", JSON.stringify(tab));
  };
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
          <span className="logo">Senlypet App </span>
        </Link>
      </div>
      <hr />

      <div className="center">
        <ul>

          <p className="title">MAIN</p>
          <Link
            to="/admin/dashboard"
            style={{ textDecoration: "none" }}
            onClick={() => onTab(0)}
          >
            {count === "0" || count === 0 ? (
              <li style={{ backgroundColor: "#ece8ff" }}>
                <DashboardIcon className="icon" />
                <span> Dashboard</span>
              </li>
            ) : (
              <li>
                <DashboardIcon className="icon" />
                <span> Dashboard</span>
              </li>
            )}
          </Link>

          <p className="title">Quản lý</p>
          <div onClick={() => onTab(1)}>
            <Link
              to="/admin/product"
              style={{
                textDecoration: "none"
              }}
            >
              {count === "1" ? (
                <li style={{ backgroundColor: "#ece8ff" }}>
                  <StoreIcon className="icon" />
                  <span> Sản phẩm</span>
                </li>
              ) : (
                <li>
                  <StoreIcon className="icon" />
                  <span> Sản phẩm</span>
                </li>
              )}
            </Link>
          </div>
          <Link
            to="/admin/service"
            style={{ textDecoration: "none" }}
            onClick={() => onTab(2)}
          >
            {count === "2" ? (
              <li style={{ backgroundColor: "#ece8ff" }}>
                <MiscellaneousServicesIcon className="icon"></MiscellaneousServicesIcon>
                <span> Dịch vụ</span>
              </li>
            ) : (
              <li>
                <MiscellaneousServicesIcon className="icon"></MiscellaneousServicesIcon>
                <span> Dịch vụ</span>
              </li>
            )}
          </Link>
          <Link
            to="/admin/schedule"
            style={{ textDecoration: "none" }}
            onClick={() => onTab(3)}
          >
            {count === "3" ? (
              <li style={{ backgroundColor: "#ece8ff" }}>
                <TodayIcon className="icon"></TodayIcon>
                <span> Lịch hẹn</span>
              </li>
            ) : (
              <li>
                <TodayIcon className="icon"></TodayIcon>
                <span> Lịch hẹn</span>
              </li>
            )}
          </Link>
          <Link
            to="/admin/bill"
            style={{ textDecoration: "none" }}
            onClick={() => onTab(4)}
          >
            {count === "4" ? (
              <li style={{ backgroundColor: "#ece8ff" }}>
                <CreditCardIcon className="icon" />
                <span> Đơn hàng</span>
              </li>
            ) : (
              <li>
                <CreditCardIcon className="icon" />
                <span> Đơn hàng</span>
              </li>
            )}
          </Link>
          <Link
            to="/admin/user"
            style={{ textDecoration: "none" }}
            onClick={() => onTab(5)}
          >
            {count === "5" ? (
              <li style={{ backgroundColor: "#ece8ff" }}>
                <PeopleAltOutlinedIcon className="icon" />
                <span> Nhân viên</span>
              </li>
            ) : (
              <li>
                <PeopleAltOutlinedIcon className="icon" />
                <span> Nhân viên</span>
              </li>
            )}
          </Link>
          <Link
            to="/admin/customer"
            style={{ textDecoration: "none" }}
            onClick={() => onTab(6)}
          >
            {count === "6" ? (
              <li style={{ backgroundColor: "#ece8ff" }}>
                <PersonOutlineOutlinedIcon className="icon" />
                <span> Khách hàng</span>
              </li>
            ) : (
              <li>
                <PersonOutlineOutlinedIcon className="icon" />
                <span> Khách hàng</span>
              </li>
            )}
          </Link>

          {/* <Link
            to="/admin/statistical"
            style={{ textDecoration: "none" }}
            onClick={() => onTab(7)}
          >
            {count === "7" ? (
              <li style={{ backgroundColor: "#ece8ff" }}>
                <ReceiptIcon className="icon" />
                <span> Thống kê</span>
              </li>
            ) : (
              <li>
                <ReceiptIcon className="icon" />
                <span> Thống kê</span>
              </li>
            )}
          </Link> */}

          <p className="title">USER</p>
          <div>
            <Link
              to="/admin/detailuser"
              style={{ textDecoration: "none" }}
              onClick={() => onTab(8)}
            >
              {count === "8" ? (
                <li style={{ backgroundColor: "#ece8ff" }}>
                  <AccountCircleOutlinedIcon className="icon" />
                  <span>Profile</span>
                </li>
              ) : (
                <li>
                  <AccountCircleOutlinedIcon className="icon" />
                  <span>Profile</span>
                </li>
              )}
            </Link>
          </div>
          <li onClick={logout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
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
