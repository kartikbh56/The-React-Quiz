export default function Progress({
  score,
  totalQuestions,
  currentQuestion,
  toatalPoints,
  completedQuestions,
}) {
  return (
    <header className="progress">
      <progress max={totalQuestions} value={completedQuestions}></progress>
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
