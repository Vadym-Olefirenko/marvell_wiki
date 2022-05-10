import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';

import useApiRequestService from "../../services/ApiRequestService";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import AppBanner from '../appBanner/AppBanner';
import setContent from '../../utils/setContent';

const SinglePage = ({Layout, dataType}) => {
    const [char, setChar] = useState(null);
    const {itemID} = useParams();
    const {getComics, getRandomCharacter, clearError, process, setProcess} = useApiRequestService();

    useEffect(() => {
        getItemInfo();
    }, [itemID]);

    const getItemInfo = () => {
        clearError();

        switch (dataType) {
            case 'comics':
                getComics(itemID)
                    .then((res) => setChar(res)).then(() => setProcess('confirmed'));
                break;
            case 'character':
                getRandomCharacter(itemID)
                    .then((res) => setChar(res)).then(() => setProcess('confirmed'));
                break;
        
            default: 
                break;
        }

    }
    
    return (
       <>
       <AppBanner/>
       {setContent(process, Layout, char)}
       </>
    )
}

export default SinglePage;