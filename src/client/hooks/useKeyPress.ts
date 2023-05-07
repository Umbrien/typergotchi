import { useState, useEffect } from "react";

export function useKeyPress() {
  const [keyPressed, setKeyPressed] = useState<KeyboardEvent>();

  function upHandler(e: KeyboardEvent) {
    setKeyPressed(e);
  }

  useEffect(() => {
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keyup", upHandler);
    };
  }, []);

  if (keyPressed) {
    const { key, code, timeStamp } = keyPressed;
    return { key, code, timeStamp };
  }
  return { key: null, code: null, timeStamp: null };
}
