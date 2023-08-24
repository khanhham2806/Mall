import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { BASE_URL } from "../../config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const login = (username, password) => {
        setIsLoading(true);
        axios.post(`${BASE_URL}/auth/login`, {
            username,
            password
        }).then(res => {
            let userInfo = res.data;
            setUserInfo(userInfo);
            setUserToken(userInfo.accessToken)
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            AsyncStorage.setItem('userToken', userInfo.accessToken)
            console.log('User Token: ' + userInfo.accessToken);
        }).catch(err => {
            console.log(`login err ${err}`);
        })
        setIsLoading(false);
    }
    const logout = () => {
        setIsLoading(true)
        setUserToken(null);
        AsyncStorage.removeItem('userInfo')
        AsyncStorage.removeItem('userToken')
        setIsLoading(false);
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');
            userInfo = JSON.parse(userInfo);
            if (userInfo) {
                setUserToken(userToken);
                setUserInfo(userInfo);
            }
            setIsLoading(false);
        } catch (err) {
            console.log(`isLogged in err ${err}`);
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, [])


    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken, userInfo }}>
            {children}
        </AuthContext.Provider>
    )
}