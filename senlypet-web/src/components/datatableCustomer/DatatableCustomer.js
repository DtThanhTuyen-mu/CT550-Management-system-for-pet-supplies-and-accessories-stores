import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function DatatableCustomer() {
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    getCustomer();
  }, []);

  const getCustomer = async () => {
    await axios.get("http://localhost:3000/api/customers").then((res) => {
      const temp = res?.data;
      setCustomer(temp);
      console.log("THong tin khach hang: ", temp);
    });
  };

  return (
    <div className="datatable">
      <div class="table-responsive text-nowrap border-1">
        <table class="table table-hover mt-1">
          <thead>
            <tr class="text-center">
              <td>STT</td>
              <td>Ảnh</td>
              <td>Họ tên</td>
              <td>Số điện thoại</td>
              <td>Địa chỉ</td>
              <td>Thao tác</td>
            </tr>
          </thead>
          {customer.map((st, k) => (
            <tbody
              key={k}
              className="border-1 h-[50px] justify-center items-center"
            >
              <td className="text-center pt-4">{k + 1}</td>
              <td class="text-center pt-2 w-[60px]">
                <img class="img-fluid" src={st.image} />
              </td>
              <td class="text-center pt-4">{st.fullname}</td>
              <td class="text-center pt-4">{st.phone}</td>
              <td class="text-center pt-4">{st.address}</td>
              <td class="text-center pt-4">
                <Link
                  to={`statistical/${st._id}/${st.fullname}`}
                  className="no-underline text-white rounded-lg my-3"
                  style={{ backgroundColor: "green" }}
                >
                  <button className="w-[50px]">Xem</button>
                </Link>
              </td>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}

export default DatatableCustomer;
