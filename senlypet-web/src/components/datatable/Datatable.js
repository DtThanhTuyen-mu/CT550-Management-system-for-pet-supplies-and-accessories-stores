import React, { useState, useEffect } from "react";
import "./Datatable.scss";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

const Datatable = () => {
  const [staff, setStaff] = useState([]);
  const [star, setStar] = useState();
  const [idde, setIdde] = useState();
  const [slength, setSlength] = useState();
  const [salaryS, setSalaryS] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (id) => {
    setOpen(true);
    setIdde(id);
  };

  const handleClose = () => setOpen(false);
  useEffect(() => {
    getStaff();
    getSalary();
  }, []);

  // Lay all staff
  const getStaff = async () => {
    await axios.get("http://localhost:3000/api/staffs").then((res) => {
      console.log("staffs:", res?.data.staff);
      setStaff(res?.data.staff);
      setStar(res?.data.ass);
      console.log("lengths:", res?.data.arrSchedule2);
      setSlength(res?.data.arrSchedule2);
    });
  };

  const getSalary = async () => {
    await axios.get("http://localhost:3000/api/salaries").then((res) => {
      const temp = res?.data.salary;
      setSalaryS(temp);
      console.log("luong: ", temp);
    });
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:3000/api/staff/${id}`)
      .then((res) => {
        console.log(res.status);
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
       <p className="">Thêm nhân viên mới </p>
        <Link to="create" className="link ">
          Thêm mới
        </Link>
      </div>

      <div class="table-responsive text-nowrap border-1">
        <table class="table table-hover mt-1">
          <thead>
            <tr class="text-center">
              <td>STT</td>
              <td>Họ tên</td>
              <td>Vai trò</td>
              <td>Lương</td>
              <td>Lương thưởng</td>
              <td>Đánh giá</td>
              <td>Số lịch hẹn</td>
              <td>Thao tác</td>
            </tr>
          </thead>
          {staff.map((st, k) =>
            st.role.code === "Owner" ? null : (
              <tbody
                key={k}
                className="border-1 h-[50px] justify-center items-center"
              >
                <td className="text-center pt-4">{k + 1}</td>
                <td class="text-center pt-4">{st.fullname}</td>
                <td class="text-center pt-4">{st.role.code}</td>
                {salaryS.map((ss, i) =>
                  ss.staff === st._id ? (
                    <>
                      <td class="text-center pt-4">{ss.salary}</td>
                      <td class="text-center pt-4">
                        {ss.bonus
                          ? ss.bonus.map((b, bi) =>
                              b.month === format(new Date(), "MM/yyyy")
                                ? b.reward
                                : null
                            )
                          : 0}
                      </td>
                    </>
                  ) : null
                )}
                {star.map((s, i) =>
                  s.idStaff === st._id ? (
                    <td class="text-center pt-4">{s.star}</td>
                  ) : null
                )}
                {slength.map((sl, i) =>
                  sl.idStaff === st._id ? (
                    <td class="text-center pt-4">{sl.length}</td>
                  ) : null
                )}
                {st.role.code === "Sales" ? (
                  <td colspan="2" class="text-center pt-4"></td>
                ) : null}

                <td className="pt-2">
                  <Link
                    to={`edituser/${st._id}`}
                    className="no-underline text-white rounded-lg my-3"
                    style={{ backgroundColor: "green" }}
                  >
                    <button className="w-[50px]">Xem</button>
                  </Link>

                  <button
                    className="rounded-lg"
                    style={{ backgroundColor: "orange" }}
                    onClick={() => handleOpen(st._id)}
                  >
                    Xóa
                  </button>
                </td>
              </tbody>
            )
          )}
        </table>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Xác nhận xóa mục này?
          </Typography>
          <Box ml={20}>
            <Button onClick={() => handleDelete(idde)}>Đồng ý</Button>
            <Button onClick={handleClose}>Hủy</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Datatable;
