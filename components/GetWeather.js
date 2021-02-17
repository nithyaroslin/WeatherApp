import React, {useState} from 'react';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function GetWeather() {
  const classes = useStyles();
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");

  const handleChange = (event) => {
       
    setCity(event.target.value)
}

  const handleSubmit = (event) => {
      event.preventDefault();

      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=10379ab80c610c632de76cb22f5fa16a`)
        .then(res => {
          if (res.status >= 200 && res.status <= 299) {
            return res.json();
          } else {
            throw Error(res.statusText);
          }
        })
        .then(res => {
            //console.log(res)
            setWeatherData(res)
            
        })
        .catch((error) => {
          // Handle the error
          setWeatherData(null)
          console.log(error);
        })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Weather App
        </Typography>
        <Typography component="h2" variant="body1">
          Find Temperature, Humidity and more...
        </Typography>
        <form className={classes.form}  onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="city"
            label="Enter City Name"
            name="city"
            value={city}
            autoFocus
            onChange={handleChange}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Get Weather
          </Button>
          
        </form>
      </div>
      <Box mt={8}>
        {/* {JSON.stringify(weatherData)} */}
      {/* {weatherData && (weatherData["cod"] === 404) && 
        <Typography component="p" variant="body1">
          {city} - not found
        </Typography>
        } */}
      {weatherData && (weatherData["cod"] === 200) &&
           
            <div>
              <Typography component="p" variant="body1">
                  Location     : {weatherData["name"]}, {weatherData["sys"]["country"]} 
              </Typography>
              <Typography component="p" variant="body1">
                  Weather      : {weatherData["weather"][0]["description"]} 
              </Typography>
              <Typography component="p" variant="body1">
                  Temperature  : {parseFloat(weatherData["main"]["temp"] - 273).toFixed(2)}°C 
              </Typography>
              <Typography component="p" variant="body1">
                  Pressure      : {weatherData["main"]["pressure"]}mb
              </Typography>
              <Typography component="p" variant="body1">
                  Humidity      : {weatherData["main"]["humidity"]}%
              </Typography>
               
            </div> 
            
          }
      </Box>
    </Container>
  );
}