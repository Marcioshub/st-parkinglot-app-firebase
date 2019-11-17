import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  FormGroup,
  Button
} from "reactstrap";

//firebase
import firebase from "firebase/app";
import "firebase/auth";

export default function PasswordReset(props) {
  const [email, setEmail] = useState("");

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // if User is signed in then redirect to homepage
      props.history.push("/");
    } else {
      // No user is signed in.
    }
  });

  function resetPasswd() {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function() {
        // Email sent.
        console.log("Reset email has been sent");
      })
      .catch(function(error) {
        // An error happened.
        console.log("Error in reseting email...");
      });
  }

  return (
    <Card className="mx-auto login-card">
      <CardHeader>Email Reset</CardHeader>
      <CardBody>
        <FormGroup style={{ marginTop: "5%" }}>
          <Input
            onChange={e => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
        </FormGroup>

        <Button
          size="lg"
          color="danger"
          style={{ marginTop: "5%" }}
          onClick={() => resetPasswd()}
        >
          Reset Email
        </Button>
      </CardBody>
    </Card>
  );
}
