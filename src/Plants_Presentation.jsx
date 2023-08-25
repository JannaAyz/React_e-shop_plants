import React from 'react'
import './Styles/Plants.css';
import { useState } from 'react';
import {useParams} from "react-router-dom"
// import {useParams, useState, useEffect} from "react-router-dom"
import plantsData from './plants.json';
import Cart from "./Cart.jsx"
import Plants_description from './Single_plant_description';
import Water from './Water';
import Sun from './Sun';

export default function PlantsPresentation() {
  const { switchSearchData, searchText, specificPlant } = useParams();
  const [idOfSpecificPlant, setIdOfSpecificPlant] = useState(specificPlant);
  const [plantsInCart, setPlantsInCart] = useState([]);
  //new_plant when added to Cart:
  const [new_plant, set_New_plant] = useState('');
  let resultsToShow = [];
  let showSinglePlant = [];
  //searchText is constant:
  let variableSearchText = searchText;
  // let indicator = 'off';

  // function handle_Plants_in_Cart(plant_name) {

  //   plantsInCart.some((item.name === plant_name) ? )
  // }

  // Check if the id in URL is not empty
  // If not, put the corresponding plant into showSinglePlant[]
  function checkId(id) {
    return id === idOfSpecificPlant ? true : false;
  }
  if (idOfSpecificPlant !== '00') {
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
          readable(each.description).includes(variableSearchText) ||
          each.keyWords.some((keyword) =>
            readable(keyword).includes(variableSearchText))
          ) {
            resultsToShow.push(each);
          }
        })
    }
    if (["Catégories"].includes(switchSearchData)) {
      plantsData.forEach((each) =>
        // (readable(each.category).includes(variableSearchText) && resultsToShow.each) ? resultsToShow.push({each}) : null)
        (readable(each.category).includes(variableSearchText)) ? resultsToShow.push(each) : null);
    }

    //Alphabetical order based on names
    resultsToShow = resultsToShow.sort((a, b) => {
      if (a.name && b.name) {
        return a.name.localeCompare(b.name);
      }
      // If a.name or b.name are undefined or null
      return 0; 
    });

    // useEffect(() => {
    //     setPlantsInCart([...plantsInCart, differs])

    //     // Vous pouvez placer ici le code que vous souhaitez exécuter à chaque changement de "count"
    
    //   }, [indicator]);

  return (
    <React.Fragment>
        <Cart plantsInCart={plantsInCart} new_plant = {new_plant}/>
        <h1>Plantes à adopter</h1>
        <div className="all_plants_cards">
        {resultsToShow.map((item, index) => {
        // Use "item.each" if it exists (for "Categories")
        // Otherwise use "item" (for "Produits")
        const differs = item.each || item; 
        
        return (
            <div key={index} className="plants_card">
              <div onClick={() => {setIdOfSpecificPlant(differs.id)}}>
                <h2>{differs.name}</h2>
                <p>{differs.category}</p>
                <img src={differs.img} style={{width: 50 + "px", height: 50 + "px"}}/>
                <p>Besoins en eau : <Water water_level = {differs.water}/></p>
                <p>Besoins en lumière : <Sun sun_level = {differs.light}/></p>
              </div>
              <button onClick={() => {
                                      setPlantsInCart([...plantsInCart, differs]);
                                      set_New_plant(differs.name);
                                      // console.log(plantsInCart)
                                      }}>
                  Ajouter au panier
              </button>
            </div>
        );
      })}
      </div>
      {/* If the user selected one particular plant */}
      {idOfSpecificPlant !== '00' ? <Plants_description showSinglePlant = {showSinglePlant} setIdOfSpecificPlant = {setIdOfSpecificPlant} /> : null}
    </React.Fragment>
  )
}
