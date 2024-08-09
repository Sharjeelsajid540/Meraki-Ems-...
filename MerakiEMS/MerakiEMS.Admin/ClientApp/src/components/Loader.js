import { Fragment } from 'react'
import "./css/Loader.css";
export default function Loader(){
  return (
    <Fragment>
      <div className='loader'>
        <div className='lds-roller'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </Fragment>
  )
}
