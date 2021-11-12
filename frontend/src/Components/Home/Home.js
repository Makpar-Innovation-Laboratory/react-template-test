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
  };
  function handleSubmit() {
    // let token = Auth.getToken();

    let postString = "https://api-ccc-dev.makpar-innovation.com/search";
    // let authStr = "Bearer " + String(token);
    // console.log(authStr)
    const options = axios
      .post(
        postString,
        {
          artist_name: searchTerm,
        },
        {
          // headers: {
          //   Authorization: authStr,
          // },
        }
      )
      .then((res) => {
        console.log(res.data);
        context.updateData(res.data);
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
          autoComplete="off"
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

      {context.data.results.length > 0 ? (
        context.data.results.map((artist, key) => {
          return (
            <div
              className="d-flex flex-column align-items-center bg-white mt-4 mb-5"
              style={{ width: "70%", minHeight: "40vh" }}
              key={key}
            >
              <ArtistInfo artist={artist} />
            </div>
          );
        })
      ) : (
        <div
          className="d-flex flex-column align-items-center justify-content-center bg-white mt-4"
          style={{ width: "70%", minHeight: "40vh" }}
        >
          <p>No artist found</p>
        </div>
      )}
    </div>
  );
}
