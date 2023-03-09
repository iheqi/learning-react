import React, { useState, useEffect, memo } from "react";
import WordCount from "./components/WordCount";
import User from "./components/User";
import Cat from "./components/Cat";

// meow函数会导致重新渲染，而第二个参数可以控制是否重新渲染，返回false重新渲染
const PureCat = memo(Cat, (prevProps, nextProps) => prevProps.name === nextProps.name);

function App() {
  const [val, set] = useState("");
  const [phrase, setPhrase] = useState("example phrase");

  const createPhrase = () => {
    setPhrase(val);
    set("");
  }

  // useEffect(() => {
  //   console.log(`typing val: ${val}`);
  // }, [val]);
  // useEffect(() => {
  //   console.log(`saved phrase: ${phrase}`);
  // }, [phrase]);

  // useEffect(() => {
  //   console.log('either val or phrase has changed');
  // }, [val, phrase]);

  // useEffect(() => {
  //   console.log('only once after initial render');
  // }, []);


  // useEffect(() => {
  //   return () => {
  //     console.log("Goodbye!");
  //   }
  // }, []);

  const [cats, setCats] = useState(["Biscuit", "jungle", "Outlaw"]);

  return (
    <div className="App">
      <label>Favorite phrase:</label>
      <input
        value={val}
        placeholder={phrase}
        onChange={e => set(e.target.value)}
      />

      <button onClick={createPhrase}>send</button>

      <WordCount>You are not going to believe this but...</WordCount>

      <User></User>

      {
        cats.map((name, i) => (
          <PureCat key={i} name={name} meow={name => console.log(`${name} has meowed.`)} />
        ))
      }
      <button onClick={() => setCats([...cats, prompt("Name a cat")])}>
        Add a cat
      </button>
    </div>
  );
}

export default App;
