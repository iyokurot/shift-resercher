import React from 'react'
import '../css/Loading.css'

export default function loading() {
  return (
    <div className="loading">
      <span className="loadingtext">Loading...</span>
      <div className="orbit-spinner">
        <div className="orbit"></div>
        <div className="orbit"></div>
        <div className="orbit"></div>
        <div className="loadingAdnyan"></div>
      </div>
    </div>
  )
}
