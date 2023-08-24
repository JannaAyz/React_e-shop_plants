import PropTypes from "prop-types";
import {React} from 'react';

function Total(props) {

    // console.log(props.updatedArray)

    return (
        <h3>Total : {props.updatedArray.length > 1 ?
                    props.updatedArray.reduce((total, plant) => total + ((plant.amount) * plant.price))
                    // : props.updatedArray[1].price
                    : <span>0</span>
                    }
        </h3>
    );
}

Total.propTypes = {
    updatedArray: PropTypes.array.isRequired
};

export default Total;