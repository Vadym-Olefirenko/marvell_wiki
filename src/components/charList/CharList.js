import React from "react";
import PropTypes from 'prop-types';
import "./charList.scss";
import ApiRequestService from "../../services/ApiRequestService";

class CharList extends React.Component {
  state = {
    allChars: [],
    allCharsOffset: 210,
    loadButtonDisabled: false,
    charEnded: false,
  };

  apiRequestService = new ApiRequestService();

  getAllChars = (offset) => {
    this.onLoadingMore();
    this.apiRequestService.getAllCharacters(offset)
    .then((res) => {
      //hide load button when api returned final chars
      if(res.length < 9) {
        this.setState({
          charEnded: true
        })
      }

      this.setState(({allChars, allCharsOffset}) => ({
        allChars: [...allChars, ...res],
        allCharsOffset: allCharsOffset + 9
      }));
      this.onLoadingMore();
    });
  };

  onLoadingMore = () => {
    this.setState(state => ({
      loadButtonDisabled: !state.loadButtonDisabled
    }))
  }

  componentDidMount() {
    this.getAllChars(this.state.allCharsOffset);
  }

    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    }

    focusOnItem = (id) => {
      this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
      this.itemRefs[id].classList.add('char__item_selected');
      this.itemRefs[id].focus();
  }

  render() {
    const allCharsList = this.state.allChars.map((char, i) => {
      const word = char.thumbnail;
      return (
        <li
          className={`char__item${
            word.includes("image_not_available.jpg") ? " char__item-no-img" : ""
          }`}
          key={char.id}
          onClick={() => {
            this.props.setCharId(char.id);
            this.focusOnItem(i)
          }}
          onKeyPress={(e) => {
              if (e.key === ' ' || e.key === "Enter") {
                  this.props.setCharId(char.id);
                  this.focusOnItem(i);
              }
          }}
          tabIndex={0}
          ref={this.setRef}
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
          disabled={this.state.loadButtonDisabled} 
          style={{'display': this.state.charEnded ? 'none' : 'block'}}
        >
          <div className="inner" onClick={() => this.getAllChars(this.state.allCharsOffset)}>load more</div>
        </button>
      </div>
    );
  }
}

CharList.propTypes = {
  setCharId: PropTypes.func.isRequired
}

export default CharList;
