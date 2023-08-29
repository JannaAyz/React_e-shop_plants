import PropTypes from "prop-types";
import {React, useEffect, useState} from 'react';
import './Styles/Plants.css';
// import Total from "./Total";

function Cart(props) {    
    const [copyPlantsInCart, setCopyPlantsInCart] = useState([]);
    let total = [0];
    let updatedPlants = props.plantsInCart;
  
    updatedPlants = [...new Set(updatedPlants)]; 
    useEffect(() => {

        updatedPlants.map((each) => !each.amount ? each.amount = 0 : null);

        for(let i = 0; i < updatedPlants.length; i++) {
            if (updatedPlants[i].name === props.new_plant) {
                updatedPlants[i].amount++;
                break;
            }
        }
        updatedPlants = [...new Set(updatedPlants)];

        setCopyPlantsInCart([...updatedPlants]);

    }, [props.plantsInCart, props.new_plant]);


    total =  updatedPlants.length > 0 ? updatedPlants.map((each) => each.price * each.amount) : [0];        
    total = total.reduce((total, plant) => parseInt(total + plant));

    function change_amount(index, quantity) {

        updatedPlants[index].amount = quantity;
        setCopyPlantsInCart([...updatedPlants]);
    }


    return (
            <div className="cart">
            {copyPlantsInCart.map((a_plant, index) => (
                <div key={`${a_plant.name}-${index}`} style={{display: "flex"}}>
                <p>{a_plant.name} X </p>
                <input
                    type="number"
                    onChange={(event) => change_amount(index, parseInt(event.target.value, 10))}
                    // default={a_plant.amount}
                    value={a_plant.amount}
                    min='1'
                    style={{width: 40 + "px", height: 20 + "px", marginTop: 15 + "px", marginLeft: 5}}
                />
                </div>
            ))}
            <h3>{total ? total : 0}</h3>
            </div>
        )
    }


Cart.propTypes = {
    plantsInCart: PropTypes.array.isRequired,
    new_plant: PropTypes.string.isRequired
};

export default Cart;