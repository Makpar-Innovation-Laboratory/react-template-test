import React, {useContext} from "react";
import { Box, AppBar, Toolbar, CssBaseline, Typography, makeStyles, useTheme, useMediaQuery, colors, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer";
import Logo from '../../Utility/Images/makpar_icon.ico'
import Auth from '../../Utility/Auth'
import {Context} from '../../App'
import {useNavigate} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex justify-content-start",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: colors.lightBlue,
    fontSize: "20px",
    marginLeft: theme.spacing(5),
    "&:hover": {
      color: colors.yellow,
      borderBottom: "1px solid white",
    },
  },
}));

function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate()
  const context = useContext(Context)
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  function handleSubmit(e) {
    e.preventDefault()
    console.log('clicked')
    Auth.deauthenticateUser()
    context.setAuth(false)
    navigate('/Login')
  }
  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          Makpar
          <Box
            component="img"
            sx={{
              height: 64,
            }}
            alt="Your logo."
            src={Logo}
          />
        </Typography>
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <div className={classes.navlinks}>
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/Mission" className={classes.link}>
              Mission
            </Link>
            <Link to="/PostArchive" className={classes.link}>
              Post Archive
            </Link>
            <Link to="/Profiles" className={classes.link}>
              Developer Profiles
            </Link>
            
            <Button variant="contained" color="secondary" onClick={handleSubmit}>Log Out</Button>  
          </div>
          
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;