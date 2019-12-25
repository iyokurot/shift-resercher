import React from 'react'

export default function loading() {
  return (
    <div className="loading">
      <span className="loadingtext">Loading...</span>
      <div className="orbit-spinner">
        <div className="orbit"></div>
        <div className="orbit"></div>
        <div className="orbit"></div>
      </div>
    </div>
  )
}
