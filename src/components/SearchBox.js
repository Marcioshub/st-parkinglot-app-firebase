/* eslint-disable no-use-before-define */
import React, { Fragment, useEffect, useState } from "react";
import MaterialTable from "material-table";
import CssBaseline from "@material-ui/core/CssBaseline";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { useHistory } from "react-router";

export default function SearchBox() {
  const [snackbarMessage, setSnackbarMessage] = useState("");
  //const [currentUser, setCurrentUser] = useState(null);
  const [employees, setEmployees] = useState({
    data: []
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const snackbarHandleClick = () => {
    setSnackbarOpen(true);
  };
  const snackbarHandleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  let history = useHistory();

  function syncToDatabase(user) {
    //console.log("sync db called");
    var emp = [];
    firebase
      .firestore()
      .collection(user)
      .get()
      .then(function(querySnapshot) {
        //var emp = [];
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, " => ", doc.data());

          emp.push(JSON.parse(JSON.stringify(doc.data())));
        });

        setEmployees({ data: emp });
        //console.log("inside snapshot", emp);
      })
      .catch(error => {
        //console.log("error:", error);
      });
  }

  useEffect(() => {
    //console.log("useEffect called...");

    const unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // if User is signed in then redirect to homepage
        //console.log(user.email);
        //setCurrentUser(user.email);
        syncToDatabase(user.email);
      } else {
        // No user is signed in.
        history.push("/login");
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  function addEmployee(newEmployee) {
    // Check if employee already on the database
    var docRef = firebase
      .firestore()
      .collection(firebase.auth().currentUser.email)
      .doc(newEmployee.email);

    docRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          //console.log("Employee already exists", doc.data());

          setSnackbarMessage("Employee already exists");
          snackbarHandleClick();
        } else {
          // doc.data() will be undefined in this case
          //console.log("New Employee!");

          // Add a new document in collection "cities"
          firebase
            .firestore()
            .collection(firebase.auth().currentUser.email)
            .doc(newEmployee.email)
            .set({
              name: newEmployee.name,
              email: newEmployee.email,
              phone: newEmployee.phone,
              department: newEmployee.department,
              car: newEmployee.car,
              model: newEmployee.model,
              color: newEmployee.color,
              license: newEmployee.license
            })
            .then(function() {
              //console.log("Document successfully written!");
              //clear();

              setSnackbarMessage("Employee successfully added");
              snackbarHandleClick();
              syncToDatabase(firebase.auth().currentUser.email);
            })
            .catch(function(error) {
              //console.error("Error writing document: ", error);

              setSnackbarMessage(`${error.code}: ${error.message}`);
              snackbarHandleClick();
            });
        }
      })
      .catch(function(error) {
        //console.log("Error getting document:", error);

        setSnackbarMessage(`${error.code}: ${error.message}`);
        snackbarHandleClick();
      });
  }

  function updateEmployee(employee) {
    var dbRef = firebase
      .firestore()
      .collection(firebase.auth().currentUser.email)
      .doc(employee.email);

    // update info
    return dbRef
      .update({
        name: employee.name,
        phone: employee.phone,
        department: employee.department,
        car: employee.car,
        model: employee.model,
        color: employee.color,
        license: employee.license
      })
      .then(function() {
        //console.log("Document successfully updated!");
        setSnackbarMessage("Employee information upated");
        snackbarHandleClick();
        syncToDatabase(firebase.auth().currentUser.email);
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        //console.error("Error updating document: ", error);
        setSnackbarMessage(`${error.code}: ${error.message}`);
        snackbarHandleClick();
      });
  }

  function deleteEmployee(employee) {
    firebase
      .firestore()
      .collection(firebase.auth().currentUser.email)
      .doc(employee.email)
      .delete()
      .then(function() {
        //console.log("Document successfully deleted!");
        setSnackbarMessage("Employee deleted");
        snackbarHandleClick();
        syncToDatabase(firebase.auth().currentUser.email);
      })
      .catch(function(error) {
        //console.error("Error removing document: ", error);
        setSnackbarMessage(`${error.code}: ${error.message}`);
        snackbarHandleClick();
      });
  }

  const [state, setState] = useState({
    columns: [
      { title: "Name", field: "name" },
      { title: "Email", field: "email" },
      { title: "Phone", field: "phone" },
      { title: "Car", field: "car" },
      { title: "Model", field: "model" },
      { title: "Color", field: "color" },
      { title: "License", field: "license" },
      {
        title: "Department",
        field: "department",
        lookup: {
          0: "SouthernTelecom",
          1: "Marcel Group",
          2: "Art and Cook",
          3: "Other"
        }
      }
    ],
    data: [
      {
        name: "Mehmet",
        email: "Meh@gmail.com",
        phone: "111-222-3333",
        car: "honda",
        model: "civic",
        color: "green",
        license: "123-xsy",
        department: 0
      },
      {
        name: "Joe",
        email: "joe@gmail.com",
        phone: "121-334-5553",
        car: "bmw",
        model: "3 series",
        color: "blue",
        license: "455-ddy",
        department: 1
      },
      {
        name: "April",
        email: "april@gmail.com",
        phone: "999-222-1133",
        car: "toyota",
        model: "camery",
        color: "black",
        license: "hfc-443",
        department: 2
      },
      {
        name: "Jane",
        email: "hane@gmail.com",
        phone: "999-222-1133",
        car: "BMW",
        model: "4 series",
        color: "black",
        license: "kfc-223",
        department: 0
      }
    ]
  });

  return (
    <Fragment>
      <CssBaseline />
      <MaterialTable
        title="Employees"
        columns={state.columns}
        data={employees.data}
        localization={{ body: { editRow: { deleteText: "Delete employee?" } } }}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              console.log("newData:", newData);
              setTimeout(() => {
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];

                  // if newData.email is null then don't add this row
                  if (newData.email === undefined) {
                    console.log("inside if", newData.email);
                    return { ...prevState };
                  } else {
                    console.log("inside else", newData.email);
                    data.push(newData);
                    // add to firebase
                    addEmployee(newData);
                    return { ...prevState, data };
                  }
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;

                    //update firebase
                    updateEmployee(newData);

                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);

                  // delete employee
                  deleteEmployee(oldData);

                  return { ...prevState, data };
                });
              }, 600);
            })
        }}
      />

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={snackbarHandleClose}
        message={snackbarMessage}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={snackbarHandleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Fragment>
  );
}

/*

<Autocomplete
        style={{ marginBottom: 10 }}
        id="combo-box-demo"
        options={employees.data}
        getOptionLabel={option => option.name || option.license || option.car}
        noOptionsText="Car not found..."
        onChange={(event, value) => handleChange(value)}
        renderInput={params => (
          <TextField
            {...params}
            label="Enter License plate or Car make"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <div className={classes.root}>
        <div className={classes.container}>
          <Collapse in={checked}>
            <EmployeeCard
              employee={selectedEmployee}
              user={currentUser}
              update={syncToDatabase}
              collapse={handleChange}
            />
          </Collapse>
        </div>
      </div>

      <SpeedDialBtn className={classes.fab} />

*/
