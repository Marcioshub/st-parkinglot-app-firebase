import React from "react";
import { Card, CardHeader, CardBody } from "reactstrap";

export default function Error() {
  return (
    <Card className="mx-auto login-card">
      <CardHeader>
        <h1 style={{ textAlign: "center" }}>404</h1>
      </CardHeader>
      <CardBody>
        <h4
          style={{
            marginTop: "5%",
            marginBottom: "5%",
            padding: "10%",
            textAlign: "center"
          }}
        >
          Sorry, this page doesn't exists
        </h4>
      </CardBody>
    </Card>
  );
}
