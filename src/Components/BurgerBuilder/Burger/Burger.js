// src\Components\BurgerBuilder\Burger\Burger.js
import React from "react";
import Ingredient from "../Ingredient/Ingredient";
import "./Burger.css";

const Burger = (props) => {
    let ingredientArr = props.ingredients.map((item) => {
        // proti iteration e amount er count joto hbe, array size toto hbe
        let amountArr = [...Array(item.amount).keys()];

        // eita diye proti ammountArr k abar full iteration kora
        return amountArr.map((_) => {
            //  for(auto _:amountArr) //c++
            return <Ingredient type={item.type} key={Math.random()} />;
        });
    });

    //reduce fn proti array k concat kore 1ta array te convert korbe
    // eta use kora hoise chk korte j array er total size 0 kina. mane kono ingredient e nai
    ingredientArr = ingredientArr.reduce((arr, element) => {
        return arr.concat(element);
    }, []);

    if (ingredientArr.length === 0) {
        ingredientArr = <p>Please add some ingrdients!</p>;
    }



    return (
        <div className="Burger">
            <Ingredient type="bread-top" />
            {/* ingredient type and oto amount print hbe */}
            {ingredientArr}
            <Ingredient type="bread-bottom" />
        </div>
    );
};

export default Burger;
