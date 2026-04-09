import {Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"

import HomePage from './pages/HomePage';
import PokemonDetails from './pages/PokemonDetails';
import {Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip } from 'chart.js';
import NavBar from './components/NavBar';
import PokemonByType from './pages/PokemonByType';
import PokemonByGame from './pages/PokemonByGame';
import PokemonByGeneration from './pages/PokemonByGeneration';
import SearchPage from './pages/SearchPage';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/pokemon/:name' element={<PokemonDetails />} />
        <Route path='/type/:type' element={<PokemonByType />} />
        <Route path='/game/:game' element={<PokemonByGame />} />
        <Route path='/generation/:gen' element={<PokemonByGeneration />} />
        <Route path='/search' element={<SearchPage />} />
      </Routes>
    </>
  )
}

export default App
