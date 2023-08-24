import React from "react";
import PropTypes from "prop-types";

function Water(props) {
    let defaultArray = ['・', '・', '・'];

    for (let i = 0; i < props.water_level; i++) {
        defaultArray[i] = '💧';
    }
    return (
        <span>{defaultArray}</span>
    )
}

// Used beacause the prop is not a string but a number:
Water.propTypes = {
    water_level: PropTypes.number.isRequired
};

export default Water