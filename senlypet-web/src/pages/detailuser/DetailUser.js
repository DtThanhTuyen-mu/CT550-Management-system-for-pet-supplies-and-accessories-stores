import React, { useEffect, useState } from 'react'
import './DetailUser.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Chart from "../../components/chart/Chart";
import Schedule from '../../components/schedule/Schedule';
import axios from 'axios';
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const DetailUser = () => {
   const [username, setUsername] = useState("");
   const [fullname, setFullname] = useState("");
   const [birthday, setBirthday] = useState("");
   const [phone, setPhone] = useState("");
   const [cccd, setcccd] = useState("");
   const [passworded, setPassworded] = useState("");
   const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [PdedHidden, setPdedHidden] = useState(true);
  const [PHidden, setPHidden] = useState(true);
  const [PdHidden, setPdHidden] = useState(true);
  
  const [address, setAddress] = useState("");
  const [info, setInfo] = useState(true);
  const [msgerr , setMsgerr] = useState(null)
   const [image, setImage] = useState(
     "https://648869380.r.worldcdn.net/app/views/client/lutfi-cloud-avatar/lutfi-file/images/avatar.png"
   );
   const [role, setRole] = useState("");
  const [gender, setGender] = useState("Nữ");
  const [infoAdmin, setInfoAdmin] = useState([]);
  useEffect(() => {
    const jsonToken = localStorage.getItem('tokenAdmin')
    // console.log('json token: ', jsonToken);
    const json = localStorage.getItem('infoAdmin')
    const valuejson = JSON.parse(json);
    getAccount(valuejson._id);
    
    // setInfoAdmin(valuejson);
    // console.log('Json info; ', valuejson)
  }, []);
  const getAccount = async (id) => {
    await axios.get("http://localhost:3000/api/staff/staffid/" + id).then(res => {
      const temp = res?.data.staff;
      setInfoAdmin(temp);
      setFullname(temp.fullname);
      setBirthday(temp.birthday);
      setcccd(temp.idc);
      setPhone(temp.phone);
      setAddress(temp.address);
      // console.log("Du li : ", temp);
      // console.log("ok");

    });
  }
  const handleAddUser = async (e) => {
    e.preventDefault();
    await axios.put("http://localhost:3000/api/staff/owner/updateprofile/"+ infoAdmin._id, {
      fullname, birthday, phone, cccd, address, image, gender
    }).then(res => {
      // console.log(" 99999");
      getAccount(infoAdmin._id);
    });
  }
  const handleChangePassA = async(e) => {
    e.preventDefault();
    if (passworded === "" || password === "" || repassword === "") {
      setMsgerr("Vui lòng điền đầy đủ các trường!!")
    } else if (password !== repassword) {
      setMsgerr("Mật khẩu mới chưa trùng khớp");
      
    } else {
      await axios.post("http://localhost:3000/api/staff/owner/changepassword", {
       id: infoAdmin._id,
        password,
        passworded,

      }).then((res) => {
        if (res?.data.Error) {
          setMsgerr(res?.data.Error);
          
        } else {
          setMsgerr("Thay đổi mật khẩu thành công!!!");
          
        }
       });
    }
  }
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
                src={infoAdmin.image}
                // src="/images/avatar.jpg"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle text-3xl">{infoAdmin.fullname}</h1>
                <div className="detailItem">
                  <span className="itemKey">Username:</span>
                  <span className="itemValue">{infoAdmin.username}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Ngày sinh:</span>
                  <span className="itemValue">{infoAdmin.birthday}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Giới tính:</span>
                  <span className="itemValue">{infoAdmin.gender}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">SDT:</span>
                  <span className="itemValue">{infoAdmin.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">CCCD:</span>
                  <span className="itemValue">{infoAdmin.idc}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Địa chỉ: </span>
                  <span className="itemValue">{infoAdmin.address}</span>
                </div>
              </div>
            </div>
            <div className="mt-3 flex justify-center items-center">
              <button
                className=" flex w-[250px] h-[50px] bg-red-700 justify-center items-center  "
                style={{ backgroundColor: "#E85C00" }}
                onClick={() => setInfo(false)}
              >
                <span className="text-lg items-center text-white font-bold">
                  Đổi mật khẩu
                </span>
              </button>
            </div>
          </div>
          <div className="right">
            {info ? (
              <>
                <div className="flex justify-center items-center">
                  <span className="title "> Cập nhật thông tin tài khoản </span>
                </div>

                <form onSubmit={handleAddUser}>
                  {/* <div className="formInput">
                  <label>Username</label>
                  <input
                    type="text"
                    // placeholder="htxuan"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div> */}
                  <div className="formInput">
                    <label>Họ tên</label>
                    <input
                      type="text"
                      // placeholder="Hà Thanh Xuân"
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
                  {/* <div className="formInput">
                  <label>Mật khẩu</label>
                  <input
                    type="password"
                    placeholder="*******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div> */}
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
                    <label htmlFor="select">
                      Giới tính:
                      <select
                        className="h-[30px] w-[100px] border-1 border-gray-400"
                        name="select"
                        id="select"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="Nữ">Nữ</option>
                        <option value="Nam">Nam</option>
                      </select>
                    </label>
                    {/* <label>Giới tính</label>
                  <input
                    type="text"
                    placeholder=""
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  /> */}
                  </div>

                  <button> <span className='text-lg'>
                    Cập nhật
                  </span>
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="flex justify-center items-center">
                  <span className="title"> Đổi mật khẩu </span>
                </div>

                <form onSubmit={handleChangePassA}>
                  <div className="formInput2">
                    <label>Nhập mật khẩu hiện tại</label>
                    <input
                      type={PdedHidden ? "password" : "text"}
                      placeholder="*******"
                      value={passworded}
                      onChange={(e) => setPassworded(e.target.value)}
                    />
                    {PdedHidden ? (
                      <VisibilityOffIcon
                        className="icon relative text-black mt-1 ml-[-30px]"
                        onClick={() => setPdedHidden(false)}
                      />
                    ) : (
                      <VisibilityIcon
                        className="icon relative text-black mt-1 ml-[-30px]"
                        onClick={() => setPdedHidden(true)}
                      />
                    )}
                  </div>
                  <div className="formInput2">
                    <label>Nhập mật khẩu mới</label>
                    <input
                      type={PHidden ? "password" : "text"}
                      placeholder="*******"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {PHidden ? (
                      <VisibilityOffIcon
                        className="icon relative text-black mt-1 ml-[-30px]"
                        onClick={() => setPHidden(false)}
                      />
                    ) : (
                      <VisibilityIcon
                        className="icon relative text-black mt-1 ml-[-30px]"
                        onClick={() => setPHidden(true)}
                      />
                    )}
                  </div>
                  <div className="formInput2 mr-0">
                    <label>Nhập lại mật khẩu mới</label>
                    <input
                      type={PdHidden ? "password" : "text"}
                      placeholder="*******"
                      value={repassword}
                      onChange={(e) => setRePassword(e.target.value)}
                    />
                    {PdHidden ? (
                      <VisibilityOffIcon
                        className="icon relative text-black mt-1 ml-[-30px]"
                        onClick={() => setPdHidden(false)}
                      />
                    ) : (
                      <VisibilityIcon
                        className="icon relative text-black mt-1 ml-[-30px]"
                        onClick={() => setPdHidden(true)}
                      />
                    )}
                    </div>
                    <div className='w-100'></div>
                  {msgerr ? (
                    <div className="formInput2 mr-5">
                      <div className="w-100 h-100 bg-orange-500 flex justify-center items-center">
                        <span className="py-1 text-white text-lg">
                          {msgerr}
                        </span>
                      </div>
                    </div>
                  ) : null}
                  <div className="">
                    <button className="button2 text-lg"> Cập nhật </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
        {/* <div className="bottom">
          <h1 className="title"> Schedule</h1>
          <Schedule />
        </div> */}
        {/* <Chart aspect={2 / 1} title="User Spending ( Last 6 Months)" /> */}
      </div>
    </div>
  );
}

export default DetailUser
