export default function Question({
  questionObj,
  dispatch,
  selectedOption,
  score,
}) {
  const { question, options, correctOption, points } = questionObj;
  return (
    <div>
      <h4>{question}</h4>
      <Options
        options={options}
        dispatch={dispatch}
        selectedOption={selectedOption}
        correctOption={correctOption}
        score={score}
        points={points}
      />
    </div>
  );
}
function Options({
  options,
  dispatch,
  selectedOption,
  correctOption,
  score,
  points,
}) {
  function handleOptionClick(i) {
    dispatch({
      type: "option_clicked",
      selectedOption: i,
      score: correctOption === i ? score + points : score,
    });
  }
  return (
    <div className="options">
      {options.map(function (o, i) {
        return (
          <Option
            onClick={() => handleOptionClick(i)}
            isSelected={selectedOption === i}
            isCorrect={correctOption === i}
            selectedState={typeof selectedOption === "number"}
            key={o}
          >
            {o}
          </Option>
        );
      })}
    </div>
  );
}

function Option({ onClick, isSelected, children, selectedState, isCorrect }) {
  const className = `btn btn-option ${isSelected && "answer"} ${
    selectedState ? (isCorrect ? "correct" : "wrong") : ""
  }`;
  return (
    <button onClick={onClick} className={className} disabled={selectedState}>
      {children}
    </button>
  );
}
