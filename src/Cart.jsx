import PropTypes from "prop-types";
// import {React, useState, useEffect} from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {React} from 'react';
import './Styles/Plants.css';
// import Total from "./Total";

function Cart(props) {

    // for (let i = 0; i < props.plantsInCart.length; i++) {
    //     if (props.plantsInCart[i].amount === undefined)
    //         props.plantsInCart[i].amount = 0; 

    //     if (props.plantsInCart[i].name === props.new_plant)
    //     {
    //         props.plantsInCart[i].amount += 1; 
    //         break;
    //     }
    // }

    // let finalPlantsInCart = [' '];
    // const idSet = new Set();

    // for (const plant of props.plantsInCart) {
    //     if (!idSet.has(plant.id)) {
    //         idSet.add(plant.id);
    //         finalPlantsInCart.push(plant);
    //     }
    // }

    // const [updatedArray, setUpdatedArray] = useState([]);


    // useEffect(() => {
    //     setUpdatedArray(finalPlantsInCart);
    //     finalPlantsInCart.map((a_plant, index) => ( index !== 0 && (a_plant.amount -= 1)));
    //   }, [props.plantsInCart]);
    
    // return (
    //     <div className="cart">
    //         <p>Votre panier</p>
    //         {finalPlantsInCart.map((a_plant, index) => (
    //             index !== 0 && (
    //                 <div key={`${a_plant.name}-${index}`}>
    //                     <p>{a_plant.name} : {a_plant.price} € X {a_plant.amount}</p>
    //                     <input type="number"  onClick={(event) => {
    //                         a_plant.amount = parseInt(event.target.value, 10) - 1;
    //                         setUpdatedArray(finalPlantsInCart);
    //                     }} defaultValue={a_plant.amount} min='1' />
    //                 </div>
    //             )
    //         ))}
    //         <Total updatedArray = {updatedArray}/>
    //     </div>
    // );

    let total = [0];
    const [finalPlantsInCart, setFinalPlantsInCart] = useState([]);

    useEffect(() => {
        setFinalPlantsInCart(props.plantsInCart)


        


        // finalPlantsInCart.map((each) => each.name === props.new_plant ? each.amount += 1 : each.amount = 1);

       
    }, [props.plantsInCart]);

    finalPlantsInCart.map((each) => each.amount === undefined ? each.amount = 1 : null )

    // for (let i = 0 ; i < finalPlantsInCart.length ; i++) {
    //         let j = 0;
    //         while (props.plantsInCart[j] !== undefined)
    //         {
    //             if (finalPlantsInCart[i] === props.plantsInCart[j]) 
    //             finalPlantsInCart[i].amount++;
    //             j++;
    //         }
    // }
    
    
    let arrayToShow = [...new Set(finalPlantsInCart)];

    total =  arrayToShow.length > 0 ? arrayToShow.map((each) => each.price * each.amount) : [0];
        
    total = total.reduce((total, plant) => parseInt(total + plant));


    console.log("finalPlantsInCart :")
    console.log(finalPlantsInCart)

    console.log("props.plantsInCart :")
    console.log(props.plantsInCart)


    console.log("arrayToShow :")
    console.log(arrayToShow)

    
    console.log(total)

    return (
            <div className="cart">
                {arrayToShow !== undefined ? arrayToShow.map((a_plant, index) => 
                    <div key={`${a_plant.name}-${index}`}>
                        <p>{a_plant.name} X {a_plant.amount}</p>
                    </div>
                ) : null}
                <h3>{total}</h3>
            </div>
        )
    }


Cart.propTypes = {
    plantsInCart: PropTypes.array.isRequired,
    new_plant: PropTypes.string.isRequired
};

export default Cart;