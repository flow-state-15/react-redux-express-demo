import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { thunkLogin } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  // useEffect(() => {

  //   return () => {
  //     console.log('in LOGINFORM, in use effect cleanup. Notice that just having a return function will stop react from throwing an error. react is assuming you know what happened')
  //   };
  // }, []);

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(thunkLogin({credential, password}));
    if (data) {
      setErrors(data);
      console.log('right after i set errors:: ', data)
      console.log('that was the memory leak, right there. Notice that the log right before if(user) return already ran, and this setState ran right after. But by the time this log ran, we redirected and this component unmounted.')
      console.log('>>> The cause of the leak is an incorrect return in thunk which assigns an object to data here. We are expecting an array of errors, but the object is general user info, not errors. We shouldnt be getting this object unless login failed with errors anyway.')
    }
  };

  useEffect(() => {
    console.log('use effect just caught the error change, errors:: ', errors)

  }, [errors]);

  const updateCredential = (e) => {
    setCredential(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  console.log('running the component return on every render. if useSelector reference changes we will redirect. user:: ', user)

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={credential}
          onChange={updateCredential}
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <button type='submit'>Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
