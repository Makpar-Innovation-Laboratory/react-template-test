import React, { useState } from "react";
import Auth from "../../Utility/Auth";
import axios from "axios";
/**
 * @component
 * @description
 * description goes here
 * @returns {}
 */
export default function Home() {
  /**
   *
   */
  function handleSubmit() {
    let token = Auth.getToken();

    let postString =
      "https://api-perdiem-staging.makpar-innovation.com/per-diem/";
    let authStr = "Bearer " + String(token);
    // console.log(authStr)
    const options = axios
      .post(
        postString,
        {},
        {
          headers: {
            Authorization: authStr,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        // context.updateData(res.data.results)
        // setReturn(res.data.results)
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <div
      className="d-flex flex-column align-items-center background-light "
      style={{ width: "100%", minHeight: "95vh" }}
    >
      <h2 className="mt-3">Artist Search</h2>

      <div
        className="d-flex flex-column align-items-center bg-white py-3"
        style={{ width: "70%", minHeight: "150px" }}
      >
        <label className="color-dark">Enter Artist Name</label>
        <input
          className="mt-3"
          placeholder="Search"
          style={{ width: "400px" }}
        />
        <button className="btn btn-round-primary mt-3">Search</button>
      </div>

      <div
        className="d-flex flex-column align-items-center bg-white mt-4"
        style={{ width: "70%", minHeight: "40vh" }}
      >
        <div className="d-flex flex-column align-items-center py-4">
          <h4 className="color-primary">Artist Info</h4>

          {/* <p>Enter an artist name to see info</p> */}
          <table className="mt-4" id="customers" style={{ minWidth: "700px" }}>
            <tr
              className="d-flex flex-row justify-content-between border-top px-5 py-2"
              id="table-body"
            >
              <p>
                <b>Name:</b>
              </p>
              <p className="text-right">John Doe</p>
            </tr>
            <tr
              className="d-flex flex-row justify-content-between border-top px-5 py-2"
              id="table-body"
            >
              <p>
                <b>Birth/Death Dates:</b>
              </p>
              <p className="text-right">01/01/1970 - 01/01/2016</p>
            </tr>
            <tr
              className="d-flex flex-row justify-content-between border-top px-5 py-2"
              id="table-body"
            >
              <p>
                <b>Biographical Information:</b>
              </p>
              <p className="text-right">United States</p>
            </tr>
          </table>
        </div>
        <div className="d-flex flex-column align-items-center py-4">
          <h4 className="color-primary">Artworks</h4>

          <div
            className="border d-flex flex-column align-items-center"
            style={{ width: "350px", height: "350px" }}
          >
            <h5 className="mt-3">Title of Artwork</h5>
            <div className="d-flex justify-content-between" style={{width: "70%"}}>
              <p>Classification: </p>
              <p>placeholder</p>
            </div>
            <div className="d-flex justify-content-between" style={{width: "70%"}}>
              <p>Display Date:</p>
              <p>01/01/2021</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
