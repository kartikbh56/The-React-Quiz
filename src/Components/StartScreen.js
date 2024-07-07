export default function StartScreen({ questionsCount, dispatch }) {
  function handleStart() {
    dispatch({ type: "started" });
  }
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{questionsCount} questions to test your React mastery</h3>
      <button className="btn" onClick={handleStart}>
        Let's start
      </button>
    </div>
  );
}
