import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import ScrollToTop from "./ScrollToTop";
// import "bulma/css/bulma.css";
import "draft-js/dist/Draft.css";
import CreateArticle from "./articles/CreateArticle";
import ArticleLists from "./articles/ArticleLists";
import Home from "./Home";
import SingleArticle from "./articles/SingleArticle";
import EditArticle from "./articles/EditArticle";
import AddCategory from "./AddCategory";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import Userpage from "./Userpage";
import StoryDetail from "./StoryDetail";
import PrivateRoute from "../hoc/PrivateRoute";
import HomeForum from "./HomeForum";
import ForumDetail from "./ForumDetail";
// import "../../sass/debug.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faEnvelope,
    faLock,
    faUser,
    faUpload,
    faThumbsUp,
    faComment,
    faSearch
} from "@fortawesome/free-solid-svg-icons";
library.add(
    faEnvelope,
    faLock,
    faUser,
    faUpload,
    faThumbsUp,
    faComment,
    faSearch
);

export default class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <BrowserRouter>
                <Fragment>
                    <Switch>
                        <ScrollToTop>
                            <PrivateRoute exact path="/" component={Home} />
                            <PrivateRoute
                                path="/articles/create"
                                component={CreateArticle}
                                exact
                            />
                            <Route
                                path="/articles/:slug/edit"
                                component={EditArticle}
                            />
                            <Route
                                path="/articles/:slug"
                                component={SingleArticle}
                            />
                            <Route path="/articles" component={ArticleLists} />
                            <Route
                                path="/category/add"
                                component={AddCategory}
                            />
                            <Route path="/login" component={LoginForm} />
                            <Route path="/register" component={RegisterForm} />
                            <Route path="/profile/:slug" component={Userpage} />
                            <Route
                                path="/stories/:slug"
                                component={StoryDetail}
                            />
                            <Route path="/forum/:id" component={ForumDetail} />
                            <Route exact path="/forum" component={HomeForum}/>
                        </ScrollToTop>
                    </Switch>
                </Fragment>
            </BrowserRouter>
        );
    }
}

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
