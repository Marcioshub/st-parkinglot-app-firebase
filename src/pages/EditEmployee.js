import React, { useState, Fragment, useRef, useEffect } from "react";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// reactstrap
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  FormGroup,
  Button,
  Alert
} from "reactstrap";

export default function EditEmployee(props) {
  const [user, setUser] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [car, setCar] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [license, setLicense] = useState("");

  const [notification, setNotification] = useState(false);
  const [note, setNote] = useState({
    color: null,
    text: null
  });

  var timeoutRef = useRef(null);

  useEffect(() => {
    if (
      props.location.aboutProps !== undefined ||
      props.location.user !== undefined
    ) {
      // Current user
      setUser(props.location.user.email);

      // Employee info
      setName(props.location.aboutProps.name);
      setPhone(props.location.aboutProps.phone);
      setEmail(props.location.aboutProps.email);
      setDepartment(props.location.aboutProps.department);
      setCar(props.location.aboutProps.car);
      setModel(props.location.aboutProps.model);
      setColor(props.location.aboutProps.color);
      setLicense(props.location.aboutProps.license);

      console.log("user: ", props.location.user.email);
      console.log("data: ", props.location.aboutProps.name);
    }

    // eslint-disable-next-line
  }, []);

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // if User is signed in then redirect to homepage

      if (
        props.location.aboutProps === undefined ||
        props.location.user === undefined
      ) {
        props.history.push("/");
      }
    } else {
      // No user is signed in.
      props.history.push("/login");
    }
  });

  function showNotification() {
    timeoutRef = setTimeout(() => {
      setNotification(false);
      setNote({
        color: null,
        text: null
      });
      clearTimeout(timeoutRef);
    }, 4000);

    return (
      <Alert
        className="mx-auto"
        color={note.color}
        style={{ width: "50%", marginTop: "5%" }}
      >
        {note.text}
      </Alert>
    );
  }

  function submitBtn() {
    var dbRef = firebase
      .firestore()
      .collection(user)
      .doc(email);

    // update info
    return dbRef
      .update({
        name: name,
        phone: phone,
        department: department,
        car: car,
        model: model,
        color: color,
        license: license
      })
      .then(function() {
        console.log("Document successfully updated!");
        setNotification(true);
        setNote({
          color: "success",
          text: "Employee edit complete!"
        });
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
        setNotification(true);
        setNote({
          color: "danger",
          text: "Error editing employee... Try again"
        });
      });
  }

  return (
    <Fragment>
      {notification === true ? showNotification() : null}
      <Card className="mx-auto add-employee-card">
        <CardHeader>
          <h1 style={{ textAlign: "center" }}>Edit Employee</h1>
        </CardHeader>
        <CardBody>
          <FormGroup style={{ marginTop: "5%" }}>
            <Input
              onChange={e => setName(e.target.value)}
              type="text"
              placeholder="Name"
              value={name}
            />
          </FormGroup>
          <FormGroup>
            <Input
              onChange={e => setPhone(e.target.value)}
              type="text"
              placeholder="Phone"
              value={phone}
            />
          </FormGroup>
          <FormGroup>
            <Input
              onChange={e => setDepartment(e.target.value)}
              type="text"
              placeholder="Department"
              value={department}
            />
          </FormGroup>
          <FormGroup>
            <Input
              onChange={e => setCar(e.target.value)}
              type="text"
              placeholder="Car"
              value={car}
            />
          </FormGroup>
          <FormGroup>
            <Input
              onChange={e => setModel(e.target.value)}
              type="text"
              placeholder="Model"
              value={model}
            />
          </FormGroup>
          <FormGroup>
            <Input
              onChange={e => setColor(e.target.value)}
              type="text"
              placeholder="Color"
              value={color}
            />
          </FormGroup>
          <FormGroup>
            <Input
              onChange={e => setLicense(e.target.value)}
              type="text"
              placeholder="License"
              value={license}
            />
          </FormGroup>

          <Button
            style={{ marginTop: "5%" }}
            className="mx-auto"
            color="danger"
            size="lg"
            onClick={() => submitBtn()}
          >
            Submit
          </Button>
        </CardBody>
      </Card>
    </Fragment>
  );
}
