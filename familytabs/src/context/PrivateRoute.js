import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { FamilyConsumer } from "./FamilyContext";

const PrivateRoute = ({ component: Component, scopes,  ...rest }) => {
  return (
    <FamilyConsumer>
      {context => (
        <Route
          {...rest}
          render={props => {
            if (!context.auth.isAuthenticated()) return context.auth.login();

            if (scopes.length > 0 && !context.auth.userHasScopes(scopes)) {
              return (
                <h1>
                  Unauthorized - You need the following scope(s) to view this
                  page: {scopes.join(",")}.
                </h1>
              );
            }
            return <Component {...context} {...props} />;
          }}
        />
      )}
    </FamilyConsumer>
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  scopes: PropTypes.array
};

PrivateRoute.defaultProps = {
  scopes: []
};

export default PrivateRoute;
