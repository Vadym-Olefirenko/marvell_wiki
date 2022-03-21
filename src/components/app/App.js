import { BrowserRouter as Router, Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import AppHeader from "../appHeader/AppHeader";
import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/ComicsPage";
import Page404 from '../pages/404';
import SingleComicPage from '../pages/SingleComicPage';

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
                    <Route path="/comics/:comicID" exact>
                        <SingleComicPage/>
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