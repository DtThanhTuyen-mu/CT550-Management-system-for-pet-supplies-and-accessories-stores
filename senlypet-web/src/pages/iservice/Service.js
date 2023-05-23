import React, { useEffect, useState } from "react";
import "./Service.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { Link } from 'react-router-dom'
import VND from "../../components/currency";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
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


const Service = () => {
  const [services, setServices] = useState([]);
  const [idde, setIdde] = useState();
  const [isLoading, setisLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (id) => {
    setOpen(true);
    setIdde(id);
    // console.log("props:", id);
  };
  const handleClose = () => setOpen(false);
 
  useEffect(() => {
    getListServices();
  }, []);
  const getListServices = async () => {
     
     await axios
       .get("http://localhost:3000/api/services")
       .then((res) => {
         // console.log('Response', res?.data);
         const listservices = res?.data.getServices;
         setServices(listservices);
       })
       .catch((error) => {
         console.log("Error: ", error);
       })
       .finally(() => {
         setisLoading(false);
       });
  };

  const handleDelete = async (id) => {
    // console.log("id", id); 
    await axios
      .put(`http://localhost:3000/api/service/idservice/${id}`)
      .then((res) => {
        console.log(res.status);
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }
  
  console.log(services)
  return (
    <div className="service">
      <Sidebar />
      <div className="serviceContainer">
        <Navbar />
        <div className="row pl-1 ms-1 py-[10px]">
          <div className="flex justify-between items-center mt-[10px]">
            <p className="text-center text-[24px] text-gray-400">
              Thêm dịch vụ mới
            </p>
            <Link to="create" className="link pt-8px text-center">
              Thêm mới
            </Link>
          </div>
        </div>
        {services &&
          services.map((service, index) => (
            <div className="row p[20px] ms-4 border-1">
              <div className="col-md-6 ">
                <div className="flex justify-center items-center mt-2">
                  <img
                    className="img-fluid rounded-xl"
                    // src="/images/avatar.jpg"
                    src={service.image}
                    style={{ width: "180px" }}
                  />
                </div>
                <div className="flex justify-center items-center mt-2">
                  <p className="mb-0 text-2xl font-bold">{service.title}</p>
                </div>
                <div className="flex justify-center items-center mt-2">
                  <AccessTimeIcon
                    name="icon"
                    size={10}
                    className="text-gray-500"
                  />
                  <p className="mb-0 text-base font-bold text-gray-500">
                    {service.times}
                  </p>
                </div>
                <div className="flex justify-center items-center mt-1">
                  Mô tả:
                </div>
                {service.description &&
                  service.description.map((d, k) => (
                    <>
                      <div className="flex justify-center items-center mt-1 font-semibold text-justify">
                        {d.title}
                      </div>
                      <div className="flex justify-center items-center mt-1 text-sm text-justify">
                        {d.content}
                      </div>
                    </>
                  ))}
              </div>
              <div className="col-md-4 item-center justify-center">
                <div className="flex justify-center items-center font-semibold text-2xl mt-3">
                  Bảng giá:
                </div>
                <div className="flex justify-center items-center mt-1 mb-3">
                  <table className="border-1">
                    <thead>
                      <tr className="text-center">
                        <th> Cân nặng</th>
                        <th> Giá</th>
                      </tr>
                    </thead>

                    {service.price &&
                      service.price.map((p) => (
                        <tbody>
                          <td>{p.weight} </td>
                          <td> {VND.format(p.byweight)}</td>
                        </tbody>
                      ))}
                  </table>
                </div>
              </div>
              <div className="col-md-2 ps-4">
                <div className="h-25"></div>
                <Link
                  className="no-underline"
                  to={`editservice/${service._id}`}
                >
                  <div className="flex  bg-green-800 text-white justify-center items-center my-3  ">
                    <button>
                      <p className="text-[20px] mt-2 mb-1"> Cập nhật </p>
                    </button>
                  </div>
                </Link>
                <div className="flex bg-red-600 text-white justify-center items-center my-3 ">
                  <button onClick={() => handleOpen(service._id)}>
                    <p className="text-[20px] mt-2 mb-1">Xóa</p>
                  </button>
                </div>
              </div>
            </div>
          ))}
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

export default Service;
