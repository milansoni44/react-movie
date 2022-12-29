import React, { useContext, useEffect, useState } from "react";

export const API_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const AppContext = React.createContext();

// we need to create provider
const AppProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [isError, setIsError] = useState({ show: "false", msg: "" });
    const [query, setQuery] = useState('titanic');

    const getMovies = async (url) => {
        setIsLoading(true);
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);

            if (data.Response === 'True') {
                setIsLoading(false);
                setMovie(data.Search);

                setIsError({
                    show: false,
                    msg: ''
                })
            }
            else {
                setMovie([]);
                setIsError({
                    show: true,
                    msg: data.Error
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        let timerOut = setTimeout(function(){
            getMovies(`${API_URL}&s=${query}`);
        }, 800);

        return () => clearTimeout(timerOut);
    }, [query]);


    return <AppContext.Provider value={{isLoading, isError, movie, query, setQuery}}>{children}</AppContext.Provider>
};

// global custom hooks
const useGlovalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider, useGlovalContext };