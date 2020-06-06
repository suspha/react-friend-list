import React, {useState} from 'react';
import { ajax } from '../lib/tools'
import { Link, useHistory, useLocation } from "react-router-dom";

function EditFriendView() {
  const history = useHistory()
  const location = useLocation()
  const { friend } = location.state

  const [values, setValues] = useState(friend)
  const [errors, setErrors] = useState({})

  async function handleEditFriend(e) {
    e.preventDefault()
    const result = await ajax('/friend/update', values)
    if(result.errors) {
      window.scroll(0,0)
      setErrors(result.errors)
    } else {
      history.push('/friends')
    }
  }

  function updateValue(event) {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  return(
    <form onSubmit={handleEditFriend}>
      <h1>Edit friend</h1>
      <div>
        <label>Name</label><br/>
        <input type="text" name="name" value={ values.name } onChange={e => updateValue(e)}/>
        <div className="error-msg">{errors.name}</div>
      </div>
      <div>
        <label>Email</label><br/>
        <input type="text" name="email" value={ values.email } onChange={e => updateValue(e)}/>
        <div className="error-msg">{errors.email}</div>
      </div>
      <div>
        <label>phone</label><br/>
        <input type="phone" name="phone" value= { values.phone } onChange={e => updateValue(e)}/>
        <div className="error-msg">{errors.phone}</div>
      </div>
      <div>
        <label>Address</label><br/>
        <textarea name="address" value= { values.address } onChange={e => updateValue(e)}/>
        <div className="error-msg">{errors.address}</div>
      </div>
      <Link to="/friends"className="back-button">Cancel</Link>
      <button className="save-button">Save</button>
    </form>
  )
}

export default EditFriendView;