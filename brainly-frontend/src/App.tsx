import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
         </Routes>
      </BrowserRouter>
   )
}

export default App
