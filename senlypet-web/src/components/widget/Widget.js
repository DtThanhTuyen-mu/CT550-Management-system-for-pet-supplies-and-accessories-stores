import "./Widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import StoreIcon from "@mui/icons-material/Store";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import { useEffect, useState } from "react";
import axios from "axios";
import {Link } from "react-router-dom";
const Widget = ({ type }) => {
  
const [products, setProducts] = useState(0);
const [billproducts, setBillProducts] = useState(0);
const [billproductsd, setBillProductsD] = useState(0);
const [totalbillproducts, settotalBillProducts] = useState(0);
const [totalbillproductsd, settotalBillProductsD] = useState(0);
const [totalbillservices, settotalBillServices] = useState(0);
const [totalbillservicesd, settotalBillServicesD] = useState(0);
const [services, setServices] = useState(0);
const [billservices, setBillServices] = useState(0);
const [billservicesd, setBillServicesD] = useState(0);
const [bill, setBill] = useState(0);
const [billdate, setBillDate] = useState(0);

useEffect(() => {
  getProducts();
  // getBillProducts();
  getBillPDate ();

  getServices();
  // getBillServices();
  getBillServicesDate();
  // getBillMonth();
  getBillDate();
}, []);

const getProducts = async () => {
  await axios
    .get("http://localhost:3000/api/products")
    .then((res) => {
      const products = res?.data.products;
      setProducts(products.length);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};
  const getBillPDate = async () => {
    await axios
      .get("http://localhost:3000/api/bill/product/currentdate")
      .then((res) => {
        const billproducts = res?.data.billProduct;
        // console.log("Date: ", billproducts);
        let totalbillproductsd = 0;
         for (let i = 0; i < billproducts.length; i++) {
           // console.log(billproducts[i].total);
           totalbillproductsd += billproducts[i].total;
         }
         // const totalbillproducts = billproducts.reduce((partialSum, a) => partialSum + a, 0);
         settotalBillProductsD(totalbillproductsd);
         // console.log("Cd bill pro: ", billproducts);
         setBillProductsD(billproducts.length);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }
const getBillProducts = async () => {
  await axios
    .get("http://localhost:3000/api/bill/product/currentMonth")
    .then((res) => {
      const billproducts = res?.data.billProduct;
      let totalbillproducts =0;
      for (let i = 0; i < billproducts.length; i++){
        // console.log(billproducts[i].total);
        totalbillproducts += billproducts[i].total;
      }
      // const totalbillproducts = billproducts.reduce((partialSum, a) => partialSum + a, 0);
      settotalBillProducts(totalbillproducts);
      // console.log("Cd bill pro: ", billproducts);
      setBillProducts(billproducts.length);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};
const getBillServices = async () => {
  await axios
    .get("http://localhost:3000/api/bill/service/currentMonth")
    .then((res) => {
      const billservices = res?.data.billService;
       let totalbillservices = 0;
       for (let i = 0; i < billservices.length; i++) {
        //  console.log(billservices[i].total);
         totalbillservices += billservices[i].total;
       }
      settotalBillServices(totalbillservices);
      // console.log("Cd bill pro: ", bp.length);
      setBillServices(billservices.length);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};
const getBillServicesDate = async () => {
  await axios
    .get("http://localhost:3000/api/bill/service/currentDate")
    .then((res) => {
      const billservices = res?.data.service;
       let totalbillservicesd = 0;
       for (let i = 0; i < billservices.length; i++) {
         totalbillservicesd += billservices[i].total;
       }
      settotalBillServicesD(totalbillservicesd);
      setBillServicesD(billservices.length);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};
  // la 
const getBillDate = async () => {
  await axios
    .get("http://localhost:3000/api/bill/service&product/currentDate")
    .then((res) => {
      const bill = res?.data.bill;
      setBillDate(bill);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};
const getBillMonth = async () => {
  await axios
    .get("http://localhost:3000/api/bill/service&product/currentMonth")
    .then((res) => {
      const bill = res?.data.bill;
      // console.log("Cd bill pro &ser: ", bill);
      setBill(bill);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};
const getServices = async () => {
  await axios
    .get("http://localhost:3000/api/services")
    .then((res) => {
      const services = res?.data.getServices;
      // console.log(services)
      setServices(services.length);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};

  let data;
  let sl = 2;
  switch (type) {
    case 'Service':
      data = {
        title: "Dịch vụ",
        quantity: services,
        link:'/admin/service',
        icon: (
          <MiscellaneousServicesIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)"
            }}
          />
        )
      };
      break;
    case 'Product':
      data = {
        title: "Sản phẩm",
        quantity: products,
        link: "/admin/product",
        icon: (
          <StoreIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod"
            }}
          />
        )
      };
      break;
    case 'Order':
      data = {
        title: "Order",
        quantity: sl,
        icon: (
          <CreditCardIcon
            className="icon"
            style={{
              backgroundColor: "rgba(0, 128, 0, 0.2)",
              color: "green"
            }}
          />
        )
      };
      break;
    case 'Order Product':
      data = {
        title: "Đơn hàng sản phẩm",
        quantity: billproductsd,
        link: "/admin/bill",
        icon: (
          <ReceiptIcon
            // <MonetizationOnOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgb(237 127 18 / 25%)",
              color: "#c35100"
            }}
          />
        )
      };
      break;
    case 'Order Service':
      data = {
        title: "Đơn hàng dịch vụ",
        quantity: billservicesd,
        link: "/admin/bill",
        icon: (
          <ReceiptIcon
            className="icon"
            style={{
              // backgroundColor: "rgba(0, 128, 0, 0.2)",
              // color: "green"
              color: "#c35100",
              backgroundColor: "rgb(237 127 18 / 25%)"
            }}
          />
        )
      };
      break;
    case 'Order':
      data = {
        title: "Order",
        quantity: sl,
        icon: (
          <CreditCardIcon
            className="icon"
            style={
              {
                // backgroundColor: "rgba(0, 128, 0, 0.2)",
                // color: "green"
                 color: "crimson",
                 backgroundColor: "rgba(255, 0, 0, 0.2)"
              }
            }
          />
        )
      };
      break;
    case 'Total':
      data = {
        title: "Tổng tiền",
        quantity: billdate,
        icon: (
          <CreditCardIcon
            className="icon"
            style={{
              backgroundColor: "rgba(0, 128, 0, 0.2)",
              color: "green"
            }}
          />
        )
      };
      break;
    case 'Banlan':
      data = {
        title: "Lợi nhuận",
        quantity: totalbillservicesd *0.4 + totalbillproductsd * 0.3,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple"
              // color: "crimson",
              // backgroundColor: "rgba(255, 0, 0, 0.2)"
            }}
          />
        )
      };
      break;
    default:
      break;
}

  return (
    <div className="widget ">
      <div className="left1">
        <span className="title mb-0">{data.title}</span>
        <span className="counter ps-3">{data.quantity}</span>
        {data.title !== "Lợi nhuận" && data.title !== "Tổng tiền" ? (
          <Link className="no-underline" to={data.link} >
          <span className="link text-black ">Xem thêm </span>
          </Link>
        ) : (
          <span className="link "></span>
        )}
      </div>
      <div className="right1 ">{data.icon}</div>
    </div>
  );
};
export default Widget
