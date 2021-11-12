import React, { useState, useContext } from "react";
import Auth from "../../Utility/Auth";
import axios from "axios";
import ArtistInfo from "./ArtistInfo";
import { Context } from "../../App";
/**
 * @component
 * @description
 * description goes here
 * @returns {}
 */
export default function Home() {
  const context = useContext(Context);

  const [searchTerm, setSearchTerm] = useState("");
  /**
   *
   */
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    console.log(searchTerm);
  };
  function handleSubmit() {
    // let token = Auth.getToken();

    let postString = "https://api-ccc-dev.makpar-innovation.com/mock-data";
    // let authStr = "Bearer " + String(token);
    // console.log(authStr)
    const options = axios
      .post(
        postString,
        {},
        {
          // headers: {
          //   Authorization: authStr,
          // },
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
          value={searchTerm}
          onChange={handleChange}
          id="Search-Bar"
        />
        <button
          className="btn btn-round-primary mt-3"
          id="Search-Button"
          type="button"
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>

      {context.data.results.length > 0
        ? context.data.results.map((artist) => {
            return (
              <div
                className="d-flex flex-column align-items-center bg-white mt-4"
                style={{ width: "70%", minHeight: "40vh" }}
              >
                <ArtistInfo artist={artist} />
              </div>
            );
          })
        : ""}
    </div>
  );
}
