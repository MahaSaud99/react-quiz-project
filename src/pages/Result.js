import {useNavigate , useParams } from "react-router-dom";
import Confetti from 'react-confetti'
import './css/Result.css';


const Result=()=>{
    const param=useParams();
    const score=param.score;
    const navigate = useNavigate();



    const startAgain=()=>{
      navigate('/')
    }

 return(
<div className="div2">
{ score > 4? 
( 
<>
<Confetti/>
<p className="title">Congrats!!!</p><br/>
<p>Your score is <span style={{color:"green"}}>{param.score*10}%</span></p>
<button type="button" className="btn btn-warning" onClick={startAgain}>Start Again</button>
</>
) 
:
 (
    <>
<p>Your score is <span style={{color:"red"}}>{param.score*10}%</span></p>
<button type="button" className="btn btn-warning" onClick={startAgain}>Start Again</button>

    </>
)
}
</div>
 );
}
export default Result;
