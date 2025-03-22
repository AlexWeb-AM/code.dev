import { useState } from "react";
import { Link } from "react-router";

export const Header = () => {
  const [menu, setMenu] = useState<boolean>(false);
const [lang,setLang] = useState<string>('JavaScript')
  const name = localStorage.getItem('name')?.split(' ') || [];


  const languagesArray = ["JavaScript", "TypeScript", "Python", "Java", "C++"]

  return (
    <header className="w-full h-16 bg-transparent border-b border-neutral-500 backdrop-blur-2xl">
      <div className="container flex items-center h-full justify-between">
        <Link to={`/user/${localStorage.getItem('routeId')}`}>
          <div className="logo w-[130px]">
            <img src="/logo.svg" alt="Logo" />
          </div>
        </Link>
        <div className="flex gap-3 h-full items-center">
          <div>
            <button
              onClick={() => setMenu(!menu)}
              className="appearance-none w-[150px] px-3 h-[40px] focus-visible:outline-none rounded-md border border-neutral-700 bg-[url('/arrow.svg')] bg-no-repeat bg-right flex items-center text-neutral-400 cursor-pointer"
            >
              {lang}
            </button>
            {menu && (
              <div className='div_langs absolute w-[150px] h-auto mt-1 border border-neutral-700 rounded-md bg-[#09090B] flex flex-col items-center pt-1 pb-1'>
                {languagesArray.map((language) => (
                  <button key={language} className='cursor-pointer w-[140px] h-[40px] hover:bg-neutral-700 rounded-md flex items-center pl-2' onClick={() => {setLang(language)
                    setMenu(false)
                  }} >
                    {language}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="w-[40px] h-[40px] rounded-full bg-transparent border border-neutral-700 hover:bg-neutral-800 transition-all flex justify-center items-center cursor-pointer text-md">
            {name[0]?.[0] || ''}
            {name[1]?.[0] || ''}
          </div>
        </div>
      </div>
    </header>
  );
};
