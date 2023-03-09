import React, { useState, useEffect, useMemo, useCallback } from "react";


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


  // const fn = () => {
  //   console.log('hello world!');
  // }

  const fn = useCallback(() => {
    console.log('hello world!');
  }, []);

  useEffect(() => {
    console.log('fresh render by dependents on fn!');
  }, [fn]);


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