import {useState} from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundry from "../errorBoundry/ErrorBoundry";

import decoration from '../../resources/img/vision.png';

const App = () => {
    const [charId, setCharId] = useState(null);
    
    const onSetCharId = (id) => {
        setCharId(id);
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <RandomChar/>
                <div className="char__content">
                    <CharList setCharId={onSetCharId}/>
                    <ErrorBoundry>
                        <CharInfo selectedCharId={charId}/>
                    </ErrorBoundry>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

export default App;