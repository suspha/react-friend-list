import React, {useState} from 'react';
import { useHistory } from "react-router-dom";

function SignupView() {
  const [errors, setErrors] = useState({ name: '', email: '', password: '' })
  const history = useHistory();

  async function handleSignup(e){
    console.log(e)
    e.preventDefault() //reloader ikke hele siden

    // get form data
    const form = e.target
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value
    const repeat = form.repeat.value
    const data = {name, email, password, repeat}

    // submit to api
    let result = await fetch('http://localhost:3001/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
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

  return (
    <>
    <h1>Signup</h1>
    <form onSubmit={ handleSignup }>
      <div>
        <label>Name</label><br/>
        <input type="text" name="name"/>
        <div className="error-msg error-name">{ errors.name }</div>
      </div>
      <div>
        <label>email</label><br/>
        <input type="text" name="email"/>
        <div className="error-msg error-email">{ errors.email }</div>
      </div>
      <div>
        <label>Password</label><br/>
        <input type="password" name="password"/>
        <div className="error-msg error-password">{ errors.password }</div>
      </div>
      <div>
        <label>Repeat Password</label><br/>
        <input type="password" name="repeat"/>
      </div>
      <button>Submit</button>
    </form>
    </>

  );
}

export default SignupView;
