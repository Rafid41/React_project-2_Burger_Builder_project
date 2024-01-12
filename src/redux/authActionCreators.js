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
        }
    }
}


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
    axios
        .post(authUrl + API_KEY, authData)
        .then((response) => {
            // console.log(response);
            dispatch(authSuccess(response.data.idToken, response.data.localId))
        });
};
