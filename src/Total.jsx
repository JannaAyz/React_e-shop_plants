import PropTypes from "prop-types";
import {React, useEffect, useState} from 'react';

function Total(props) {
    const [total, setTotal] = useState([0])
    let stockArray;

    useEffect(() => {
        stockArray = props.updatedPlants.length > 0 ? props.updatedPlants.map((each) => each.price * each.amount) : [0]; 
        stockArray = stockArray.reduce((total, plant) => parseInt(total + plant)); 
        
        setTotal(stockArray);
    }, [props.updatedPlants, props.copyPlantsInCart]);
    

    return (
        <h3>{total ? total : 0}</h3>
    );
}

Total.propTypes = {
    updatedPlants: PropTypes.array.isRequired,
    copyPlantsInCart: PropTypes.array.isRequired
};

export default Total;