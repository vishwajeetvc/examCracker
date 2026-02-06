

import { useEffect, useState } from "react"
import { ncert } from "../assets/assets"
import PopupButton from "../components/popupButton"
import { useParams } from "react-router";


function Mcq() {

  const {id}  = useParams();
  const [allQuestions, setAllQuestions] = useState([]);
  const [ticked, setTicked] = useState<number[]>([]);

  console.log(ticked)

  const [qn, setQn] = useState(0);

  useEffect(()=>{
    fetch(`http://192.168.1.54:4000/api/mcq/${id}`)
    .then(resp => resp.json())
    .then(data => {
        setAllQuestions(data.mcqs?.questions);
      })
    .catch((e)=>{
        alert(e)
      })
  },[])

  return (
    <div>
      <div className={"h-25"}>
        <div 
          className={"rounded-full bg-white w-12.5 h-12.5 opacity-20 absolute top-15 left-10"}></div>
        <div 
          className={"rounded-full bg-white w-20 h-20 opacity-20 absolute top-7.5 left-16.25"}></div>
        <img className={"absolute right-10 top-5 w-17.5"}
          src={ncert} alt="ncert_log"/>
      </div>

      {/**/}      


        Ankit kumar


      {/**/}      
      <div>
        <Question 
          ticked={ticked}
          setTicked={setTicked}
          qn={qn}
          setQn={setQn}
          question={allQuestions?.[qn]?.q}
          options={allQuestions?.[qn]?.options}
          ans={allQuestions?.[qn]?.answer}
        />

        <div className="flex justify-between px-10 my-8 gap-8 ">
          <div 
            onClick={()=>{
              qn > 0 && setQn(qn-1)
            }}
            className="px-10 py-2 rounded outline-1 outline-gray-300"> Back </div>
          <div 
            onClick={()=>{
              qn < allQuestions.length -1 && setQn(qn+1)
            }}
            className="px-10 py-2 rounded outline-1 outline-gray-300"> Next </div>
        </div>

      </div>
    </div>
  )
}

export default Mcq


function Question({question, options, qn, ans, ticked, setTicked}
  : {
    question: string, 
    options? : string[], 
    ans:string, 
    qn : number, 
    setQn : ()=>void,
    ticked  : number[],
    setTicked : ([] : number[])=>void
  },
) {

  return <div>
    <p className={"text-xl p-4 border max-w-[85%] m-auto my-9 rounded-lg border-gray-500 text-gray-300"}>
      {`${qn+1}. ` + question }
    </p>
    <div className={" max-w-[70%] m-auto my-10 flex flex-col gap-4"}>
      {options?.map((item : string, i : number)=>{

        const tickedAns = ticked[qn];

        let css= ""

        if(tickedAns == +ans){
          if(i+1 == +ans){
            css = "bg-green-900 text-white"
          }
        } else {
          if(tickedAns == i+1){
            css = "bg-orange-900 text-white"
          }
          if(tickedAns && (i+1 == +ans)){
            css = "bg-green-900 text-white"
          }
        }

        return <PopupButton 
            disabled={Boolean(ticked[qn])}
            css={css} 
            onClick={()=>{
              //@ts-ignore
              setTicked((prev) => {
                const arr = [...prev];
                arr[qn] = i+1;
                return arr;
              })
            }} 
            key={item} 
          > 
            {i+1 +". " + item}
          </PopupButton>
      })}
    </div>

    <div
      onClick={()=>{
        //@ts-ignore
        setTicked((prev)=>{
          const arr = [...prev];
          arr[qn] = +ans;
          return arr
        })
      }}
      className="px-10 py-2 text-center w-45 text-white/80 m-auto my-2 rounded border border-red-400 font-bold">
      Don't know
    </div>

  </div>

}
