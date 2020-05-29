import React, {useState} from 'react';
import { useHistory } from "react-router-dom";

function SignupView() {
  const [errors, setErrors] = useState({ name: '', email: '', password: '' })
  const [values, setValues] = useState({ name: '', email: '', password: '', repeat: '' })
  const history = useHistory();

  async function handleSignup(e){
    console.log(e)
    e.preventDefault() //reloader ikke hele siden

    console.log(values)

    // submit to api
    let result = await fetch('http://localhost:3001/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    })
    result = await result.json()
    console.log(result)
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
      <button>Submit</button>
    </form>
    </>

  );
}

export default SignupView;
