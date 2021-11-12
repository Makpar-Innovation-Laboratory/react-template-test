import React, { useState, useEffect } from 'react';

export default function Table(props) {
    const [Loading, setLoading] = useState(true);
    const totalTransaction = props.data.length;
    let totalAmount = 0;
  
    for (let i = 0; i < props.data.length; i++) {
      totalAmount += props.data[i][4];
    }


    useEffect(() => {
        if (props.data) {
            setLoading(false);
        }
    }, []);
  
  
    if (Loading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div>
            <div
            className="d-flex bg-white py-2 mb-2"
            style={{ height: "70px", width: "100%" }}
          >
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ width: "50%" }}
            >
              <p>Total Transactions</p>
              <h4>{totalTransaction}</h4>
            </div>
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ width: "50%", borderLeft: "1px solid #a0a0a0" }}
            >
              <p>Total Transaction Amount</p>
              <h4>${totalAmount.toLocaleString()}</h4>
            </div>
            {/* <div
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
            </div> */}
          </div>
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
    )
}
