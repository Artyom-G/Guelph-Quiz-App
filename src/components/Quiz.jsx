import React, { useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../assets/data';

const Quiz = () => {

    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);
    let [validity, setValidity] = useState(false);

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let option_array = [Option1, Option2, Option3, Option4];

    const checkAns = (e, ans) => {
        if(lock === false){
            if(question.ans === ans){
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev=>prev+1);
                setValidity(true);
            }
            else{
                e.target.classList.add("wrong");
                setLock(true);
                option_array[question.ans-1].current.classList.add("correct");
                <h2>{index + 1}. {question.question}</h2>
            }
        }
    }

    const next = () => {
        if(lock === true){
            if(index === data.length - 1){
                setResult(true);
                return 0;
            }
            setIndex(++index);
            setQuestion(data[index]);
            setLock(false);
            setValidity(false);
            option_array.map((option) => {
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            })
        }
    }

    const reset = () => {
        setIndex(0);
        setQuestion(data[index]);
        setScore(0);
        setLock(false);
        setResult(false);
        setValidity(false);
    }

  return (
    <div className='container'>
      <h1>University of Guelph Quiz App</h1>
      <hr/>
      {result?
      <>
        <h2>You Scored {score} out of {data.length}</h2>
        <button onClick = {reset}>Reset</button>
      </>:
      <>      
        {lock?
        <>
            {validity?
            <>
                <h2 className='correct-text'>Correct!</h2>
            </>:
            <>
                <h2 className='wrong-text'>Incorrect</h2>
            </>}
        </>:
        <>
            <h2>{index + 1}. {question.question}</h2>
        </>}
        <ul>
            <li ref={Option1} onClick={(e)=>{checkAns(e, 1)}}>A. {question.option1}</li>
            <li ref={Option2} onClick={(e)=>{checkAns(e, 2)}}>B. {question.option2}</li>
            <li ref={Option3} onClick={(e)=>{checkAns(e, 3)}}>C. {question.option3}</li>
            <li ref={Option4} onClick={(e)=>{checkAns(e, 4)}}>D. {question.option4}</li>
        </ul>
        <button onClick = {next}>Next</button>
        <div className="index">{index+1} of {data.length} questions</div>
      </>}

    </div>
  )
}

export default Quiz
