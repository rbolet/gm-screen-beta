import './Loading.css';
import React from 'react';

export default function Loading() {
  return (
    <div className='spinner-container'>
      <span className="spin"><i className="fas fa-spinner"></i></span>
    </div>
  );
}
