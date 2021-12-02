import React, { useState, useContext } from "react";
import Auth from "../../Utility/Auth";
import axios from "axios";
// import ArtistInfo from "./ArtistInfo";
import NameForm from '../Form/Form'
import Table from '../Table/Table'
import { Context } from "../../App";
import CommentBox from "../Comments/CommentBox";
/**
 * @component
 * @description
 * description goes here
 * @returns {}
 */
export default function Home() {
  const context = useContext(Context);
  // let theadData = ["name","start", "end", "flag", "reason", "destination"]
 
  // const handleClick = (e) => {
  //   let token = Auth.getToken();
  //   let getString = "https://api-innolab-dev.makpar-innovation.net/gamma";
  //   let authStr = "Bearer " + String(token);
  //   // console.log(authStr)
  //   const options = axios
  //     .get(
  //       getString,
  //       {
  //         headers: {
  //           Authorization: authStr,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       // console.log('success:', res)
  //       // context.updateData({results: res.data['Time Series (Daily)']});
  //       context.updateData(res.data)
  //       context.updateTableVis(true)
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // }
  return (
    <div
      className="d-flex flex-column align-items-center background-light "
      style={{ width: "100%", minHeight: "95vh" }}
    >
      <h2 className="mt-3">Welcome</h2>
      <CommentBox/>
      {/* <NameForm />
      <Table theadData={theadData} tbodyData={context.data.results}/> */}
      {/* <button type="button" onClick={handleClick} /> */}
      
    </div>
  );
}
