// src\Components\BurgerBuilder\BurgerBuilder.js
// this file will handle all logic
import React, { Component } from "react";
import Burger from "./Burger/Burger";
import Controls from "./Controls/Controls";

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

    addIngredientHandle = (type) => {
        // copy of state.ingredients
        const ingredients = [...this.state.ingredients];

        // count of amount
        for (let item of ingredients) {
            if (item.type === type) item.amount++;
        }

        // update state with copied state
        this.setState({ ingredients: ingredients });
    };

    removeIngredientHandle = (type) => {
        // copy of state.ingredients
        const ingredients = [...this.state.ingredients];

        // count of amount
        for (let item of ingredients) {
            if (item.type === type) {
                if (item.amount <= 0) return;
                item.amount--;
            }
        }

        // update state with copied state
        this.setState({ ingredients: ingredients });
    };

    render() {
        return (
            // bootstrap: flexing: big screen e side by side, small e upor nich
            <div className="d-flex flex-md-row flex-column">
                <Burger ingredients={this.state.ingredients} />
                <Controls
                    ingredientAdded={this.addIngredientHandle}
                    ingredientRemoved={this.removeIngredientHandle}
                />
            </div>
        );
    }
}
