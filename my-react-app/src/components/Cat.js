import React from "react";

export default function Cat({ name, meow = f => f }) {
  console.log(`rendering ${name}`);
  return <p onClick={() => meow(name)}>{name}</p>
}