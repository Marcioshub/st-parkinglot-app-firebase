import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  Button
} from "reactstrap";

//firebase
import firebase from "firebase/app";
import "firebase/auth";

export default function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // if User is signed in then redirect to homepage
      props.history.push("/");
    } else {
      // No user is signed in.
    }
  });

  function registerBtn() {
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          props.history.push("/");
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
    <Card className="mx-auto register-card">
      <CardHeader>
        <h1>Register Account</h1>
      </CardHeader>
      <CardBody>
        <FormGroup style={{ marginTop: "5%" }}>
          <Input
            onChange={e => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
        </FormGroup>
        <FormGroup>
          <Input
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </FormGroup>
        <FormGroup>
          <Input
            onChange={e => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm Password"
          />
        </FormGroup>

        <Button
          onClick={() => registerBtn()}
          color="danger"
          size="lg"
          style={{ marginTop: "5%" }}
        >
          Register
        </Button>
      </CardBody>
    </Card>
  );
}
