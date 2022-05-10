import {useState, useEffect} from "react";
import "./randomChar.scss";
import useApiRequestService from "../../services/ApiRequestService";
import setContent from "../../utils/setContent";
import mjolnir from "../../resources/img/mjolnir.png";

const RandomChar = () => {
 
  const [char, setChar] = useState({});
  

  const {getRandomCharacter, clearError, process, setProcess} = useApiRequestService();

  useEffect(() => {
    showRandomCharacter();
    // eslint-disable-next-line
  }, [])
  

  const showRandomCharacter = () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    //get random char
    getRandomCharacter(id)
        .then((res) => {
          setChar(res)
        })
        .then(() => setProcess('confirmed'))
  };
  
    return (
      <div className="randomchar">
        {setContent(process, StaticBlock, char)}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button className="button button__main">
            <div onClick={showRandomCharacter} className="inner">
              try it
            </div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
}

const StaticBlock = ({data}) => {
  const slicer = (str) => {
    if (str !== undefined) return str.slice(0, 210) + '...'
  }

  const noImageStyle = data.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? ' randomchar__img-not-available' : '';
  const description =  data.description === '' ? 'here is no description for this character' : slicer(data.description);
  return (
    <div className="randomchar__block">
      <img
        src={data.thumbnail}
        alt="Random character"
        className={`randomchar__img ${noImageStyle}`}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{data.name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={data.homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={data.wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
