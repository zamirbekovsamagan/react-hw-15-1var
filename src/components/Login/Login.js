import React, { useState , useReducer, useEffect} from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';


const passwordReducer = (prevState,action) =>{
  if(action.type === 'INPUT_PASSWORD'){
    return {
      password : action.passwordValue,
      passwordIsValid: action.passwordValue.trim().length > 6
    }
  }
  if(action.type === 'INPUT_BLUR'){
    return {
      password: prevState.password,
      passwordIsValid : prevState.passwordisValid
    }
  }
  return {
    password: '',
    passwordIsValid: false
  }
}

const Login = (props) => {

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    password: '',
    passwordIsValid : '',
  })

  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setFormIsValid(enteredEmail.includes('@') && passwordState.password.trim().length > 6);
    },2000)

    return ()=> clearTimeout(timer)
  })

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'INPUT_PASSWORD', passwordValue: event.target.value})
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR' })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.password}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
