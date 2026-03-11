import { useEffect, useState } from "react"
import HomePage from "./pages/homePage"


function App() {

  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    fetch('https://examcracker.onrender.com/health')
    .then(resp => resp.json())
    .then(() => {
        setIsLoading(false)
      })
  },[])

  return (
    <>
      <div className={"lg:w-300 lg:px-30 py-10 m-auto relative lg:top-20 lg:rouded-2xl"}>
        {isLoading && <ServerStartingLoader/>}
        <HomePage/>
      </div>
    </>
  )
}

export default App

function ServerStartingLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
      <div className="flex flex-col items-center gap-6 p-8 bg-white/80 rounded-2xl shadow-xl">
        
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-lg font-semibold text-gray-800 text-center">
          Please wait, server is starting...
        </p>

      </div>
    </div>
  );
}
