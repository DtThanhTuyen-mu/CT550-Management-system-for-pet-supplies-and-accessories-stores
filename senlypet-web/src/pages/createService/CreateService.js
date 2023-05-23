import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'

import './CreateService.scss'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Navigate, useNavigate} from 'react-router-dom' 
const CreateService = () => {
    const navigate = useNavigate();
    const [title, setTile] = useState("");
  const [image, setImage] = useState("");
  const [times, setTimes] = useState("");
  const [ss, setss] = useState([]);
  const [category, setCategory] = useState("")

   useEffect(() => {
     (async () => {
       await axios
         .get(`http://localhost:3000/api/categoriesservice`)
         .then((res) => {
           console.log("Ok");
           const temp = res?.data.categories;
           console.log(temp);
           setss(temp);
         });
     })();
   }, []);
  
    const handleNewService = async (e) => {
      e.preventDefault();
        await axios.post(`http://localhost:3000/api/service`, {
          title, image, category, times
        }).then((res) => {
            console.log("S");
            toast.success("🦄 Thêm dịch vụ mới thành công!", {
              position: "top-right",
              autoClose: 900,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored"
            });
      })
  }
  
    return (
      <div className="createservice">
        <Sidebar />
        <div className="createserviceContainer">
          <Navbar />
          {/* <div className="top">
          <h1>{title}</h1>
        </div> */}
          <div className="bottom">
            <div className="left  text-slate-500 text-4xl ">
              <h1> Thêm dịch vụ</h1>
            </div>
            <div className="right">
              <form>
                <div className="formInput">
                  <label>Tên dịch vụ </label>
                  <input
                    type="text"
                    //   placeholder="htxuan"
                    //   value={username}
                    onChange={(e) => setTile(e.target.value)}
                  />
                </div>
                <div className="formInput">
                  <label>Hình ảnh</label>
                  <input
                    type="text"
                    //   placeholder="htxuan"
                    //   value={username}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>

                <div className="formInput">
                  <label>
                    Dạng dịch vụ
                    <select
                      className="h-[30px] w-[200px] border-1 border-gray-400"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {ss &&
                        ss.map((s, k) => (
                          <option value={s._id}>{s.type}</option>
                        ))}
                    </select>
                  </label>
                </div>
                <div className="formInput">
                  <label>Số lần dịch vụ </label>
                  <input
                    type="text"
                    //   placeholder="htxuan"
                    //   value={username}
                    onChange={(e) => setTimes(e.target.value)}
                  />
                </div>
                {/* <p> {category }</p> */}
              </form>
            </div>
            <div className="end">
              <button
                className="bg-blue-800 w-[200px]"
                onClick={handleNewService}
              >
                <p className="text-white font-semibold text-xl mb-1 py-2">
                  Thêm mới
                </p>
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
}

export default CreateService
