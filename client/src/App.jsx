import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/auth" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
