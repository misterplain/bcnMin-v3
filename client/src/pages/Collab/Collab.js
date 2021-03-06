import React, { useState } from "react";
import { COLLAB } from "../../shared/collab";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Backdrop,
  Fade,
  Box,
  Typography,
  Container,
  Modal,
  TextField,
  FormGroup,
  FormGroupLabel,
  FormControlLabel,
  Checkbox,
  FormLabel,
  FormControl, TextareaAutosize
} from "@material-ui/core";
//redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

const collab = COLLAB;

//collab modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Your name should have more than 3 characters")
    .required("Required"),
  // phoneNum: Yup.string()
  //   .min(
  //     9,
  //     "Phone number should have more than 3 characters, please include country code"
  //   )
  //   .required("Required"),
  email: Yup.string().min(3, "Too short").required("Required"),
  message: Yup.string()
    .min(2, "You can do better than that")
    .required("Required"),
});

const Collab = (props) => {
  const [contact, setContact] = useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNum: "",
      email: "",
      message: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      setContact({
        name: values.name,
        phoneNum: values.phoneNum,
        email: values.email,
        message: values.message,
      });
      console.log(values);
      resetForm();
    },
  });

  //modal state
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const triggerAlert = () => {
    props.setAlert("THIS IS AN ALERT TEST AND IT WORKED!", "success");
  };
  return (
    <Container size='sm'>
      <FormControl onSubmit={formik.handleSubmit}>
        <FormGroup>
          <FormControlLabel
            control={
              <TextField
                type='text'
                name='name'
                value={formik.values.name}
                onChange={formik.handleChange}
                className='form-control'
              />
            }
            label='Name'
          />

          {formik.errors.name && formik.touched.name ? (
            <div className='collab__errors'>{formik.errors.name}</div>
          ) : null}
          <FormGroup>
            <FormControlLabel
              control={
                <TextField
                  type='number'
                  name='phoneNum'
                  value={formik.values.phoneNum}
                  onChange={formik.handleChange}
                  className='form-control'
                />
              }
              label='Phone Number'
            />

            {/* {formik.errors.phoneNum && formik.touched.phoneNum ? (
                <div className="collab__errors">{formik.errors.phoneNum}</div>
              ) : null} */}
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={
                <TextField
                  type='text'
                  name='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className='form-control'
                />
              }
              label='Email'
            />

            {formik.errors.email && formik.touched.email ? (
              <div className='collab__errors'>{formik.errors.email}</div>
            ) : null}
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={
                <TextareaAutosize
                  type='text'
                  name='message'
                  rows='4'
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  className='form-control'
                />
              }
              label='Enter your message here'
            />

            {formik.errors.message && formik.touched.message ? (
              <div className='collab__errors'>{formik.errors.message}</div>
            ) : null}
          </FormGroup>
        </FormGroup>

        <Button type='submit' onClick={handleOpen}>
          Submit feedback
        </Button>
      </FormControl>

      <div className='collab__list'>
        {collab.map((collab) => {
          return (
            <div key={collab.id} className='collab__list-card'>
              <a href={collab.src} target='_blank' rel='noreferrer'>
                <p className='collab__list-card-text'>{collab.name}</p>
              </a>
            </div>
          );
        })}
      </div>

      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id='transition-modal-title' variant='h6' component='h2'>
              Your water footprint
            </Typography>
            <Typography id='transition-modal-description' sx={{ mt: 2 }}>
              Your weekly water footprint is which is over the course of a month
              and over the course of a year
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default connect(null)(Collab);
