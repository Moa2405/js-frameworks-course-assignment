import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useLocalStorage from "../hooks/useLocaleStorage";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [token, setToken] = useLocalStorage("token", "");

    return <AppContext.Provider value={[token, setToken]}>{children}</AppContext.Provider>;
};


AppProvider.propTypes = {
    children: PropTypes.node
};

export default AppContext;