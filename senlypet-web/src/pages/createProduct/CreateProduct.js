import React, { useEffect, useState } from "react";
import "./CreateProduct.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { SettingsSuggest } from "@mui/icons-material";
import { Link, useNavigate , Navigate} from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const CreateProduct = () => {
    const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [product, setProduct] = useState([]);
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [image, setImage] = useState("");
  const [storage, setStorage] = useState("");
  const [delivery, setDelivery] = useState("");
  const [category, setCategory] = useState([]);
  const [description, setDescription] = useState("");
  const [getcategory, setGetCategory] = useState([]);
  // console.log(title);
  // console.log(image);
  // console.log(price);
  // console.log(delivery);
  // console.log(storage);
  //   console.log(description);
  //   console.log(category);
   useEffect(() => {
     getListCategory();
   }, []);  
    
  const handleAddproduct = async (e) => {
    e.preventDefault();
    // window.alert("Thêm mới sản phẩm thành công!!!");
    try {
      await axios.post('http://localhost:3000/api/product', {
        category, title, image, price, storage, delivery, description, unit
      }).then(res => {
        console.log(res.data);
         
        toast.success("🦄 Thêm sản phẩm mới thành công!", {
              position: "top-right",
              autoClose: 900,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored"
            });
        // navigate("/admin/product");
      })
    } catch (error) {
      console.log("Error: ", error);
    }
   
  }
  

   
    const getListCategory = async() => {
        await axios.get(`http://localhost:3000/api/categories`).then(res => {
            const c = res?.data.categories;
            console.log(c)
            setGetCategory(c);
        }).catch((error) =>{
            console.log('Error: ', error);
        })
    }

//     Hạt Royal Canin British Shorthair Kitten Cho Mèo Con Anh Lông Ngắn
//     145000
//     ROYAL CANIN British Shorthair Kitten được sản xuất dành riêng cho chiếc hàm đặc biệt của mèo Anh lông ngắn, giúp tăng trưởng cơ và xương, hỗ trợ sức khỏe đường tiết niệu và tăng cường hệ miễn dịch. 
// THÀNH PHẦN
// Protein gia cầm, gạo, protein thực vật*, chất béo thực vật, bắp, protein động vật, gluten bắp, bột lúa mì, củ cải đường, xơ thực vật, dầu cá, khoáng chất, dầu đậu nành, men, psyllium (0,5%), fructo-oligo-sacarit, men thủy phân (nguồn manno-oligo-sacarit), chiết xuất men (nguồn betaglucan), dầu borage, chiết xuất cúc vạn thọ (nguồn lutein), giáp xác thủy phân (nguồn glucosamine), sụn thủy phân (nguồn chondroitin).
// Phụ gia dinh dưỡng: Vitamin A, Vitamin D3, Vitamin E, E1 (Sắt), E2 (I ốt), E4 (Đồng), E5 (Mangan), E6 (Kẽm), E8 (Selen):, L-carnitine - Phụ gia kỹ thuật: Clinoptilolite - Chất chống oxi hóa. 
// *L.I.P.: Protein có độ tiêu hóa cao.
// salt.tikicdn.com/cache/750x750/ts/product/20/c9/a7/ec9bb4fed196770bb4d2f39d6ac7d1f1.jpg.webp
    return (
      <div className="createproduct">
        <Sidebar />
        <div className="createproductContainer">
          <Navbar />
          {/* <div className="row ">
            <p className="flex justify-center items-center text-3xl font-semibold pt-2">
              Thêm sản phẩm
            </p>
            <div className="flex justify-center items-center">
              <form
                onSubmit={handleAddproduct}
                // method="post"
                // enctype="multipart/form-data"
                className="mt-1"
              >
                <div className="form-group mt-2">
                  <label htmlFor="nameProduct">Tên sản phẩm: </label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    id="nameProduct"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-group mt-2">
                  <label htmlFor="priceProduct">Giá: </label>
                  <input
                    type="text"
                    className="form-control"
                    value={price}
                    id="priceProduct"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="category">
                    Loại sản phẩm:
                    <select
                      className="border-4"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {getcategory.map((i, k) => (
                        <option key={k} value={i._id}>
                          {i.type}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="storageP">Số Lượng Hàng Nhập Kho: </label>
                  <input
                    type="text"
                    className="form-control"
                    value={storage}
                    id="storageP"
                    onChange={(e) => setStorage(e.target.value)}
                  />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="deliveP">
                    Số Lượng Hàng Tồn Kho: (nếu có thay đổi số lượng nhập kho
                    thì bạn hãy tính lại số lượng tồn )
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={delivery}
                    id="deliveP"
                    onChange={(e) => setDelivery(e.target.value)}
                  />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="unitProduct">Đơn vị tính: </label>
                  <input
                    type="text"
                    className="form-control"
                    value={unit}
                    id="unitProduct"
                    onChange={(e) => setUnit(e.target.value)}
                  />
                  </div>
                <div className="form-group mt-2">
                  <label htmlFor="imgP">Link ảnh</label>
                  <input
                    type="text"
                    className="form-control"
                    value={image}
                    id="imgP"
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="description">Mô Tả: </label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="10"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="col text-center">
                  <button className="btn btn-success ">
                    Thêm
                  </button>
                </div>
              </form>
            </div>
          </div>
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    //   placeholder="htxuan"
                    //   value={username}
                  />
                </div>
                <div className="formInput">
                  <label>Giá </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                   value={price}
                    
                    onChange={(e) => setPrice(e.target.value)}
                    //   placeholder="htxuan"
                    //   value={username}
                  />
                </div>
                <div className="formInput">
                  <label>Hình ảnh</label>
                  <input
                    type="text"
                    value={image}
                    id="imgP"
                    onChange={(e) => setImage(e.target.value)}
                    //   placeholder="htxuan"
                    //   value={username}
                    // onChange={(e) => setImage(e.target.value)}
                  />
                </div>

                <div className="formInput">
                  <label htmlFor="category">
                    Loại sản phẩm:
                    <select
                      className="border-4"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {getcategory.map((i, k) => (
                        <option key={k} value={i._id}>
                          {i.type}
                        </option>
                      ))}
                    </select>
                  </label>
                  {/* <label>
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
                  </label> */}
                </div>
                <div className="formInput">
                  <label>Số lượng hàng nhập kho </label>
                  <input
                    type="text"
                    value={storage}
                    // id="storageP"
                    onChange={(e) => setStorage(e.target.value)}
                    //   placeholder="htxuan"
                    //   value={username}
                    // onChange={(e) => setTimes(e.target.value)}
                  />
                </div>
                <div className="formInput">
                  <label>Số lượng hàng tồn kho </label>
                  <input
                    type="text"
                    value={delivery}
                    // id="deliveP"
                    onChange={(e) => setDelivery(e.target.value)}
                     //   placeholder="htxuan"
                    //   value={username}
                    // onChange={(e) => setTimes(e.target.value)}
                  />
                </div>
                <div className="formInput">
                  <label>Đơn vị tính</label>
                  <input
                    type="text"
                    value={unit}
                    id="unitProduct"
                    onChange={(e) => setUnit(e.target.value)}
                      //   placeholder="htxuan"
                    //   value={username}
                    // onChange={(e) => setTimes(e.target.value)}
                  />
                </div>
                <div className="formInput">
                  <label>Mô tả</label>
                 <textarea
                    className="form-control"
                    id="description"
                    rows="10"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                {/* <p> {category }</p> */}
              </form>
            </div>
            <div className="end">
              <button
                className="bg-blue-800 w-[200px]"
                onClick={handleAddproduct}
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
};

export default CreateProduct;
