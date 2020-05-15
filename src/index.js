import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import Application from "./Application";

import DataProvider from "./providers/DataProvider";
import UserProvider from "./providers/UserProvider";

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <UserProvider>
        <Router>
          <Application />
        </Router>
      </UserProvider>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
