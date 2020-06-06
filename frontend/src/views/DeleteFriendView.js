import React from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";
import { ajax } from '../lib/tools';

function DeleteFriendView(props) {
  const location = useLocation()
  const { friend } = location.state
  const history = useHistory()

  async function handleDeleteFriend() {
    const values = {_id: friend._id}
    await ajax('/friend/delete', values)
    history.push('/friends')
  }

  return (
    <div>
      <h2>Confirm deleting</h2>
      <button onClick={ handleDeleteFriend}>Delete</button>
      <Link to="/friends">Cancel</Link>
    </div>
  );
}

export default DeleteFriendView;
