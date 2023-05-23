import axios from "axios";
import React, { useState, useEffect } from "react";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { format } from "date-fns";

const ScheduleByDate = () => {
  const [scheduleByDate, setScheduleByDate] = useState([]);

  useEffect(() => {
    (async () => {
      await axios
        .get(`http://localhost:3000/api/schedules/currentdate`)
        .then((res) => {
          console.log("Ok");
          const temp = res?.data;
          console.log(temp);
          setScheduleByDate(temp.schedulesD);
        });
    })();
  }, []);

  return (
    <TableBody>
      {scheduleByDate.map((row, index) => (
        <TableRow key={row.id}>
          <TableCell className="tableCell">{index + 1}</TableCell>
          <TableCell className="tableCell">
            {row.idStaff.fullname}
           </TableCell>
          <TableCell className="tableCell">{row.idStaff.phone}</TableCell>
          <TableCell className="tableCell">{row.idService.title}</TableCell>
          <TableCell className="tableCell">
            {row.reSchedule !== undefined
              ? format(new Date(row.reSchedule.date), "dd/MM/yyyy")
              : format(new Date(row.date), "dd/MM/yyyy")}
          </TableCell>
          <TableCell className="tableCell">
            {format(new Date(row.date), "dd/MM/yyyy")}
          </TableCell>
          <TableCell className="tableCell">
            {row.reSchedule !== undefined ? row.reSchedule.time : row.time}
          </TableCell>
          <TableCell className="tableCell">
            {row.reSchedule !== undefined
              ? format(new Date(row.date), "dd/MM/yyyy")
              : null}
          </TableCell>
          <TableCell className="tableCell">
            {row.status === 0 ? (
              <span className="status Pending"> Đã hủy </span>
            ) : null}
            {row.status === -2 ? (
              <span className="status Pending"> Khách không đến </span>
            ) : null}
            {row.status === 1 ? (
              <span className="status Approved"> Chờ xác nhận </span>
            ) : null}
            {row.status === 3 || row.status === 5 ? (
              <span className="status Approved"> Hoàn thành </span>
            ) : null}
            {row.status === 2 ? (
              <span className="status Confirm"> Xác nhận </span>
            ) : null}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default ScheduleByDate;
