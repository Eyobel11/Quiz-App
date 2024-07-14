import React from 'react'
import Dash from './Dash.jsx'
import Questions from './Questions.jsx'
import blob1 from './assets/blob-image-1.png'
import blob2 from './assets/blob-image-2.png'
import { useState } from 'react'
function App() {
  
  const[questions,setquestions]=useState(true)

  function changer() {
    setquestions(prev=>!prev)
  }

  return (
    <>
    
    <div className="main-container">


     <img src={blob1} alt="blue-blob" className='blob-blue'/>
     <img src={blob2} alt="yellow-blob" className='blob-yellow'/>

        {questions ?

            <Dash 
            onClick={changer}
            
            />

        :
            <Questions />

        }



    </div>
    
    

    </>
  )
}

export default App
