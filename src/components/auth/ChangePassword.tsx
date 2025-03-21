import React, { useState } from "react"
import { resetPassword } from "../../slices/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"

export const ChangePasswordComponent = () => {

  const [newPassword, setNewPassword] = useState<string>('')
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const email = localStorage.getItem("email");

      if (!email) {
        throw new Error("Email not found in localStorage");
      }

      await dispatch(resetPassword({ email, newPassword })).unwrap();
      toast.success("Password succesfully changed", {
        style: { background: "#020202", color: "#fff" },
      });
      navigate('/')
    } catch (err) {
      toast.error("Unexpected error occurred", {
        style: { background: "#020202", color: "#fff" },
      });
      console.log(err);
    }
  };


  return (
    <div className="w-[390px] h-[280px] bg-none border-[1.5px] rounded-xl pl-6 border-neutral-800 max-sm:scale-75">
      <h3 className="text-white text-2xl font-semibold mt-7">Change Password</h3>
      <p className="mt-1.5 text-neutral-400 text-sm">Enter new password</p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6 mt-7">
          <div className="grid gap-2">
            <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">New Password</label>
            <input value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} required type="password" placeholder="•••••••••••" id="password" className="border-[1px] border-neutral-500 w-[340px] px-2 py-2 rounded-md focus-visible:outline-1 focus-visible:border-neutral-100  bg-transparent placeholder:text-sm " />
          </div>

          <div className="">
            <button disabled={isLoading} className="bg-neutral-50 text-sm cursor-pointer text-black w-[340px] h-10 rounded-md transition-opacity hover:opacity-80 disabled:bg-neutral-500 disabled:cursor-auto">Change Password</button>
          </div>

        </div>
      </form>
    </div>
  )
}
