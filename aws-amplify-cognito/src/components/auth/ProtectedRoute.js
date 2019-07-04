import React from "react";
import { Route, Redirect } from "react-router-dom";

export default ({
  component: Component,
  props: componentProps,
  auth: authProps,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      authProps.isAuthenticated ? (
        <Component {...props} {...componentProps} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);
