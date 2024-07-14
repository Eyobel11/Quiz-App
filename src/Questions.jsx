import React from "react";
import {useState,useEffect} from 'react';
import {decode} from 'html-entities'

function Questions(){

    const[question,setquestion]=useState([])
    const[mappingquestion,setmappingquestion]=useState([])
    const [Warning, setWarning] =useState(false);
    const [calanswers,setcalanswers]=useState(0);
    const [results,setresults]= useState(false)

    useEffect(() =>{

        async function comingQuestion(){
            const res = await fetch("https://opentdb.com/api.php?amount=5")
            const data = await res.json();
            setquestion(data.results)
            setmappingquestion(
                data.results.map(que=>{
                    return {
                        questions: que.question,
                        fullanswers:shuffle([
                        ...que.incorrect_answers,
                        que.correct_answer]),
                        rightAnswer: que.correct_answer,
                        chosenAnswer:""
                    }
                })
            )
            
        }

        comingQuestion()
    },[question])

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    


   function clickedAnswer(answer,currentQuestion){
        setmappingquestion(mappingquestion.map(que=>{
            return que.questions === currentQuestion ?{...que, chosenAnswer:answer}:que;
        }))
    };

    
    
    const questiontemplate = mappingquestion.map((que)=>{

        return (
        
        <div className="sec-container">

        <h1 className="sec-question">{decode(que.questions)}</h1>

        <div className="answer-container">


         {que.fullanswers.map((answer,index)=>{
            return (
                <div>
                <button className=
                {
                `answer-button ${ answer === que.chosenAnswer ? "selected" : ""} 
                ${results && answer === que.rightAnswer ? "correct" : " "}
                ${results && answer === que.chosenAnswer && answer !== que.rightAnswer? "incorrect":" "}
                ${results && answer !== que.rightAnswer? "dimmed" : ""}
                `
                } 
                disabled ={results} onClick={()=> clickedAnswer(answer,que.questions)} key={index}>{decode(answer)}</button>
                </div>
            )
         })}


        </div>


         </div>
         
        )
     });


     function checkAnswers(){
        const givenanswers = mappingquestion.some(
           (que)=> que.chosenAnswer === ""
        )
   
        setWarning(givenanswers);

        if(!givenanswers){
            mappingquestion.forEach((que)=>{
                if(que.chosenAnswer===que.rightAnswer){
                    setcalanswers(prev => prev + 1); 
                }
            });

            setresults(true);
        }

      
       }

     const paragraphfirst =  Warning && (
        <p className="warning-text">
          Please answer all the questions
        </p>
      )

      const buttonfirst =  !results && (
        <button className="check-button" onClick={checkAnswers}>
          Check answers
        </button>
      ) ;

      const resulttemplate = results && ( 
         
              <div className="result-container">

            <p className="result-message">You scored{calanswers}/5 correct answers</p>

            <button className="result-button" onClick={playagain}> Play Again </button>

            </div>

        
        );

        function playagain (){ 

            setquestion([]);
            setmappingquestion([]);
            setresults(false);
            setcalanswers(0)
        }
    
  


    return (
       <>



        <div className="Questions-main-container"> 

         {questiontemplate}

         </div>

        <div className="text-center">
         
            {paragraphfirst}
       
            {buttonfirst}

        </div>

      
            {resulttemplate}

        

        





        </>
      
        

   
   
   
    )

}


export default Questions;