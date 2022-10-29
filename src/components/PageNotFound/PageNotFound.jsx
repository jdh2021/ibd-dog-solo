import { useHistory } from 'react-router-dom';

// mui imports
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

function PageNotFound() {
  const history = useHistory();

  return (
    <Grid container justifyContent="center">
      <Grid item xs={8.25} sm={6.5} md={5.25} lg={4} xl={3}>
        <Card elevation={4} sx={{ backgroundColor: "#eaeef1", mb: 4, mt: 4, pb: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mt: 4, mb: 3 }}>
              Ruh-roh!
            </Typography>
            <Typography variant="body1" sx={{ ml: 4, mr: 4, mt: 3 }}>
              We didn't find the page you were looking for. Let's get you back home.
            </Typography>
          </CardContent>
          <CardActions sx={{ display: "flex", flexDirection: "row", justifyContent: "center", mt: 0.5 }}>
            <Button variant="contained" size="small" sx={{ mb: 3.5, mt: 2, pt: 1, pb: 1 }} onClick={() => history.push('/home')}>
              <FontAwesomeIcon icon={faPaw} size="xl" />
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default PageNotFound;
