function PopupButton({children, onClick, css, disabled} : 
  {
    children : React.ReactNode, 
    onClick: (e : any)=>void, 
    disabled : boolean
    css? : string
  }, 
) {
  return (
    <button
      disabled={disabled}
      className={` text-left px-5 text-gray-300 py-3 border-2 rounded-md active:bg-gray-800  border-gray-500/90 text-lg font-bold ${css}`}
      onClick={onClick}>{children}</button>
  )
}

export default PopupButton
