// src\Components\Main.js
import React from "react";
import Header from "./Header/Header";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import { Route, Routes } from "react-router-dom";
import Orders from "./Orders/Orders";
import Checkout from "./Orders/Checkout/Checkout";

const Main = (props) => {
    return (
        <div>
            <Header />

            {/* container class left right kisu padding dey */}
            <div className="container">
                
                <Routes>
                    <Route path="/" element={<BurgerBuilder />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path ="/checkout" element={<Checkout/>} />
                </Routes>

            </div>
        </div>
    );
};

export default Main;
