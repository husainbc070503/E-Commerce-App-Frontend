import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Button, TextField } from "@mui/material";
import "./Contact.css";

function ContactForm() {
  const [state, handleSubmit] = useForm("xbjevwbl");
  if (state.succeeded) {
    return <p>Thanks for contacting!</p>;
  }
  return (
    <form
      action="https://formspree.io/f/mbjevwel"
      method="POST"
      className="form"
    >
      <TextField
        type="name"
        name="username"
        label="Full Name"
        variant="outlined"
        className="TextField input"
        required
      />
      <TextField
        name="email"
        type="email"
        label="Email"
        variant="outlined"
        className="TextField input"
        required
      />
      <textarea
        name="message"
        placeholder="Message"
        className="text"
        required
      ></textarea>
      <Button type="submit" className="Button submit" variant="contained">
        Submit
      </Button>
    </form>
  );
}

const Contact = () => {
  return (
    <div className="ecom-container">
      <h1 className="form-heading">Contact Form</h1>
      <ContactForm />
    </div>
  );
};

export default Contact;
