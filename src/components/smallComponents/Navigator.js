import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap'
import classes from './nav.module.css';
//import anim from '../../assets/taxi.png'
import logo from "../../assets/logo2.png"

class Navigator extends Component {


  render() {

    return (

      <Navbar sticky="top" collapseOnSelect expand="lg" className={classes.navMain} style={{ backgroundColor: '#ffffff78' }} variant="dark" >
        {/* <Navbar.Brand className = {classes.navText} style = {{color:'black'}} href="/">The Croozer</Navbar.Brand> */}
        <Navbar.Brand href="/">
          <img className={classes.title}
            src={logo}
            width="200"
            height="40"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>

      </Navbar>

    );
  }
}

export default Navigator;


/**
 * old code
 * <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="Dash">Dash</Nav.Link>
                  <Nav.Link href="Settings">Settings</Nav.Link>
                  <Nav.Link href="about">About</Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link href="contact">Contact Us</Nav.Link>
                </Nav>
              </Navbar.Collapse>
 */