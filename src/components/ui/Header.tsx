import { Link } from "react-router-dom";

export const Header = () => {


    const name = localStorage.getItem('name')?.split(' ') || [];

    return (
        <header className="w-full h-16 bg-transparent border-b border-neutral-500 backdrop-blur-2xl">
            <div className="container flex items-center h-full justify-between ">
                <Link to={`/user/${localStorage.getItem('routeId')}`}><div className="logo w-[130px]"><img src="../../../public/logo.svg" alt="Logo" /></div></Link>
                <div className="flex gap-3 h-full items-center">
                    <div className="">
                        <button className="flex gap-1 bg-transparent border border-neutral-700  hover:bg-neutral-800 text-white w-[120px] h-[40px] rounded-md justify-center items-center text-sm transition-all cursor-pointer">Run Code <div className="w-[30px] h-[25px] rounded-md bg-[#09090B] border-neutral-700 border flex justify-center items-center text-neutral-400">F5</div> </button>
                    </div>
                    <div className="w-[40px] h-[40px] rounded-full bg-transparent border border-neutral-700 hover:bg-neutral-800 transition-all flex justify-center items-center cursor-pointer text-md">
                    {name[0]?.[0] || ''}
                    {name[1]?.[0] || ''}
                    </div>
                </div>
            </div>
        </header>
    )
}
