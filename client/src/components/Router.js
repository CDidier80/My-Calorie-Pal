import { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

class Router extends Component {
  constructor() {
    super();
    this.state = {
      pageLoading: true,
    };
  }
  componentDidMount() {
    this.setState({ pageLoading: false });
  }

  render() {
    return (
      <main>
        {this.state.pageLoading ? (
          <h3>Loading...</h3>
        ) : (
          <Switch>
            <Route
              exact
              path="/"
              component={() => (
                <Layout>
                  <Home />
                </Layout>
              )}
            />
            <Route
              path="/register"
              component={(props) => (
                <Layout>
                  <SignUp {...props} />
                </Layout>
              )}
            />
            <Route
              path="/login"
              component={(props) => (
                <Layout>
                  <Login {...props} />
                </Layout>
              )}
            />
          </Switch>
        )}
      </main>
    );
  }
}

export default Router;
