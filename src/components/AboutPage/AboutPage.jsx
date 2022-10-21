import { useHistory } from 'react-router-dom';

// material ui imports
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function AboutPage() {
  const history = useHistory();

  return (
    <Grid container justifyContent="center">
      <Grid item xs={8} sm={7} md={6} lg={4.5} xl={3.25}>
        <Card elevation={4} sx={{ backgroundColor: "#eaeef1", mb: 4, mt: 4, pb: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
              About IBDog
            </Typography>
            <Typography>
              Pet owners play a crucial role in navigating veterinary healthcare systems and advocating for their animals. IBDog was born from the desire to improve quality of life for dogs with Inflammatory Bowel Disease by helping owners better manage the condition and communicate their findings with treating veterinarians.
            </Typography>
            <br />
            <Typography variant="h6">
              Technologies used:
              <Typography variant="body1" sx={{ mb: 2, mt: 2 }}>
                &#8226;  React.js<br />
                &#8226;  Redux<br />
                &#8226;  Redux-Saga<br />
                &#8226;  PostgreSQL<br />
                &#8226;  Node.js<br />
                &#8226;  Express.js<br />
                &#8226;  Material UI<br />
              </Typography>
            </Typography>
          </CardContent>
          <CardActions sx={{ display: "flex", flexDirection: "row", justifyContent: "center", mt: 0.5 }}>
            <Button variant="contained" sx={{ mb: 2 }} onClick={() => history.goBack()}>Back</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default AboutPage;
