import './App.css'

import {Route, Routes} from 'react-router-dom'

import Home from './pages/Home'
import Aboutus from './pages/Aboutus'
import NotFound from './pages/notFound'
import Signup from './pages/signup'
import Signin from './pages/Signin'
import Contact from './pages/Contact'
import Denied from './pages/Denied'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/about' element={<Aboutus/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/signin' element={<Signin/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/denied' element={<Denied/>} />
      <Route path='*' element={<NotFound/>} />
    </Routes>
    )
}

export default App