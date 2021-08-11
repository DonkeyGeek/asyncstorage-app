import { AUTH_USER, LOGOUT_USER } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Inscription 
export const actionSignup = (email, password) => {
    
    return async (dispatch) => {
        // HTTP request
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDVRSdcqscLWkLLkR4mxhZljRredPpPjS8', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        // réponse
        if (!response.ok) {
            // message d'erreur
            const responseError = await response.json();
            const errorMsg = responseError.error.message;

            let customMsg = "Oups, nous avons un problème lors de l'inscription";

            if (errorMsg === 'EMAIL_EXISTS') {
                customMsg = "Cette adresse email existe déjà!";
            } else if (errorMsg === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
                customMsg = "Trop de tentatives, veuillez réessayer plus tard!";
            }
            
            throw new Error(customMsg);
        }

        const dataObj = await response.json();
        console.log(dataObj)
        /*
        Object {
            "displayName": "",
            "email": "helloworld33@gmail.com",
            "expiresIn": "3600",
            "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjhmNDMyMDRhMTc5MTVlOGJlN2NjZDdjYjI2NGRmNmVhMzgzYzQ5YWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVhY3QtbmF0aXZlLWE5ZjJmIiwiYXVkIjoicmVhY3QtbmF0aXZlLWE5ZjJmIiwiYXV0aF90aW1lIjoxNjI1NDgyNDA1LCJ1c2VyX2lkIjoiN2N5WWFKUHA2Y05KYmNZSHZYcXp5OWJRa0V3MSIsInN1YiI6IjdjeVlhSlBwNmNOSmJjWUh2WHF6eTliUWtFdzEiLCJpYXQiOjE2MjU0ODI0MDUsImV4cCI6MTYyNTQ4NjAwNSwiZW1haWwiOiJoZWxsb3dvcmxkMzNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImhlbGxvd29ybGQzM0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.kbwxnFuqFA5lEWL8fJ-lFEW982diCTSsrJZw87rCldruXm_5VIsEfUp-piio-8ITNGwnFSTSulD27ZqPcCmMgDDNIOpQuJxmOxyVatc-0N0tupPn9iEY58Sw-idyxv-57OGFtWYEKIZtWwzB-jnMQbKXIN4eSYBPXAza8M1lCRjprYGBKS1OLTblQU60Wq7IJXplUHwSepNt0B2X45gpDgZAmO3lE9khbaar7SHzGeXae36S363YOY-C04QGCm_31l13IMxs7SBRp09PhUpXOB2rABb1DmKR5h15Y_fDcKDcnPASbfXpLg-JPSoXi3f48aAqkFR-fzKYr1KRsc9E6g",
            "kind": "identitytoolkit#VerifyPasswordResponse",
            "localId": "7cyYaJPp6cNJbcYHvXqzy9bQkEw1",
            "refreshToken": "AGEhc0DSwviw356WBEvsJJ-IfL-SLMvD4i3ouMZ_fvz3mUxAIL-yEYI1dT3Dmq3l6yt3aK-I858IyHQScBJpABDHHIT5oiuaEA-JQe1UAgRLEU24VTRFbeXYXtaslnm_RbpniYLHXCwHdNQ63DC9laNrpnJetRUSe_ztFhcn3KTPt9Q_8TVHhtjXj01v-i1fvrVw23DNndpw57HJigOruty7V8UI3YAFUFhw_ySuzCtgAIPvOd_uCb8",
            "registered": true,
        }
        */

        // dispatch action
        dispatch(actionAuthUser(dataObj.localId, dataObj.idToken))

        // AsyncStorage
        const expiresInMiliSec = parseInt(dataObj.expiresIn) * 1000;
        const expireDate = new Date().getTime() + expiresInMiliSec;
        const dateTokenExire = new Date(expireDate).toISOString();

        saveToAsyncStorage(dataObj.idToken, dataObj.localId, dateTokenExire);
    }

}


// Connexion
export const actionLogin = (email, password) => {
    
    return async (dispatch) => {
        // HTTP request
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDVRSdcqscLWkLLkR4mxhZljRredPpPjS8', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        // réponse
        if (!response.ok) {
             // message d'erreur
             const responseError = await response.json();
             const errorMsg = responseError.error.message;
 
             let customMsg = "Oups, nous avons un problème lors de la connexion";
 
             if (errorMsg === 'EMAIL_NOT_FOUND') {
                 customMsg = "Adresse email introuvable!";
             } else if (errorMsg === 'INVALID_PASSWORD') {
                 customMsg = "Mot de passe incorrect!";
             }
             
             throw new Error(customMsg);
        }

        const dataObj = await response.json();
        // dispatch action
        dispatch(actionAuthUser(dataObj.localId, dataObj.idToken));

        // AsyncStorage
        const expiresInMiliSec = parseInt(dataObj.expiresIn) * 1000;
        const expireDate = new Date().getTime() + expiresInMiliSec;
        const dateTokenExire = new Date(expireDate).toISOString();

        saveToAsyncStorage(dataObj.idToken, dataObj.localId, dateTokenExire);
    }

}

// logout
export const actionLogout = () => {
    return {
        type: LOGOUT_USER
    }
}

// Enregistrer la data dans AsyncStorage
const saveToAsyncStorage = async (token, userId, dateTokenExpire) => {
    await AsyncStorage.setItem("userDetails", JSON.stringify({
        token: token,
        userId: userId,
        dateTokenExpire: dateTokenExpire
    }))
}

// Auth action
const actionAuthUser = (userId, token) => {
    return {
        type: AUTH_USER,
        userId: userId,
        token: token
    }
}