import React from 'react';
import { Link } from 'react-router-dom';
// import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

// fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { faHeartPulse } from '@fortawesome/free-solid-svg-icons';
import { faPills } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import Grid from '@mui/material/Grid';

function Nav() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  
  return (
    <>
      <Grid justifyContent="center">
        <Grid item className="header">
          <Link to="/home">
            <h1 className="Header-title">IBDog</h1>
          </Link>
        </Grid>
        <Grid item className="nav">
          {/* If no user is logged in, show these links */}
          {/* {!user.id && (
            // If there's no user, show login/registration links
            <Link className="navLink" to="/login">
              Login / Register
            </Link>
          )} */}

          {/* If a user is logged in, show these links */}
          {user.id && (
            <>
              <Link className="navLink" to="/user">
                <FontAwesomeIcon icon={faPaw} size="xl"/>
              </Link>
              <Link className="navLink" to="/checkin">
                <FontAwesomeIcon icon={faClipboardCheck} size="xl"/>
              </Link>
              <Link className="navLink" to="/healthstatus">
                <FontAwesomeIcon icon={faHeartPulse} size="xl"/>
              </Link>
              <Link className="navLink" to="/medications">
                <FontAwesomeIcon icon={faPills} size="xl"/>
              </Link>
              <FontAwesomeIcon className="Log-out" icon={faRightFromBracket} onClick={() => dispatch({ type: 'LOGOUT' })}/>
              {/* <Link className="navLink" to="/info">
                Info Page
              </Link> */}
            </>
          )}
          {/* <Link className="navLink" to="/about">
            About
          </Link> */}
        </Grid>
      </Grid>
    </>
  );
}

export default Nav;
