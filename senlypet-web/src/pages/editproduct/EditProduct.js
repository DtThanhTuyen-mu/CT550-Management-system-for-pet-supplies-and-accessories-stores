import React, { useState, useEffect } from 'react'
import './Editproduct.scss'
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [product, setProduct] = useState([]);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [storage, setStorage] = useState("");
  const [delivery, setDelivery] = useState("");
  const [description, setDescription] = useState("");
  // const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("");
 
  useEffect(() => {
    getProductById();
  }, [])
  const getProductById = async() => {
          await axios
            .get(`http://localhost:3000/api/product/${id}`)
            .then(res => {
              // console.log('Response', res?.data);
              const temp = res?.data.product;
              setTitle(temp.title);
              setPrice(temp.price);
              setImage(temp.image);
              setStorage(temp.storage);
              setDelivery(temp.delivery);
              setDescription(temp.description);
              setUnit(temp.unit);
              setProduct(temp);
            })
            .catch(error => {
              console.log('Error: ', error);
            });
  }
  const handleEditProduct = async(e) => {
    e.preventDefault();
     try {
       await axios
         .put(`http://localhost:3000/api/product/editproduct/${id}`, {
           title,
           image,
           price,
           storage,
           delivery,description
         })
         .then((res) => {
           console.log(res.data);
           // console.log("ok");
           navigate("/admin/product");
         });
     } catch (error) {
       console.log("Error: ", error);
     }
  }
    return (
      <div className="editproduct">
        <Sidebar />
        <div className="editproductContainer">
          <Navbar />
          <div className="top">
            <div className="left text-slate-500 text-4xl ">
              Cập nhật thông tin
            </div>
            <div className="right">
              <form action="">
                <div className="formInput1">
                  <label htmlFor="nameProduct">Tên sản phẩm</label>
                  <input
                    type="text"
                    defaultValue={product.title}
                    id="nameProduct"
                    name="nameProduct"
                  />
                </div>
                <div className="formInput1">
                  <label htmlFor="priceProduct">Giá</label>
                  <input
                    type="text"
                    defaultValue={product.price}
                    id="priceProduct"
                    name="priceProduct"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="formInput1">
                  <label htmlFor="storageP">Số lượng hàng nhập kho</label>
                  <input
                    type="text"
                    defaultValue={product.storage}
                    id="storageP"
                    name="storageP"
                    onChange={(e) => setStorage(e.target.value)}
                  />
                </div>
                <div className="formInput1">
                  <label htmlFor="deliveP">Số lượng hàng tồn kho</label>
                  <input
                    type="text"
                    defaultValue={product.delivery}
                    id="deliveP"
                    name="deliveP"
                    onChange={(e) => setDelivery(e.target.value)}
                  />
                </div>
                <div className="formInput1">
                  <label htmlFor="unit">Đơn vị tính: </label>
                  <input
                    type="text"
                    defaultValue={product.unit}
                    id="unit"
                    name="unit"
                    onChange={(e) => setDelivery(e.target.value)}
                  />
                </div>
                <div className="formInput1">
                  <label htmlFor="img">Ảnh</label>
                  <input
                    type="text"
                    defaultValue={product.image}
                    id="img"
                    name="img"
                    onChange={(e) => setImage(e.target.value)}
                    // defaultValue={image}
                    // onChange={(e) => setImage(e.target.value)}
                  />
                </div>
                <div className="formInput1">
                  <label htmlFor="description">Mô Tả: </label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="10"
                    name="description"
                    defaultValue={product.description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="end">
              <button
                className="bg-blue-800 w-[200px]"
                onClick={handleEditProduct}
              >
                <p className="text-white font-semibold text-xl mb-1 py-2">
                  Sửa
                </p>
              </button>
            </div>
          </div>
          {/* <div className="row ">
            <p className="flex justify-center items-center text-3xl font-semibold py-2">
              Chỉnh sửa thông tin sản phẩm
            </p>
            <div className="flex justify-center items-center">
              <form onSubmit={handleEditProduct}
                // method="post"
                // enctype="multipart/form-data"
                className="mt-1"
              >
                <div className="form-group mt-2">
                  <label htmlFor="nameProduct">Tên sản phẩm: </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={product.title}
                    id="nameProduct"
                    name="nameProduct"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-group mt-2">
                  <label htmlFor="priceProduct">Giá: </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={product.price}
                    id="priceProduct"
                    name="priceProduct"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="storageP">Số Lượng Hàng Nhập Kho: </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={product.storage}
                    id="storageP"
                    name="storageP"
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
                    defaultValue={product.delivery}
                    id="deliveP"
                    name="deliveP"
                    onChange={(e) => setDelivery(e.target.value)}
                  />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="img">Hình ảnh</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={product.image}
                    id="img"
                    name="img"
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
                {/* <div className="form-group mt-2">
                  <label htmlFor="hinh">Hình Ảnh: </label>
                  <input
                    type="file"
                    className="form-control"
                    id="hinh"
                    name="file_upload"
                    value=""
                    multiple="multiple"
                  />
                </div> */}
        </div>
      </div>
    );
}

export default EditProduct
