import "./Schedule.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import ScheduleByMonth from "../admin/ScheduleByMonth";
import ScheduleByDate from "../admin/ScheduleByDate";
const THANG = 'THANG';
const NGAY = 'NGAY';

const Schedule = () => {
  const [tab, setTab] = useState(THANG);
  const [schedules, setSchedule]= useState([]);

  useEffect(() => {
    (async () => {
      await axios.get(`http://localhost:3000/api/schedules/currentmonth`)
        .then((res) => {
          console.log('Ok');
          const temp = res?.data;
          console.log(temp);
          setSchedule(temp.schedulesM);
        });
    })()
  },[])
  const rows = [
    {
      id: 1143155,
      product: "Acer Nitro 5",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 785,
      method: "Cash on Delivery",
      status: "Approved"
    },
    {
      id: 2235235,
      product: "Playstation 5",
      img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Michael Doe",
      date: "1 March",
      amount: 900,
      method: "Online Payment",
      status: "Pending"
    },
    {
      id: 2342353,
      product: "Redragon S101",
      img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 35,
      method: "Cash on Delivery",
      status: "Pending"
    },
    {
      id: 2357741,
      product: "Razer Blade 15",
      img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Jane Smith",
      date: "1 March",
      amount: 920,
      method: "Online",
      status: "Approved"
    },
    {
      id: 2342355,
      product: "ASUS ROG Strix",
      img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Harold Carol",
      date: "1 March",
      amount: 2000,
      method: "Online",
      status: "Pending"
    }
  ];
  return (
    <>
      <div className="row my-2">
        <div className="flex justify-center items-center">
          <button
            className="w-[250px] h-[50px] bg-red-700 border-r-[2px] border-black"
            onClick={() => setTab(THANG)}
          >
            <span className="text-white font-bold text-xl">
              Lịch hẹn theo tháng
            </span>
            {tab === THANG ? (
              <div className="bg-black h-2 mt-1 mb-[-10px]"></div>
            ) : null}
          </button>
          <button
            className="w-[250px] h-[50px] bg-red-700"
            onClick={() => setTab(NGAY)}
          >
            <span className="text-white font-bold text-xl">
              Lịch hẹn theo ngày
            </span>
            {tab === NGAY ? (
              <div className="bg-black h-2 mt-1 mb-[-10px]"></div>
            ) : (
             null
            )}
          </button>
        </div>
      </div>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">STT</TableCell>
              <TableCell className="tableCell">Nhân viên</TableCell>
              <TableCell className="tableCell">Khách hàng</TableCell>
              <TableCell className="tableCell">Số điện thoại</TableCell>
              <TableCell className="tableCell">Dịch vụ</TableCell>
              <TableCell className="tableCell">Ngày</TableCell>
              <TableCell className="tableCell">Thời gian</TableCell>
              <TableCell className="tableCell">Lịch gốc</TableCell>
              <TableCell className="tableCell">Trạng thái</TableCell>
              <TableCell className="tableCell">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          {tab === THANG ? <ScheduleByMonth /> : null}
          {tab === NGAY ? <ScheduleByDate /> : null}

          {/* <TableBody>
          {schedules.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{index + 1}</TableCell>
              <TableCell className="tableCell">
                {/* <div className="cellWrapper"> */}
          {/* <img src={row.img} alt="" className="image" /> */}
          {/* {row.idStaff.fullname}
                {/* </div> */}
          {/* </TableCell>
              <TableCell className="tableCell">
                {row.idCustomer.fullname}
              </TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.idService.title}</TableCell>
              <TableCell className="tableCell">{row.time}</TableCell>
              <TableCell className="tableCell">
                {row.status === "Hoàn thành" ? (
                  <span className="status Approved"> {row.status} </span>
                ) : (
                  <span className="status Pending"> {row.status} </span>
                )}
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>   */}
        </Table>
      </TableContainer>
    </>
  );
};

export default Schedule;
