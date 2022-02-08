import React from "react";
import PropTypes from 'prop-types';
import "./charInfo.scss";
import Error from "../error/Error";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";
import ApiRequestService from "../../services/ApiRequestService";


class CharInfo extends React.Component {
  state = {
    loading: false,
    error: false,
    char: null,
  };

  apiRequestService = new ApiRequestService();
  componentDidUpdate(prevProps){
      if(prevProps.selectedCharId !== this.props.selectedCharId) {
          this.setSelectedChar()
      }
  }

  setSelectedChar = () => {
    this.setState({
      loading: true,
    });
    this.apiRequestService
      .getRandomCharacter(this.props.selectedCharId)
      .then((res) => {
        this.setState({
          char: res,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          error: true,
        });
      });
  };


  render() {
      const {char, loading, error} = this.state;
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
