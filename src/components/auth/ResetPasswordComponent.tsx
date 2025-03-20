import { Link } from "react-router"



export const ResetPasswordComponent = () => {
  return (
    <div className="w-[390px] h-[330px] bg-none border-[1.5px] rounded-xl pl-6 border-neutral-800 ">
        <h3 className="text-white text-2xl font-semibold mt-7">Reset Password</h3>
        <p className="mt-1.5 text-neutral-400 text-sm">Enter the email to which the verification code will be sent</p>
        <div className="flex flex-col gap-6 mt-7">
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
            <input  type="email" placeholder="m@example.com" id="email" className="border-[1px] border-neutral-500 w-[340px] px-2 py-2 rounded-md focus-visible:outline-1 focus-visible:border-neutral-100  bg-transparent placeholder:text-sm "  />
          </div>
          
          <div className="">
            <button className="bg-neutral-50 text-sm cursor-pointer text-black w-[340px] h-10 rounded-md transition-opacity hover:opacity-80">Send code</button>
          </div>
          <div className="mt-[-5px] w-[340px] text-center div_signup_text text-sm">
            Don't have an account?<Link to='/register' className="underline underline-offset-2 ml-1">Register</Link>
          </div>
        </div>
        
        
    </div>
  )
}

