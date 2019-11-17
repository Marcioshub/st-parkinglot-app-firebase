import React, { useState, Fragment, useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  FormGroup,
  Button,
  Alert
} from "reactstrap";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default function AddEmployee(props) {
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

  const timeoutRef = useRef(null);

  /*
  useEffect(() => {
    console.log("useEffect called...");
    //showNotification()
  }, []);*/

  function showNotification() {
    timeoutRef.current = setTimeout(() => {
      setNotification(false);
      setNote({
        color: null,
        text: null
      });
      clearTimeout(timeoutRef.current);
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

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    } else {
      // No user is signed in.
      props.history.push("/login");
    }
  });

  function addEmployeeBtn() {
    if (
      name === "" ||
      email === "" ||
      phone === "" ||
      department === "" ||
      car === "" ||
      model === "" ||
      color === "" ||
      license === ""
    ) {
      console.log("please fill in all fields...");
      setNotification(true);
      setNote({
        color: "danger",
        text: "please fill in all fields..."
      });
    } else {
      // Check if employee already on the database
      var docRef = firebase
        .firestore()
        .collection(firebase.auth().currentUser.email)
        .doc(email);

      docRef
        .get()
        .then(function(doc) {
          if (doc.exists) {
            console.log("Employee already exists", doc.data());
            setNotification(true);
            setNote({
              color: "danger",
              text: "Employee already exists"
            });
          } else {
            // doc.data() will be undefined in this case
            console.log("New Employee!");

            // Add a new document in collection "cities"
            firebase
              .firestore()
              .collection(firebase.auth().currentUser.email)
              .doc(email)
              .set({
                name: name,
                email: email,
                phone: phone,
                department: department,
                car: car,
                model: model,
                color: color,
                license: license
              })
              .then(function() {
                console.log("Document successfully written!");
                setNotification(true);
                setNote({
                  color: "success",
                  text: "Employee successfully saved!"
                });
                setName("");
                setEmail("");
                setPhone("");
                setDepartment("");
                setCar("");
                setModel("");
                setColor("");
                setLicense("");
              })
              .catch(function(error) {
                console.error("Error writing document: ", error);
                setNotification(true);
                setNote({
                  color: "danger",
                  text: `Error writing document: ${error}`
                });
              });
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
          setNotification(true);
          setNote({
            color: "danger",
            text: `Error getting document: ${error}`
          });
        });
    }
  }

  return (
    <Fragment>
      {notification === true ? showNotification() : null}
      <Card className="mx-auto add-employee-card">
        <CardHeader>
          <h1 style={{ textAlign: "center" }}>Add Employee</h1>
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
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              value={email}
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
            onClick={() => addEmployeeBtn()}
          >
            Add Employee
          </Button>
        </CardBody>
      </Card>
    </Fragment>
  );
}
