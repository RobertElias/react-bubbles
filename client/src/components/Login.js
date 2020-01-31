import React, {useState} from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import axios from 'axios';

const Login = (props) => {
 
  const [form, setForm] = useState({
    username: '',
    password: ''
  })


  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = () => {
    axiosWithAuth().post('/api/login', form)
      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.payload);
        props.history.push('/bubbles');
      })
      .catch(err => console.log('There was an error ' ,err))
  }


  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>

    </div>
  );
};

export default Login;
