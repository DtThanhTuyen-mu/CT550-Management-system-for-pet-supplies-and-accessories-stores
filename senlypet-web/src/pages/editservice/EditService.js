import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./EditService.scss";
import {useParams, useNavigate} from 'react-router-dom'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [titleD, setTitleD] = useState("");
  const [contentD, setContentD] = useState("");
  const [titleP, setTitleP] = useState("");
  const [contentP, setContentP] = useState("");
  const [nameS, setNameS] = useState("");
  const [image, setImage] = useState("");
  const [service, setService] = useState("");
  useEffect(() => {
    (async () => {
      await axios.get(`http://localhost:3000/api/service/${id}`).then(res => {
        
        console.log("OK");
        const temp = res?.data.service;
        // console.log(res?.data);
        setNameS(temp.title);
        setImage(temp.image);
        // setService(temp);
      })
    })();
  },[])

  const handleAddDescription = async (e) => {
    e.preventDefault();
    // console.log(id);
    await axios.post(`http://localhost:3000/api/service/description/${id}`, {
      title: titleD,
      content: contentD ,
    }).then(res => {
      console.log("od");
      toast.success("Thêm thông tin mô tả thành công!!!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    });
  }
  const handleAddPrice = async (e) => {
    e.preventDefault();
    // console.log(id);
    await axios
      .post(`http://localhost:3000/api/service/price/${id}`, {
        weight: titleP,
        byweight: contentP
      })
      .then((res) => {
        console.log("S");
        toast.success("Thêm thông tin giá thành công!!!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
        });
      }).catch((error) => {
        toast.warn("🦄 Wow so easy!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark"
        });
      });
    
  }
  const handleDeleteDescription = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:3000/api/service/description/delete/${id}`)
      .then(res => {
        console.log("od");
         toast.success("Xóa thông tin mô tả thành công!", {
           position: "top-right",
           autoClose: 1500,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "dark"
         });
    });
  }
  const handleDeletePrice = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://localhost:3000/api/service/price/delete/${id}`
        // , {
        // weight: titleP,
        // byweight: contentP
        // }
      )
      .then((res) => {
        console.log("S");
        toast.success("Xóa thông tin giá thành công!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark"
        });
      });
  }
  const handleUpdateService = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/api/service/${id}`, {
      title: nameS, image
    }).then((res) => {
      console.log("ssssssss")
       toast.success("Cập nhật thông tin dịch vụ thành công!!!", {
         position: "top-right",
         autoClose: 500,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "colored"
       });
      setTimeout(() => {
        navigate('/admin/service');
      }, 1000);
    })
  }
  return (
    <div className="updateservice">
      <Sidebar />
      <div className="updateserviceContainer">
        <Navbar />
        <div className="top">
          <div className="left text-slate-500 text-4xl ">Cập nhật thông tin</div>
          <div className="right">
            <form action="">
              <div className="formInput2">
                <label>Tên dịch vụ</label>
                <input
                  type="text" 
                  defaultValue={nameS}
                  onChange={(e) => setNameS(e.target.value)}
                />
              </div>
              <div className="formInput2">
                <label>Ảnh</label>
                <input
                  className="" 
                  type="text"
                  defaultValue={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="end">
            
              <button
                className="bg-blue-800 w-[200px]"
                onClick={handleUpdateService}
              >
                <p className="text-white font-semibold text-xl mb-1 py-2">
                  Sửa
                </p>
              </button>
              
            
          </div>
        </div>
        <div className="top">
          <div className="left text-slate-500 text-4xl ">Cập nhật mô tả</div>
          <div className="right">
            <form action="">
              <div className="formInput1">
                <label>Tiêu đề</label>
                <input
                  type="text"
                  // placeholder="htxuan"
                  value={titleD}
                  onChange={(e) => setTitleD(e.target.value)}
                />
              </div>
              <div className="formInput1">
                <label>Nội dung</label>
                <textarea
                  className="form-control"
                  // type="text"
                  rows="5"
                  value={contentD}
                  onChange={(e) => setContentD(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="end">
            <div>
              <button
                className="bg-blue-800 w-[200px]"
                onClick={handleAddDescription}
              >
                <p className="text-white font-semibold text-xl mb-1 py-2">
                  Thêm mô tả
                </p>
              </button>
              <button
                className="bg-purple-800 w-[200px] mt-2"
                onClick={handleDeleteDescription}
              >
                <p className="text-white font-semibold text-xl mb-1 py-2">
                  Xóa
                </p>
              </button>
            </div>
          </div>
        </div>

        <div className="top">
          <div className="left text-slate-500 text-4xl ">Cập nhật giá</div>
          <div className="right">
            <form action="">
              <div className="formInput2">
                <label>Cân nặng</label>
                <input
                  type="text"
                  placeholder="5 - 10kg"
                  value={titleP}
                  onChange={(e) => setTitleP(e.target.value)}
                />
              </div>
              <div className="formInput2">
                <label>Giá</label>
                <input
                  className=""
                  placeholder="200000"
                  type="text"
                  value={contentP}
                  onChange={(e) => setContentP(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="end">
            <div>
              <button
                className="bg-blue-800 w-[200px]"
                onClick={handleAddPrice}
              >
                <p className="text-white font-semibold text-xl mb-1 py-2">
                  Thêm giá
                </p>
              </button>
              <button
                className="bg-purple-800 w-[200px] mt-2"
                onClick={handleDeletePrice}
              >
                <p className="text-white font-semibold text-xl mb-1 py-2">
                  Xóa
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditService;
