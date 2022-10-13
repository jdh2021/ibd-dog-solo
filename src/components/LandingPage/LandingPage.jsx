import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

import LoginForm from '../LoginForm/LoginForm';

import Grid from '@mui/material/Grid';

function LandingPage() {

  return (
    <Grid container justifyContent="center">
      <Grid item xs={8} sm={6} md={4} lg={3.5} xl={2.5}>
        <LoginForm />
      </Grid>
    </Grid>
  );
}

export default LandingPage;

// CUSTOM COMPONENTS
// import RegisterForm from '../RegisterForm/RegisterForm';

// const [heading, setHeading] = useState('Welcome');
//   const history = useHistory();
// const onLogin = (event) => {
//   history.push('/login');
// };
// <div className="container">
// <h2>{heading}</h2>

// <div className="grid">
//   <div className="grid-col grid-col_8">
//     <p>
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
//       id felis metus. Vestibulum et pulvinar tortor. Morbi pharetra lacus
//       ut ex molestie blandit. Etiam et turpis sit amet risus mollis
//       interdum. Suspendisse et justo vitae metus bibendum fringilla sed
//       sed justo. Aliquam sollicitudin dapibus lectus, vitae consequat odio
//       elementum eget. Praesent efficitur eros vitae nunc interdum, eu
//       interdum justo facilisis. Sed pulvinar nulla ac dignissim efficitur.
//       Quisque eget eros metus. Vestibulum bibendum fringilla nibh a
//       luctus. Duis a sapien metus.
//     </p>

//     <p>
//       Praesent consectetur orci dui, id elementum eros facilisis id. Sed
//       id dolor in augue porttitor faucibus eget sit amet ante. Nunc
//       consectetur placerat pharetra. Aenean gravida ex ut erat commodo, ut
//       finibus metus facilisis. Nullam eget lectus non urna rhoncus
//       accumsan quis id massa. Curabitur sit amet dolor nisl. Proin
//       euismod, augue at condimentum rhoncus, massa lorem semper lacus, sed
//       lobortis augue mi vel felis. Duis ultrices sapien at est convallis
//       congue.
//     </p>

//     <p>
//       Fusce porta diam ac tortor elementum, ut imperdiet metus volutpat.
//       Suspendisse posuere dapibus maximus. Aliquam vitae felis libero. In
//       vehicula sapien at semper ultrices. Vivamus sed feugiat libero. Sed
//       sagittis neque id diam euismod, ut egestas felis ultricies. Nullam
//       non fermentum mauris. Sed in enim ac turpis faucibus pretium in sit
//       amet nisi.
//     </p>
//   </div>
//   <div className="grid-col grid-col_4">
//     <RegisterForm />

//     <center>
//       <h4>Already a Member?</h4>
//       <button className="btn btn_sizeSm" onClick={onLogin}>
//         Login
//       </button>
//     </center>
//   </div>
// </div>
// </div>