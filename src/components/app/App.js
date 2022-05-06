import { BrowserRouter as Router, Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import AppHeader from "../appHeader/AppHeader";
import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/ComicsPage";
import Page404 from '../pages/404';
import SinglePage from '../pages/SinglePage';
import SingleComicLayout from "../layouts/singleComicLayout/singleComicLayout";
import SingleCharacterLayout from "../layouts/singlrCharacterLayout/SingleCharacterLayout";

import decoration from '../../resources/img/vision.png';


const App = () => {

    return (
        <Router>
            <div className="app">
            <AppHeader/>
            <main>
                <Switch>
                   <Route path="/" exact>
                        <MainPage/>
                   </Route>
                    <Route path="/comics" exact>
                        <ComicsPage/>
                    </Route>
                    <Route path="/comics/:itemID" exact>
                        <SinglePage Layout={SingleComicLayout} dataType='comics'/>
                    </Route>
                    <Route path="/characters/:itemID" exact>
                        <SinglePage Layout={SingleCharacterLayout} dataType='character'/>
                    </Route>
                    <Route path="*">
                        <Page404/>
                    </Route>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </Switch>
            </main>
        </div>
        </Router>
    )
}

export default App;