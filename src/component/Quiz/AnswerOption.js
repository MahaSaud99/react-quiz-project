import { useState } from "react";

const AnswerOption = ({ checkAnswer , options , showAnswer , selectedAnswer}) => {

  const correctAnswer=options.correct_answer;
  const incorrectAnswers=options.incorrect_answers;


  options=incorrectAnswers.concat(correctAnswer).sort(() => Math.random() - 0.5)



  function styler(option){
    if (showAnswer === true){
      if(correctAnswer === option){
          return({backgroundColor: "#94D7A2",pointerEvents: "none"})
      }else if(selectedAnswer === option){
            return({backgroundColor: "#F8BCBC",pointerEvents: "none"})
        }else{
          return({pointerEvents: "none"})
        }
       }
     }


    const optionsMap= options.map((option , index) =>(
        <button key={index} style={styler(option)} value={option} type="button" className="btn btn-outline-secondary pr-3" onClick={checkAnswer}>{option}</button>
        )) 
  
  return(
  <>
  {optionsMap}
  </>
  );

};

export default AnswerOption;

