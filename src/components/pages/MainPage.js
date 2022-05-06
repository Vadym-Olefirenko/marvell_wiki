import { useState } from "react";
import {Helmet} from "react-helmet";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundry from "../errorBoundry/ErrorBoundry";
import CharSearchForm from "../charSearchForm/CharSearchForm";

const MainPage = () => {
    const [charId, setCharId] = useState(null);
    
    const onSetCharId = (id) => {
        setCharId(id);
    }
    return (
        <>
            <Helmet>
                <title>Marvel</title>
                <meta
                    name="description"
                    content="Marvel main page"
                />
            </Helmet>
            <RandomChar/>
            <div className="char__content">
                <CharList setCharId={onSetCharId}/>
                <div className="sticky__block">
                    <ErrorBoundry>
                        <CharInfo selectedCharId={charId}/>
                    </ErrorBoundry>
                    <ErrorBoundry>
                        <CharSearchForm/>
                    </ErrorBoundry>
                </div>
            </div>
        </>
    )
}

export default MainPage;