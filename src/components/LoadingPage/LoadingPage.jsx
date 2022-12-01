import React from 'react'
import './LoadingPage.css'

const LoadingPage = () => {
  return (
    
    <div className='loading_page'>
        <div className="image">
        <img src={require('../../assets/icon.png')}/>
        <div className="spin spinner"></div>
    </div>
    </div>
  )
}

export default LoadingPage