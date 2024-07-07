export default function NextButton({ dispatch }) {
  function handleNext() {
    dispatch({ type: "next" });
  }
  return (
    <button className="btn btn-ui" onClick={handleNext}>
      Next
    </button>
  );
}
