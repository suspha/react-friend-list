import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { ajax } from '../lib/tools';

function FriendView() {
  const [friends, setFriends]= useState([])

  useEffect(()=> {
    async function friendList() {
      const result = await ajax('/friend/list')
      setFriends(result)
    }
    friendList()
  }, [])

 return (
    <div className="friend-list-page">
      <Link className="add-buttonLink" to="/friend/create">Add new friend + </Link>
      <div className="friend-list-view">
        <h3>List ({friends.length})</h3>
        <div>
          { friends.map(friend => (
            <div className="friend-list" key={friend._id}>
              <div><b>Name: </b>{friend.name}</div>
              <div><b>Email: </b>{friend.email}</div>
              <div><b>Phone: </b>{friend.phone}</div>
              <div><b>Address: </b>{friend.address}</div>
              <Link to={{ pathname: `/friend/edit`, state: { friend }}}>Edit</Link>
              <Link to={{ pathname: `/friend/delete`, state: { friend }}}>Delete</Link>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default FriendView;
