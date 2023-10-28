import './App.css'

import {Route, Routes} from 'react-router-dom'

import Home from './pages/Home'
import Aboutus from './pages/Aboutus'
import NotFound from './pages/notFound'
import Signup from './pages/signup'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/about' element={<Aboutus/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='*' element={<NotFound/>} />
    </Routes>
    )
}

export default App