import ConfettiExplosion from 'react-confetti-explosion';
export default function Result({ score, points, dispatch }) {
  const percentage = Math.round((score * 100) / points);
  function handleRestart() {
    dispatch({ type: "restarted" });
  }
  const highScore = localStorage.getItem("highScore");
    let emoji;
    if (percentage === 100) emoji = "🥇";
    if (percentage >= 80 && percentage < 100) emoji = "🎉";
    if (percentage >= 50 && percentage < 80) emoji = "🙃";
    if (percentage >= 0 && percentage < 50) emoji = "🤨";
    if (percentage === 0) emoji = "🤦‍♂️";
  return (
    <>
      {percentage===100 && <ConfettiExplosion/>} 
      <p className="result">
        {emoji} You scored <strong>{score}</strong> out of {points} (
        {percentage}%)
      </p>
      {highScore>0 && (
        <p className="highscore">{`(Highscore: ${highScore} points)`}</p>
      )}
      <button className="btn btn-ui" onClick={handleRestart}>
        Restart Quiz
      </button>
    </>
  );
}

