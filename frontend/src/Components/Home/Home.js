import React, {useState} from 'react'
import Auth from '../../Utility/Auth'
import axios from 'axios'
/**
 * @component
 * @description
 * description goes here
 * @returns {} 
 */
export default function Home () {
  /**
   * 
   */
  function handleSubmit() {
    
    let token = Auth.getToken()
    
    let postString = "https://api-perdiem-staging.makpar-innovation.com/per-diem/" 
    let authStr = "Bearer " + String(token)
    // console.log(authStr)
    const options = axios.post(postString, {}, {
          headers: {
              Authorization: authStr
          }})
          .then(res => {
              console.log(res.data)
              // context.updateData(res.data.results)
              // setReturn(res.data.results)
          }).catch(error => {
          console.log(error.message)
      })     
  }

  return (
    <div className='d-flex flex-column align-items-center' style={{ width: '100%' }}>
      <h2 className='mt-3'>Makpar Innovation Lab</h2>
      
    
      <div className='d-flex justify-content-start' style={{ width: '90%'}}>
          <h3> The Team </h3>
      </div>
      <button type="button" onClick={(e) => handleSubmit()}>Submit</button>
    </div>
  )
}
