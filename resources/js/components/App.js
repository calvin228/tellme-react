import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import ScrollToTop from "./ScrollToTop";
// import "bulma/css/bulma.css";
import "draft-js/dist/Draft.css";
import Home from "./Home";
import AddCategory from "./AddCategory";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import Userpage from "./Userpage";
import StoryDetail from "./StoryDetail";
import PrivateRoute from "../hoc/PrivateRoute";
import HomeForum from "./HomeForum";
import ForumDetail from "./ForumDetail";
import About from "./About";
import EditProfile from "./EditProfile";
import Navbar from "./Navbar";
import "bulma-modal-fx/dist/css/modal-fx.min.css"
// import "../../sass/debug.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import * as fa from "@fortawesome/free-solid-svg-icons";
import SearchResult from "./SearchResult";
import ChangePassword from "./ChangePassword";


library.add(
    fa.faEnvelope,
    fa.faLock,
    fa.faUser,
    fa.faUpload,
    fa.faThumbsUp,
    fa.faComment,
    fa.faSearch,
    fa.faEdit,
    fa.faTrash
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
                            <Route path="/login" component={LoginForm} />
                            <Route path="/register" component={RegisterForm} />
                            <PrivateRoute exact path="/" component={Home} />                           
                            <PrivateRoute path="/profile/:slug" component={Userpage} />
                            <PrivateRoute exact path="/me/edit" component={EditProfile} />
                            <PrivateRoute
                                path="/stories/:slug"
                                component={StoryDetail}
                            />
                            <PrivateRoute path="/about" component={About}/>
                            <PrivateRoute path="/forum/:id" component={ForumDetail} />
                            <PrivateRoute exact path="/forum" component={HomeForum}/>
                            <PrivateRoute path ="/search" component={SearchResult}/>
                            <PrivateRoute path="/password/change" component={ChangePassword}/>
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
