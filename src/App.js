import './App.css';
import { BrowserRouter , Routes , Route } from "react-router-dom";
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/quiz/:name/:category/:difficulty' element={<Quiz/>}/>
          <Route path='/result/:score' element={<Result/>}/>
        </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
