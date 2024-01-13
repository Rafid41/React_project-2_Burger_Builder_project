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
// firebase auth token for secure viewing order history
export const fetchOrders = (token, userId) => (dispatch) => {
    //'&orderBy=userId' er 'userId' string firebase database er 'userId' column_name
    const queryParams = '&orderBy="userId"&equalTo="' + userId + '"';
    //don't use tabnine here
    axios
        .get(
            'https://burger-builder-c4947-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json?auth=' + token + queryParams
        )
        .then((response) => {
            //load order to redux
            dispatch(loadOrders(response.data));
        })
        .catch((err) => {
            dispatch(orderedLoadFailed());
        });
};
