// src\Components\Main.js
import React from "react";
import Header from "./Header/Header";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";

const Main = (props) => {
    return (
        <div>
            <Header />

            {/* container class left right kisu padding dey */}
            <div className="container">
                <BurgerBuilder />
            </div>
        </div>
    );
};

export default Main;
