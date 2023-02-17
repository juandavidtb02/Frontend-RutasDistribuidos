import React from "react";
import UserContext from "../context/UserContext";

const useUserContext = () => {
  return React.useContext(UserContext);
};

export default useUserContext;
