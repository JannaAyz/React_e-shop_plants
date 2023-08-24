import PropTypes from "prop-types";
import {React} from 'react';

function Total(props) {
    return (
        <h3>Total : {props.updatedArray ?
                    props.updatedArray.reduce((total, plant) => total + ((plant.amount-1) * plant.price))
                    : 0 
                    }
        </h3>
    );
}

Total.propTypes = {
    updatedArray: PropTypes.array.isRequired
};

export default Total;