import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./StatisticalCus.scss";
import { useNavigate, useParams } from "react-router-dom";
import PieChartPro from '../../components/piechartCus/PieChartPro';
import PieChartSer from '../../components/piechartCus/PieChartSer';
function StatisticalCus() {
  const { id, name } = useParams();
  const [cpro, setcpro] = useState("thangtruoc");
  const [cser, setcser] = useState("thangtruoc");
  return (
    <div className="stacus">
      <Sidebar />
      <div className="stacusC">
        <Navbar />
        <div className="top">
          <div className="row">
            <span className="text-center text-2xl font-bold ">
              Khách hàng {name}
            </span>
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            <div className="title bg-orange-700 justify-center items-center ttext mb-2">
              <span className=" text-[20px] text-white ">
                Danh sách sản phẩm mua trong{" "}
                {cpro === "thangtruoc" ? "tháng trước" : "năm nay"}
              </span>
            </div>
            <div className="flex items-end justify-end ">
              <label className="text-black" htmlFor="selectCP">
                Lọc:{" "}
                <select
                  className="h-[30px] w-[150px] border-1 border-gray-400 text-black"
                  name="selectCP"
                  id="selectCP"
                  value={cpro}
                  onChange={(e) => setcpro(e.target.value)}
                >
                  <option value="thangtruoc">Tháng trước </option>
                  <option value="namnay">Năm nay </option>
                </select>
              </label>
            </div>
            {cpro === "thangtruoc" ? (
              <PieChartPro
                aspect={1.7 / 1}
                id={id}
                title="Số sản phẩm bán được trong tuần qua"
                type="1"
              />
            ) : (
              <PieChartPro
                aspect={1.7 / 1}
                id={id}
                title="Số sản phẩm bán được trong tuần qua"
                type="2"
              />
            )}
          </div>
          <div className="right">
            <div className="title bg-orange-700 justify-center items-center ttext mb-2">
              <span className=" text-[20px] text-white ">
                Danh sách dịch vụ mua trong{" "}
                {cser === "thangtruoc" ? "tháng trươc" : "năm nay"}
              </span>
            </div>
            <div className="flex items-end justify-end ">
              <label className="text-black" htmlFor="selectCP">
                Lọc:{" "}
                <select
                  className="h-[30px] w-[150px] border-1 border-gray-400 text-black"
                  name="selectCP"
                  id="selectCP"
                  value={cser}
                  onChange={(e) => setcser(e.target.value)}
                >
                  <option value="thangtruoc">Tháng trước </option>
                  <option value="namnay">Năm nay </option>
                </select>
              </label>
            </div>
            {cser === "thangtruoc" ? (
              <PieChartSer
                aspect={1.7 / 1}
                id={id}
                title="Số sản phẩm bán được trong tuần qua"
                type="1"
              />
            ) : (
              <PieChartSer
                aspect={1.7 / 1}
                id={id}
                title="Số sản phẩm bán được trong tuần qua"
                type="2"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticalCus;
