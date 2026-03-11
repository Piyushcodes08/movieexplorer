import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Header from './pages/Header';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/movie/:id' element={<MovieDetail/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App