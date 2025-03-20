export const ChangePasswordComponent = () => {
  return (
    <div className="w-[390px] h-[280px] bg-none border-[1.5px] rounded-xl pl-6 border-neutral-800 ">
    <h3 className="text-white text-2xl font-semibold mt-7">Change Password</h3>
    <p className="mt-1.5 text-neutral-400 text-sm">Enter new password</p>
    <div className="flex flex-col gap-6 mt-7">
      <div className="grid gap-2">
        <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
        <input  type="email" placeholder="•••••••••••" id="password" className="border-[1px] border-neutral-500 w-[340px] px-2 py-2 rounded-md focus-visible:outline-1 focus-visible:border-neutral-100  bg-transparent placeholder:text-sm "  />
      </div>
      
      <div className="">
        <button className="bg-neutral-50 text-sm cursor-pointer text-black w-[340px] h-10 rounded-md transition-opacity hover:opacity-80">Change Password</button>
      </div>

    </div>   
</div>
  )
}
