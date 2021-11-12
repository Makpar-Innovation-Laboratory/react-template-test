import React from "react";

export default function DataDisplay(props) {
  const totalTransaction = props.data.length;
  let totalAmount = 0;

  for (let i = 0; i < props.data.length; i++) {
    totalAmount += props.data[i][4];
  }

  return (
    <div className="d-flex flex-column align-items-center pt-3" style={{ widht: "100%" }}>
        <h3 className="text-centered py-3">Data Display</h3>
      <div style={{width: "90%"}}>
        {/* Data Preview/Summary */}
        
        <div className="d-flex bg-white" style={{ height: "70px" }}>
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ width: "25%" }}
          >
            <p>Total Transactions</p>
            <h4>{totalTransaction}</h4>
          </div>
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ width: "25%", borderLeft: "1px solid #a0a0a0" }}
          >
            <p>Total Transaction Amount</p>
            <h4>${totalAmount.toLocaleString()}</h4>
          </div>
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ width: "25%", borderLeft: "1px solid #a0a0a0" }}
          >
            <p>Total Transactions</p>
            <h4>{totalTransaction}</h4>
          </div>
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ width: "25%", borderLeft: "1px solid #a0a0a0" }}
          >
            <p>Total Transaction Amount</p>
            <h4>${totalAmount.toLocaleString()}</h4>
          </div>
        </div>
        <div>{/* Pagination */}</div>
        <div className="pt-3">
          {/* Main Table */}
          <table id="customers">
            <thead>
              <tr className="background-dark">
                <th>Award ID</th>
                <th>Mod</th>
                <th>Recipient Name</th>
                <th>Action Date</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {props.data.length > 0 ? (
                props.data.map((data) => {
                  return (
                    <tr>
                      <td>{data[0]}</td>
                      <td>{data[1]}</td>
                      <td>{data[2]}</td>
                      <td>{data[3]}</td>
                      <td>${data[4].toLocaleString()}</td>
                    </tr>
                  );
                })
              ) : (
                <div className="text-center">No data found</div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
