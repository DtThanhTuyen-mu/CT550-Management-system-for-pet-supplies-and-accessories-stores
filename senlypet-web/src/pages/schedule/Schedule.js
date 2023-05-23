import React from 'react'
import './Schedule.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import ScheduleC from '../../components/schedule/Schedule'
const Schedule = () => {
  return (
    <div className='schedule'>
          <Sidebar />
          <div className="scheduleContainer">
              <Navbar />
              <div className='mx-2'>
                  
<ScheduleC />
              </div>
          </div>
    </div>
  )
}

export default Schedule
