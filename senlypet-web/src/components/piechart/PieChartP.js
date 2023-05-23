import React, { PureComponent, useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Legend,
  Cell,
  Tooltip ,
  ResponsiveContainer,
} from "recharts";


import './PieChartP.scss';
import axios from "axios";
const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 }
];
const data02 = [
  
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
  { name: "Group D", value: 9800 },
  { name: "Group E", value: 3908 },
  { name: "Group F", value: 4800 }
];

function PieChartP({ aspect, title , type}) {
  const [datapie, setDataPie] = useState([]);
  const [datapieM, setDataPieM] = useState([]);
  useEffect(() => {
    (async () => {
      await axios
        .get("http://localhost:3000/api/bill/count/product/groupbyweek")
        .then((res) => {
          const temp = res?.data.arrTP;
          console.log("data pie:", temp);
          setDataPie(temp);
        });
    })();
    (async () => {
      await axios
        .get("http://localhost:3000/api/bill/count/product/groupbymonthed")
        .then((res) => {
          const temp = res?.data.arrCPM;
          console.log("data pie:", temp);
          setDataPieM(temp);
        });
    })();
  },[])
  return (
    <>
    { type === "1" ? 
    <div className="piepiechart ">
      {/* <div className="title bg-orange-700 justify-center items-center"><span className="justify-center items-center pl-32 text-[20px]" > {title}</span></div> */}
      <ResponsiveContainer
        width="100%"
        aspect={aspect}
        // style={{marginLeft: -10}}
       // height="100%"
      >
        {/*  <PieChart width={400} height={400}>
          {/* <Pie
            data={data01}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#8884d8"
          /> */}
        {/* <Pie
            data={data02}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            fill="#82ca9d"
            label
          /> */}
        {/* </PieChart> */}
        <PieChart width={100} height={100}
          className="mt-[-27px]"
        >
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={datapie}
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
    :
    <div className="piepiechart ">
      {/* <div className="title bg-orange-700 justify-center items-center"><span className="justify-center items-center pl-32 text-[20px]" > {title}</span></div> */}
      <ResponsiveContainer
        width="100%"
        aspect={aspect}
        // style={{marginLeft: -10}}
       // height="100%"
      >
        {/*  <PieChart width={400} height={400}>
          {/* <Pie
            data={data01}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#8884d8"
          /> */}
        {/* <Pie
            data={data02}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            fill="#82ca9d"
            label
          /> */}
        {/* </PieChart> */}
        <PieChart width={100} height={100}
          className="mt-[-27px]"
        >
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={datapieM}
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
    }
    </>
  );
}

export default PieChartP;
