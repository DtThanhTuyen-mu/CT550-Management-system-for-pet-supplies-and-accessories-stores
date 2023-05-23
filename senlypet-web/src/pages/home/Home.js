import React,{useState} from "react";
import "./Home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Schedule from '../../components/schedule/Schedule';

import PieChartP from "../../components/piechart/PieChartP";
import BarChartS from "../../components/barchart/BarChartS";
import Chart from "../../components/chart/Chart";

const Home = () => {
  const [lToken, setlToken] = useState("");
  const jsonToken = localStorage.getItem('tokenAdmin')
  
    // console.log('json token: ', lToken);
    // console.log('json token: ', jsonToken);
    const json = localStorage.getItem('infoAdmin')
    const valuejson = JSON.parse(json);
    // console.log('Json info; ', valuejson)
 const [bar, setBar] = useState("3thangqua");
 const [cicle, setCicle] = useState("tuanqua");

  return (
    <div className="home">
      <Sidebar />
      <div className="homecontainer">
        <Navbar />
        <div className="row px-4 py-2">
          <div className="col-md-4 my-3">
            <Widget type="Product" />
          </div>
          <div className="col-md-4 my-3">
            <Widget type="Service" />
          </div>

          <div className="col-md-4 my-3">
            <Widget type="Order Product" />
          </div>
          <div className="col-md-4 my-3">
            <Widget type="Order Service" />
          </div>
          <div className="col-md-4 my-3">
            <Widget type="Total" />
          </div>
          <div className="col-md-4 my-3">
            <Widget type="Banlan" />
          </div>
        </div>
        <div className="top">
          <div className="left">
            <div className="title bg-orange-700 justify-center items-center ttext">
              <span className=" text-[20px] text-white ">
                Số sản phẩm bán được trong{" "}
                {cicle === "tuanqua" ? "tuần trước" : "tháng trước"}
              </span>
            </div>
            <div className="flex items-end justify-end mb-3">
              <label className="text-white" htmlFor="selectCP">
                Lọc:
                <select
                  className="h-[30px] w-[150px] border-1 border-gray-400 text-black"
                  name="selectCP"
                  id="selectCP"
                  value={cicle}
                  onChange={(e) => setCicle(e.target.value)}
                >
                  <option value="tuanqua">Tuần trước </option>
                  <option value="thangroi">Tháng trước </option>
                </select>
              </label>
            </div>
            {cicle === "tuanqua" ? (
              <PieChartP
                aspect={1.5 / 1}
                title="Số sản phẩm bán được trong tuần qua"
                type="1"
              />
            ) : (
              <PieChartP
                aspect={1.5 / 1}
                title="Số sản phẩm bán được trong tuần qua"
                type="2"
              />
            )}
          </div>
          <div className="right">
            <Chart aspect={2 / 1} title="Tổng số lịch hẹn trong tuần trước" />
            {/* <Chart aspect={3/ 1} title="User Spending ( Last 6 Months)" /> */}
          </div>
        </div>
        <div className="bottom bg-blue-800">
          <div className="title bg-orange-700 justify-center items-center ttext">
            <span className=" text-[20px] text-white ">
              Doanh thu lợi nhuận theo{" "}
              {bar === "3thangqua" ? "3 tháng qua" : "năm nay"}
            </span>
          </div>
          {/* <span className="flex items-end justify-end">Loc</span> */}
          <div className="flex items-end justify-end mb-3">
            <label className="text-white" htmlFor="selectPF">
              Lọc:{" "}
              <select
                className="h-[30px] w-[150px] border-1 border-gray-400 text-black"
                name="selectPF"
                id="selectPF"
                value={bar}
                onChange={(e) => setBar(e.target.value)}
              >
                <option value="3thangqua">3 tháng qua </option>
                <option value="namnay">Năm nay </option>
              </select>
            </label>
          </div>
          {bar === "3thangqua" ? (
            <BarChartS aspect={3 / 1} title="Theo 3 tháng trước" type="1" />
          ) : (
            <BarChartS aspect={3 / 1} title="Trong năm nay" type="2" />
          )}
          {/* <Chart aspect={2 / 1} title="User Spending ( Last 6 Months)" /> */}
          {/* <PieChartP aspect={1.5 / 1} title="Số sản phẩm bán được theo tuần" /> */}
        </div>
        {/* <Schedule /> */}
      </div>
    </div>
  );
};

export default Home;
