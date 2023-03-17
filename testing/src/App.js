import Star from "./Star";
import StateDemo from "./components/StateDemo";
import { Routes, Route } from "react-router-dom";

import {
  Home,
  About,
  Events,
  Products,
  Contact,
  Whoop404
} from './pages'


function App() {
  return (
    <div className="App">
      <StateDemo />
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
        <Route
          path="*"
          element={<Whoop404 />}
        ></Route>

      </Routes>
    </div>
  );
}

export default App;
