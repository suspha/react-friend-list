import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { ajax } from '../lib/tools';

function FriendView() {
  const [friends, setFriends]= useState([])

  useEffect(()=> {
    console.log("helle")
    async function friendList() {
      const result = await ajax('/friend/list')
      setFriends(result)
    }
    friendList()
  }, [])

  return (
    <div>
      <h1>My list of friends</h1>
      <Link to="/friend/create">Add new friend + </Link>
      <div>
        <h3>List</h3>
        <div>
          { friends.map(friend => (
            <div className="friend-list">
              <div><b>Name:</b> {friend.name}</div>
              <div><b>Email:</b> {friend.email}</div>
              <div><b>Phone:</b> {friend.phone}</div>
              <div><b>Address:</b>{friend.address}</div>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default FriendView;
