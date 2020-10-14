import React, { useEffect } from "react";
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

import { authenticateUser, setLogedIn } from "../../actions";
import { getCurrentUser } from "../../services/api";

import cls from "./app.module.scss";
import "antd/dist/antd.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loginUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const response = await getCurrentUser(token);
          if (response.user) {
            dispatch(authenticateUser(response.user));
            dispatch(setLogedIn(true));
          }
        }
      } catch (error) {
        console.log("loginUser -> error", error);
      }
    };

    loginUser();
  }, [dispatch]);

  return (
    <Router>
      <div className={cls.app}>
        <Header />
        <Route path="/" component={ArticlesList} exact />
        <Route path="/sign-in" component={SignIn} exact />
        <Route path="/sign-up" component={SignUp} exact />
        <Route path="/articles" component={ArticlesList} exact />
        <PrivateRoute component={EditProfile} path="/profile" exact />
        <PrivateRoute component={NewArticle} path="/new-article" exact />
        <PrivateRoute
          component={EditArticle}
          path="/articles/:slug/edit"
          exact
        />
        <Route path="/articles/:slug" component={ArticlePage} exact />
      </div>
    </Router>
  );
}
export default App;
