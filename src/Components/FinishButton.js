export default function FinishButton({ dispatch, score }) {
  function handleFinishClick() {
    const highScore = Number(localStorage.getItem('highScore'))
    score > highScore && localStorage.setItem('highScore',score)
    dispatch({ type: "finished", highScore : localStorage.getItem('highScore')});
  }
  return (
    <button className="btn btn-ui" onClick={handleFinishClick}>
      Finish
    </button>
  );
}
