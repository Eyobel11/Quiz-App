import React from "react";

function Dash(props) {

    


    return (
        <>

        <div className="dash-board">
            <h1 className="dash-head">Quizzical</h1>
            <p className="dash-text">Some description if needed</p>
            <button className="dash-button" onClick={props.onClick}> Start Quiz</button>
        </div>
        
        
        </>
   
   
   
    )

}


export default Dash;