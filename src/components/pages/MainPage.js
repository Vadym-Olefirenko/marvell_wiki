import { useState } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundry from "../errorBoundry/ErrorBoundry";

const MainPage = () => {
    const [charId, setCharId] = useState(null);
    
    const onSetCharId = (id) => {
        setCharId(id);
    }
    return (
        <>
            <RandomChar/>
            <div className="char__content">
                <CharList setCharId={onSetCharId}/>
                <ErrorBoundry>
                    <CharInfo selectedCharId={charId}/>
                </ErrorBoundry>
            </div>
        </>
    )
}

export default MainPage;