import React, {useState} from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";


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
      <form onSubmit={(e) => {
         e.preventDefault()
         handleSubmit()
         }}>

        <input 
        type="text" 
        name='username' 
        placeholder="UserName" 
        value={form.name} 
        onChange={handleChange}
        />
        
        <input 
        type="password" 
        name="password" 
        placeholder="Password" 
        value={form.password} 
        onChange={handleChange}
        />
        <button type='submit'>Login</button>
      </form>
      
    </div>
  );
};

export default Login;
