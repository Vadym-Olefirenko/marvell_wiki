import { useState, useEffect } from "react";
import useApiRequestService from "../../services/ApiRequestService";
import {Link} from 'react-router-dom'
import Spinner from "../spinner/Spinner";
import './comicsList.scss';


const ComicsList = () => {
    const [allComics, setAllcomics] = useState([]);
    const [offset, setOffset] = useState(50);
    const [loadButtonDisabled, setLoadButtonDisabled] = useState(false);
    const [charEnded, setCharEnded] = useState(false);

    const {getAllComics, process, setProcess} = useApiRequestService();

    const getAllComs = (offset) => {
        onLoadingMore();
        getAllComics(offset)
            .then(res => {
                if(res.length < 8) {
                    setCharEnded(true);
                }
                setAllcomics([...allComics, ...res]);
                setOffset(offset => offset + 8);
                onLoadingMore();
            })
            .then(() => setProcess('confirmed'));
    }

    const onLoadingMore = () => {
        setLoadButtonDisabled(loadButtonDisabled => !loadButtonDisabled)
      }

    useEffect(() => {
        getAllComs(offset)
    }, []);

    const comicsList = allComics.map((item) => {
        const noImageStyle = item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? ' randomchar__img-not-available' : '';
        return (
            <li
            className={`comics__item ${noImageStyle}`}
            key={item.id}
            >
                 <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                </Link>
            </li>
        )
    })
    const showSpinner = process === 'loading' ? <Spinner/> : null;
    return (
        
        <div className="comics__list">
            {showSpinner}
            <ul className="comics__grid">
               {comicsList}
            </ul>
            <button 
                className="button button__main button__long" 
                disabled={loadButtonDisabled} 
                style={{'display': charEnded ? 'none' : 'block'}}
            >
                <div className="inner" onClick={() => getAllComs(offset)}>load more</div>
            </button>
        </div>
    )
}

export default ComicsList;