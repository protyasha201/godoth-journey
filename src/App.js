import './App.css';
import "firebase/auth";
import Home from './Components/Home/Home';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import SignUp from './Components/SignUp/SignUp';
import Header from './Components/Header/Header';
import Error from './Components/Error/Error';
import RideDetail from './Components/RideDetail/RideDetail';
import { createContext, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: '',
    checkPassword: '',
    success: ''
  })

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/signup">
            <SignUp></SignUp>
          </Route>
          <PrivateRoute path="/rideDetail/:rideName">
            <RideDetail></RideDetail>
          </PrivateRoute>
          <Route path="*">
            <Error></Error>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
