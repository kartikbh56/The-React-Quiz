import { useEffect, useReducer } from "react";
import "./index.css";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import StartScreen from "./Components/StartScreen";
import Question from "./Components/Question";
import Timer from "./Components/Timer";
import Result from "./Components/Result";
import Progress from "./Components/Progress";
import NextButton from "./Components/NextButton";
import FinishButton from "./Components/FinishButton";

const initialState = {
  // loading, error, finished, ready, active
  status: "loading",
  questions: [],
  currentQuestion: 0,
  score: 0,
  selectedOption: null,
  seconds: 400,
  highScore: localStorage.getItem("highScore"),
};

function reducer(state, action) {
  switch (action.type) {
    case "started":
      return { ...state, status: "active" };
    case "data_received":
      return { ...state, status: "ready", questions: action.data };
    case "data_failed":
      return { ...state, status: "error" };
    case "option_clicked":
      return {
        ...state,
        selectedOption: action.selectedOption,
        score: action.score,
      };
    case "next":
      return {
        ...state,
        selectedOption: null,
        currentQuestion: state.currentQuestion + 1,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
        selectedOption: null,
        seconds: initialState.seconds,
        highScore:action.highScore
      };
    case "restarted":
      return {
        ...initialState,
        status:'ready',
        questions:state.questions,
        highScore:localStorage.getItem('highScore')
      };
    case "countdown":
      return { ...state, seconds: state.seconds - 1 };
    default:
      return;
  }
}
export default function App() {
  const [
    {
      status,
      questions,
      currentQuestion,
      selectedOption,
      score,
      seconds,
    },
    dispatch
  ] = useReducer(reducer, initialState);
  useEffect(function () {
    fetch("https://questions-api-kohl.vercel.app/?vercelToolbarCode=Xi1-plCizgRHPIB")
      .then((data) => data.json())
      .then((data) =>
        dispatch({ type: "data_received", data: data.questions })
      ).catch(err=>{
        fetch("https://gist.githubusercontent.com/kartikbh56/512a49603252037878de643862f3cfbe/raw/questions.json")
        .then(data=>data.json())
        .then(data=>dispatch({type:"data_received",data:data.questions}))
      })
  }, []);

  const toatalPoints = questions
    .map((ele) => ele.points)
    .reduce((acc, cur) => acc + cur, 0);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen questionsCount={questions.length} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              score={score}
              totalQuestions={questions.length}
              currentQuestion={currentQuestion}
              toatalPoints={toatalPoints}
              completedQuestions={typeof(selectedOption) === 'number' ? currentQuestion+1 : currentQuestion }
            />
            <Question
              questionObj={questions[currentQuestion]}
              selectedOption={selectedOption}
              score={score}
              dispatch={dispatch}
              key={questions[currentQuestion].id}
            />
            <Timer dispatch={dispatch} seconds={seconds} />
            {typeof selectedOption === "number" &&
              (currentQuestion < questions.length - 1 ? (
                <NextButton dispatch={dispatch} />
              ) : (
                <FinishButton dispatch={dispatch} score={score} />
              ))}
          </>
        )}
        {status === "finished" && (
          <Result score={score} points={toatalPoints} dispatch={dispatch} />
        )}
      </Main>
    </div>
  );
}
