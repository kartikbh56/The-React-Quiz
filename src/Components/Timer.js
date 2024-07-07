/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

export default function Timer({ seconds, dispatch }) {
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "countdown" });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  if (seconds === 0) {
    dispatch({ type: "finished" });
  }
  return (
    <div className="timer">
      {Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0") +
        " : " +
        (seconds % 60).toString().padStart(2, "0")}
    </div>
  );
}
