// src\Components\BurgerBuilder\BurgerBuilder.js
// this file will handle all logic
import React, { Component } from "react";
import Burger from "./Burger/Burger";

export default class BurgerBuilder extends Component {
    render() {
        return (
            <div>
                <Burger />
            </div>
        );
    }
}
