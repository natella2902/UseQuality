import React, {useContext, useEffect, useState} from "react";
import qualityService from "../services/quality.service"
import {toast} from "react-toastify";
const QualitiesContext = React.createContext();

export const useQualities = () => {
    return useContext(QualitiesContext)
}

export const QualitiesProvider = ({children}) => {
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    function errorCatcher (error) {
        const { message } = error.response.data;
        setError(message);
    };
    useEffect(() => {
        const getQualities = async () => {
            try {
                const { content } = await qualityService.fetchAll()
                setQualities(content);
                setIsLoading(false);
            } catch (error) {
                errorCatcher(error);
            }
        }
        getQualities();
    }, []);
    useEffect(() => {
        if(error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);
    const getQuality = (id) => {
        return qualities.find(q => q._id === id);
    }
    const updateQuality = async (id, data) => {
        try {
            const { content } = await qualityService.update(id, data);
            setQualities(prevState => prevState.map((item) => {
                if(item._id === id) {
                    return content
                }
                return item
            }));
            return content
        } catch (error) {
            errorCatcher(error);
        }
    }
    const addQuality = async (data) => {
        try {
            const { content } = await qualityService.add(data);
            setQualities((prevState) => ([...prevState, content]));
            return content
        } catch (error) {
            errorCatcher(error);
        }
    }
    const deleteQuality = async (id) => {
        try {
            const { content } = await qualityService.delete(id);
            setQualities(prevState => prevState.filter(item => (item._id !== id)));
            console.log("2", content)
            return content
        } catch (error) {
            errorCatcher(error);
        }
    }

    return (
        <QualitiesContext.Provider value={{qualities, getQuality, updateQuality, addQuality, deleteQuality}}>
            {!isLoading ? children : <h2>Loading...</h2> }
        </QualitiesContext.Provider>)
}