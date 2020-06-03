import React, { useState, useContext } from 'react';
import { cookie, ajax } from "../lib/tools";
import { AppContext } from '../AppContext'

function SettingsView() {
  const [emailValues, setEmailValues] = useState({  email: ''})
  const [passwordValues, setPasswordValues] = useState({ current: '', password: '', repeat:''})
  const context = useContext(AppContext)
  /* eslint-disable no-unused-vars */
  const [ notification, setNotification ] = context.notify


  async function handleSaveEmail(e) {
    e.preventDefault()
    const result = await ajax('/settings/email', emailValues)
    if(result.errors) {
      setNotification(result.errors)
    } else {
      setNotification('Email is saved')
    }
  }

  async function handleSavePassword(e) {
    e.preventDefault()
    const result = await ajax('/settings/password', passwordValues)
    window.scroll(0,0)
    if(result.errors) {
      setNotification(result.errors)
    } else {
      setNotification('Password is saved')
    }
  }

  function updateEmailValue(event) {
    setEmailValues({ ...emailValues, [event.target.name]: event.target.value })
  }

  function updatePasswordValue(event) {
    setPasswordValues({ ...passwordValues, [event.target.name]: event.target.value })
  }

  return (
    <>
    <h1>Settings</h1>
    <form onSubmit={ handleSaveEmail }>
      <div className="settings-form">
      <h3>Update email</h3>
        <div>
          <label>Email</label><br/>
          <input type="text" name="email" onChange={e => updateEmailValue(e)}/>
        </div>
        <button className="save-button">Save</button>
      </div>
    </form>
    <form onSubmit= {handleSavePassword}>
      <div className="settings-form">
      <h3>Update email</h3>
        <div>
          <label>Current Password</label><br/>
          <input type="password" name="current" onChange={e => updatePasswordValue(e)}/>
        </div>
        <div>
          <label>New Password</label><br/>
          <input type="password" name="password" onChange={e => updatePasswordValue(e)}/>
        </div>
        <div>
          <label>Repaet Password</label><br/>
          <input type="password" name="repeat" onChange={e => updatePasswordValue(e)}/>
        </div>
        <button className="save-button">Save</button>
      </div>
    </form>
    </>
  );
}

export default SettingsView;
