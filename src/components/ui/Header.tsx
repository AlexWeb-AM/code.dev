import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { setLanguage } from "../../slices/codeSlice";
import { LogOut, Settings } from "lucide-react";
import { logout } from "../../slices/authSlice";


export const Header = () => {
  const [menu, setMenu] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  
  const navigate = useNavigate()
  const [name, setName] = useState<string[]>([]);
  const [profileMenu,setProfileMenu] = useState(false)
  useEffect(() => {
    const storedName = localStorage.getItem('name')?.split(' ') || [];
    setName(storedName);
  }, []);

  const languagesArray = ["JavaScript", "TypeScript"];
  const language = useSelector((state: RootState) => state.code.language);

  const handleLanguageChange = async (newLang: string) => {
    if (newLang !== language) {
      await dispatch(setLanguage(newLang)); 
    }
    setMenu(false);  
  };

  const handleLogout = (e:React.FormEvent) => {
    e.preventDefault()

    dispatch(logout())

    localStorage.clear()

    navigate('/')

  }

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
              onClick={() => {setMenu(!menu) 
                setProfileMenu(false)}}
              className="appearance-none w-[150px] px-3 h-[40px] focus-visible:outline-none rounded-md border border-neutral-700 bg-[url('/arrow.svg')] bg-no-repeat bg-right flex items-center text-neutral-400 cursor-pointer"
            >
              {language} 
            </button>
            {menu && (
              <div className='div_langs absolute w-[150px] h-auto mt-1 border border-neutral-700 rounded-md bg-[#09090B] flex gap-1 flex-col items-center pt-1 pb-1'>
                {languagesArray.map((lang) => (
                  <button 
                    key={lang} 
                    className={`cursor-pointer w-[140px] h-[40px] rounded-md flex items-center pl-2 
                      ${lang === language ? 'bg-neutral-800' : 'hover:bg-neutral-700'}`} 
                    onClick={() => handleLanguageChange(lang)} 
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => {setProfileMenu(!profileMenu) 
            setMenu(false)}} className="w-[40px] h-[40px] rounded-full bg-transparent border border-neutral-700 hover:bg-neutral-800 transition-all flex justify-center items-center cursor-pointer text-md">
            {name[0]?.[0] || ''}
            {name[1]?.[0] || ''}
          </button>
          {profileMenu && (<div className="flex flex-col gap-1 justify-center items-center absolute top-14 right-12 w-[140px] h-[95px] bg-[#09090B] rounded-md border-neutral-700 border">
            <button className="text-md cursor-pointer transition-all gap-2 w-[130px] h-[40px] rounded-md flex items-center pl-2 hover:bg-neutral-700 "><Settings />Settings</button>
            <button onClick={handleLogout} className="text-md cursor-pointer transition-all gap-2 w-[130px] h-[40px] rounded-md flex items-center pl-2  hover:bg-neutral-700"><LogOut />Logout</button>
          </div>)}
        </div>
      </div>
    </header>
  );
};
