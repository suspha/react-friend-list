import React, {useState} from 'react';
import { ajax } from '../lib/tools'
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function EditFriendView() {
  const [values, setValues] = useState({ name:'', address: '', phone: '', email: ''})
  const [errors, setErrors] = useState({})
  const history = useHistory()

  async function handleEditFriend(e) {
      e.preventDefault()
      const result = await ajax('/friend/edit', values)
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
    <form onSubmit={handleEditFriend}>
      <h1>Edit friend</h1>
      <div>
        <label>Name</label><br/>
        <input type="text" name="name" onChange={e => updateValue(e)}/>
      </div>
      <div>
        <label>Email</label><br/>
        <input type="text" name="email" onChange={e => updateValue(e)}/>
      </div>
      <div>
        <label>phone</label><br/>
        <input type="phone" name="phone" onChange={e => updateValue(e)}/>
      </div>
      <div>
        <label>Address</label><br/>
        <textarea name="address" onChange={e => updateValue(e)}/>
      </div>
      <Link to="/friends"className="back-button">Cancel</Link>
      <button className="save-button">Save</button>
    </form>
  )
}

export default EditFriendView;