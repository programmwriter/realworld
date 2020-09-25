import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../header";
import ArticlesList from "../articlesList";
import ArticlePage from "../articlePage";

import cls from "./app.module.scss";
import "antd/dist/antd.css";

function App() {
  return (
    <Router>
      <div className={cls.app}>
        <Header />
        <Route path="/" component={ArticlesList} exact />
        <Route path="/articles" component={ArticlesList} exact />
        <Route path="/articles/:slug" component={ArticlePage} exact />
      </div>
    </Router>
  );
}
export default App;
