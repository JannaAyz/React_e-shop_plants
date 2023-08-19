import React from 'react'
import {useParams} from "react-router-dom"
import plantsData from './plants.json';

export default function PlantsPresentation() {
  const { switchSearchData, searchText, specificPlant } = useParams();
  const idOfSpecificPlant = specificPlant;
  let resultsToShow = [];
  let showSinglePlant = [];
  //searchText is constant
  let variableSearchText = searchText;

  // Check if the id in URL is not empty
  // If not, put the corresponding plant into showSinglePlant[]
  function checkId(id) {
    return id === idOfSpecificPlant ? true : false;
  }
  if (idOfSpecificPlant !== '0') {
    plantsData.some((each) => checkId(each.id) ? showSinglePlant.push(each) : null);
  }

  // All letters to be without accents:
  function readable(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  }

    variableSearchText = readable(variableSearchText);

    if (["Produits", "All"].includes(switchSearchData)) {
      plantsData.forEach((each) => {
        if (
          readable(each.name).includes(variableSearchText) ||
          readable(each.descriptif).includes(variableSearchText) ||
          each.keyWords.some((keyword) =>
            readable(keyword).includes(variableSearchText))
          ) {
            resultsToShow.push(each);

          }
        })
    }
    if (["Catégories", "All"].includes(switchSearchData)) {

      plantsData.forEach((each) =>
        // (readable(each.category).includes(variableSearchText) && resultsToShow.each === {}) ? resultsToShow.push({each}) : null)
        (readable(each.category).includes(variableSearchText)) ? resultsToShow.push({each}) : null)
    }
    
    //Alphabetical order based on names
    resultsToShow = resultsToShow.sort((a, b) => {
      if (a.name && b.name) {
        return a.name.localeCompare(b.name);
      }
      // If a.name or b.name are undefined or null
      return 0; 
    });

  return (
    <React.Fragment>
        <h1>Plantes à adopter</h1>
        {resultsToShow.map((item, index) => {
        // Use "item.each" if it exists (for "Categories")
        // Otherwise use "item" (for "Produits")
        const differs = item.each || item; 
        
        return (
          <div key={index}>
            <h2>{differs.name}</h2>
            <p>{differs.category}</p>
          </div>
        );
      })}

 
                         {idOfSpecificPlant !== '0' ? ( 
                          showSinglePlant.map((aPlant, index) => 
                          <div key={index} style={{background: "yellow", padding: 30 + "px"}}>
                          <h2>La plante Unique</h2>
                          <h1 >{aPlant.name}</h1>
                          
                         
                          </div>
                          )
                         ) : null}
          


    </React.Fragment>
  )
}
