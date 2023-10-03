import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { BASE_URL } from "../../config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [role, setRole] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const login = (username, password) => {
        // setIsLoading(true);
        if (username === '') {
            console.log('Hãy điền tên đăng nhập');
        } else if (password === '') {
            console.log('Hãy điền mật khẩu!');
        } else {
            axios.post(`${BASE_URL}/auth/login`, {
                username,
                password
            })
                .then(res => {
                    let userInfo = res.data;
                    // console.log(userInfo);
                    setUserInfo(userInfo);
                    setUserToken(userInfo.accessToken)
                    AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                    AsyncStorage.setItem('userToken', userInfo.accessToken)
                    // console.log('User Token: ' + userInfo.accessToken);  
                    setIsLogin(true)
                }).catch(err => {
                    setIsLoading(false)
                })
            setIsLoading(true);
        }
    }

    const logout = () => {
        setIsLoading(true)
        setUserToken(null);
        AsyncStorage.removeItem('userInfo')
        AsyncStorage.removeItem('userToken')
        setIsLoading(false);
        setIsLogin(false)
    }

    const isLoggedIn = async () => {
        try {
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');
            userInfo = JSON.parse(userInfo);
            if (userInfo) {
                setUserToken(userToken);
                setUserInfo(userInfo);
                setIsLogin(true)
                setIsLoading(false);

            }
        } catch (err) {
            console.log(`isLogged in err ${err}`);
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, [])


    return (
        <AuthContext.Provider value={{ login, logout, isLoading, isLogin, userToken, userInfo }}>
            {children}
        </AuthContext.Provider>
    )
}