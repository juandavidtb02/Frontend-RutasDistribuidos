import React from "react";
import LocationContext from "../context/locationContext";

const useLocationContext = () => {
  return React.useContext(LocationContext);
};

export default useLocationContext;
