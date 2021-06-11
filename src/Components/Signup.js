import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useSelector, useDispatch } from "react-redux";
import { setHistory } from "../action/GlobalAction";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
}));

export default function Signup() {
  const classes = useStyles();
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const colorSelector = useSelector((state) => state.globalData.colorState);
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);

  const handleChecked = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    dispatch(setHistory(history.location.pathname));
  }, []);
  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  let { userName, password, email, confirmPassword } = data;

  let handelSignin = async (e) => {
    e.preventDefault();
  };

  let handelChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs" className="signupclass">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar
          className={classes.avatar}
          style={{ background: colorSelector ? "black" : "#3F51B5" }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          style={{ color: colorSelector ? "white" : "black" }}
        >
          Sign Up
        </Typography>
        <form className={classes.form} noValidate>
          <input
            placeholder="Full Name"
            className={
              colorSelector ? "customInputFieldsDark" : "customInputFields"
            }
            name="userName"
            value={userName}
            autoFocus
            autoComplete="off"
            autoFocus
            onChange={handelChange}
          />
          <input
            placeholder="User Email"
            className={
              colorSelector ? "customInputFieldsDark" : "customInputFields"
            }
            name="email"
            value={email}
            autoFocus
            autoComplete="off"
            autoFocus
            onChange={handelChange}
          />

          <input
            placeholder="Password"
            className={
              colorSelector ? "customInputFieldsDark" : "customInputFields"
            }
            name="password"
            type={checked ? "text" : "password"}
            value={password}
            autoFocus
            autoComplete="off"
            onChange={handelChange}
          />
          <input
            placeholder="Confirm Password"
            className={
              colorSelector ? "customInputFieldsDark" : "customInputFields"
            }
            name="confirmPassword"
            value={confirmPassword}
            type={checked ? "text" : "password"}
            autoFocus
            autoComplete="off"
            onChange={handelChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={handleChecked}
                name="checked"
                style={{ color: colorSelector ? "white" : "#3F51B5" }}
              />
            }
            style={{
              color: colorSelector ? "white" : "#3F51B5",
              marginTop: "-10px",
            }}
            label="Show Password"
          />
          <Alert
            variant="filled"
            severity="error"
            style={{ display: errorMessage ? "flex" : "none" }}
          >
            {errorMessage && errorMessage}
          </Alert>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            className={classes.submit}
            onClick={handelSignin}
            style={{ background: colorSelector ? "black" : "#3F51B5" }}
            startIcon={
              <CircularProgress
                disableShrink
                style={{
                  color: "white",
                  width: "20px",
                  height: "20px",
                  display: loading ? "flex" : "none",
                }}
              />
            }
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
}
