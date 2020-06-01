import React, { useContext } from 'react';
import { AppContext } from '../AppContext'

function FlashNotification() {
  const context = useContext(AppContext)
  const [notification, setNotification] = context.notify

  function handleCloseNotification() {
    setNotification('')
  }

  return (
    <div className="FlashNotification">
      { notification }
      {!!notification && <button onClick= {handleCloseNotification}>x</button>}
    </div>
  )
}

export default FlashNotification;
