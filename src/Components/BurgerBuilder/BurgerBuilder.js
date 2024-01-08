// src\Components\BurgerBuilder\BurgerBuilder.js
// this file will handle all logic
import React, { Component } from "react";
import Burger from "./Burger/Burger";

export default class BurgerBuilder extends Component {
    state = {
        // ingredients er "type" hbe ingrdients.js er switch-case er case name
        ingredients: [
            // amount means ei type koyta count thakbe, amount joto thakbe, totobar call korte hbe
            //  soja kothay c++: map[type] = amount
            { type: "salad", amount: 0 },
            { type: "cheese", amount: 0 },
            { type: "meat", amount: 0 },
        ],
    };

    render() {
        return (
            <div>
                <Burger ingredients={this.state.ingredients} />
            </div>
        );
    }
}
