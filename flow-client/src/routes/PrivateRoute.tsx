import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { RootState } from "../store";
import Loader from "../components/shared/Loader";

interface PrivateRouteProps extends RouteProps {
  component: any;
}

const PrivateRoute = (routeProps: PrivateRouteProps) => {
  const { component: Component, ...props } = routeProps;
  const auth = useSelector((state: RootState) => state.firebase.auth);
  return (
    <Route
      {...props}
      render={({ location }) =>
        !isLoaded(auth) ? (
          <Loader />
        ) : isLoaded(auth) && !isEmpty(auth) ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: location
              }
            }}
          />
        )
      }
    />
  );
};

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated or if auth is not
// yet loaded
// function PrivateRoute({ children, ...rest }: RouteProps) {
//   const auth = useSelector<RootState>(state => state.firebase.auth);
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         isLoaded(auth) && !isEmpty(auth) ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: location }
//             }}
//           />
//         )
//       }
//     />
//   );
// }

export default PrivateRoute;
