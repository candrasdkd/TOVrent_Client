import { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Home from "./Home";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Profile from "./Profile";
import Reservation from "./Reservation";
import Register from "./Register";
import Vehicles from "./Vehicles";
import Search from "./Search";
import VehicleDetail from "./VehicleDetail";
import Payment from "./Payment";
import CheckCode from "./CheckCode";
import ChangePassword from "./ChangePassword";
import TransactionHistory from "./TransactionHistory";
import ChatDetail from "./ChatDetail";
import ViewMore from "./ViewMore";
import History from "./History";
import { PrivateRoute, AuthRoute } from "../components/PrivateRoute";
import defaultStore from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import AddVehicle from "./AddVehicle";
import EditVehicle from "./EditVehicle";

class AppWithRouter extends Component {
  render() {
    const { persistor, reduxStore } = defaultStore;
    return (
      <Provider store={reduxStore}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Route path="/" exact>
              <Home />
            </Route>

            <Route path="/view-more">
              <ViewMore />
            </Route>
        
            <Route path="/vehicles">
              <Vehicles />
            </Route>
            <Route path="/detail/:id">
              <VehicleDetail />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <AuthRoute path="/login">
              <Login />
            </AuthRoute>
            <AuthRoute path="/register">
              <Register />
            </AuthRoute>
            <AuthRoute path="/forgot">
              <ForgotPassword />
            </AuthRoute>
            <AuthRoute path="/check-code">
              <CheckCode />
            </AuthRoute>
            <AuthRoute path="/change-password">
              <ChangePassword />
            </AuthRoute>
            <PrivateRoute path="/profile">
              <Profile />
            </PrivateRoute>
            <PrivateRoute path="/reservation/:id">
              <Reservation />
            </PrivateRoute>
            <PrivateRoute path="/payment/:id">
              <Payment />
            </PrivateRoute>
            <PrivateRoute path="/transaction-history/:id">
              <TransactionHistory />
            </PrivateRoute>
            <PrivateRoute path="/history">
              <History />
            </PrivateRoute>
            <PrivateRoute path="/chat">
              <ChatDetail />
            </PrivateRoute>
            <PrivateRoute path="/add-vehicle">
              <AddVehicle />
            </PrivateRoute>
            <PrivateRoute path="/edit-vehicle/:id">
              <EditVehicle />
            </PrivateRoute>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export { AppWithRouter };
