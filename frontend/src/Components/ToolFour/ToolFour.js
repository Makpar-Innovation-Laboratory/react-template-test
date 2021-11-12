import React, { useState } from "react";
import Table from "./Table";

export default function ToolFour() {

  const [Submitted, setSubmitted] = useState(false);

  const [data, setData] = useState([
    ["G000001", "A00001", "Lorem ipsum", "01/01/2021", 1000000],
    ["G000002", "A00001", "Lorem ipsum", "01/01/2021", 2300000],
    ["G000003", "A00001", "Lorem ipsum", "01/01/2021", 3005000],
    ["G000004", "A00001", "Lorem ipsum", "01/01/2021", 1020000],
    ["G000005", "A00001", "Lorem ipsum", "01/01/2021", 4056000],
    ["G000006", "A00001", "Lorem ipsum", "01/01/2021", 2860000],
    ["G000007", "A00001", "Lorem ipsum", "01/01/2021", 6390000],
    ["G000008", "A00001", "Lorem ipsum", "01/01/2021", 4057400],
    ["G000009", "A00001", "Lorem ipsum", "01/01/2021", 4823000],
    ["G000010", "A00001", "Lorem ipsum", "01/01/2021", 1038080],
    ["G000011", "A00001", "Lorem ipsum", "01/01/2021", 2230000],
  ]);


  return (
    <div
      className="d-flex flex-column align-items-center background-light"
      style={{ width: "100%", minHeight: "90vh" }}
    >
      <h2 className="color-dark mt-3">Tool Four (Single Page App)</h2>

      <div
        className="d-flex flex-column align-items-center pt-3 bg-white"
        style={{ width: "90%" }}
      >
        <h3 className="text-centered py-3">Data Display</h3>

        <div className="d-flex align-items-center pb-3">
          <label className="color-dark">Label: </label>
          &nbsp;
          &nbsp;
          <input />
          &nbsp;
          &nbsp;
          <button className="btn btn-round-dark" onClick={(e) => setSubmitted(true)}>Filter</button>
        </div>

        <div style={{ width: "90%" }}>
          <div className="py-4">
            {/* Main Table */}
            { Submitted ? 
              <Table 
                data={data}
              />
            :
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "55vh" }}>
                <h4>Enter filter to see data</h4>
              </div>  
            }
          </div>
        </div>
      </div>
    </div>
  );
}
