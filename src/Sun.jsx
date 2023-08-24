import React from "react";
import PropTypes from "prop-types";

function Sun(props) {
    let defaultArray = ['・', '・', '・'];

    for (let i = 0; i < props.sun_level; i++) {
        defaultArray[i] = '☀️';
    }
    return (
        <span>{defaultArray}</span>
    )
}

// Used beacause the prop is not a string but a number:
Sun.propTypes = {
    sun_level: PropTypes.number.isRequired
};

export default Sun