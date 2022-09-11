import './css/Home.css';
import Select from 'react-select'
import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ()=>{

    const [categories, setCategories]=useState([]);
    const difficulties=[
        { value:"easy", label:"Easy"},
        { value:"medium", label:"Medium"},
        { value:"Hard", label:"Hard"}
      ]
    const [name,setName]=useState('');
    const [category,setCategory]=useState();
    const [difficulty,setDifficulty]=useState();
    const navigate = useNavigate();



      useEffect(()=>{
        const fetchCategories= async()=>{
            const request= await fetch('https://opentdb.com/api_category.php');
            const data= await request.json();

            const categoryMap = data.trivia_categories.map((Category) => {
                return {
                  value: Category.id,
                  label: Category.name,
                };
              });
              setCategories(categoryMap);
        };
        fetchCategories();
      },[]);

      const onChangeCategory=(category)=>{
         setCategory(category.value);
      }

      const onChangeDifficulty=(difficulty)=>{
        setDifficulty(difficulty.value);
      }

      const startQuiz=()=>{
        if(name===""){
          navigate(`/quiz/unknown/${category}/${difficulty}`)
        }else
        navigate(`/quiz/${name}/${category}/${difficulty}`)
      }



return(
  <div className="container">

    <div className="home-div hero-unit text-center">

        <div className='row'>

        <div className='col m-3'>
        <h2>Quiz Settings</h2>
        <input value={name} onChange={(e)=> setName(e.target.value)} type="text" className="form-control text-center" placeholder='Enter Your Name'/>
        <Select className='mb-2 text-dark ' placeholder="Any Category" onChange={onChangeCategory} options={categories} />
        <Select className='mb-2 text-dark ' placeholder="Any Difficulty" onChange={onChangeDifficulty} options={difficulties} />
        <button type="button" className="btn btn-outline-secondary mt-4" onClick={startQuiz}>Start Quiz</button>
        </div>

        <div className='col'>
        <img src="/quiz.png" className="rounded mx-auto d-block" width={400} height={300} alt="..."/>
        </div>

        </div>


    </div>
    </div>
);
}
export default Home;