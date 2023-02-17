import React, { useState, useEffect } from "react";
const LocationContext = React.createContext();
import data from "../data";

const LocationProvider = ({children}) => {
    const URL = import.meta.env.VITE_HOST + "/info-buses"
    const [location,setLocation] = useState()
    useEffect(()=>{
      let status = 0
      const response = fetch(URL,{
          method:'GET'
      }).then(function(res){
          status = res.status

          return res.json();
      }).then(function(datax){
          if(status !== 200)throw new Error(datax)
          if(datax.length > 0){
            setLocation(datax)
            console.log(datax)
          }

      }).catch(function(error){
          console.log(error)
            setLocation(data)
        })
    },[])

      return (
        <LocationContext.Provider
          value={{
            location,
            setLocation
          }}
        >
          {children}
        </LocationContext.Provider>
      );
    };
    
    export { LocationProvider };
    export default LocationContext;
    