// src\Components\BurgerBuilder\Summery\Summery.js
import React from "react";

const Summery = (props) => {
    const ingredientSummery = props.ingredients.map((item) => {
        return (
            <li key={item.type}>
                {/* trxtTransform: "capitalize" diye string er first letter capital kore */}
                <span style={{ textTransform: "capitalize" }}>{item.type}</span>
                : {item.amount}
            </li>
        );
    });
    return (
        <div>
            <ul>{ingredientSummery}</ul>
        </div>
    );
};

export default Summery;
