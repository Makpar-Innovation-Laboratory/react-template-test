import React, {useState} from 'react'
// import { DateRangePicker } from 'react-date-range';
// import LocPicker from '../CountryCityState/locationpicker'
import DatePicker from "react-datepicker";
import Table from '../Table/table'
import Auth from '../../Utility/Auth'
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
/**
 * @component
 * @description
 * description goes here
 * @returns {} 
 */
export default function Home () {
  /**
   * 
   */
  const [startDate, setStartDate] = useState(new Date("2021/11/10"));
  const [endDate, setEndDate] = useState(new Date("2021/11/10"));
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  function handleSubmit() {
    
    let token = Auth.getToken()
    
    let postString = "https://api-perdiem-staging.makpar-innovation.com/per-diem/" 
    let authStr = "Bearer " + String(token)
    // console.log(authStr)
    const options = axios.post(postString, {}, {
          headers: {
              Authorization: authStr
          }})
          .then(res => {
              console.log(res.data)
              // context.updateData(res.data.results)
          }).catch(error => {
          console.log(error.message)
      })     
  }
  return (
    <div className='d-flex flex-column align-items-center' style={{ width: '100%' }}>
      <h2 className='mt-3'>Your Itinerary</h2>
      {/* <button type="button" onClick={(e) => handleSubmit()}>Submit</button> */}
      <div className='d-flex justify-content-start' >
          <h3> Trip Name </h3>
          <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
      </div>
      <Table />
    </div>
  )
}
