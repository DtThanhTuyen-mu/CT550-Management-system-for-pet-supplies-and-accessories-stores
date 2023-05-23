import React, { useState } from 'react'
import './Bill.scss'
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import BillProduct from '../../components/bill/BillProduct';
import BillService from '../../components/bill/BillService';
const SAN_PHAM = "SAN_PHAM";
const DICH_VU = "DICH_VU";
const Bill = () => {
  const [tab, setTab] = useState(SAN_PHAM);

  return (
    <div className="bill">
      <Sidebar />
      <div className="billContainer">
        <Navbar />
        <div className="mx-2">
          <div className="row my-2">
            <div className="flex justify-center items-center">
              <button
                className="w-[250px] h-[50px] bg-red-700 border-r-[2px] border-black"
                onClick={() => setTab(SAN_PHAM)}
              >
                <span className="text-white font-bold text-xl">Sản phẩm</span>
                {tab === SAN_PHAM ? (
                  <div className="bg-black h-2 mt-1 mb-[-10px]"></div>
                ) : null}
              </button>
              <button
                className="w-[250px] h-[50px] bg-red-700"
                onClick={() => setTab(DICH_VU)}
              >
                <span className="text-white font-bold text-xl">Dịch vụ</span>
                {tab === DICH_VU ? (
                  <div className="bg-black h-2 mt-1 mb-[-10px]"></div>
                ) : null}
              </button>
            </div>
          </div>
          <TableContainer component={Paper} className="table">
            {/* <Table sx={{ minWidth: 650 }} aria-label="simple table"> */}
              {/* <TableHead>
                <TableRow>
                  <TableCell className="tableCell">
                    <span className="text-lg"> STT</span>
                  </TableCell>
                  <TableCell className="tableCell">
                    <span className="text-lg"> Mã đơn hàng</span>
                  </TableCell>
                  <TableCell className="tableCell">
                    <span className="text-lg"> Khách hàng</span>
                  </TableCell>
                  <TableCell className="tableCell">
                    <span className="text-lg"> Số tiền</span>
                  </TableCell>
                  <TableCell className="tableCell">
                    <span className="text-lg">Trạng thái</span>
                  </TableCell>
                  <TableCell className="tableCell">
                    <span className="text-lg">Thao tác</span>
                  </TableCell>
                </TableRow>
              </TableHead> */}
              {tab === SAN_PHAM ? <BillProduct /> : null}
              {tab === DICH_VU ? <BillService /> : null}

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
            {/* </Table> */}
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default Bill
