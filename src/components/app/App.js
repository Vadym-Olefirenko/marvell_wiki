import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import AppHeader from "../appHeader/AppHeader";
import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/ComicsPage";

import SingleComicPage from '../pages/SingleComicPage';

import decoration from '../../resources/img/vision.png';
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import('../pages/404'));


const App = () => {

    return (
        <Router>
            <div className="app">
            <AppHeader/>
            <main>
                <Suspense fallback={<Spinner/>}>
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
                </Suspense>
            </main>
        </div>
        </Router>
    )
}

export default App;