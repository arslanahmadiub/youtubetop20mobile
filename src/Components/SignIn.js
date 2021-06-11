import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
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

export default function SignIn() {
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
    password: "",
  });

  let { userName, password } = data;

  let handelSignin = async (e) => {
    e.preventDefault();
  };

  let handelChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  let handelForgot = () => {
    history.push("/forgot");
  };

  return (
    <Container component="main" maxWidth="xs" className="signinclass">
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
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <input
            placeholder="User Name"
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
          <p
            style={{
              fontSize: "16px",
              fontWeight: "700",
              textAlign: "right",
              marginTop: "-20px",
              marginBottom: "15px",
              cursor: "pointer",
              color: colorSelector ? "white" : "#3F51B5",
            }}
            onClick={handelForgot}
          >
            Forgot Password
          </p>
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
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}
