import {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import "./charInfo.scss";
import Error from "../error/Error";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";
import useApiRequestService from "../../services/ApiRequestService";


const CharInfo = (props) =>{
  
  const [char, setChar] = useState(null);

  const {loading, error, getRandomCharacter, clearError} = useApiRequestService();

  useEffect(() => {
    setSelectedChar(); 
  }, [props.selectedCharId])


  const setSelectedChar = () => {
    if (!props.selectedCharId) return;
    clearError();
    getRandomCharacter(props.selectedCharId)
      .then((res) => {
        setChar(res);
      })
  };


      const showView = !(loading || error || !char) ? <View char={char} /> : null;
      const showSkeleton = !(loading || error || char) ? <Skeleton/> : null;
      const showSpinner = loading ? <Spinner/> : null;
      const showError = error ? <Error/> : null;
    return (
      <div className="char__info">
        {showView}
        {showSkeleton}
        {showError}
        {showSpinner}
      </div>
    );
}

const View = ({char}) => {
    const word = char.thumbnail;
  return (
    <>
      <div className={`char__basics${word.includes('image_not_available.jpg') ? ' no-image' : ''}`}>
        <img src={char.thumbnail} alt={char.name} />
        <div>
          <div className="char__info-name">{char.name}</div>
          <div className="char__btns">
            <a href={char.homepage} className="button button__main">
              <div className="inner">Homepage</div>
            </a>
            <a href={char.wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        {char.description}
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
          {char.comics.length === 0 ? 'There are no comics with this charachter' : null}
          
          {
              char.comics.slice(0, 9).map((item, i) => {
               return (
                <li className="char__comics-item" key={i}>
                    {item.name}
                </li>
               )
              })
          }
      </ul>
    </>
  );
};

CharInfo.propTypes ={
  selectedCharId: PropTypes.number
}

export default CharInfo;
