import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { Link } from "react-router-dom";

//firebase
import firebase from "firebase/app";
import "firebase/auth";

// todo

export default function Navigationbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [person, setPerson] = useState(null);

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // if User is signed in then redirect to homepage
      setPerson(user.email);
    } else {
      // No user is signed in.
    }
  });

  function logout() {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
        setPerson(null);
      })
      .catch(function(error) {
        // An error happened.
      })
      .finally(() => {
        if (isOpen) {
          toggle();
        }
      });
  }

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand
          tag={Link}
          to={person !== null ? "/" : "/login"}
          onClick={isOpen === true ? () => toggle() : null}
        >
          ST Parking Lot
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          {person === null ? (
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink
                  tag={Link}
                  to="/login"
                  onClick={isOpen === true ? () => toggle() : null}
                >
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={Link}
                  to="/register"
                  onClick={isOpen === true ? () => toggle() : null}
                >
                  Register
                </NavLink>
              </NavItem>
            </Nav>
          ) : (
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink
                  tag={Link}
                  to="/addemployee"
                  onClick={isOpen === true ? () => toggle() : null}
                >
                  Add Employee
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => logout()} tag={Link} to="/login">
                  Logout
                </NavLink>
              </NavItem>
            </Nav>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
}
