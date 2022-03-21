import { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import './singleComic.scss';
import useApiRequestService from "../../services/ApiRequestService";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

const SingleComic = () => {
    const [char, setChar] = useState(null);
    const {comicID} = useParams();
    const {getComics, loading, error, clearError} = useApiRequestService();

    useEffect(() => {
        getComicsInfo();
    }, [comicID]);

    const getComicsInfo = () => {
        clearError();
        getComics(comicID)
            .then((res) => {
                setChar(res);
            })

    }
    
    const showView = !(char === null || loading) ? <View item={char}/> : null;
    const showLoading = (loading) ? <Spinner/> : null;
    const showError = error ? <Error/> : null;
    return (
       <>
       {showView}
       {showLoading}
       {showError}
       </>
    )
}

const View = ({item}) => {
    return (
        <div className="single-comic">
            <img src={item.thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{item.title}</h2>
                <p className="single-comic__descr">{item.description}</p>
                <p className="single-comic__descr">{item.pageCount}</p>
                <p className="single-comic__descr">Language: {item.language}</p>
                <div className="single-comic__price">Price: {item.price}</div>
            </div>
            <Link to={'/comics'} className="single-comic__back">Back to all</Link>
        </div>
    )
}
export default SingleComic;