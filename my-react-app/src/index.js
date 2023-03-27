import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';

class Index extends React.Component {
  state = { number: 0 }
  handleClick = () => {
    setTimeout(() => {
      this.setState({ number: this.state.number + 1 }, () => {
        console.log('callback1', this.state.number)
      })
      console.log(this.state.number)

      this.setState({ number: this.state.number + 1 }, () => {
        console.log('callback2', this.state.number)
      })
      console.log(this.state.number)

      this.setState({ number: this.state.number + 1 }, () => {
        console.log('callback3', this.state.number)
      })
      console.log(this.state.number)
    })
  }
  render() {
    return <div>
      {this.state.number}
      <button onClick={this.handleClick}> number++ </button>
    </div>
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      {/* <App /> */}
      <Index />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
