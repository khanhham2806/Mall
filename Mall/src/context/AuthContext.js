import React,{createContext,useState} from "react";

export const AuthContext = createContext();

export const AuthProvider =({children})=>{
    
    const [userToken, setUserToken] = useState(null);
    const [isLoading,setLoading] = useState(false);
    const login =()=>{
        setUserToken('asjhdklaskldjf');
        setLoading(false);
    }
    const logout=()=>{
        setUserToken(null);
        setLoading(false);
    }
    return(
        <AuthContext.Provider value={{login,logout, isLoading,userToken}}>
            {children}
        </AuthContext.Provider>
    )
}