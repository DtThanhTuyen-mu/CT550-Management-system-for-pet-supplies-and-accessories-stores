import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Legend,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function PieChartSer({ aspect, id, type }) {
  const [dataM, setDataM] = useState([]);
  const [dataY, setDataY] = useState([]);
  useEffect(() => {
    (async () => {
      await axios
        .get(
          "http://localhost:3000/api/bill/count/customer=" +
            id +
            "/service/gbbyear"
        )
        .then((res) => {
          const temp = res?.data.arrCCPY;
          console.log("temp3 : ", temp);
          setDataY(temp);
        });
    })();
    (async () => {
      await axios
        .get(
          "http://localhost:3000/api/bill/count/customer=" +
            id +
            "/service/gbbm"
        )
        .then((res) => {
          const temp = res?.data.arrCCPM;
          console.log("temp4 : ", temp);
          setDataM(temp);
        });
    })();
  }, []);
  return (
    <>
      {type === "1" ? (
        <div className="piepiechart ">
          {/* <div className="title bg-orange-700 justify-center items-center"><span className="justify-center items-center pl-32 text-[20px]" > {title}</span></div> */}
          <ResponsiveContainer
            width="100%"
            aspect={aspect}
            // style={{marginLeft: -10}}
            // height="100%"
          >
            {/* </PieChart> */}
            <PieChart width={100} height={100} className="mt-[-10px]">
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={dataM}
                cx={200}
                cy={200}
                outerRadius={80}
                // fill="#8884d8"
                fill="#82ca9d"
                label
              />

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="piepiechart ">
          <ResponsiveContainer
            width="100%"
            aspect={aspect}
            // style={{marginLeft: -10}}
            // height="100%"
          >
            {/* </PieChart> */}
            <PieChart width={100} height={100} className="mt-[-10px]">
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={dataY}
                cx={200}
                cy={200}
                outerRadius={80}
                // fill="#8884d8"
                fill="#82ca9d"
                label
              />
              {/* <Pie
            dataKey="value"
            data={data02}
            cx={500}
            cy={200}
            innerRadius={40}
            outerRadius={80}
            fill="#82ca9d"
            label
          /> */}
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
}

export default PieChartSer;
