import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msgerr, setMsgerr] = useState(null);
  const [PorT, setPorT] = useState(true);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setMsgerr("Vui lòng điền đầy đủ các trường!!");
    } else {
      try {
        await axios
          .post("http://localhost:3000/api/staff/login", {
            username,
            password
          })
          .then((res) => {
            // console.log(res.data);
            if (res?.data.Error) {
              setMsgerr(res?.data.Error);
            } else {
              const infoAdmin = res?.data.savedStaff;
              localStorage.setItem("infoAdmin", JSON.stringify(infoAdmin));
              const tokenAdmin = res?.data.token;
              localStorage.setItem("tokenAdmin", JSON.stringify(tokenAdmin));
              //   const jsonToken = localStorage.getItem('tokenAdmin')
              //   console.log('json token: ', jsonToken);
              //   const json = localStorage.getItem('infoAdmin')
              //   const valuejson = JSON.parse(json);
              //   console.log('Json info; ', valuejson)
              navigate("/admin/dashboard");
            }
          });
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };
  return (
    <section className="h-screen">
      <div className="h-full">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form onSubmit={handleLogin}>
              <div className="w-full sm:w-2/3 lg:2/3 px-6 bg-blue-600 bg-clip-padding backdrop-filter backdrop-blur-sm text-white z-50 py-4  rounded-lg">
                <div className="w-full flex justify-center text-[#fff] text-3xl font-bold mb:2 md:mb-5">
                  Sign In
                </div>
                {msgerr ? (
                  <div className="mb-6 bg-green-200 flex justify-center items-center">
                    <span className="py-1 text-black">{msgerr}</span>
                  </div>
                ) : null}
                <div className="mb-6">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Your username
                  </label>
                  <input
                    type="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@neurolink.com"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Your password
                  </label>
                  <div className="flex">
                    <input
                      type={PorT ? "password" : "text"}
                      id="password"
                      className="relative bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="*******"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      required
                    />
                    {PorT ? (
                      <VisibilityOffIcon
                        className="icon relative text-black mt-2 ml-[-30px]"
                        onClick={() => setPorT(false)}
                      />
                    ) : (
                      <VisibilityIcon
                        className="icon relative text-black mt-2 ml-[-30px]"
                        onClick={() => setPorT(true)}
                      />
                    )}
                  </div>

                  {/* </input> */}
                </div>
                <div className="flex flex-row justify-between">
                  <div className="text-[#00FF00] text-sm md:text-md"></div>
                  {/* <div className="text-white text-sm md:text-md text-[15px] ">
                    Forgot Password?
                  </div>   bg-[#f18c18]*/}
                </div>
                <button
                  className="mt-4 md:mt-10 w-full flex justify-center text-sm md:text-xl
                   bg-orange-600
                 py-2 rounded-md"
                >
                  Login
                </button>
                {/* <p> {username}</p> */}
                {/* <p> {password}</p> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
