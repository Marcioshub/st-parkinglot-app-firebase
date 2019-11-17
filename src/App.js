import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navigationbar from "./componets/Navigationbar";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/Error";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import PasswordReset from "./pages/PasswordReset";

function App() {
  return (
    <Router>
      <Navigationbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/addemployee" component={AddEmployee} />
        <Route exact path="/editemployee" component={EditEmployee} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/passwordreset" component={PasswordReset} />
        <Route component={Error} />
      </Switch>
    </Router>
  );
}

export default App;
