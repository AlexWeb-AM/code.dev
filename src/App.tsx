import { BrowserRouter as Router,Routes,Route } from "react-router"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"

export const App = () => {
  return (
    <Router>
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
    </Router>
  )
}
