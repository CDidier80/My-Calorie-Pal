import { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import { __CheckSession } from "../services/UserServices";
import ProtectedRoute from "./ProtectedRoute";

import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import CreateProfile from "../pages/CreateProfile";
import Diary from "../pages/Diary";
import AddMeal from "../pages/AddMeal";
import AddFood from "../pages/AddFood";
import AddExercise from "../pages/AddExercise";
import AddSearchFoods from "../pages/AddSearchFoods";

class Router extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      currentUser: null,
      pageLoading: true,
    };
  }
  componentDidMount() {
    this.verifyTokenValid();
    this.setState({ pageLoading: false });
  }

  verifyTokenValid = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const session = await __CheckSession();
        // console.log("session", session);
        this.setState(
          {
            currentUser: session.user,
            authenticated: true,
          },
          () => this.props.history.push("/profile")
        );
      } catch (error) {
        this.setState({ currentUser: null, authenticated: false });
        localStorage.clear();
      }
    }
  };

  toggleAuthenticated = (value, user, done) => {
    this.setState({ authenticated: value, currentUser: user }, () => done());
  };

  render() {
    const { currentUser, authenticated } = this.state;
    return (
      <main>
        {this.state.pageLoading ? (
          <h3>Loading...</h3>
        ) : (
          <Switch>
            <Route exact path="/" component={() => <Home />} />
            <Route
              path="/register"
              component={(props) => <SignUp {...props} />}
            />
            <Route
              path="/login"
              component={(props) => (
                <Login
                  toggleAuthenticated={this.toggleAuthenticated}
                  {...props}
                />
              )}
            />
            <ProtectedRoute
              authenticated={authenticated}
              path="/profile"
              component={(props) => (
                <Layout currentUser={currentUser} authenticated={authenticated}>
                  <Profile {...props} currentUser={currentUser} />
                </Layout>
              )}
            />

            <ProtectedRoute
              authenticated={authenticated}
              path="/create/profile"
              component={(props) => (
                <Layout currentUser={currentUser} authenticated={authenticated}>
                  <CreateProfile {...props} currentUser={currentUser} />
                </Layout>
              )}
            />
            <ProtectedRoute
              authenticated={authenticated}
              path="/diary"
              component={(props) => (
                <Layout currentUser={currentUser} authenticated={authenticated}>
                  <Diary {...props} currentUser={currentUser} />
                </Layout>
              )}
            />
            <ProtectedRoute
              authenticated={authenticated}
              path="/meals"
              component={(props) => (
                <Layout currentUser={currentUser} authenticated={authenticated}>
                  <AddMeal {...props} currentUser={currentUser} />
                </Layout>
              )}
            />
            <ProtectedRoute
              authenticated={authenticated}
              exact
              path="/food"
              component={(props) => (
                <Layout currentUser={currentUser} authenticated={authenticated}>
                  <AddFood {...props} currentUser={currentUser} />
                </Layout>
              )}
            />
            <ProtectedRoute
              authenticated={authenticated}
              path="/exercise"
              component={(props) => (
                <Layout currentUser={currentUser} authenticated={authenticated}>
                  <AddExercise {...props} currentUser={currentUser} />
                </Layout>
              )}
            />
            <ProtectedRoute
              authenticated={authenticated}
              path="/food/search"
              component={(props) => (
                <Layout currentUser={currentUser} authenticated={authenticated}>
                  <AddSearchFoods {...props} currentUser={currentUser} />
                </Layout>
              )}
            />
          </Switch>
        )}
      </main>
    );
  }
}

export default withRouter(Router);
