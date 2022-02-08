import React from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundry from "../errorBoundry/ErrorBoundry";

import decoration from '../../resources/img/vision.png';

class App extends React.Component {
    state = {
        charId: null
    }

    setCharId = (id) => {
        this.setState({
            charId: id
        })
    }
   render() {
    return (
        <div className="app">
            <AppHeader/>
            <main>
                <RandomChar/>
                <div className="char__content">
                    <CharList setCharId={this.setCharId}/>
                    <ErrorBoundry>
                        <CharInfo selectedCharId={this.state.charId}/>
                    </ErrorBoundry>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
   }
}

export default App;