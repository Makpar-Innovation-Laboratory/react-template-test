import React from 'react'
import { DateRangePicker } from 'react-date-range';
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
      <DateRangePicker />
      <LocPicker />
    </div>
  )
}
