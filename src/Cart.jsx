import PropTypes from "prop-types";
import {React, useState} from 'react';
import './Styles/Plants.css';
import Total from "./Total";

function Cart(props) {

    for (let i = 0; i < props.plantsInCart.length; i++) {
        if (props.plantsInCart[i].amount === undefined)
            props.plantsInCart[i].amount = 0; 

        if (props.plantsInCart[i].name === props.new_plant)
        {
            props.plantsInCart[i].amount++; 
            break;
        }
    }

    let finalPlantsInCart = [0];
    const idSet = new Set();

    for (const plant of props.plantsInCart) {
        if (!idSet.has(plant.id)) {
            idSet.add(plant.id);
            finalPlantsInCart.push(plant);
        }
    }

    const [updatedArray, setUpdatedArray] = useState([finalPlantsInCart]);


    return (
        <div className="cart">
            <p>Votre panier</p>
            {finalPlantsInCart.map((a_plant, index) => (
                index !== 0 && (
                    <div key={`${a_plant.name}-${index}`}>
                        <p>{a_plant.name} : {a_plant.price} € X </p>
                        <input type="number"  onClick={(event) => {
                            a_plant.amount = event.target.value;
                            setUpdatedArray(finalPlantsInCart);
                        }} default={a_plant.amount} min='1'/>
                    </div>
                )
            ))}
            
            <Total updatedArray = {updatedArray}/>
        </div>
    );
}

Cart.propTypes = {
    plantsInCart: PropTypes.array.isRequired,
    new_plant: PropTypes.string.isRequired
};

export default Cart;