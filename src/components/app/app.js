import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../header";
import ArticlesList from "../articlesList";
import ArticlePage from "../articlePage";
import SignIn from "../signIn";
import SignUp from "../signUp";
import EditProfile from "../editProfile";
import NewArticle from "../newArticle";
import EditArticle from "../editArticle";
import PrivateRoute from "../routeComponents/privateRoute";
import LogedInRoute from "../routeComponents/logedInRoute";
import Loading from "../loading";

import { authenticateUser, setLogedIn } from "../../actions";

import cls from "./app.module.scss";
import "antd/dist/antd.css";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      dispatch(setLogedIn(true));
      dispatch(authenticateUser(JSON.parse(localUser)));
      dispatch(setLogedIn(true));
      setIsLoading(false);
    }
    setIsLoading(false);
  }, [dispatch]);

  return (
    <Router>
      <div className={cls.app}>
        <Header />
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Route path="/" component={ArticlesList} exact />
            <LogedInRoute path="/sign-in" component={SignIn} exact />
            <LogedInRoute path="/sign-up" component={SignUp} exact />
            <Route path="/articles" component={ArticlesList} exact />
            <PrivateRoute component={EditProfile} path="/profile" exact />
            <PrivateRoute component={NewArticle} path="/new-article" exact />
            <PrivateRoute
              component={EditArticle}
              path="/articles/:slug/edit"
              exact
            />
            <Route path="/articles/:slug" component={ArticlePage} exact />
          </>
        )}
      </div>
    </Router>
  );
}
export default App;
