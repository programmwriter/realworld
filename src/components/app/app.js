import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../header";
import ArticlesList from "../articlesList";
import ArticlePage from "../articlePage";
import SignIn from "../signIn";
import SignUp from "../signUp";
import EditProfile from "../editProfile";
import NewArticle from "../newArticle";
import EditArticle from "../editArticle";

import cls from "./app.module.scss";
import "antd/dist/antd.css";

function App() {
  return (
    <Router>
      <div className={cls.app}>
        <Header />
        <Route path="/" component={ArticlesList} exact />
        <Route path="/sign-in" component={SignIn} exact />
        <Route path="/sign-up" component={SignUp} exact />
        <Route path="/profile" component={EditProfile} exact />
        <Route path="/articles" component={ArticlesList} exact />
        <Route path="/new-article" component={NewArticle} exact />
        <Route path="/articles/:slug" component={ArticlePage} exact />
        <Route path="/articles/:slug/edit" component={EditArticle} exact />
      </div>
    </Router>
  );
}
export default App;
