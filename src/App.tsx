import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import { Login } from "./pages/auth/Login"
import { Register } from "./pages/auth/Register"
import { ResetPassword } from "./pages/auth/ResetPassword"
import { OtpCode } from "./pages/auth/OtpCode"
import { ChangePassword } from "./pages/auth/ChangePassword"
import { Toaster } from "react-hot-toast"

export const App = () => {
  return (
    <Router>
      <Toaster position="top-center"
  reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/otp-code-verify" element={<OtpCode />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </Router>
  )
}
