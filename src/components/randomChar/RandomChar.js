import React from "react";
import "./randomChar.scss";
import ApiRequestService from "../../services/ApiRequestService";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import mjolnir from "../../resources/img/mjolnir.png";

class RandomChar extends React.Component {
  
  state = {
    char: {},
    loading: true,
    error: false
  };

  apiRequestService = new ApiRequestService();

  componentDidMount() {
    this.showRandomCharacter();
  }



  showRandomCharacter = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    //show spinner before char load
    this.setState({loading: true})
    //get random char
    this.apiRequestService.getRandomCharacter(id)
        .then((res) =>
            this.setState({
                char: res,
                loading: false,
            })
        )
        .catch(err => 
            this.setState({
                loading: false,
                error: true
            })
        )
  };
  render() {
    const showSpiner = this.state.loading ? <Spinner /> : null;
    const showError = this.state.error ? <Error/> : null;
    const content = !(showSpiner || showError) ? <StaticBlock char={this.state.char}/> : null
    return (
      <div className="randomchar">
        {showSpiner}
        {showError}
        {content}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button className="button button__main">
            <div onClick={this.showRandomCharacter} className="inner">
              try it
            </div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

const StaticBlock = (props) => {
  const word = props.char.thumbnail;
  
  return (
    <div className="randomchar__block">
      <img
        src={props.char.thumbnail}
        alt="Random character"
        className={`randomchar__img ${word.includes('image_not_available.jpg') ? ' randomchar__img-not-available' : ''}`}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{props.char.name}</p>
        <p className="randomchar__descr">{props.char.description}</p>
        <div className="randomchar__btns">
          <a href={props.char.homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={props.char.wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
