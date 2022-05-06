import './singleCharacter.scss';

const SingleCharacterLayout = ({item}) => {
    return (
        <div className="single-comic">
            <img src={item.thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{item.name}</h2>
                <p className="single-comic__descr">{item.description === '' ? 'Here is no description for this character' : item.description}</p>
            </div>
        </div>
    )
}
export default SingleCharacterLayout;