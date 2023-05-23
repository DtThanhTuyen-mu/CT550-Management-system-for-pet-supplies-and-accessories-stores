import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./Product.scss";
import axios from "axios";
import VND from "../../components/currency";
import ReadMore from "../../components/readmore/ReadMore";
import { render } from "react-dom";
import { Link ,useNavigate} from "react-router-dom";
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



const Product = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [idde, setIdde] = useState();

 const [open, setOpen] = React.useState(false);
 const handleOpen = (id) => {
   setOpen(true);
   setIdde(id);
   // console.log("props:", id);
 };
 const handleClose = () => setOpen(false);
 

  console.log(products);
  const handleDelete = async (id) => {
    console.log(id);
    await axios
      .put(`http://localhost:3000/api/product/${id}`)
      .then((res) => {
        console.log(res.status);
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    await axios
      .get("http://localhost:3000/api/products")
      .then((res) => {
        const products = res?.data.products;

        setProducts(products);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  return (
    <div className="product w-100">
      <Sidebar />
      <div className="productContainer">
        <Navbar />
        <div className="row pl-1 ms-1 py-[10px]">
          <div className="flex justify-between items-center mt-[10px]">
            <p className="text-center text-[24px] text-gray-400">
              Thêm sản phẩm phẩm mới
            </p>
            <Link to="create" className="link pt-8px">
              Thêm mới
            </Link>
          </div>
          {/*  <div
            className=" border-2 p-1 ms-4 mt-4 rounded-2xl"
            style={{ width: "330px" }}
          >
            <div className="mx-auto">
              <div className="flex justify-center items-center mt-2">
                <img
                  className="img-fluid rounded-xl"
                  src="/images/avatar.jpg"
                  style={{ width: "180px" }}
                />
              </div>
            </div>
            <div className="p-2">
              <p className="text-justify text-[18px] font-semibold mb-0 px-2">
                Thuc an hop Pate cho Cho 450g
              </p>
              <span> Giá: {VND.format(150000)}</span>
              <div className="justify-around flex">
                <span className="w-50">Nhập: 10</span>
                <span className="w-50">Tồn: 5</span>
              </div>
              <p className="text-justify mb-1 text-[14px]">
                Mô tả: Gan heo và gan gà sau khi mua về bạn rửa với nước cho
                sạch rồi ngâm trong nước muối loãng khoảng 10 - 15 phút để khử
                mùi hôi. Sau đó, bạn vớt gan ra, cho vào tô ngâm cùng 350ml sữa
                tươi không đường khoảng 30 phút. Sau 30 phút, vớt gan ra, rửa
                qua với nước cho sạch rồi để ráo. Bạn cắt khúc 1 ổ bánh mì, sau
                đó ngâm cùng 350ml sữa tươi không đường khoảng 15 phút, đến khi
                bánh mì mềm.
              </p>
            </div>
            <div className="flex justify-evenly bottom-0 right-0 left-0">
              <button className="py-2 px-3 rounded-sm bg-slate-600">Sửa</button>
              <button className="py-2 px-3 rounded-sm bg-slate-600">Xóa</button>
            </div>
          </div> */}

          {products.map((product, index) => (
            <div
              key={index}
              className=" border-2 p-1 ms-4 mt-4 rounded-2xl"
              style={{ width: "330px" }}
            >
              <div className="mx-auto">
                <div className="flex justify-center items-center mt-2">
                  <img
                    className="img-fluid rounded-xl"
                    // src="/images/avatar.jpg"
                    src={product.image}
                    style={{ width: "180px" }}
                  />
                </div>
              </div>
              <div className="p-2">
                <p className="text-justify text-[18px] font-semibold mb-0 px-2">
                  {product.title}
                </p>
                <span className="me-5"> Giá: {VND.format(product.price)}</span>
                <span className="ps-1">Đơn vị: {product.unit} </span>
                <div className="justify-around flex">
                  <span className="w-50">Nhập: {product.storage}</span>
                  <span className="w-50">Tồn: {product.delivery}</span>
                </div>
                <div className="text-justify mb-1 text-[14px]">
                  <ReadMore
                    text={product.description}
                    numberOfLines={6}
                    readMoreLabel="Read All"
                  />
                </div>
              </div>
              <div className="flex justify-evenly bottom-0 right-0 left-0">
                <Link
                  to={`editproduct/${product._id}`}
                  className="no-underline text-white"
                >
                  <button className="py-2 px-3 rounded-sm bg-slate-600">
                    Sửa
                  </button>
                </Link>
                <button
                  className="py-2 px-3 rounded-sm bg-slate-600"
                  onClick={() => handleOpen(product._id)}
                  // onClick={() => handleDelete(product._id)}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
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
// render(<Product />, document.getElementById("root"));
export default Product;
