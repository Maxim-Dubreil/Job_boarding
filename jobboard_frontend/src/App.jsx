import { HashRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from './pages/Home/Home'
import { CompanyDashboard } from './pages/CompanyDashboard/CompanyDashboard'
import { Login } from './pages/Login/Login'
import { Admin } from './pages/Admin/Admin'
import { Link } from "react-router-dom"



function App(){
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home/>}/>
        <Route path="/CompanyDashboard" element={<CompanyDashboard/>}/>
        <Route path="/Login" element={<Login/>}/>


      </Routes>
    </Router>

  )
}

export default App