import './Loading.css';
import React from 'react';

export default function Loading(props) {
  return (
    <div className='spinner-container'>
      {props.children}
      <div className="spin"><i className="fas fa-spinner"></i></div>
    </div>
  );
}
