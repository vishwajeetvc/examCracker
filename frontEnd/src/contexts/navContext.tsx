import { createContext, useState } from "react";


export const NavContext = createContext(null);


export default function NavContextProvider({children}){

  const [isNavActive, setIsNavActive] = useState(false);

  return <NavContext.Provider 
    value={{isNavActive, setIsNavActive }}>
    {children}
  </NavContext.Provider>
}
