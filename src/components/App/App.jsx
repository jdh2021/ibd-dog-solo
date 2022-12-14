import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import AboutPage from '../AboutPage/AboutPage';
import CheckIn from '../CheckIn/CheckIn';
import Footer from '../Footer/Footer';
import HealthStatus from '../HealthStatus/HealthStatus';
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import Medication from '../Medication/Medication';
import Nav from '../Nav/Nav';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import RegisterPage from '../RegisterPage/RegisterPage';

// mui date picker
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// font, color theme
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

const fontTheme = createTheme({
  typography: {
    fontFamily: ['Quicksand', 'sans-serif'].join(','),
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: '#f5811d',
    },
  }
});

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={fontTheme}>
        <Router>
          <div className="Main-content">
            <Nav />
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/home" />

              {/* Visiting localhost:3000/about will show the about page. */}
              <Route // shows AboutPage at all times (logged in or not)
                exact path="/about"
              >
                <AboutPage />
              </Route>

              {/* For protected routes, the view could show one of several things on the same route.
                Visiting localhost:3000/home will show the HomePage if the user is logged in.
                If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
                Even though it seems like they are different pages, the user is always on localhost:3000/home */}
              <ProtectedRoute // logged in shows HomePage 
                exact path="/home"
              >
                <HomePage />
              </ProtectedRoute>

              <ProtectedRoute exact path="/checkin">
                <CheckIn />
              </ProtectedRoute>

              <ProtectedRoute exact path="/healthstatus">
                <HealthStatus />
              </ProtectedRoute>

              <ProtectedRoute exact path="/medications">
                <Medication />
              </ProtectedRoute>

              <Route exact path="/login">
                {user.id ?
                  // If the user is already logged in, 
                  // redirect to the /home page
                  <Redirect to="/home" />
                  :
                  // Otherwise, show the login page
                  <LoginPage />
                }
              </Route>

              <Route exact path="/registration">
                {user.id ?
                  // If the user is already logged in, 
                  // redirect them to the /user page
                  <Redirect to="/home" />
                  :
                  // Otherwise, show the registration page
                  <RegisterPage />
                }
              </Route>
              {/* If none of the other routes matched, we will show a 404. */}
              <Route>
                <PageNotFound />
              </Route>
            </Switch>
          </div>
          <Footer />
        </Router>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
