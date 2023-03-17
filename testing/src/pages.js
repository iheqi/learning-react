import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Home() {

  const [state, setState] = useState(0);

  // useLayoutEffect 执行时机，DOM树布局之后，浏览器渲染之前。
  useLayoutEffect(() => {
    const div = document.getElementById('div');
    console.log(div.innerHTML);

    const start = Date.now();
    while (Date.now() - start < 15000) {

    }
    console.log("15秒过去了");
  })

  useEffect(() => {
    console.log('useEffect');
  })

  return (
    <div>
      <div id='div'>{state}</div>
      <div>
        <button onClick={() => setState(1)}>setState</button>
      </div>
    </div>
  )
}


export function About() {
  return (
    <div>
      <h1>[About]</h1>


    </div>
  )
}

export function Events() {
  return (
    <div>
      <h1>[Events]</h1>
    </div>
  )
}

export function Products() {
  return (
    <div>
      <h1>[Products]</h1>
    </div>
  )
}

export function Contact() {
  return (
    <div>
      <h1>[Contact]</h1>
    </div>
  )
}

export function Whoop404() {
  const location = useLocation()
  return (
    <div>
      <h1>[location.pathname]: {location.pathname}</h1>
    </div>
  )
}