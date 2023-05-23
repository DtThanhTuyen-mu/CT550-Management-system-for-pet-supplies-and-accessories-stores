import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import './BarChartS.scss';

function BarChartS({ aspect, title , type }) {
  const [dataB, setDataB] = useState([]);
  const [dataB1, setDataB1] = useState([]);

  useEffect(() => {
    (async () => {
      await axios.get('http://localhost:3000/api/bill/profit/groupby3w').then(res => {
        const temp = res?.data.arrT;
        console.log('data barchart: ', temp);
        setDataB(temp);
      })
    } )();
  }, []);

  useEffect(() => {
    (async () => {
      await axios
        .get("http://localhost:3000/api/bill/profit/gb/currentyear")
        .then((res) => {
          const temp = res?.data.arrPt;
          console.log("data barchart1: ", temp);
          setDataB1(temp);
        });
    } )();
  }, []);
  
  return (
    <>
    {type === "1" ? (
    <div className="barchart bg-white">
      <ResponsiveContainer width="100%" aspect={aspect}>
        <BarChart
          width={500}
          height={300}
          data={dataB}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Tháng" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Doanh thu" fill="#8884d8" />
          <Bar dataKey="Lợi nhuận" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    
      ) : (
    <div className="barchart bg-white">
     <ResponsiveContainer width="100%" aspect={aspect}>
        <BarChart
          width={500}
          height={300}
          data={dataB1}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Tháng" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Doanh thu" fill="#8884d8" />
          <Bar dataKey="Lợi nhuận" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
         
      )}
    </>
  );
}

export default BarChartS;
