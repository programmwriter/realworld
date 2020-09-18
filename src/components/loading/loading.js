import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Spin, Alert } from "antd";

import "./loading.scss";
import "antd/dist/antd.css";

const Loading = ({ loading }) => {
  return (
    <Spin spinning={!loading}>
      <Alert message="Tickets loaded!!!" type="info" />
    </Spin>
  );
};

const mapStateToProps = ({ loading }) => ({
  loading,
});

export default connect(mapStateToProps)(Loading);

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};
