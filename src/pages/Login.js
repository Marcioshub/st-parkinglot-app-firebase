import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  FormFeedback,
  Button
} from "reactstrap";

import { Link } from "react-router-dom";
import { useHistory } from "react-router";

//firebase
import firebase from "firebase/app";
import "firebase/auth";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // if User is signed in then redirect to homepage
      //props.history.push("/");
      history.push("/");
    } else {
      // No user is signed in.
    }
  });

  function loginBtn() {
    if (email === "" || password === "") {
      console.log("invaild...");
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          //props.history.push("/");
          history.push({
            pathname: "/",
            user: email
          });
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          console.log(errorCode, errorMessage);
        });
    }
  }

  return (
    <Card className="mx-auto Card">
      <CardHeader>
        <h1>Account Login</h1>
      </CardHeader>
      <CardBody>
        <FormGroup style={{ marginTop: "2%" }}>
          <Input
            onChange={e => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <FormFeedback tooltip>You will not be able to see this</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Input
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <FormFeedback tooltip>You will not be able to see this</FormFeedback>
        </FormGroup>

        <Button
          onClick={() => loginBtn()}
          color="danger"
          size="lg"
          style={{ marginTop: "2%" }}
        >
          Login
        </Button>

        <Link tag={Link} to="/passwordreset">
          <h6 style={{ marginTop: "2%" }}>Forgot your password?</h6>
        </Link>
      </CardBody>
    </Card>
  );
}
