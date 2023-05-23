import axios from "axios";
import React, { useState, useEffect } from "react";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { format } from "date-fns";

const ScheduleByMonth = () => {
  const [scheduleByMonth, setScheduleByMonth] = useState([]);

  useEffect(() => {
    (async () => {
      await axios
        .get(`http://localhost:3000/api/schedules/currentmonth`)
        .then((res) => {
          console.log("Ok");
          const temp = res?.data;
          console.log(temp);
          setScheduleByMonth(temp.schedulesM);
        });
    })();
  }, []);

  const handleConfirm = async (id) => {
    await axios
      .put(`http://localhost:3000/api/schedule/${id}/status=2`)
      .then((res) => {
        console.log("Putstatus laf 2 tuc xac nhan");
        window.location.reload();
      });
  };

  const handleDelete = async (id) => {
    await axios
      .put(`http://localhost:3000/api/schedule/${id}/status=0`)
      .then((res) => {
        console.log("Put la 2 tuc xac nhan huy");
        window.location.reload();
      });
  };

  return (
    <TableBody>
      {scheduleByMonth.map((row, index) => (
        <TableRow key={row.id}>
          <TableCell className="tableCell">{index + 1}</TableCell>
          <TableCell className="tableCell">
            {row.idStaff.fullname}
          </TableCell>
          <TableCell className="tableCell">{row.idCustomer.fullname}</TableCell>
          <TableCell className="tableCell">{row.idCustomer.phone}</TableCell>
          <TableCell className="tableCell">{row.idService.title}</TableCell>
          <TableCell className="tableCell">
            {row.reSchedule !== undefined
              ? format(new Date(row.reSchedule.date), "dd/MM/yyyy")
              : format(new Date(row.date), "dd/MM/yyyy")}
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
            {row.status === 1 ? (
              <span className="status Approved"> Chờ xác nhận </span>
            ) : null}
            {row.status === 2 ? (
              <span className="status Confirm"> Xác nhận </span>
            ) : null}
            {row.status === 3 || row.status === 5 ? (
              <span className="status Approved"> Hoàn thành </span>
            ) : null}
            {row.status === 0 ? (
              <span className="status Pending"> Đã hủy </span>
            ) : null}
            {row.status === -2 ? (
              <span className="status Pending"> Khách không đến </span>
            ) : null}
          </TableCell>
          <TableCell
            className="tableCell"
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            {row.status === 1 ? (
              <>
                <button
                  className=" bg-green-700 h-8 rounded-2xl w-[70px]"
                  onClick={() => handleConfirm(row._id)}
                >
                  <span className="my-1 text-sm text-white">Xác nhận</span>
                </button>
                <button
                  className="bg-red-700 h-8 rounded-2xl w-[40px]"
                  onClick={() => handleDelete(row._id)}
                >
                  <span className="my-1 text-sm text-white">Hủy</span>
                </button>
              </>
            ) : null}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default ScheduleByMonth;
