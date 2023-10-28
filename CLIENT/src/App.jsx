import './App.css'

import {Route, Routes} from 'react-router-dom'

import Home from './pages/Home'
import Aboutus from './pages/Aboutus'
import NotFound from './pages/notFound'


function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/about' element={<Aboutus/>} />
      <Route path='*' element={<NotFound/>} />
    </Routes>
    )
}

export default App