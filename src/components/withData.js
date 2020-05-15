import React from "react";
import { DataContext } from "../providers/DataProvider";

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

const withData = (Component) => {
  const WrappedComponent = (props) => {
    return (
      <DataContext.Consumer>
        {(data) => <Component data={data} {...props} />}
      </DataContext.Consumer>
    );
  };

  WrappedComponent.displayName = `withData(${getDisplayName(
    WrappedComponent
  )})`;

  return WrappedComponent;
};

export default withData;
