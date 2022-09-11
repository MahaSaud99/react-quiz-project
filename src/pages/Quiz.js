import './css/Quiz.css';
import { useState , useEffect } from 'react';
import { useNavigate , useParams } from 'react-router-dom';
import AnswerOptions from '../component/Quiz/AnswerOptions';
import Spinner from './Spinner';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const Quiz=()=>{
    const navigate = useNavigate();
    const param=useParams();
    const [score,setScore]=useState(0);
    const [qNumber,setQNumber]=useState(1);
    const [questions,setQuestions]=useState([]);
    const [index, setIndex]=useState(0)
    const [loading, setLoading] = useState(true);
    const [showAnswer,setShowAnswer]=useState(false);
    const [selectedAnswer,setSelectedAnswer]=useState();
    const MySwal = withReactContent(Swal);


    // get Questions
    useEffect(()=>{
        const fetchQuestions= async()=>{
            let request="";
            if(param.category==="undefined"&&param.difficulty==="undefined"){
                 request= await fetch('https://opentdb.com/api.php?amount=10');
            }else if(param.category==="undefined"){
                request= await fetch('https://opentdb.com/api.php?amount=10&difficulty='+param.difficulty);
            }else if(param.difficulty==="undefined"){
                request= await fetch('https://opentdb.com/api.php?amount=10&category='+param.category);
            }else{
                 request= await fetch('https://opentdb.com/api.php?amount=10&category='+param.category+'&difficulty='+param.difficulty);
            }
            const data= await request.json();

            const questionsMap = data.results.map((question) => {
                return {
                question: question.question,
                correct_answer: question.correct_answer,
                incorrect_answers:question.incorrect_answers
                };
              });
              setQuestions(questionsMap);
              setLoading(false)
        };
        fetchQuestions();
      },[]);


    // check answer
    const checkAnswer=(answer)=>{
        setShowAnswer(true)
        setSelectedAnswer(answer.target.value);
        if ((answer.target.value)===(questions[index].correct_answer)) {
            setScore(score+1);
        }else{
        console.log("incorrect")
        }
    }

    // nextQuestion
    const nextQuestion=()=>{
        if(index===questions.length-1){
            navigate(`/result/${score}`)
        }else{
            setIndex(index+1)
            setQNumber(qNumber+1)
            setShowAnswer(false);
        }
    }

    // Quit the quiz
    const exit=()=>{
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, quit the quiz!'
          }).then((result) => {
            if (result.isConfirmed) {
                navigate(-1)
            }
          })
    }



    return(
        <div>
        { loading? <Spinner/> : (
        <>
        {param.name==="unknown"? <h2>Welcome</h2> : <h2>Welcome {param.name}</h2>}
        <div className="div1 hero-unit">
            <div className='row row-1'>
               <p id='p1'>Score: {score}</p>
            </div>

            <div className='row'>
               <p id='p2'>Q{qNumber}: {questions[index].question}</p>
            </div>

            <AnswerOptions showAnswer={showAnswer} selectedAnswer={selectedAnswer} checkAnswer={checkAnswer} options={questions[index]} />

            <button type="button" className="btn btn-outline-warning" onClick={nextQuestion}>Next Question</button>

            <div className='row-1 mb-3'>
            <img src="/exit.png" className="rounded mx-auto d-block mt-2 pic" onClick={exit} width={30} height={35} alt="..."/>
            </div>
            </div>
        </>
        )
        }
        </div>
    );
    }
    export default Quiz;
    
