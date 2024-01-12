// src\redux\authActionCreators.js

import * as actionTypes from "./actionTypes";
import axios from "axios";

//  eta dispatch hbe jokhn kono response ashbe firebase theke, means login/signUp hole
//  nicher auth fn theke dis[atch hye kehane ashbe, erpor reducer.js e jabe]
export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId,
        },
    };
};

export const auth = (email, password, mode) => (dispatch) => {
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true, // for firebase structure
    };
    // VVI NOTE:FIREBASE weak/common/repeating character pass dle bad request ashe and request send hyna

    let authUrl = null;
    if (mode === "Sign Up") {
        authUrl =
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
    } else {
        authUrl =
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    }
    // post link collected from: https://firebase.google.com/docs/reference/rest/auth
    // this is default link for post
    // API key from Firebase -> settings -> project settings-> web API Key
    const API_KEY = "AIzaSyDN2gmwm58m8nJ7ayGgaUK5LD1JQwc2AOw";
    axios.post(authUrl + API_KEY, authData).then((response) => {
        // set token in browsers local storage
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("userId", response.data.localId);

        // new Date().getTime() return kore current time in milliseconds
        // response.data.expiresIn return kore second e, tai 1000 multiply kora hoise
        // eta abar Date e convert hbe
        const expirationTime = new Date(
            new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("expirationTime", expirationTime);

        dispatch(authSuccess(response.data.idToken, response.data.localId));
    });
};

// app load holei eta call korte hbe Main.js theke
export const authCheck = () => (dispatch) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        // token na thakle logout

    } else {
        // string return kore, new Date() oitake dateTime e convert kore
        const expirationTime = new Date(localStorage.getItem('expirationTime'));
        
        // time expire kina chk
        if (expirationTime <= new Date()) {
            //logout
        } else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));
        }
    }
}

