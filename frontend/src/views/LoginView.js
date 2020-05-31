import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { cookie } from "../lib/tools";

function LoginView(props) {
  const [errors, setErrors] = useState({  email: '', password: '' })
  const [values, setValues] = useState({  email: '', password: ''})
  const history = useHistory()

  async function handleLogin(e) {
    e.preventDefault()

    // submit to api
    let result = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    })
    result = await result.json()
    if(result.errors) {
      setErrors(result.errors)
    } else {
      cookie('user', result._id)
      props.setAuthenticated(true)
      history.push('/friends')
    }
  }

  function updateValue(field, event) {
    setValues({ ...values, [field]: event.target.value })
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="error-msg">{ errors.user }</div>
        <div>
          <label>Email</label><br/>
          <input type="text" name="email" onChange={e => updateValue('email',  e)}/>
        </div>
        <div>
          <label>Password</label><br/>
          <input type="password" name="password" onChange={e => updateValue('password',  e)} />
        </div>
        <div className="login-link">Not signed up yet?
          <Link to="/signup"> Signup</Link>
        </div>
        <button className="submit-button" >Submit</button>
      </form>
    </>
  );
}

export default LoginView;
