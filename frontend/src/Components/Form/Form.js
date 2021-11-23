import React, { useState } from "react";
import { DateRangePicker } from 'rsuite';

import Select from 'react-select'



export function NameForm(props) {
  const [name, setName] = useState("");
  const [dateRange, setDateRange] = useState("")
  const [destination, setDestination] = useState("")
  let postArr
  const options = [
    { value: 'Virginia', label: 'Virginia' },
    { value: 'Utah', label: 'Utah' },
    { value: 'Vermont', label: 'Vermont' }
  ]
  const handleSubmit = (evt) => {
      evt.preventDefault();
      console.log(name, dateRange, destination)
  }
  return (
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
        <DateRangePicker appearance="subtle" placeholder="Subtle" style={{ width: 230 }}  onChange={e => setDateRange(e.target.value)}/>
      </label>
      <label>
        Select Destination:
        <Select options={options} onChange={e => setDestination(e.value)}/>
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}