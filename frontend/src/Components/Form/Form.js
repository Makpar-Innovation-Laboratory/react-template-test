import React, { useState } from "react";
import DatePicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"

import Select from 'react-select'



export default function NameForm() {
  const today = new Date()
  const tomorrow = new Date()

  tomorrow.setDate(tomorrow.getDate() + 1)
  const [name, setName] = useState("");
  const [dateRange, setDateRange] = useState([today, tomorrow])
  const [destination, setDestination] = useState("")
  const [reason, setReason] = useState("")
  const [flag, setFlag] = useState("false")
  let postArr
  const options = [
    { value: 'Virginia', label: 'Virginia' },
    { value: 'Utah', label: 'Utah' },
    { value: 'Vermont', label: 'Vermont' }
  ]
  function onValueChange(event) {
    setFlag(event.target.value);
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();
    let token = Auth.getToken();
    let postString = "https://api-innolab-dev.makpar-innovation.net/gamma";
    let authStr = "Bearer " + String(token);
    // console.log(authStr)
    const options = axios
      .post(
        postString,
        {
          name: name,
          start_date:dateRange[0],
          end_date: dateRange[1],
          destination:destination,
          flag:flag,
          reason:reason
        },
        {
          headers: {
            Authorization: authStr,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        // context.updateData(res.data);
        // setReturn(res.data.results)
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
              checked={flag === "true"}
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
              checked={flag === "false"}
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