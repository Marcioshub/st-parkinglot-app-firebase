import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";
import Loader from "react-loader-spinner";

// router
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

// firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default function Home(props) {
  const [keyword, setKeyword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState({
    data: null
  });

  let history = useHistory();

  //var timeoutRef = useRef(null);

  useEffect(() => {
    console.log("UseEffect called...");

    const unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // if User is signed in then redirect to homepage
        setCurrentUser(user.email);
        syncToDatabase(user.email);
      } else {
        // No user is signed in.
        history.push("/login");
      }
    });

    return () => unsubscribe();

    // eslint-disable-next-line
  }, []);

  function syncToDatabase(email) {
    firebase
      .firestore()
      .collection(email)
      .get()
      .then(function(querySnapshot) {
        var emp = [];
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, " => ", doc.data());
          emp.push(doc.data());
        });

        setEmployees({
          data: emp
        });
      })
      .finally(() => {
        setLoading(false);
        //clearTimeout(timeoutRef);
      });
  }

  function deleteEmployee(employee) {
    firebase
      .firestore()
      .collection(firebase.auth().currentUser.email)
      .doc(employee)
      .delete()
      .then(function() {
        console.log("Document successfully deleted!");
        syncToDatabase(currentUser);
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  }

  function EmployeeCard(data) {
    return (
      <Card key={data.license} className="mx-auto employee-card">
        <CardHeader style={{ textAlign: "center" }}>
          <h2>{data.name}</h2>
        </CardHeader>
        <CardBody>
          <Container>
            <Row>
              <Col lg="6">
                <h4>
                  <i className="fas fa-phone"></i> {data.phone}
                </h4>
                <h4>
                  <i className="fas fa-envelope-open-text"></i> {data.email}
                </h4>
                <h4>
                  <i className="fas fa-building"></i> {data.department}
                </h4>
                <h4>
                  <i className="fas fa-car"></i> {data.car} {data.model}{" "}
                  {data.color}
                </h4>
                <h4>
                  <i className="fas fa-address-card"></i> {data.license}
                </h4>
              </Col>
              <Col lg="6">
                <Button
                  color="primary"
                  size="lg"
                  style={{ width: "100%", margin: "1%", marginTop: "10%" }}
                  tag={Link}
                  to={{
                    pathname: "/editemployee",
                    aboutProps: data,
                    user: { email: currentUser }
                  }}
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  size="lg"
                  style={{ width: "100%", margin: "1%" }}
                  onClick={() => deleteEmployee(data.email)}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </Container>
        </CardBody>
      </Card>
    );
  }

  return (
    <div>
      <Input
        bsSize="lg"
        onChange={e => setKeyword(e.target.value)}
        placeholder="Employee Search"
        className="mx-auto search-input"
      />

      {loading ? (
        <div style={{ textAlign: "center" }}>
          <Loader
            style={{ margin: "10%" }}
            type="ThreeDots"
            color="#00BFFF"
            height={100}
            width={100}
          />
        </div>
      ) : employees.data === [] ||
        employees.data === null ||
        employees.data < 1 ? (
        <div style={{ textAlign: "center", marginTop: "5%" }}>
          <h3>List empty, please add employees</h3>
        </div>
      ) : keyword === "" ? (
        employees.data.map(employee => {
          return EmployeeCard(employee);
        })
      ) : (
        employees.data
          .filter(
            employee =>
              employee.name.toLowerCase().includes(keyword.toLowerCase()) ||
              employee.license.toLowerCase().includes(keyword.toLowerCase()) ||
              employee.car.toLowerCase().includes(keyword.toLowerCase())
          )
          .map(e => {
            return EmployeeCard(e);
          })
      )}
    </div>
  );
}
