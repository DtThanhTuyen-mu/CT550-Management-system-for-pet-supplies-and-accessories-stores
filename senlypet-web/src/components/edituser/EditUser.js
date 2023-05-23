import React, { useEffect, useState } from 'react'
import './EditUser.scss'
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { format } from "date-fns";

import axios from 'axios';
const EditUser = ({ title }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [birthday, setBirthday] = useState("");
    const [phone, setPhone] = useState("");
    const [cccd, setcccd] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [image, setImage] = useState("");
    const [role, setRole] = useState("");
    const [gender, setGender] = useState("");
    const [roles, setRoles] = useState([]);
  const [staff, setStaff] = useState([]);
  const [salary, setSalary] = useState("");
  const [bonus, setBonus] = useState("");
  const [change, setChange] = useState(true);
   useEffect(  () => {
       getRoles();
    //    getUserById();
   }, []);
    
    useEffect(() => {
        (async () => {
            await axios
                .get(`http://localhost:3000/api/staff/staffid/${id}`)
                .then((res) => {
                    console.log("UserId: ", res?.data.staff);
                    const temp = res?.data.staff;
                    setFullname(temp.fullname);
                    setUsername(temp.username);
                    setBirthday(temp.birthday);
                    setcccd(temp.idc);
                    setImage(temp.image);
                    setRole(temp.role._id);
                    setPhone(temp.phone);
                    setGender(temp.gender)
                    setAddress(temp.address);
                    setStaff(res?.data.staff)
                })
                .catch((error) => {
                    console.log("Error: ", error);
                });
        })();
    },[])
    const getUserById = async() => {
        await axios
          .get(`http://localhost:3000/api/staff/staffid/${id}`)
          .then((res) => {
              console.log("UserId: ", res?.data.staff);
              const temp = res?.data.staff;
              setStaff(res?.data.staff)
              setFullname(temp.fullname);

              setRole(temp.role._id);
          })
          .catch((error) => {
            console.log("Error: ", error);
          });
 }
   const getRoles = async () => {
       await axios
           .get("http://localhost:3000/api/roles").then((res) => {
       console.log(res.data);
       setRoles(res?.data.roles);
     });
   };
    const handleEditUser = async(e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/staff/updateprofile/${id}`, {
                fullname, idc:cccd, gender,phone,birthday,address,username,image,role
            }).then(res => {
              console.log("ok");
                toast.success("🦄 Cập nhật thông tin thành công!", {
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
                
                navigate('/admin/user');
              },1200);
            })
        } catch (error) {
            console.log("Error: ", error);
        }
      
    }
  const handleEditSalary = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/api/salary/staff=" + staff._id, {
      salary,
    }).then(res => {
       toast.success("🦄 Cập nhật thông tin thành công!", {
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
         navigate("/admin/user");
       }, 1200);
    });
    // console.log()

  }
  const handleEditBonus = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3000/api/salary/bonus/staff=" + staff._id, {
        bonus
      })
      .then((res) => {
        console.log(" Cap nhat lương thương thàng công");
        toast.success("🦄 Cập nhật thông tin thành công!", {
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
          navigate("/admin/user");
        }, 1200);
      });
    // console.log()

  }
  // const handleEditBonus = async (e) => {
  //   e.preventDefault();
  //   console.log()
  // }

  return (
    <div className="detailuser">
      <Sidebar />
      <div className="detailuserContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton"> Thông tin</div>
            {/* <h1 className="title">Infomation</h1> */}
            <div className="item">
              <img
                src={staff.image}
                // src="/images/avatar.jpg"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle text-3xl">{staff.fullname}</h1>
                <div className="detailItem">
                  <span className="itemKey">Username:</span>
                  <span className="itemValue">{staff.username}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Họ tên:</span>
                  <span className="itemValue">{staff.fullname}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Ngày sinh:</span>
                  <span className="itemValue">{staff.birthday}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Giới tính:</span>
                  <span className="itemValue">{staff.gender}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">SDT:</span>
                  <span className="itemValue">{staff.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">CCCD:</span>
                  <span className="itemValue">{staff.idc}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Địa chỉ: </span>
                  <span className="itemValue">{staff.address}</span>
                </div>
              </div>
            </div>
            <div className="mt-3 flex justify-center items-center">
              <button
                className=" flex w-[250px] h-[50px] bg-red-700 justify-center items-center  "
                style={{ backgroundColor: "#E85C00" }}
                onClick={() => setChange(false)}
              >
                <span className="text-lg items-center text-white font-bold">
                  Cập nhật lương
                </span>
              </button>
            </div>
          </div>
          <div className="right flex justify-center items-center">
            {change ? (
              <form onSubmit={handleEditUser}>
                <div className="formInput">
                  <label>Username </label>
                  <input
                    type="text"
                    defaultValue={staff.username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>
                <div className="formInput">
                  <label>Họ tên</label>
                  <input
                    type="text"
                    placeholder="Hà Thanh Xuân"
                    defaultValue={staff.fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </div>
                <div className="formInput">
                  <label>Ngày sinh</label>
                  <input
                    type="text"
                    defaultValue={staff.birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </div>
                <div className="formInput">
                  <label>CCCD</label>
                  <input
                    type="text"
                    defaultValue={staff.idc}
                    onChange={(e) => setcccd(e.target.value)}
                  />
                </div>
                <div className="formInput">
                  <label>Số điện thoại</label>
                  <input
                    type="text"
                    defaultValue={staff.phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="formInput">
                  <label>Địa chỉ</label>
                  <input
                    type="text"
                    defaultValue={staff.address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="formInput">
                  <label>Hình ảnh</label>
                  <input
                    type="text"
                    defaultValue={staff.image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
                <div className="formInput">
                  <label>Giới tính</label>
                  <input
                    type="text"
                    defaultValue={staff.gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>

                <div className="formInput">
                  <label htmlFor="select">
                    Vai trò:
                    <select
                      className="h-[30px] w-[100px] border-1 border-gray-400"
                      name="select"
                      id="select"
                      onChange={(e) => setRole(e.target.value)}
                    >
                      {roles.map((c, k) =>
                        role === c._id ? (
                          <option value={c._id} selected>
                            {c.code}
                          </option>
                        ) : (
                          <option value={c._id}>{c.code}</option>
                        )
                      )}
                    </select>
                  </label>
                </div>
                <button className="text-lg"> Cập nhật</button>
              </form>
            ) : (
              <div className="w-100">
                <form className="mt-7" onSubmit={handleEditSalary}>
                  <div className="formInput">
                    <label>Lương cứng </label>
                    <input
                      type="text"
                      value={salary}
                      // defaultValue={staff.username}
                      onChange={(e) => {
                        setSalary(e.target.value);
                      }}
                    />
                  </div>
                  <button className="text-lg"> Cập nhật</button>
                </form>
                <form className="mt-7" onSubmit={handleEditBonus}>
                  <div className="formInput">
                    <label>Lương thưởng tháng hiện tại</label>
                    <input
                      type="text"
                      value={bonus}
                      // defaultValue={staff.username}
                      onChange={(e) => {
                        setBonus(e.target.value);
                      }}
                    />
                  </div>
                  <button className="text-lg"> Cập nhật</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
    // <div className="createUser">
    //   <Sidebar />
    //   <div className="createUserContainer">
    //     <Navbar />

    //     <div className="top">
    //       {/* <div className="left">
    //         <h1>{title}</h1>

    //       </div> */}
    //       <div className="left">
    //         <div className="editButton"> Thông tin</div>
    //         {/* <h1 className="title">Infomation</h1> */}
    //         <div className="item">
    //           <img
    //             src={staff.image}
    //             // src="/images/avatar.jpg"
    //             alt=""
    //             className="itemImg"
    //           />
    //           <div className="details">
    //             <h1 className="itemTitle text-3xl">{staff.fullname}</h1>
    //             <div className="detailItem">
    //               <span className="itemKey">Username:</span>
    //               <span className="itemValue">{staff.username}</span>
    //             </div>
    //             {/* <div className="detailItem">
    //             <span className="itemKey">Email:</span>
    //             <span className="itemValue">{staff.email}</span>
    //           </div> */}
    //             <div className="detailItem">
    //               <span className="itemKey">Ngày sinh:</span>
    //               <span className="itemValue">{staff.birthday}</span>
    //             </div>
    //             <div className="detailItem">
    //               <span className="itemKey">Giới tính:</span>
    //               <span className="itemValue">{staff.gender}</span>
    //             </div>
    //             <div className="detailItem">
    //               <span className="itemKey">SDT:</span>
    //               <span className="itemValue">{staff.phone}</span>
    //             </div>
    //             <div className="detailItem">
    //               <span className="itemKey">CCCD:</span>
    //               <span className="itemValue">{staff.idc}</span>
    //             </div>
    //             <div className="detailItem">
    //               <span className="itemKey">Địa chỉ: </span>
    //               <span className="itemValue">{staff.address}</span>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="mt-3 flex justify-center items-center">
    //           <button
    //             className=" flex w-[250px] h-[50px] bg-red-700 justify-center items-center  "
    //             style={{ backgroundColor: "#E85C00" }}
    //             // onClick={() => setInfo(false)}
    //           >
    //             <span className="text-xl items-center text-white font-bold">
    //               Đổi mật khẩu
    //             </span>
    //           </button>
    //         </div>
    //       </div>

    //       <div className="right">
    //         <form onSubmit={handleEditUser}>
    //           <div className="formInput">
    //             <label>Username </label>
    //             <input
    //               type="text"
    //               defaultValue={staff.username}
    //               onChange={(e) => {
    //                 setUsername(e.target.value);
    //               }}
    //             />
    //           </div>
    //           <div className="formInput">
    //             <label>Họ tên</label>
    //             <input
    //               type="text"
    //               placeholder="Hà Thanh Xuân"
    //               defaultValue={staff.fullname}
    //               onChange={(e) => setFullname(e.target.value)}
    //             />
    //           </div>
    //           <div className="formInput">
    //             <label>Ngày sinh</label>
    //             <input
    //               type="text"
    //               defaultValue={staff.birthday}
    //               onChange={(e) => setBirthday(e.target.value)}
    //             />
    //           </div>
    //           <div className="formInput">
    //             <label>CCCD</label>
    //             <input
    //               type="text"
    //               defaultValue={staff.idc}
    //               onChange={(e) => setcccd(e.target.value)}
    //             />
    //           </div>
    //           <div className="formInput">
    //             <label>Số điện thoại</label>
    //             <input
    //               type="text"
    //               defaultValue={staff.phone}
    //               onChange={(e) => setPhone(e.target.value)}
    //             />
    //           </div>

    //           <div className="formInput">
    //             <label>Địa chỉ</label>
    //             <input
    //               type="text"
    //               defaultValue={staff.address}
    //               onChange={(e) => setAddress(e.target.value)}
    //             />
    //           </div>
    //           <div className="formInput">
    //             <label>Hình ảnh</label>
    //             <input
    //               type="text"
    //               defaultValue={staff.image}
    //               onChange={(e) => setImage(e.target.value)}
    //             />
    //           </div>
    //           <div className="formInput">
    //             <label>Giới tính</label>
    //             <input
    //               type="text"
    //               defaultValue={staff.gender}
    //               onChange={(e) => setGender(e.target.value)}
    //             />
    //           </div>

    //           <div className="formInput">
    //             <label htmlFor="select">
    //               Vai trò:
    //               <select
    //                 className="h-[30px] w-[100px] border-1 border-gray-400"
    //                 name="select"
    //                 id="select"
    //                 onChange={(e) => setRole(e.target.value)}
    //               >
    //                 {roles.map((c, k) =>
    //                   role === c._id ? (
    //                     <option value={c._id} selected>
    //                       {c.code}
    //                     </option>
    //                   ) : (
    //                     <option value={c._id}>{c.code}</option>
    //                   )
    //                 )}
    //               </select>
    //             </label>
    //           </div>
    //           <button> Cập nhật</button>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default EditUser
