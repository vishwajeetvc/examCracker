import { useEffect, useState} from "react"
import { ncert } from "../assets/assets"
import { ChapterButton } from "../components/popupButton"
import { useParams } from "react-router";

function Mcq() {

  const {id}  = useParams();
  const [allQuestions, setAllQuestions] = useState([]);
  const [isMemorized, setIsMemorized] = useState(false);
  const [checked, setChecked] = useState(null);
  const [clicked, setClicked] = useState(false);

  useEffect(()=>{
    fetch(`https://examcracker.onrender.com/api/mcq/${id}`)
    .then(resp => resp.json())
    .then(data => {
        const questions = data.mcqs.questions.map((item : any) => {
          item.score = 0;
          return item;
        })
        setAllQuestions(questions);
    })
    .catch((e)=>{
        alert(e)
      })
  },[])

  if(allQuestions.length == 0){
    return <div className="flex justify-center items-center h-screen text-4xl">
      Congratulation!
    </div>
  }

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

      <div>
        <Question 
          checked={checked}
          clicked={clicked}
          setClicked={setClicked}
          setChecked={setChecked}
          setIsMemorized={setIsMemorized}
          isMemorized={isMemorized}
          question={allQuestions[0]}/>

        <div className="flex justify-center px-10 my-8 gap-8 ">
          <button 
            disabled={!Boolean(checked)}
            onClick={()=>{
              if(isMemorized){
                const question = allQuestions[0];
                if(question.score >= 1){
                  setAllQuestions(prev=> prev.slice(1))
                } else {
                  const question = allQuestions[0];
                  question.score+=1;
                  let newArray =  allQuestions.slice(1)
                  newArray.splice(2, 0, question)
                  setAllQuestions(newArray)
                }
              } else {
                setAllQuestions(prev => {
                  const question = prev[0];
                  question.score-=1
                  let newArray =  prev.slice(1)
                  newArray.splice(2, 0, question)
                  return newArray;
                })
              }
              setIsMemorized(false);
              setChecked(null)
              setClicked(false)
            }}
            className={`${!Boolean(checked) && 'text-white/20'} px-31 bg-black-900 font-bold py-3 rounded outline-2 outline-gray-300`}> Next </button>
          
        </div>
      </div>
    </div>
  )
}

export default Mcq


function Question({ 
  isMemorized,
  clicked,
  checked,
  setChecked,
  setClicked,
  setIsMemorized,
  question ,
} : { 
    isMemorized : boolean,
    checked : any,
    clicked : any,
    question : any ,
    setIsMemorized : (prev : any) => void,
    setChecked : (prev : any) => void,
    setClicked : (prev : any) => void,
}){


  return <div>
    <p 
      className={`text-center my-2 text-xl`}
    >{"TxScore = " + (question?.score)}</p>
    <div className={`bg-white/0 text-orange-300 border-orange-400 border-t border-b-1 anc my-15 py-5`}> 
      <p className={"text-lg  p-4 max-w-[85%] m-auto  2xl:text-3xl 2xl:text-center rounded-lg border-gray-500 "}>
        {question?.q} 
      </p>
    </div>
    <div className={" max-w-[70%] 2xl:items-center mx-auto my-10 flex flex-col gap-4"}>
      {question?.options?.map((item : string, i : number)=>{


        return <ChapterButton 
          //ts-ignore
          onClick={()=>{
            setClicked(true)
            setChecked(i+1)
            if(question.answer == i+1){
              setIsMemorized(true);
            } else {
              setIsMemorized(false);
            }
          }}
          disabled={Boolean(clicked)}
          css={`
              ${isMemorized && i==question.answer-1 &&  "bg-green-500 text-white border-none"}
              ${!isMemorized && checked==i+1 && 'bg-red-600 border-none text-white'}
              ${!isMemorized && checked && question.answer == i+1 && "bg-green-600  text-white text-white border-none"}
            `} 
          key={item} 
        > 
          {i+1 +". " + item}
          </ChapterButton>
      })}
    </div>

  </div>

}
