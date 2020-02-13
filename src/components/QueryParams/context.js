import React, { createContext } from "react";
import QueryParams from "../Charts/queryParams";

const QueryParamsContext = createContext(null);

export const queryParamsProvider = Component => props => (
  <QueryParamsContext.Provider value={QueryParams}>
    {props => <Component {...props} />}
  </QueryParamsContext.Provider>
);

export const queryParamsConsumer = Component => props => (
  <QueryParamsContext.Consumer>
    {props => <Component {...props} />}
  </QueryParamsContext.Consumer>
);

export default QueryParamsContext;
