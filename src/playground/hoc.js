// component that renders another component
// reuse code
// render hijacking
// Abstract state
//props manipulation
import React from "react";
import ReactDOM from "react-dom";

const Info = props => (
  <div>
    <h1>Info</h1>
    <p>The infor is: {props.info}</p>
  </div>
);

const withAdminWarning = WrappedComponent => {
  return props => (
    <div>
      {props.isAdmin && <p>This is private info</p>}
      <WrappedComponent {...props} />
    </div>
  );
};

const requireAuthentication = WrappedComponent => {
  return props => (
    <div>
      {!props.isLogged && <p>Please log in to do anything</p>}{" "}
      <WrappedComponent {...props} />
    </div>
  );
};
const RequireAuth = requireAuthentication(Info);
const AdminInfo = withAdminWarning(Info);
//we get back an alternative version of hoc

ReactDOM.render(
  <RequireAuth isLogged={false} info="thi is the detials" />,
  document.getElementById("app")
);
