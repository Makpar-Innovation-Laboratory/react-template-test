import React, {useContext} from "react";
import { Box, AppBar, Toolbar, CssBaseline, Typography, makeStyles, useTheme, useMediaQuery, colors, Button, ThemeProvider} from "@material-ui/core";
import {red, blue, common, yellow} from "@material-ui/core/colors"
import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer";
import Logo from '../../Utility/Images/makpar_icon.ico'
import Auth from '../../Utility/Auth'
import {Context} from '../../App'
import {useNavigate} from 'react-router-dom'
import theme from '../../Utility/theme'

const useStyles = makeStyles((theme) => ({
  root:{background: blue[700]},
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex justify-content-start",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
    color: common.white
  },
  link: {
    underlineHover:{color: red[500]},
    textDecoration: "none",
    fontSize: "20px",
    marginLeft: theme.spacing(5),
    "&:hover": {
      color: yellow,
      borderBottom: "1px solid white",
    }
  },
  text:{
    color: common.white, 
    children: "link"
  },
  button:{
    containedSecondary:{
      color: blue[50],
    },
  }
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" className={classes.root}>
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
              <Button variant='text' href="/"><Typography className={classes.text}> Home</Typography></Button>
              <Button variant='text' href="/Mission"><Typography className={classes.text}> Mission</Typography></Button>
              <Button variant='text' href="/PostArchive"><Typography className={classes.text}> Post Archive </Typography></Button>
              <Button variant='text' href="/Profiles"><Typography className={classes.text}> Text </Typography></Button>
              {/* <Link to="/"  className={classes.link} underline='hover'>
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
              </Link> */}
              
              <Button className={classes.button} variant="contained" color="secondary" onClick={handleSubmit}>Log Out</Button>  
            </div>
            
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
export default Navbar;