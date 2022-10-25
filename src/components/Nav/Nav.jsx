import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import { useDispatch, useSelector } from 'react-redux';

// fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faClipboardCheck, faHeartPulse, faPills, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

// mui import
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
          {/* If a user is logged in, show these links */}
          {user.id && (
            <>
              <Link className="navLink" to="/home">
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
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default Nav;
