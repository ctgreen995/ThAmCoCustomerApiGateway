import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ClientProfileWrapper } from "./ClientProfile.style";
import { TextField, Button, Container, Typography } from "@mui/material";

const ClientProfile = ({ clientData, onSubmit }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    town: "",
    postcode: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (clientData) {
      setFormData({
        ...formData,
        ...clientData,
      });
    }
  }, [clientData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <ClientProfileWrapper>
        <Container
          component="main"
          maxWidth="xs"
          sx={{ marginLeft: "50px", marginTop: "50px", textAlign: "left" }}
        >
          <Typography component="h1" variant="h3">
            Profile
          </Typography>
          <form onSubmit={() => onSubmit(formData)}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={formData.email}
              disabled
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="street"
              label="Street"
              name="street"
              value={formData.street}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="town"
              label="Town"
              name="town"
              value={formData.town}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="postcode"
              label="Postcode"
              name="postcode"
              value={formData.postcode}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Update Profile
            </Button>
          </form>
        </Container>
      </ClientProfileWrapper>
    )
  );
};

export default ClientProfile;
