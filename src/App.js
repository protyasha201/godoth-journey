import './App.css';
import "firebase/auth";
import Home from './Components/Home/Home';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login';
import Header from './Components/Header/Header';
import Error from './Components/Error/Error';
import RideDetail from './Components/RideDetail/RideDetail';
import { createContext } from 'react';

export const UserContext = createContext();

function App() {

  return (
    // <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
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
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/rideDetail/:rideName">
            <RideDetail></RideDetail>
          </Route>
          <Route path="*">
            <Error></Error>
          </Route>
        </Switch>
      </Router>
    // </UserContext.Provider>`
  );
}

export default App;
