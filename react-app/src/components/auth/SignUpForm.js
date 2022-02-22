import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const validate = () => {

    const errors = [];
    // if (!imgURL || !validUrl.isUri(imgURL)) {
    //      errors.push("Please provide an image URL for your photo.")
    //  }
     if (!username) {
        errors.push("Please provide a username.")
    }
     if (!email) {
      errors.push("Please provide a valid email.")
    }
     if (!password) {
      errors.push("Please provide a password.")
    }

    return errors
}

  const onSignUp = async (e) => {
    e.preventDefault();
    const errors = validate();

    if (errors.length > 0) return setErrors(errors);

    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form class="form2" onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className="main-signup">
      <p class="sign-form" align="center">Sign in</p>

      <div>
         <input
          className='un'
          align="center"
          type='text'
          name='username'
          placeholder='Username'
          onChange={updateUsername}
          value={username}

        ></input>
      </div>
      <div>
        <input
          className="un"
          align="center"
          type='text'
          name='email'
          placeholder='Email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <input
          className="un"
          align="center"
          type='password'
          name='password'
          placeholder='Password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <input
          className="un"
          align="center"
          type='password'
          name='repeat_password'
          placeholder='Confirm password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button className='signup-login' type='submit'>Sign Up</button>
      </div>
    </form>
  );
};

export default SignUpForm;
