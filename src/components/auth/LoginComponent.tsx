import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router"
import { RootState,AppDispatch } from "../../store/store"
import toast from "react-hot-toast"
import { loginUser } from "../../slices/authSlice"


export const LoginComponent = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [email,setEmail] = useState<string>('')
  const [password,setPassword] = useState<string>('')
  
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await dispatch(loginUser({ email, password })).unwrap();
      toast.success("Login successful", { style: { background: '#020202', color: '#fff' } });
      localStorage.setItem("email", email);
      localStorage.setItem("routeId", response.user.routeId);
      navigate(`/user/${response.user.routeId}/posts`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message, { style: { background: '#020202', color: '#fff' } });
      } else {
        toast.error("Login failed", { style: { background: '#020202', color: '#fff' } });
      }
    }
    
  }

  return (
    <div className="w-[390px] h-[400px] bg-none border-[1.5px] rounded-xl pl-6 border-neutral-800  max-sm:scale-75">
        <h3 className="text-white text-2xl font-semibold mt-7">Login</h3>
        <p className="mt-1.5 text-neutral-400 text-sm">Enter your email below to login to your account</p>
        <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6 mt-7">
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} required  type="email" placeholder="m@example.com" id="email" className="border-[1px] border-neutral-500 w-[340px] px-2 py-2 rounded-md focus-visible:outline-1 focus-visible:border-neutral-100  bg-transparent placeholder:text-sm "  />
          </div>
          <div className="grid gap-2">
            <div>
            <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
            <Link className="forgot-password text-sm font-normal leading-none peer-disabed:cursor-not-allowed peer-disabled:opacity-70 hover:underline hover:underline-offset-2 ml-32   " to='/reset-password'>Forgot Your Password</Link>
            </div>
            <input value={password} onChange={(e) => setPassword(e.target.value)} required  type="password" placeholder="••••••••••••" id="password" className="border-[1px] border-neutral-500 w-[340px] px-2 py-2 rounded-md focus-visible:outline-1 focus-visible:border-neutral-100  bg-transparent placeholder:text-sm "  />
          </div>
          <div className="">
            <button type="submit" disabled={isLoading} className="bg-neutral-50 text-sm cursor-pointer text-black w-[340px] h-10 rounded-md transition-opacity hover:opacity-80 disabled:bg-neutral-500 disabled:cursor-auto">Login</button>
          </div>
          <div className="mt-[-5px] w-[340px] text-center div_signup_text text-sm">
            Don't have an account?<Link to='/register' className="underline underline-offset-2 ml-1">Register</Link>
          </div>
        </div>
        </form>
        
        
    </div>
  )
}
