import React, { useState, useContext} from "react";
import DatePicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import Auth from '../../Utility/Auth'
import Select from 'react-select'
import axios from 'axios'
import {Context} from '../../App'

export default function NameForm() {
  const today = new Date()
  const tomorrow = new Date()
  const context = useContext(Context)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const [name, setName] = useState("");
  const [dateRange, setDateRange] = useState([today, tomorrow])
  const [destination, setDestination] = useState("")
  const [reason, setReason] = useState("")
  const [flag, setFlag] = useState("false")
  const [radSelect, setRadSelect] = useState("false")
  
  let postArr
  const options = [
    { value: 'Virginia', label: 'Virginia' },
    { value: 'Utah', label: 'Utah' },
    { value: 'Vermont', label: 'Vermont' }
  ]
  function onValueChange(event) {
    if (event.target.value == 'true'){
      setFlag(true)
    } else{
      setFlag(false)
    }
    setRadSelect(event.target.value)
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();
    let jsn = {
      name: name,
      start_date: String(dateRange[0].toISOString().split('T')[0]),
      end_date: String(dateRange[1].toISOString().split('T')[0]),
      flag:flag,
      reason:reason,
      destination:destination
      
    }
    let token = Auth.getToken();
    let postString = "https://api-innolab-dev.makpar-innovation.net/gamma";
    let authStr = "Bearer " + String(token);
    // console.log(authStr)
    console.log(jsn)
    const options = axios
      .post(
        postString,
        {
          name: name,
          start_date: String(dateRange[0].toISOString().split('T')[0]),
          end_date: String(dateRange[1].toISOString().split('T')[0]),
          flag:flag,
          reason:reason,
          destination:destination
          
        },
        {
          headers: {
            Authorization: authStr,
          },
        }
      )
      .then((res) => {
        console.log('success:', res)
        // context.updateData({results: res.data['Time Series (Daily)']});
        // context.updateTableVis(true)
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  return (
    <div className="form-group">  
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <label>
        Select Dates:
        <DatePicker 
            multiple
            placeholder="Select Dates"
            value={dateRange} 
            onChange={setDateRange}
        />
      </label>
      <label>
        Select Destination:
        <Select options={options} onChange={e => setDestination(e.value)}/>
      </label>
      <label> Flag: </label>
      <div className="radio">
          <label>
            <input
              type="radio"
              value="true"
              checked={radSelect === "true"}
              onChange={onValueChange}
            />
            True
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="false"
              checked={radSelect === "false"}
              onChange={onValueChange}
            />
            False
          </label>
        </div>
      <label>
        Reason:
        <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            value={reason}
            rows="5"
            onChange={e => setReason(e.target.value)}
            />
      </label>
      <input type="submit" value="Submit" />
    </form>
  </div>
  );
}