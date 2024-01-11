// src\redux\actionCreators.js

import * as actionTypes from "./actionTypes";
import axios from "axios";

export const addIngredient = (igtype) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: igtype,
    };
};

export const removeIngredient = (igtype) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: igtype,
    };
};

export const updatePurchasable = () => {
    return {
        type: actionTypes.UPDATE_PURCHASABLE,
    };
};

export const resetIngredients = () => {
    return {
        type: actionTypes.RESET_INGREDIENTS,
    };
};

//=================lOAD ORDER HISTORY==========//
export const loadOrders = (orders) => {
    return {
        type: actionTypes.LOAD_ORDERS,
        payload: orders,
    };
};

export const orderedLoadFailed = () => {
    return {
        type: actionTypes.ORDER_LOAD_FAILED,
    };
};

// dispatch above 2 fn
export const fetchOrders = () => (dispatch) => {
    axios
        .get(
            "https://burger-builder-c4947-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json"
        )
        .then((response) => {
            //load order to redux
            dispatch(loadOrders(response.data));
        })
        .catch((err) => {
            dispatch(orderedLoadFailed());
        });
};
