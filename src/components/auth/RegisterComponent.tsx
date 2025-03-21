import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router"
import { AppDispatch,RootState } from "../../store/store"
import { registerUser } from "../../slices/authSlice"
import toast from "react-hot-toast"
import axios from "axios"

export const RegisterComponent = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {isLoading} = useSelector((state:RootState) =>state.auth)
  const navigate = useNavigate();

  const [name,setName] = useState<string>('')
  const [email,setEmail] = useState<string>('')
  const [password,setPassword] = useState<string>('')

  const handleSubmit = async (e:React.FormEvent) => {
      e.preventDefault()

      try {
        const response =  await dispatch(registerUser({name,email,password})).unwrap()
        toast.success('Succesfully Created Account',{style:{background:'#020202',color:'#fff'}})
        localStorage.setItem('name',name)
        localStorage.setItem('email',email)
        localStorage.setItem('routeId',response.user.routeId)

        navigate(`/user/${response.user.routeId}`)  


      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response) {
            if (err.response.status === 400) {
                toast.error("That e-mail is already registered",{style:{background:'#020202',color:'#fff'}});
            } else {
                toast.error(err.response.data?.message || "Error",{style:{background:'#020202',color:'#fff'}});
            }
        } else if (err instanceof Error) {
            toast.error(err.message || "Error",{style:{background:'#020202',color:'#fff'}});
        } else {
            toast.error("Unknown error occurred",{style:{background:'#020202',color:'#fff'}});
        }
    }

  }

  return (
    <div className="w-[390px] h-[480px] bg-none border-[1.5px] rounded-xl pl-6 border-neutral-800 max-sm:scale-75">
        <h3 className="text-white text-2xl font-semibold mt-7">Register</h3>
        <p className="mt-1.5 text-neutral-400 text-sm">Create an account to use the app</p>
        <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6 mt-7">
          
        <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Full Name</label>
            <input required value={name} onChange={(e) => setName(e.target.value) }  type="text" placeholder="John Smith" id="name" className="border-[1px] border-neutral-500 w-[340px] px-2 py-2 rounded-md focus-visible:outline-1 focus-visible:border-neutral-100  bg-transparent placeholder:text-sm "  />
          </div>
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
            <input required value={email} onChange={(e) => setEmail(e.target.value) }  type="email" placeholder="m@example.com" id="email" className="border-[1px] border-neutral-500 w-[340px] px-2 py-2 rounded-md focus-visible:outline-1 focus-visible:border-neutral-100  bg-transparent placeholder:text-sm "  />
          </div>
          <div className="grid gap-2">
            <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
            <input  required value={password} onChange={(e) => setPassword(e.target.value) } type="password" placeholder="••••••••••••" id="password" className="border-[1px] border-neutral-500 w-[340px] px-2 py-2 rounded-md focus-visible:outline-1 focus-visible:border-neutral-100  bg-transparent placeholder:text-sm "  />
          </div>
          
          <div className="">
            <button type="submit" disabled={isLoading} className="bg-neutral-50 text-sm cursor-pointer text-black w-[340px] h-10 rounded-md transition-opacity hover:opacity-80 disabled:bg-neutral-500 disabled:cursor-auto">Register</button>
          </div>
          
          <div className="mt-[-5px] w-[340px] text-center div_signup_text text-sm">
          Already have an account?<Link to='/' className="underline underline-offset-2 ml-1">Login</Link>
          </div>
          
        </div>
        </form>
        
        
    </div>
  )
}