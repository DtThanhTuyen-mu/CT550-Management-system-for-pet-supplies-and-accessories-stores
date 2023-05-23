import React from 'react'
import './Customer.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DatatableCustomer from '../../components/datatableCustomer/DatatableCustomer'
function Customer() {
  return (
    <div className="customer">
      <Sidebar />
      <div className="customerContainer">
        <Navbar />

        <DatatableCustomer />
      </div>
    </div>
  );
}

export default Customer