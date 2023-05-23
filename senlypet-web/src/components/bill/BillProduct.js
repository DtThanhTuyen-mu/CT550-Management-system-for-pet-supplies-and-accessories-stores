import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import axios from "axios";
import { format } from "date-fns";
import VND from "../../components/currency";

const BillProduct = () => {
  const [billProducts, setbillProducts] = useState([]);

  useEffect(() => {
    (async () => {
      await axios
        .get(`http://localhost:3000/api/bill/product/currentMonth/confirm`)
        .then((res) => {
          console.log("Ok");
          const temp = res?.data.billProduct;
          console.log(temp);
          setbillProducts(temp);
        });
    })();
  }, []);

  const handlePrepare = async (id) => {
    await axios
      .post(`http://localhost:3000/api/bill/${id}/status=prepare`)
      .then((res) => {
        console.log("Success");
        window.location.reload();
      });
  };

  const handleDelivering = async (id) => {
    await axios
      .post(`http://localhost:3000/api/bill/${id}/status=delivering`)
      .then((res) => {
        console.log("Success");
        window.location.reload();
      });
  };

  const handleDelivered = async (id) => {
    await axios
      .post(`http://localhost:3000/api/bill/${id}/status=delivered`)
      .then((res) => {
        console.log("Success");
        window.location.reload();
      });
  };

  const handleCancel = async (id) => {
    await axios
      .post(`http://localhost:3000/api/bill/${id}/staff/status=confirmcancel`)
      .then((res) => {
        console.log("Success");
        window.location.reload();
      });
  };

  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
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
            <span className="text-lg"> Ngày đặt</span>
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
      </TableHead>
      <TableBody>
        {billProducts.map((row, index) => (
          <TableRow key={index}>
            <TableCell className="tableCell">
              <span className="text-[17px]">{index + 1}</span>
            </TableCell>
            <TableCell className="tableCell">
              <span className="text-[17px]">{row.codebill}</span>
            </TableCell>
            <TableCell className="tableCell">
              <span className="text-[17px]">{row.idCustomer.fullname}</span>
            </TableCell>
            <TableCell className="tableCell">
              <span className="text-[17px]">
                {format(new Date(row.date), "dd/MM/yyyy")}
              </span>
            </TableCell>
            <TableCell className="tableCell">
              <span className="text-[17px]">{VND.format(row.total)}</span>
            </TableCell>
            <TableCell className="tableCell">
              {row.check === -1 ? (
                <span className="text-[17px]">Đã huỷ</span>
              ) : null}
              {row.check === 0 ? (
                <span className="text-[17px]">Huỷ</span>
              ) : null}
              {row.check === 1 ? (
                <span className="text-[17px]">Đơn đã đặt</span>
              ) : null}
              {row.check === 2 ? (
                <span className="text-[17px]">Đang chuẩn bị</span>
              ) : null}
              {row.check === 3 ? (
                <span className="text-[17px]">Đang giao</span>
              ) : null}
              {row.check === 4 ? (
                <span className="text-[17px]">Đã giao</span>
              ) : null}
            </TableCell>
            <TableCell className="tableCell">
              {row.check === 0 ? (
                <>
                  <button
                    className="m-2 bg-green-700 h-9 rounded-2xl"
                    onClick={() => handleCancel(row._id)}
                  >
                    <span className="my-5 mx-3 text-lg text-white">
                      Xác nhận
                    </span>
                  </button>
                </>
              ) : null}
              {row.check === 1 ? (
                <>
                  <button
                    className="m-2 bg-green-700 h-9 rounded-2xl"
                    onClick={() => handlePrepare(row._id)}
                  >
                    <span className="my-5 mx-3 text-lg text-white">
                      Đang chuẩn bị hàng
                    </span>
                  </button>
                </>
              ) : null}
              {row.check === 2 ? (
                <>
                  <button
                    className="m-2 bg-green-700 h-9 rounded-2xl"
                    onClick={() => handleDelivering(row._id)}
                  >
                    <span className="my-5 mx-3 text-lg text-white">
                      Đang giao
                    </span>
                  </button>
                </>
              ) : null}
              {row.check === 3 ? (
                <>
                  <button
                    className="m-2 bg-green-700 h-9 rounded-2xl"
                    onClick={() => handleDelivered(row._id)}
                  >
                    <span className="my-5 mx-3 text-lg text-white">
                      Đã giao
                    </span>
                  </button>
                </>
              ) : null}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    
  );
};

export default BillProduct;
