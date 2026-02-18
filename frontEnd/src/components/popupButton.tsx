import { useState } from "react"

export function ChapterButton({children, onClick, css, disabled} : 
  {
    children : React.ReactNode, 
    onClick: (e : any)=>void, 
    disabled : boolean
    css? : string
  }, 
) {

  const [visible, setVisible] = useState(false);

  setTimeout(()=>{
    setVisible(true)
  },3000)

  return (
    <>
      <button
        disabled={!visible || disabled}
        className={`text-left 2xl:min-w-[30%] relative px-5 text-gray-300 flex py-3 border-2 rounded-md active:bg-gray-800  border-gray-500/90 font-bold ${css}`}
        onClick={onClick}>
        <span className={`${!visible && "blur"}`}>
          {children}
        </span>
      </button>
    </>
  )

}

function PopupButton({children, onClick, css, disabled} : 
  {
    children : React.ReactNode, 
    onClick: (e : any)=>void, 
    disabled : boolean
    css? : string
  }, 
) {

  return (
    <>
      <button
        disabled={ disabled}
        className={`text-left relative px-5 text-gray-300 flex py-3 border-2 rounded-md active:bg-gray-800  border-gray-500/90 font-bold ${css}`}
        onClick={onClick}>
          {children}
      </button>
    </>
  )

}

export default PopupButton
