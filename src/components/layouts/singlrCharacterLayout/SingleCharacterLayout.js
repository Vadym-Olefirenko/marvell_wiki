import {Helmet} from "react-helmet";
import './singleCharacter.scss';

const SingleCharacterLayout = ({data}) => {
    return (
        <div className="single-comic">
            <Helmet>
                <title>{data.name}</title>
                <meta
                    name="description"
                    content={`${data.name} page`}
                />
            </Helmet>
            <img src={data.thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{data.name}</h2>
                <p className="single-comic__descr">{data.description === '' ? 'Here is no description for this character' : data.description}</p>
            </div>
        </div>
    )
}
export default SingleCharacterLayout;