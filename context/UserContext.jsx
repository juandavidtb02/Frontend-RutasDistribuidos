import React, { useState, useEffect } from "react";
const UserContext = React.createContext();


const UserProvider = ({children}) => {
    const [userLog,setUserLog] = useState('')

    React.useEffect(()=>{
        const token = localStorage.getItem('user')
        if(token !== null)setUserLog(JSON.parse(token))
        
    },[])

      return (
        <UserContext.Provider
          value={{
            userLog,
            setUserLog
          }}
        >
          {children}
        </UserContext.Provider>
      );
    };
    
    export { UserProvider };
    export default UserContext;
    