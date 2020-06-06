import React from 'react';
import { Link, useParams, useHistory } from "react-router-dom";
import { ajax } from '../lib/tools';

function DeleteFriendView(props) {
  const { _id } = useParams()
  const history = useHistory()

  async function handleDeleteFriend() {
    const result = await ajax('/friend/delete', {_id})
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
