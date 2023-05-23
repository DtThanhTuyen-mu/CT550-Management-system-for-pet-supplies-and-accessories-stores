import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import {useNavigate} from 'react-router-dom'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import "./CreateUser.scss";
import axios from "axios";
const CreateUser = ({ title }) => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
 
 
 
  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async() => {
    await axios.get('http://localhost:3000/api/roles')
      .then(res => {
        console.log(res.data);
        setRoles(res?.data.roles);
      })
  }
  const [file, setFile] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [cccd, setcccd] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(
    "https://648869380.r.worldcdn.net/app/views/client/lutfi-cloud-avatar/lutfi-file/images/avatar.png"
  );
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [salary, setSalary] = useState("")
  const handleAddUser = async (e) => {
     e.preventDefault();
     try {
       await axios
         .post("http://localhost:3000/api/staff/register", {
           username, fullname,
            phone,birthday,
           idc:cccd, password,
           address, image,
           role,gender
         })
         .then(async(res) => {
           const temp = res?.data.staff;
           await axios
             .post("http://localhost:3000/api/salary", {
             staff: temp._id,
             salary,
        }).then(res => {
             console.log("Tao thanh cong");
           })
          //  console.log(res?.data.staff);
           // console.log("ok");
           navigate("/admin/user");
         });
     } catch (error) {
       console.log("Error: ", error);
     }
   };

  // console.log(file);
  return (
    <div className="createUser">
      <Sidebar />
      <div className="createUserContainer">
        <Navbar />
        {/* <div className="top">
          <h1>{title}</h1>
        </div> */}
        <div className="bottom">
          {/* <div className="left justify-center items-center"> */}
          <div className="left  text-slate-500 text-[30] ">
            <h1> {title}</h1>
          </div>
          <div className="right">
            <form onSubmit={handleAddUser}>
              {/* <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div> */}

              <div className="formInput">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="htxuan"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Họ tên</label>
                <input
                  type="text"
                  placeholder="Hà Thanh Xuân"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Ngày sinh</label>
                <input
                  type="text"
                  placeholder=""
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>CCCD</label>
                <input
                  type="text"
                  placeholder=""
                  value={cccd}
                  onChange={(e) => setcccd(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Số điện thoại</label>
                <input
                  type="text"
                  placeholder=""
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Mật khẩu</label>
                <input
                  type="password"
                  placeholder="*******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Địa chỉ</label>
                <input
                  type="text"
                  placeholder=""
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Hình ảnh</label>
                <input
                  type="text"
                  placeholder=""
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Giới tính</label>
                <input
                  type="text"
                  placeholder=""
                  value={gender}
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
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    {roles.map((c, k) => (
                      <option value={c._id}>{c.code}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="formInput">
                <label>Lương</label>
                <input
                  type="text"
                  placeholder=""
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>

              <button> Tạo mới </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
