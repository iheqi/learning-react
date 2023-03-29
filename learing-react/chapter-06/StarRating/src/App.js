import React, { useState, useEffect } from "react";
import ColorList from "./components/ColorList";
import colorData from "../data/color-data.json";



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

export default function App() {
  const [colors, setColors] = useState(colorData);
  return (
    <Index />
    // <ColorList
    //   colors={colors}
    //   onRateColor={(id, rating) => {
    //     const newColors = colors.map(color => color.id === id ? { ...color, rating } : color);
    //     setColors(newColors);
    //   }}
    //   onRemoveColor={id => {
    //     const newColors = colors.filter(color => color.id !== id);
    //     setColors(newColors);
    //   }}
    // />
  )
}

