import React, {useState} from 'react'
import { ajax } from '../lib/tools'
import { useHistory } from "react-router-dom";

function CreateFriendView() {
  const [values, setValues] = useState({  name:'', address: '', phone: '', email: ''})
  const [errors, setErrors] = useState({})
  const history = useHistory()


  async function handleFriendCreate(e) {
    e.preventDefault()
    const result = await ajax('/friend/create', values)
    if(result.errors) {
      setErrors(result.errors)
    } else {
      history.push('/friends')
    }
  }

  function updateValue(event) {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  return(
    <form onSubmit={handleFriendCreate}>
      <h1>Add new friend</h1>
      <div>
        <label>Name</label><br/>
        <input type="text" name="name" onChange={e => updateValue(e)}/>
        <div className="error-msg">{errors.name}</div>
      </div>
      <div>
        <label>Email</label><br/>
        <input type="text" name="email"  onChange={e => updateValue(e)} />
        <div className="error-msg">{errors.email}</div>
      </div>
      <div>
        <label>phone</label><br/>
        <input type="phone" name="phone" onChange={e => updateValue(e)}/>
        <div className="error-msg">{errors.phone}</div>
      </div>
      <div>
        <label>Address</label><br/>
        <textarea name="address" onChange={e => updateValue(e)} />
      </div>
      <button className="save-button">Save</button>
    </form>
  )
}

export default CreateFriendView;