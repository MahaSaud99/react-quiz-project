import AnswerOption from "./AnswerOption";

const AnswerOptions = ({ checkAnswer , options , showAnswer , selectedAnswer }) => {

  return(
   <div className="row p-3">
    <div className="d-grid gap-2 col-6 mx-auto">
    <AnswerOption checkAnswer={checkAnswer} options={options} showAnswer={showAnswer} selectedAnswer={selectedAnswer}/>
    </div>
   </div>

  );
};

export default AnswerOptions;