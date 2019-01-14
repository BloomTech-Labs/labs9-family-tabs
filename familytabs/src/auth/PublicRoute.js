import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthConsumer } from "./AuthContext";

const PublicRoute = ({ component: Component, scopes,  ...rest }) => {
  return (
    <AuthConsumer>
      {auth => (
        <Route
          {...rest}
          render={props => <Component auth={auth} {...props} />
          }
        />
      )}
    </AuthConsumer>
  );
};

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
  scopes: PropTypes.array
};

PublicRoute.defaultProps = {
  scopes: []
};

export default PublicRoute;
