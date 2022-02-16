import {useState, useEffect, useRef} from "react";
import PropTypes from 'prop-types';
import "./charList.scss";
import ApiRequestService from "../../services/ApiRequestService";

const CharList = (props) => {
  
  const [allChars, setAllChars] = useState([]);
  const [allCharsOffset, setAllCharsOffset] = useState(210);
  const [loadButtonDisabled, setLoadButtonDisabled] = useState(false);
  const [charEnded, setCharEnded] = useState(false);

  const apiRequestService = new ApiRequestService();

  const getAllChars = (offset) => {
    onLoadingMore();
    apiRequestService.getAllCharacters(offset)
    .then((res) => {
      //hide load button when api returned final chars
      if(res.length < 9) {
        setCharEnded(true);
      }

      setAllChars([...allChars, ...res]);
      setAllCharsOffset(allCharsOffset => allCharsOffset + 9)

      onLoadingMore();
    });
  };

  const onLoadingMore = () => {
    setLoadButtonDisabled(loadButtonDisabled => !loadButtonDisabled)
  }

  useEffect(() => {
    getAllChars(allCharsOffset)
  }, []);


    const itemRefs = useRef([]);


   const focusOnItem = (id) => {
    itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
    itemRefs.current[id].classList.add('char__item_selected');
    itemRefs.current[id].focus();
  }

  
    const allCharsList = allChars.map((char, i) => {
      const word = char.thumbnail;
      return (
        <li
          className={`char__item${
            word.includes("image_not_available.jpg") ? " char__item-no-img" : ""
          }`}
          key={char.id}
          onClick={() => {
            props.setCharId(char.id);
            focusOnItem(i)
          }}
          onKeyPress={(e) => {
              if (e.key === ' ' || e.key === "Enter") {
                  props.setCharId(char.id);
                  focusOnItem(i);
              }
          }}
          tabIndex={0}
          ref={el => itemRefs.current[i] = el}
        >
          <img src={char.thumbnail} alt={char.name} />
          <div className="char__name">{char.name}</div>
        </li>
      );
    });
    return (
      <div className="char__list">
        <ul className="char__grid">{allCharsList}</ul>
        <button 
          className="button button__main button__long" 
          disabled={loadButtonDisabled} 
          style={{'display': charEnded ? 'none' : 'block'}}
        >
          <div className="inner" onClick={() => getAllChars(allCharsOffset)}>load more</div>
        </button>
      </div>
    );
}

CharList.propTypes = {
  setCharId: PropTypes.func.isRequired
}

export default CharList;
