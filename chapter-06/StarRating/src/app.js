import React, { useState } from "react";
import ColorList from "./components/ColorList";
import colorData from "../data/color-data.json";


export default function App() {
  const [colors] = useState(colorData);
  return <ColorList colors={colors} />
}

