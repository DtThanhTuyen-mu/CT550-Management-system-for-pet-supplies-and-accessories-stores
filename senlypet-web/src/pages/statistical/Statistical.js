import React, { useState } from 'react'
import './Statistical.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
// import Chart from "../../components/chart/Chart";
import PieChartP from '../../components/piechart/PieChartP';
import BarChartS from '../../components/barchart/BarChartS';
import Chart from '../../components/chart/Chart';

const Statistical = () => {
  const [bar, setBar] = useState("3thangqua");
  const [cicle, setCicle] = useState("tuanqua");

  return (
    <div className="statistical">
      <Sidebar />
      <div className="statisticalContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="title bg-orange-700 justify-center items-center ttext">
              <span className=" text-[20px] text-white ">
                Số sản phẩm bán được trong {cicle === "tuanqua" ? "tuần trước" : "tháng trước"}
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
                aspect={1.7 / 1}
                title="Số sản phẩm bán được trong tuần qua"
                type="1"
              />
            ) : (
              <PieChartP
                aspect={1.7 / 1}
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
              Doanh thu lợi nhuận theo {bar === "3thangqua" ? "3 tháng qua" : "năm nay"}
            </span>
          </div>
          {/* <span className="flex items-end justify-end">Loc</span> */}
          <div className="flex items-end justify-end mb-3">
            <label className="text-white" htmlFor="selectPF">
              Lọc: {" "}
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
        
      </div>
    </div>
  );
}

export default Statistical

