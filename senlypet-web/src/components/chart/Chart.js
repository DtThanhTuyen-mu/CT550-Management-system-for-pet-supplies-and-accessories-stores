import { useEffect, useState } from "react";
import "./Chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import axios from "axios";

const Chart = ({ aspect, title }) => {
  const [week, setWeek] = useState([]);

  useEffect(() => {
    (async () => {
      await axios
        .get("http://localhost:3000/api/bill/count/service/gbweek/chart")
        .then((res) => {
          const temp = res?.data.arr;
          console.log("data area:", temp);
          setWeek(temp);
        });
    })();
  }, []);
  
  return (
    <div className="chart">
      <div className="title bg-orange-700 justify-center items-center ttext mt-2">
        <span className=" text-[20px] text-white ">{title}</span>
      </div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={week}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Số lượng"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
