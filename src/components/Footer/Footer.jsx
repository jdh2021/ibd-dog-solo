import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

// fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return <footer>
    {/* &copy; Prime Digital Academy */}
    <Link className="Footer-link" to="/about">
      <FontAwesomeIcon icon={faCircleQuestion} color="#9c27b0" />
    </Link> |  <Link className="Footer-link" to="/home">
      <FontAwesomeIcon icon={faHouse} color="#9c27b0" />
    </Link>
  </footer>;
}

export default Footer;
