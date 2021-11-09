import React from 'react'
// import { Country, State, City }  from 'country-state-city';
// import { ICountry, IState, ICity } from 'country-state-city'
import LocPicker from '../CountryCityState/locationpicker'
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

  return (
    <div className='d-flex flex-column align-items-center' style={{ width: '100%' }}>
      <h2 className='mt-3'>Home</h2>
      <LocPicker />
    </div>
  )
}
