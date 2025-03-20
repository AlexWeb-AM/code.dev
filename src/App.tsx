import { BrowserRouter as Router,Routes,Route } from "react-router"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { ResetPassword } from "./pages/ResetPassword"
import { OtpCode } from "./pages/OtpCode"

export const App = () => {
  return (
    <Router>
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/otp-code-verify" element={<OtpCode />} />
      </Routes>
    </>
    </Router>
  )
}
