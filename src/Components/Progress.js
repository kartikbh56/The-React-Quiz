export default function Progress({
  score,
  totalQuestions,
  currentQuestion,
  toatalPoints,
  completedQuestions,
}) {
  const progres = (completedQuestions*100)/totalQuestions;
  return (
    <header className="progress">
      <ProgressBar percentage={progres}/>
      <p>
        {"Question "}
        <strong>{currentQuestion + 1} </strong>/{" " + totalQuestions}
      </p>
      <p>
        {score}
        {" / " + toatalPoints}
      </p>
    </header>
  );
}

function ProgressBar({ percentage }) {
  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}
