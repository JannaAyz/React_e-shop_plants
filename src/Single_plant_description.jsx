import React from "react";

function Plants_description(props) {

    return (
    props.showSinglePlant.map((aPlant, index) => 
        <div key={index} className="Plant_description" onClick={() => {props.setIdOfSpecificPlant('0')}}>
          <h2>La plante Unique</h2>
          <h1 >{aPlant.name}</h1>
        </div>)
    )
}

export default Plants_description