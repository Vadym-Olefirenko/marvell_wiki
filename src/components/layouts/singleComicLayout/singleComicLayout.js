import { Link } from 'react-router-dom';
import './singleComic.scss';

const SingleComicLayout = ({item}) => {
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
export default SingleComicLayout;