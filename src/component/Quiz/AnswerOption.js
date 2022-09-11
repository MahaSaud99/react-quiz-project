import { useState  , useEffect} from "react";
import Spinner from './Spinner';


const AnswerOption = ({ checkAnswer , options , showAnswer , selectedAnswer}) => {

  const correctAnswer=options.correct_answer;
  const incorrectAnswers=options.incorrect_answers;
  const [loading, setLoading] = useState(true);
  const[optionsList,setList]=useState([])

  useEffect(()=>{
  setList(incorrectAnswers.concat(correctAnswer).sort(() => Math.random() - 0.5))
  setLoading(false)
},[options]);




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

  
  return(
  <>
   { loading? <Spinner/> : 
  (optionsList.map((option , index) =>(
    <button key={index} style={styler(option)} value={option} type="button" className="btn btn-outline-secondary pr-3" onClick={checkAnswer}>{option}</button>
    )) )
}
  </>
  );

};

export default AnswerOption;

