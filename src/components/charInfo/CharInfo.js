import {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import "./charInfo.scss";
import useApiRequestService from "../../services/ApiRequestService";
import setContent from "../../utils/setContent";


const CharInfo = (props) =>{
  
  const [char, setChar] = useState(null);

  const {getRandomCharacter, clearError, process, setProcess} = useApiRequestService();

  useEffect(() => {
    setSelectedChar();
    // eslint-disable-next-line
  }, [props.selectedCharId])


  const setSelectedChar = () => {
    if (!props.selectedCharId) return;
    clearError();
    getRandomCharacter(props.selectedCharId)
      .then((res) => {
        setChar(res);
      })
      .then(()=> setProcess('confirmed'))
  };

    return (
      <div className="char__info">
        {setContent(process, View, char)} 
      </div>
    );
}

const View = ({data}) => {
    const word = data.thumbnail;
  return (
    <>
      <div className={`char__basics${word.includes('image_not_available.jpg') ? ' no-image' : ''}`}>
        <img src={data.thumbnail} alt={data.name} />
        <div>
          <div className="char__info-name">{data.name}</div>
          <div className="char__btns">
            <a href={data.homepage} className="button button__main">
              <div className="inner">Homepage</div>
            </a>
            <a href={data.wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        {data.description}
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
          {data.comics.length === 0 ? 'There are no comics with this charachter' : null}
          
          {
              data.comics.slice(0, 9).map((item, i) => {
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
