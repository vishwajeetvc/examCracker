import { createContext, useEffect, useState } from "react";

export const CatalogueConetext = createContext([]);

export default function CatalogueContextProvider(
  {children}:{children : React.ReactNode }
){

  const [data, setData] = useState([]);
  const [pref, setPref] = useState([]);

  // console.log(data)

  useEffect(()=>{
    fetch('https://examcracker.onrender.com/api/catalogue')
    .then(resp => resp.json())
    .then(data => setData(data))
  },[])

  return <CatalogueConetext.Provider value={{data, pref, setPref}}>
    {children}
  </CatalogueConetext.Provider>
}
