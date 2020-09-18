import React, { useEffect } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { Spin } from "antd";
import Header from "../header";
import ArticlesList from "../articlesList";
import { getArticlesList } from "../../services/api";
import { recieveArticles, setLoading } from "../../actions";

import "./app.scss";
import "antd/dist/antd.css";

function App({ dispatchArticles, dispatchLoading, page, loading }) {
  useEffect(() => {
    const fetchData = async () => {
      if (loading) {
        dispatchLoading(false);
      }
      const { articles } = await getArticlesList(5, page);

      dispatchArticles(articles);
      dispatchLoading(true);
    };

    fetchData();
  }, [dispatchArticles, page, dispatchLoading]);

  return (
    <div className="app">
      <Header />
      {!loading ? <Spin /> : <ArticlesList />}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  dispatchArticles: (articles) => dispatch(recieveArticles(articles)),
  dispatchLoading: (val) => dispatch(setLoading(val)),
});
const mapStateToProps = ({ page, loading }) => ({
  page,
  loading,
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
App.propTypes = {
  dispatchArticles: PropTypes.func.isRequired,
  dispatchLoading: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
};
