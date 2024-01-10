// src\redux\reducer.js
import * as actionTypes from "./actionTypes";

const INGREDIENT_PRICES = {
    salad: 20,
    cheese: 40,
    meat: 90,
};
const INITIAL_STATE = {
    ingredients: [
        // amount means ei type koyta count thakbe, amount joto thakbe, totobar call korte hbe
        //  soja kothay c++: map[type] = amount
        { type: "salad", amount: 0 },
        { type: "cheese", amount: 0 },
        { type: "meat", amount: 0 },
    ],
    orders: [],
    orderLoading: false,
    orderErr: false,
    totalPrice: 20,
    purchasable: false,
};

export const reducer = (state = INITIAL_STATE, action) => {
    // copy of state.ingredients
    const ingredients = [...state.ingredients];

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            // count of amount
            for (let item of ingredients) {
                // actionCreators.js theke payload hisebe ashse
                if (item.type === action.payload) item.amount++;
            }
            return {
                ...state,
                ingredients: ingredients,
                totalPrice:
                    state.totalPrice + INGREDIENT_PRICES[action.payload],
            };

        case actionTypes.REMOVE_INGREDIENT:
            // count of amount
            for (let item of ingredients) {
                // actionCreators.js theke payload hisebe ashse
                if (item.type === action.payload) {
                    if (item.amount <= 0) return state;
                    item.amount--;
                }
            }
            return {
                ...state,
                ingredients: ingredients,
                totalPrice:
                    state.totalPrice - INGREDIENT_PRICES[action.payload],
            };

        case actionTypes.UPDATE_PURCHASABLE:
            const sum = state.ingredients.reduce((sum, element) => {
                return sum + element.amount;
            }, 0); //sum er initial value 0

            return {
                ...state,
                purchasable: sum > 0,
            };

        case actionTypes.RESET_INGREDIENTS:
            return {
                ...state,
                ingredients: [
                    { type: "salad", amount: 0 },
                    { type: "cheese", amount: 0 },
                    { type: "meat", amount: 0 },
                ],
                totalPrice: 20,
                purchasable: false,
            };

        case actionTypes.LOAD_ORDERS:
            let orders = [];
            for (let key in action.payload) {
                orders.push({
                    ...action.payload[key],
                    id: key, //eta unique key generate korbe oi order k access korar jnno
                })
            }
          
            return {
                ...state,
                orders: orders,
                orderLoading:false,
            };

        default:
            return state;
    }
};
