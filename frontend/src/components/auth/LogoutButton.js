import React from 'react';
import { useDispatch } from 'react-redux';
import { thunkLogout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(thunkLogout());
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
