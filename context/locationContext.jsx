import React, { useState, useEffect } from "react";
const LocationContext = React.createContext();


const LocationProvider = ({children}) => {
    const [location,setLocation] = useState([0,0])

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
    