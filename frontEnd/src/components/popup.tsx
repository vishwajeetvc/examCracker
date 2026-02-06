import { useContext } from "react";
import { CatalogueConetext } from "../contexts/catalogueContext";
import PopupButton from "./popupButton";
import { useNavigate } from "react-router";

function Popup({ setIsActive, isActive } : 
  {setIsActive : React.Dispatch<React.SetStateAction<boolean>>, isActive : Boolean}
){

  const navigate = useNavigate();

  const {data, pref, setPref} = useContext(CatalogueConetext);

  let d : string[] = data.map((item : any) : string[] => item.standard);
  d.sort((a, b) => parseInt(a)-parseInt(b))

  return (
    <div>
      <Card setIsActive={setIsActive} isActive={isActive}>
        { 
          pref.length == 0 // show standards
            && 
            d.map((std : string)=> 
              <PopupButton 
                onClick={()=>{
                  setPref((pref : string) => [...pref , std])
                }} 
                key={std}>{std}
              </PopupButton>
            )
        }
        {
          pref.length == 1 // show subjects
          && 
            data.find(item=>item.standard == pref[0]).subjects.map((sub : any) : React.ReactNode => 
              <PopupButton 
                onClick={()=> setPref((pref : string) => [...pref, sub.subject])}
                key={sub.subject}>
                {sub.subject}
              </PopupButton>
            )
        }
        {
          pref.length == 2  // show chapters
            && 
            data.find((std : any) => std.standard == pref[0]).
              subjects.find( (sub : any) => sub.subject == pref[1]).
              chapters.map((chap : any, i : number)=>{
                if(!chap.ref){
                  return null
                }
                return <PopupButton 
                  onClick={()=>{
                    navigate(`/mcq/${chap.ref}`)
                  }}
                  key={chap.title}>
                  {chap.title.length > 30 ? i+1 + ". " + chap.title.slice(0,25)+"..." : i+1 + ". " + chap.title}
                </PopupButton>
              })

        }
        <div 
          onClick={()=>{
            if(pref.length == 0){
              setIsActive(false)
            } else {
              setPref(pref.slice(0, pref.length-1))
            }
          }}
          className={"flex justify-end gap-2  items-center my-2"}> 
          <div className={"text-gray-300/40  text-center pr-2"}>More coming soon.</div>
          <span className={"text-2xl rotate-180 "} >➤</span> 
          <div className={""}>Back</div>
        </div>
      </Card>
    </div>
  )
}

function Card({ 
    setIsActive,
    isActive ,
    children
  } : { 
    setIsActive : React.Dispatch<React.SetStateAction<boolean>>, 
    isActive : Boolean
    children: React.ReactNode 
  }) {
    const { pref } = useContext(CatalogueConetext);
  return (
    <div 
      onClick={()=>setIsActive(!isActive)}
      className="fixed shadow-2xl inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-xs">
      <div 
        onClick={e => e.stopPropagation()}
        className="min-w-[75%] max-h-[80%] overflow-scroll scroll-m-1 lg:min-w-[30%] flex flex-col gap-2  p-10 pb-4 text-white bg-[#213448]  border-2 border-orange-400 rounded-xl">
        <div className={"font-bold relative text-orange-300 mb-2 text-3xl"}>
            {pref.length == 0 && "Standards" }
            {pref.length == 1 && pref[0] }
            {pref.length == 2 && pref[1] }
        </div>
        {children}
      </div>
    </div>
  );
}

export default Popup;
