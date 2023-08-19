import React, { useState } from 'react';
import './Styles/Home.css';
import plantsData from './plants.json';
import {Link} from "react-router-dom"

function HomeHeader() {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchCategories, setSearchCategories] = useState([]);
    const [searchObjects, setSearchObjects] = useState([]);
    const [display, setDisplay] = useState("none");
    const [switchSearchData, setSwitchSearchData] = useState('');
    // const [specificPlant, setSpecificPlant] = useState('');
    let filteredProducts = [];
    let filteredCategories = [];
    let filteredObjects = [];
    let specificPlant = '0';

    function handleTextChange(event) {
        setSearchText(event.target.value);
    }
    // All letters to be without accents:
    function readable(text) {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
    }
    // Search input's value in plants.json:
    function findOccurences(string, array) {
        if(readable(string).includes(readable(searchText))){
            array.push(string)
        }
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        // First make a string out of plantsData :
        // const stringifiedPlantsData = plantsData.map(obj => readable(JSON.stringify(obj)).replace(/[[\]"":{},.\-!;]/g, ''));

        // console.log(stringifiedPlantsData)
        // Search data in Categories or in the rest 
        plantsData.forEach((each) => {
            // Some results go to filteredCategories[]
            findOccurences(each.category, filteredCategories)
            // Other results go to filteredProducts []
            findOccurences(each.name, filteredProducts)
            findOccurences(each.descriptif, filteredProducts)
            each.keyWords.forEach((keyword) => {
                findOccurences(keyword, filteredProducts)
            });    
            // For each object of plantsData, looking if it contains searchText
            // If so push the object in filteredObjects array
            // First copy the object on an other without "img" key
            const objectWithoutImg = { ...each };
            delete objectWithoutImg.img;
            // Compare this new object with searchText
            readable(JSON.stringify(objectWithoutImg)).replace(/[[\]"":{},.\-'()!;]/g, ' ').includes(readable(searchText)) 
            ? filteredObjects.push(each) : null ;
        });

        // Avoid clone results and immediate display of research suggestions
        function processFilteredItems(items) {
            return [...new Set(items.map((each) => readable(each).toLowerCase()))];
        }
          
        filteredProducts = processFilteredItems(filteredProducts);
        filteredCategories = processFilteredItems(filteredCategories);
        
        if (searchText.length > 2) {
            setSearchResults(filteredProducts);
            setSearchCategories(filteredCategories);
            setSearchObjects(filteredObjects);
            setDisplay("flex");
        }
        else
        {
            setSearchResults([]);
            setSearchObjects([]);
            setSearchCategories([])
        }
    }
    // Look if searchText is included in result beginning at &result[i]:
    function strstr(searchText, result, i, j)
    {
        for (j; j < searchText.length; j++) {
            if(result[i] === searchText[j])
                i++;
            else
                return false;
        }
        return true;
    }
    // Making bold letters of the search input and the rest normal, all in the same word :
    let truncated = [];
    function truncate(searchText, result) {
        truncated = [];
        let j = 0;
        searchText = readable(searchText);
        result = readable(result);
        for (let i = 0; i < result.length; i++) {
            if (result[i] === searchText[j] && strstr(searchText, result, i, j)) {
                // First letter to be capital
                i === 0? truncated.push(<span className="bold">{searchText[j].toUpperCase()}</span>)
                        : truncated.push(<span className="bold">{searchText[j]}</span>);
                j++;
            }
            else {
                // First letter to be capital
                i === 0? truncated.push(result[i].toUpperCase()) : truncated.push(result[i]);
            }
        }
        return truncated;
    }   
    // Modify value of search input
    function changeSearchValue(result)
    {
        if(searchText !== result) {
            setSearchText(result);
            document.querySelector("#searchByKeywords").value = result;
        }
    }
    
    return (
        <React.Fragment>
            <div className="Search_and_suggestions">
                <form id="searchForm" onSubmit={(event) => {event.preventDefault()}}>
                        <input id="searchByKeywords" type="text" placeholder="Recherche" onChange={(event) => {
                            handleTextChange(event);
                            handleFormSubmit(event);
                            switchSearchData === '' ? setSwitchSearchData("All") : null;
                        }}/>
                        <button type="submit" /*onClick={(event) => {
                            handleTextChange(event);
                        }}*/>
                        {/* <Link to={`/Plants/${switchSearchData}/${searchText}`}>👀</Link></button> */}
                        <Link to={`/Plants/${switchSearchData}/${searchText}/`}>👀</Link></button>
                </form> 
                <div id="suggestedPlants" style={{ display: display }}>
                    <div>
                        {searchResults.length > 0 ? <h2>Plantes</h2> : null}
                        {searchObjects.map((item, index) => {
                            const result = searchResults[index];
                            specificPlant = item.id;

                            return (
                            <Link to={`/Plants/${switchSearchData}/${searchText}/${specificPlant}/`} key={`${index}_${result}`}>
                                <div key={index} onClick={() => {
                                    // console.log(item.id); 
                                    changeSearchValue((result));
                                    setSwitchSearchData("Produits");
                                    }}>
                                    <div style={{display: "flex", position: "relative"}}>
                                        <img src={item.img} style={{width: "40px", height: "40px"}}/>
                                        <h4 style={{position: "absolute", top: "-20px", left: "60px"}}>{item.id}</h4>
                                    </div>
                                    <p>{item.descriptif}</p>
                                </div>
                             </Link>
                             )
                        })}


                        {/* {searchResults.map((result, index) =>
                        <Link to={`/Plants/${switchSearchData}/${searchText}/${encodeURIComponent(JSON.stringify(specificPlant))}`} key={`${index}_${result}`}>
                            <p key={`${index}_${result}`} onClick={() => {
                            changeSearchValue((result));
                            setSwitchSearchData("Produits");
                            specificPlant.push(searchObjects[0]);
                            // specificPlant = JSON.stringify(encodeURIComponent(specificPlant));

                            }}>
                            {truncate(searchText, result)}
                        </p>
                        </Link>
                        )} */}




                        {searchCategories.length > 0 ? <h2>Catégories</h2> : null}
                        {searchCategories.map((result, index) => {
                            specificPlant = '0';
                            return (
                            <a href={`/Plants/${switchSearchData}/${searchText}/${specificPlant}/`} key={`${index}_${result}`}>
                                <p key={`${index}_${result}`} onClick={() => {
                                changeSearchValue((result));
                                setSwitchSearchData("Catégories");
                                }}>
                                {truncate(searchText, result)}
                            </p></a>)})}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default HomeHeader;