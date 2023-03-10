import Star from "./Star";
import { Routes, Route } from "react-router-dom";

import {
  Home,
  About,
  Events,
  Products,
  Contact
} from './pages'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Home />}
        ></Route>
        <Route
          path="/about"
          element={<About />}
        ></Route>
        <Route
          path="/events"
          element={<Events />}
        ></Route>
        <Route
          path="/products"
          element={<Products />}
        ></Route>
        <Route
          path="/about"
          element={<Events />}
        ></Route>
        <Route
          path="/contact"
          element={<Contact />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
