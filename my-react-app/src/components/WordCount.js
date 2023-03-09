import React, { useState, useEffect, useMemo } from "react";


const useAnyKeyToRender = () => {
  const [, forceRender] = useState();

  useEffect(() => {
    window.addEventListener('keydown', forceRender);
    return () => {
      window.removeEventListener('keydown', forceRender);
    }
  }, []);
}

export default function WordCount({ children = '' }) {
  useAnyKeyToRender();

  // const words = children.split(' '); // 会导致 useEffect 频繁触发

  const words = useMemo(() => {
    const words = children.split(' ');
    return words;
  }, [children]);

  useEffect(() => {
    console.log('fresh render!');
  }, [words]);

  return (
    <>
      <p>{children}</p>
      <p>
        <strong>
          {words.length} - words
        </strong>
      </p>
    </>
  );
}