import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { ajax } from "../lib/tools";

function SignupView() {
  const [errors, setErrors] = useState({ name: '', email: '', password: '' })
  const [values, setValues] = useState({ name: '', email: '', password: '', repeat: '' })
  const history = useHistory();

  async function handleSignup(e){
    e.preventDefault() //reloader ikke hele siden

    // submit to api
    const result = await ajax('/signup', values)
    // if error display error
    if(result.errors) {
      setErrors(result.errors)
    } else {
      history.push('/login')
    }
  }

  function updateValue(field, event) {
    setValues({ ...values, [field]: event.target.value })
  }

  return (
    <>
    <h1>Signup</h1>
    <form onSubmit={ handleSignup }>
      <div>
        <label>Name</label><br/>
        <input type="text" name="name" onChange={e => updateValue('name',  e)}/>
        <div className="error-msg">{ errors.name }</div>
      </div>
      <div>
        <label>Email</label><br/>
        <input type="text" name="email" onChange={e => updateValue('email',  e)}/>
        <div className="error-msg">{ errors.email }</div>
      </div>
      <div>
        <label>Password</label><br/>
        <input type="password" name="password" onChange={e => updateValue('password',  e)}/>
        <div className="error-msg">{ errors.password }</div>
      </div>
      <div>
        <label>Repeat Password</label><br/>
        <input type="password" name="repeat" onChange={e => updateValue('repeat',  e)}/>
      </div>
      <div className="login-link">Already signed up in?
        <Link to="/login"> Login</Link>
      </div>
      <button className="submit-button">Submit</button>
    </form>
    </>

  );
}

export default SignupView;
