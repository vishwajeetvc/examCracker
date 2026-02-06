import { useContext, useState } from "react";
import { baseb, ncert } from "../assets/assets";
import Popup from "../components/popup";
import { NavContext } from "../contexts/navContext";

const HomePage = () => {

  const hindiText =  "बिहार बोर्ड";

  const {isNavActive, setIsNavActive} = useContext(NavContext);

  return (
    <> 
      { 
        isNavActive && 
          <Popup 
            setIsActive={setIsNavActive} 
            isActive={isNavActive}
          /> 
      }
      <div className={"h-25"}>
        <div 
          className={"rounded-full bg-white w-12.5 h-12.5 opacity-20 absolute top-[65px] left-10"}></div>

        <div 
          className={"rounded-full bg-white w-20 h-20 opacity-20 absolute top-7.5 left-16.25"}></div>

        <img className={"absolute right-10 top-5 w-17.5"}
          src={ncert} alt="ncert_log"/>
      </div>

      <h1 
        className={"text-5xl xl:text-8xl font-bold p-8 leading-[70px] lg:leading-[120px]  text-center"}>
        Crack &nbsp;
        <span className={"font-bold text-orange-400 underline text-6xl xl:text-[100px]"}>
          {hindiText}
        </span>&nbsp;Exam
      </h1>

      <div className={"logo relative p-8  h-[135px]"}>
        <div className={"w-[250px] mt-2 mb-5 opacity-50 bg-orange-400 m-auto h-[2px]"}></div>
        <div className={"w-[280px] mb-5 m-auto h-[3px] bg-white "}></div>
        <div className={"w-[250px] m-auto opacity-50 bg-orange-400 h-[2px]"}></div>
        <img 
          className={"absolute -translate-x-[50%] top-[0px] left-[50%]"}
          src={ baseb } alt="bseb_logo"/>
      </div>

      <Rectangles css={"right-9"} top={true}/>

      <div className={"flex px-8 m-auto justify-center"}>
        <Quote css={""}/>
        <h1 className={`text-2xl font-bold pt-8 pb-8 text-center`} >
          Crack the&nbsp;
          <span className={`text-4xl text-orange-400`} >
            MCQ questions
          </span>&nbsp;easily
        </h1>
        <Quote css={"self-end w-2"} bottom/>
      </div>

      <Rectangles css={"left-9"}/>

      <div className={"relative"}>
        <Dots/>
      </div>

      <NavButton 
        setIsActive={setIsNavActive}
        isActive={isNavActive} />

      <div className="text-center opacity-30 text-sm fixed bottom-0 left-[50%] -translate-[50%]">vc</div>
    </>

  )
}


function Quote( { css , bottom } : {css? : String, bottom? : Boolean}){
  return <div className={`h-10 opacity-30 w-20 ${css}`}>
    <span className={'text-7xl absolute'}>{bottom ? "❞" : "❝"}</span>
  </div>
}

function Rectangles( { css, top } : { css? : String, top? : Boolean } ) {
  return <>
    <div className="h-10 ">
      <div className={`h-9 absolute ${css}`}>
        <div className={`w-10 lg:w-40 h-7 lg:h-30  ${top && "border-orange-400 border-2"} border`}></div>
        <div className={`w-10 lg:w-40 h-7 lg:h-30 absolute top-2 lg:top-10 left-2  lg:left-10 ${ top || "border-orange-400 border-2"} border`}></div>
      </div>
    </div>
  </>
}

function Dots(){
  return <div className={"inline-flex gap-2 py-5 opacity-70"}>
    <div className={"w-4 h-4 rounded-full bg-orange-400 opacity-50"}></div>
    <div className={"w-4 h-4 rounded-full bg-white opacity-50"}></div>
    <div className={"w-4 h-4 rounded-full bg-orange-400 opacity-50"}></div>
    <div className={"w-4 h-4 rounded-full bg-white opacity-50"}></div>
  </div>
}

export function NavButton( 
  { setIsActive, isActive } : 
  { 
    setIsActive : React.Dispatch<React.SetStateAction<boolean>>, 
    isActive : Boolean 
  }
){
  return <>

    <div className="flex justify-end fixed bottom-5 right-0">
      <div onClick={()=> setIsActive(!isActive) }
        className={"bg-gray-900 w-16 leading-8 border-2 border-orange-400 rounded-l-full relative text-2xl right-0 py-3 text-center"}>
        <div className="grid relative left-4 grid-cols-3 gap-1 w-8">
          <div className="w-2 h-2 border-3 border-gray-300"></div>
          <div className="w-2 h-2 border-3 border-gray-300"></div>
          <div className="w-2 h-2 border-3 border-gray-300"></div>
          <div className="w-2 h-2 border-3 border-gray-300"></div>
          <div className="w-2 h-2 border-3 border-gray-400"></div>
          <div className="w-2 h-2 border-3 border-gray-300"></div>
          <div className="w-2 h-2 border-3 border-gray-300"></div>
          <div className="w-2 h-2 border-3 border-gray-300"></div>
          <div className="w-2 h-2 border-3 border-gray-300"></div>

        </div>
      </div>
    </div>

  </>
}
export default HomePage;
