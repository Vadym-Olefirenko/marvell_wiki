import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';

import useApiRequestService from "../../services/ApiRequestService";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import AppBanner from '../appBanner/AppBanner';
import SingleComicLayout from '../layouts/singleComicLayout/singleComicLayout';

const SinglePage = ({Layout, dataType}) => {
    const [char, setChar] = useState(null);
    const {itemID} = useParams();
    const {getComics, getRandomCharacter, loading, error, clearError} = useApiRequestService();

    useEffect(() => {
        getItemInfo();
    }, [itemID]);

    const getItemInfo = () => {
        clearError();

        switch (dataType) {
            case 'comics':
                getComics(itemID)
                    .then((res) => {
                        setChar(res);
                    })
                break;
            case 'character':
                getRandomCharacter(itemID)
                    .then((res) => {
                        setChar(res);
                    })
                break;
        
            default: 
                break;
        }

    }
    
    const showView = !(char === null || loading) ? <Layout item={char}/> : null;
    const showLoading = (loading) ? <Spinner/> : null;
    const showError = error ? <Error/> : null;
    return (
       <>
       <AppBanner/>
       {showView}
       {showLoading}
       {showError}
       </>
    )
}

export default SinglePage;