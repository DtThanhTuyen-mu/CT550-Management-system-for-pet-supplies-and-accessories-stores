import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { format } from "date-fns";
import VND from "../../components/currency";

const BillService = () => {

  const [billServices, setBillServices] = useState([]);

  useEffect(() => {
    (async () => {
      await axios
        .get(`http://localhost:3000/api/bill/service/currentMonth/confirm`)
        .then((res) => {
          console.log("Ok");
          const temp = res?.data.billService;
          console.log(temp);
          setBillServices(temp);
        });
    })();
  }, []);

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
            <span className="text-lg"> Nhân viên</span>
          </TableCell>
          <TableCell className="tableCell">
            <span className="text-lg">Tên dịch vụ</span>
          </TableCell>
          <TableCell className="tableCell">
            <span className="text-lg"> Ngày</span>
          </TableCell>
          <TableCell className="tableCell">
            <span className="text-lg"> Số tiền</span>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {billServices &&
          billServices.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{index + 1}</TableCell>
              <TableCell className="tableCell">{row.codebill}</TableCell>
              <TableCell className="tableCell">
                {row.idCustomer.fullname}
              </TableCell>
              <TableCell className="tableCell">
                {row.idStaff.fullname}
              </TableCell>
              <TableCell className="tableCell">{row.idService.title}</TableCell>
              <TableCell className="tableCell">
                {format(new Date(row.date), "dd/MM/yyyy")} {row.time}
              </TableCell>
              <TableCell className="tableCell">
                {VND.format(row.total)}
              </TableCell>
             
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default BillService;
